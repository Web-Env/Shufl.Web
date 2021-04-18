import { Component, OnInit } from '@angular/core';
import { AuthService } from "src/app/services/auth/auth.service";
import { environment } from "src/environments/environment";

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

    public linkSpotify(): void {
        let spotifyUrl = `https://accounts.spotify.com/en/authorize?client_id=d4eaa206a29d46f19de7ae1f6a386823&response_type=code&redirect_uri=https:%2F%2F${environment.environmentUrl}%2Fcallback&scope=playlist-modify-private%20playlist-modify-public%20user-modify-playback-state%20user-read-private%20user-read-email&state=34fFs29kd09`;
        console.log(spotifyUrl);
        window.location.href = spotifyUrl;
    }

}
