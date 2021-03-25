import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

import { DataService } from "../data.service";
import { AuthRequest } from "src/app/models/upload-models/auth-request.model";
import { AuthResponse } from "src/app/models/download-models/auth-response.model";

@Injectable()
export class AuthService {
    redirectUrl: string = '';

    constructor(private router: Router,
                private dataService: DataService) { }

    public async isLoggedInAsync(): Promise<boolean> {
        var token = localStorage.getItem('Token');
        if (token != null && token != '') {            
            return true;
        }

        return false;
    }

    public async checkTokenValidAsync(): Promise<boolean> {
        let endpoint ='Auth/validate';

        try {
            await this.dataService.getAsync(endpoint);

            return true;
        }
        catch (err) {
            if (err instanceof HttpErrorResponse && err.status === 401) {
                this.purgeLocalStorage();
            }

            return false;
        }
    }

    public async loginAsync(authRequestModel: AuthRequest): Promise<void> {
        let endpoint ='Auth/auth';

        try {
            let authResponse: AuthResponse = await this.dataService.postAsync(endpoint, authRequestModel, AuthResponse);
            if (authResponse !== null) {
                localStorage.setItem('Username', authResponse.username);
                localStorage.setItem('DisplayName', authResponse.displayName);
                localStorage.setItem('FirstName', authResponse.firstName);
                localStorage.setItem('LastName', authResponse.lastName);
                localStorage.setItem('PictureUrl', authResponse.pictureUrl);
                localStorage.setItem('SpotifyMarket', authResponse.spotifyMarket);
                localStorage.setItem('UserId', authResponse.userId);
                localStorage.setItem('Token', authResponse.token);
            }

            if (this.redirectUrl !== '') {
                this.router.navigate([this.redirectUrl]);
            }
            else {
                this.router.navigate(['']);
            }
        }
        catch (err) {
            throw(err);
        }
    }

    public logout(): void {
        this.purgeLocalStorage();
        this.router.navigate(['']);
    }

    private purgeLocalStorage(): void {
        localStorage.removeItem('Username');
        localStorage.removeItem('DisplayName');
        localStorage.removeItem('FirstName');
        localStorage.removeItem('LastName');
        localStorage.removeItem('PictureUrl');
        localStorage.removeItem('SpotifyMarket');
        localStorage.removeItem('UserId');
        localStorage.removeItem('Token');
    }
}