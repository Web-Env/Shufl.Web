import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgModel, Validators } from "@angular/forms";
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

    emailActive: boolean = false;
    emailPopulated: boolean = false;

    firstNameActive: boolean = false;
    firstNamePopulated: boolean = false;

    lastNameActive: boolean = false;
    lastNamePopulated: boolean = false;

    username: string = "";
    usernameActive: boolean = false;
    usernamePopulated: boolean = false;
    usernameUnique: boolean = false;

    passwordActive: boolean = false;
    passwordPopulated: boolean = false;

    confirmPasswordActive: boolean = false;
    confirmPasswordPopulated: boolean = false;

    registerForm!: FormGroup;
    errorMessage!: string;
    password!: string;
    passwordsMatch = false;

    isLoading: boolean = false;

    constructor(private formBuilder: FormBuilder) {
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

    buildForm(): void {
        this.registerForm = this.formBuilder.group({
            firstName: ['', [Validators.required, Validators.minLength(1)]],
            lastName: ['', [Validators.required, Validators.minLength(1)]],
            email: ['', [Validators.required, Validators.minLength(4)]],
            password: ['', [Validators.required, Validators.minLength(8)]],
            confirmPassword: ['', [Validators.required, Validators.minLength(8)]]
        });
    }

    changeInputState(input: NgModel, active: boolean): void {
        if (input.name === 'email') {
            this.emailActive = active;
            this.emailPopulated = input.value !== '';
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

    setPassword(event: any): void {
        this.password = event.srcElement.value;
    }

    checkPasswordsMatch(passwordInput: any): void {
        if (this.password === undefined) {
            this.password = passwordInput.viewModel;
        }
        else {
            if (passwordInput.viewModel === this.password) {
                this.registerForm.controls['confirmPassword'].setErrors(null);
                this.passwordsMatch = true;
                return;
            }

            this.passwordsMatch = false;
            this.registerForm.controls['confirmPassword'].setErrors({ 'incorrect': true });
        }
    }

    usernameChanged(username: string) {
        this.username = username;
        setTimeout(() => {
            if (this.username === username) {
                this.usernamePopulated = username !== '';
                this.usernameUnique = this.statusCheckerComponent.verifyInput(username);
            }
        }, 250)
    }

    register(data: any) {
        this.isLoading = true;
    }

}
