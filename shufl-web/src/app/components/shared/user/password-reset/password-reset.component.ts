import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgModel, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import * as shajs from 'sha.js';
import { PasswordResetRequestUploadModel } from "src/app/models/upload-models/password-reset-request.model";
import { PasswordResetUploadModel } from "src/app/models/upload-models/password-reset.model";
import { AuthService } from "src/app/services/auth/auth.service";
import { DataService } from "src/app/services/data.service";

@Component({
    selector: 'app-password-reset',
    templateUrl: './password-reset.component.html',
    styleUrls: ['../../../../../assets/scss/user-form.scss']
})
export class PasswordResetComponent implements OnInit {
    passwordResetToken!: string;
    isRequesting: boolean = false;
    isResetTokenValid: boolean = false;

    defaultEmailErrorMessage: string = 'Email cannot be empty';
    emailErrorMessage: string = this.defaultEmailErrorMessage;
    emailActive: boolean = false;
    emailPopulated: boolean = false;
    emailUnique: boolean = true;
    
    password: string = "";
    confirmPassword: string = "";
    passwordsMatch:boolean = false;
    passwordActive: boolean = false;
    passwordPopulated: boolean = false;

    confirmPasswordActive: boolean = false;
    confirmPasswordPopulated: boolean = false;
    
    passwordResetRequestForm!: FormGroup;
    passwordResetSetForm!: FormGroup;
    formErrorMessageVisible: boolean = false;

    isLoading: boolean = false;
    resetRequestSentSuccessfully: boolean = false;
    passwordResetSuccessfully: boolean = false;

    constructor(private route: ActivatedRoute,
                private formBuilder: FormBuilder,
                private router: Router,
                private dataService: DataService,
                private authService: AuthService) { }

    async ngOnInit(): Promise<void> {
        var token = localStorage.getItem('Token');
        if (token !== null && token !== '') {
            var tokenIsValid = await this.authService.checkTokenValidAsync();

            if (tokenIsValid) {
                this.router.navigate(['']);
            }
        }

        var queryParams = this.route.snapshot.queryParams;

        if (queryParams && Object.keys(queryParams).length !== 0 && 
            queryParams.constructor === Object && 
            (queryParams.token !== null && queryParams.token !== '')) {
                this.passwordResetToken = queryParams.token;
                this.isRequesting = false;
                this.checkResetTokenValidAsync(this.passwordResetToken);
        }
        else {
            this.isRequesting = true;
        }

        this.buildForms();
    }

    public buildForms(): void {
        if (this.isRequesting) {
            this.passwordResetRequestForm = this.formBuilder.group({
                email: ['', [Validators.required, Validators.minLength(4)]]
            });
        }
        else {
            this.passwordResetSetForm = this.formBuilder.group({
                password: ['', [Validators.required, Validators.minLength(8)]],
                confirmPassword: ['', [Validators.required, Validators.minLength(8)]]
            });
        }
    }

    private async checkResetTokenValidAsync(resetToken: string): Promise<void> {
        try {
            await this.dataService.getAsync(`User/ForgotPassword/Validate?passwordResetToken=${encodeURIComponent(resetToken)}`);
            this.isResetTokenValid = true;
        }
        catch (err) {
            this.isResetTokenValid = false;
            throw err;
        }
    }

    public changeInputState(input: NgModel, active: boolean): void {
        if (input.name === 'email') {
            this.emailActive = active;
            this.emailPopulated = input.value !== '';
            if (!this.emailPopulated) {
                this.emailErrorMessage = this.defaultEmailErrorMessage;
            }
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
            if (this.emailErrorMessage !== this.defaultEmailErrorMessage) {
                this.emailErrorMessage = this.defaultEmailErrorMessage;
            }
        }
        else {
            this.emailErrorMessage = 'Email Invalid';
        }

        this.emailUnique = true;
    }
    
    public checkPasswordsMatch(passwordInput: NgModel): void {
        passwordInput.name === 'password' ? this.password = passwordInput.value : this.confirmPassword = passwordInput.value;
        
        if (this.password === this.confirmPassword) {
            this.passwordResetSetForm.controls['confirmPassword'].setErrors(null);
            this.passwordsMatch = true;
        }
        else {
            this.passwordsMatch = false;
            this.passwordResetSetForm.controls['confirmPassword'].setErrors({ 'incorrect': true });
        }
    }

    public async passwordResetRequestAsync(formData: any): Promise<void> {
        if (!this.isLoading) {
            this.resetRequestSentSuccessfully = false;
            this.formErrorMessageVisible = false;
            this.isLoading = true;

            try {
                var email = formData['email'];
                var passwordResetRequest = new PasswordResetRequestUploadModel(email);

                await this.dataService.postWithoutResponseAsync('User/ForgotPassword/New', passwordResetRequest);

                this.resetRequestSentSuccessfully = true;
            }
            catch (err) {
                this.resetRequestSentSuccessfully = false;
                this.formErrorMessageVisible = true;
                throw err;
            }
            finally {
                this.isLoading = false;
            }
        }
    }

    public async passwordResetSetAsync(formData: any): Promise<void> {
        if (!this.isLoading) {
            this.formErrorMessageVisible = false;
            this.isLoading = true;

            try {
                var hashedPassword = shajs('sha256').update(formData['password']).digest('hex');
                var passwordReset = new PasswordResetUploadModel(
                    this.passwordResetToken,
                    hashedPassword
                );

                await this.dataService.postWithoutResponseAsync('User/ForgotPassword', passwordReset);

                this.passwordResetSuccessfully = true;

                this.passwordResetSetForm.controls['password'].setValue('');
                this.passwordResetSetForm.controls['confirmPassword'].setValue('');

                this.authService.purgeLocalStorage();
                
                window.setTimeout(() => {
                    this.router.navigate(['/login']);
                }, 5000);
            }
            catch (err) {
                this.passwordResetSuccessfully = false;
                this.formErrorMessageVisible = true;

                await this.checkResetTokenValidAsync(this.passwordResetToken);
                
                throw err;
            }
            finally {
                this.isLoading = false;
            }
        }
    }

    public requestNewLinkClicked(): void {
        this.router.navigate(['/account/password-reset']);

        this.isRequesting = true;
        this.resetRequestSentSuccessfully = false;
        this.emailErrorMessage = this.defaultEmailErrorMessage;
        this.formErrorMessageVisible = false;
    }

}
