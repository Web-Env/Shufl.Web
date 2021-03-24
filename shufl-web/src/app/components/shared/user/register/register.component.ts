import { HttpErrorResponse } from "@angular/common/http";
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgModel, Validators } from "@angular/forms";
import * as shajs from 'sha.js';
import { User } from "src/app/models/upload-models/user.model";
import { DataService } from "src/app/services/data.service";
import { StatusCheckerComponent } from "../../status-checker/status-checker.component";

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: [
        './register.component.scss',
        '../../../../../assets/scss/form.scss'
    ]
})
export class RegisterComponent implements OnInit {
    @ViewChild(StatusCheckerComponent)
    private statusCheckerComponent!: StatusCheckerComponent;
    @ViewChild('registerCard')
    private registerCard!: ElementRef;

    defaultEmailErrorMessage: string = 'Email cannot be empty';
    emailErrorMessage: string = this.defaultEmailErrorMessage;
    emailActive: boolean = false;
    emailPopulated: boolean = false;
    emailUnique: boolean = true;

    firstNameActive: boolean = false;
    firstNamePopulated: boolean = false;

    lastNameActive: boolean = false;
    lastNamePopulated: boolean = false;

    username: string = "";
    usernamePattern = new RegExp(/^[a-zA-Z][a-zA-Z0-9-_\.]{1,20}$/);
    defaultUsernameErrorMessage: string = 'Username must be at least 4 characters';
    usernameErrorMessage: string = this.defaultUsernameErrorMessage;
    usernameActive: boolean = false;
    usernamePopulated: boolean = false;
    usernameUnique: boolean = true;

    password: string = "";
    confirmPassword: string = "";
    passwordsMatch = false;
    passwordActive: boolean = false;
    passwordPopulated: boolean = false;

    confirmPasswordActive: boolean = false;
    confirmPasswordPopulated: boolean = false;

    registerForm!: FormGroup;
    formErrorMessageVisible: boolean = false;

    isLoading: boolean = false;
    isCheckingUsername: boolean = false;

    constructor(private formBuilder: FormBuilder,
                private dataService: DataService) {
        this.buildForm();
    }

    ngOnInit(): void {
        this.registerForm.setValue({
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            confirmPassword: ''
        });
    }

    public buildForm(): void {
        this.registerForm = this.formBuilder.group({
            firstName: ['', [Validators.required, Validators.minLength(1)]],
            lastName: ['', [Validators.required, Validators.minLength(1)]],
            email: ['', [Validators.required, Validators.minLength(4)]],
            password: ['', [Validators.required, Validators.minLength(8)]],
            confirmPassword: ['', [Validators.required, Validators.minLength(8)]]
        });
    }

    public changeInputState(input: NgModel, active: boolean): void {
        if (input.name === 'email') {
            this.emailActive = active;
            this.emailPopulated = input.value !== '';
            if (!this.emailPopulated) this.emailErrorMessage = this.defaultEmailErrorMessage;
        }
        else if (input.name === 'first-name') {
            this.firstNameActive = active;
            this.firstNamePopulated = input.value !== '';
        }
        else if (input.name === 'last-name') {
            this.lastNameActive = active;
            this.lastNamePopulated = input.value !== '';
        }
        else if (input.name === 'username') {
            this.usernameActive = active;
            this.usernamePopulated = input.value !== '';
            if (!this.usernamePopulated) this.usernameErrorMessage = this.defaultUsernameErrorMessage;
        }
        else if (input.name === 'password') {
            this.passwordActive = active;
            this.passwordPopulated = input.value !== '';
        }
        else if (input.name === 'confirm-password') {
            this.confirmPasswordActive = active;
            this.confirmPasswordPopulated = input.value !== '';
        }
    }

    public emailChanged(email: string): void {
        if (email === '') {
            if (this.emailErrorMessage !== this.defaultEmailErrorMessage) this.emailErrorMessage = this.defaultEmailErrorMessage;
        }
        else {
            this.emailErrorMessage = 'Email Invalid';
        }

        this.emailUnique = true;
    }

    async usernameChanged(username: string): Promise<void> {
        if (!this.usernamePattern.test(username)) {
            this.usernamePopulated = username !== '';

            if (!(/^[a-zA-Z()]+$/.test(username.charAt(0)))) {
                this.usernameErrorMessage = 'Username must start with a letter';
                this.statusCheckerComponent.setNegative();
            }
            else {
                if (username.length < 4) {
                    this.usernameErrorMessage = this.defaultUsernameErrorMessage;
                }
                else {
                    this.usernameErrorMessage = 'Username cannot contain special characters';
                    this.statusCheckerComponent.setNegative();
                }
            }
        }
        else {
            this.username = username;

            setTimeout(async () => {
                if (this.username === username && this.username.length >= 4) {
                    this.usernamePopulated = username !== '';
                    await this.checkUsernameUniqueAsync(username);
                }
            }, 500);
        }
    }

    private async checkUsernameUniqueAsync(username: string) {
        this.isCheckingUsername = true;

        this.usernameUnique = await this.statusCheckerComponent.verifyInputAsync(
            username, `User/CheckUsernameUnique?username=`, this.dataService);

        if (!this.usernameUnique) {
            this.usernameErrorMessage = 'Username must be unique';
        }
        else {
            this.usernameErrorMessage = this.defaultUsernameErrorMessage;
        }

        this.isCheckingUsername = false;
    }

    public checkPasswordsMatch(passwordInput: NgModel): void {
        passwordInput.name == 'password' ? this.password = passwordInput.value : this.confirmPassword = passwordInput.value;
        
        if (this.password === this.confirmPassword) {
            this.registerForm.controls['confirmPassword'].setErrors(null);
            this.passwordsMatch = true;
        }
        else {
            this.passwordsMatch = false;
            this.registerForm.controls['confirmPassword'].setErrors({ 'incorrect': true });
        }
    }

    public async registerAsync(formData: any) {
        if (!this.isLoading && !this.isCheckingUsername) {
            this.formErrorMessageVisible = false;
            this.isLoading = true;

            var hashedPassword = shajs('sha256').update(formData['password']).digest('hex');

            var userUploadModel = new User(
                formData['email'],
                formData['first-name'],
                formData['last-name'],
                formData['username'],
                hashedPassword
            )

            try {
                await this.dataService.postAsync("User/Register", userUploadModel);
            }
            catch(err) {
                if (err instanceof HttpErrorResponse) {
                    if (err.error.errorType !== null && err.error.errorType !== '') {
                        if (err.error.errorType === 'EmailAlreadyRegisteredException') {
                            this.emailErrorMessage = 'Email already registered';
                            this.emailUnique = false;
                            this.registerCard.nativeElement.scrollTop = 0;
                        }
                        else if (err.error.errorType === 'EmailAlreadyRegisteredException') {
                            await this.checkUsernameUniqueAsync(userUploadModel.Username);
                            this.registerCard.nativeElement.scrollTop = 0;
                        }
                        else {
                            this.formErrorMessageVisible = true;
                        }
                    }
                }
            }
            finally {
                this.isLoading = false;
            }
        }
    }

}
