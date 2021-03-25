import { HttpErrorResponse } from "@angular/common/http";
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgModel, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import * as shajs from 'sha.js';
import { AuthRequest } from "src/app/models/upload-models/auth-request.model";

import { AuthService } from "src/app/services/auth/auth.service";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: [
        './login.component.scss',
        '../../../../../assets/scss/user-form.scss'
    ]
})
export class LoginComponent implements OnInit {    
    defaultEmailErrorMessage: string = 'Email cannot be empty';
    emailErrorMessage: string = this.defaultEmailErrorMessage;
    emailActive: boolean = false;
    emailPopulated: boolean = false;

    passwordActive: boolean = false;
    passwordPopulated: boolean = false;
    
    loginForm!: FormGroup;
    
    isLoading: boolean = false;
    formErrorMessage: string = "";
    formErrorMessageVisible: boolean = false;

    constructor(private formBuilder: FormBuilder,
                private router: Router,
                private authService: AuthService) {
        this.buildForm();
    }

    async ngOnInit(): Promise<void> {
        var token = localStorage.getItem('Token');
        if (token !== null && token !== '') {
            var tokenIsValid = await this.authService.checkTokenValidAsync();

            if (tokenIsValid) {
                this.router.navigate(['']);
            }
        }
        
        this.loginForm.setValue({
            email: '',
            password: ''
        });
    }

    public buildForm(): void {
        this.loginForm = this.formBuilder.group({
            email: ['', [Validators.required, Validators.minLength(4)]],
            password: ['', [Validators.required, Validators.minLength(8)]],
        });
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
    }
    
    public async loginAsync(formData: any): Promise<void> {
        if(!this.isLoading) {
            this.formErrorMessageVisible = false;
        this.isLoading = true;

        var hashedPassword = shajs('sha256').update(formData['password']).digest('hex');

        var authRequestModel = new AuthRequest(
            formData['email'],
            hashedPassword
        );

        try {
            await this.authService.loginAsync(authRequestModel);
        }
        catch (err) {
            if (err instanceof HttpErrorResponse) {
                if (err.status === 400) {
                    this.formErrorMessage = "Invalid login credentials";
                }
                else {
                    this.formErrorMessage = "An unexpected error occured, please try again";
                }
                this.formErrorMessageVisible = true;
                this.isLoading = false;
            }
        }
        }
    }

}
