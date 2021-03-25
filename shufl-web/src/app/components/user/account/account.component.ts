import { Component, OnInit } from '@angular/core';
import { AuthService } from "src/app/services/auth/auth.service";

@Component({
    selector: 'app-account',
    templateUrl: './account.component.html',
    styleUrls: [
        './account.component.scss',
        '../../../../assets/scss/wide-container.scss'
    ]
})
export class AccountComponent implements OnInit {
    dataLoaded: boolean = false;
    userDisplayName!: string | null;

    constructor(private authService: AuthService) { }

    ngOnInit(): void {
        this.userDisplayName = localStorage.getItem('DisplayName');

        setTimeout(() => {
            this.dataLoaded = true;
        }, 250);
    }

    public logout(): void {
        this.authService.logout();
    }

}
