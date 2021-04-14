import { HttpErrorResponse } from "@angular/common/http";
import { Component, OnInit } from '@angular/core';
import { NgModel } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { DataService } from "src/app/services/data.service";
import { UrlHelperService } from "src/app/services/helpers/url-helper.service";

@Component({
    selector: 'app-verify',
    templateUrl: './verify.component.html',
    styleUrls: [
        './verify.component.scss',
        '../../../../../assets/scss/user-form.scss'
    ]
})
export class VerifyComponent implements OnInit {
    isRequesting!: boolean;
    isLoading!: boolean;
    isError: boolean = false;

    defaultEmailErrorMessage: string = 'Email cannot be empty';
    emailErrorMessage: string = this.defaultEmailErrorMessage;
    emailActive: boolean = false;
    emailPopulated: boolean = false;
    emailUnique: boolean = true;
    
    defaultFormErrorMessage = 'An unexpected error occurred, please try again';
    formErrorMessage: string = this.defaultFormErrorMessage;
    formErrorMessageVisible: boolean = false;

    verificationRequestSentSuccessfully: boolean = false;
    verificationAttempted: boolean = false;
    verifiedSuccessfully!: boolean;

    constructor(private route: ActivatedRoute,
                private router: Router,
                private dataService: DataService,
                private urlHelperService: UrlHelperService) { }

    ngOnInit(): void {
        var routeParams = this.route.snapshot.params;

        if (this.urlHelperService.isRouteParamObjectValid(routeParams) && 
            this.urlHelperService.isRouteParamValid(routeParams.token)) {
                this.isLoading = true;
                this.isRequesting = false;

                this.verifyAsync(routeParams.token);
        }
        else {
            this.isLoading = false;
            this.isRequesting = true;
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

    private async verifyAsync(token: string) {
        try {
            await this.dataService.postWithoutResponseAsync(`User/Verify?verificationIdentifier=${token}`, {});

            this.verifiedSuccessfully = true;

            window.setTimeout(() => {
                this.router.navigate(['']);
            }, 5000);
        }
        catch (err) {
            this.verifiedSuccessfully = false;
            throw err;
        }
        finally {
            this.verificationAttempted = true;
            this.isLoading = false;
        }
    }

    public async verificationRequestAsync(formData: any): Promise<void> {
        if (!this.isLoading) {
            this.verificationRequestSentSuccessfully = false;
            this.formErrorMessageVisible = false;
            this.isLoading = true;

            try {
                var email = formData['email'];

                await this.dataService.postWithoutResponseAsync(`User/Verify/New?email=${encodeURIComponent(email)}`, {});

                this.verificationRequestSentSuccessfully = true;
            }
            catch (err) {
                console.log(err);
                if (err instanceof HttpErrorResponse && err.status === 400) {
                    this.formErrorMessage = err.error.errorMessage;
                }
                else {
                    this.formErrorMessage = this.defaultFormErrorMessage;
                }

                this.verificationRequestSentSuccessfully = false;
                this.formErrorMessageVisible = true;
                throw err;
            }
            finally {
                this.isLoading = false;
            }
        }
    }

    public requestNewLinkClicked(): void {
        this.router.navigate(['/account/verify']);

        this.isRequesting = true;
        this.verificationRequestSentSuccessfully = false;
        this.emailErrorMessage = this.defaultEmailErrorMessage;
        this.formErrorMessageVisible = false;
    }

}
