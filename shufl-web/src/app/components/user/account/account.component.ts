import { Component, OnInit } from '@angular/core';
import { UserDownloadModel } from "src/app/models/download-models/user.model";
import { AuthService } from "src/app/services/auth/auth.service";
import { DataService } from "src/app/services/data.service";
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
    isLoading: boolean = true;
    user!: UserDownloadModel;
    userDisplayName!: string | null;

    constructor(private authService: AuthService,
                private dataService:DataService) { }

    ngOnInit(): void {
        this.getDataAsync();
    }

    private async getDataAsync(): Promise<void> {
        try {
            this.user = await this.dataService.getAsync<UserDownloadModel>('User/UserSettings');

            localStorage.setItem('Username', this.user.username);
            localStorage.setItem('DisplayName', this.user.displayName);
            localStorage.setItem('FirstName', this.user.firstName);
            localStorage.setItem('LastName', this.user.lastName);
            this.user.spotifyUsername != null && localStorage.setItem('SpotifyUsername', this.user.spotifyUsername);
            this.user.spotifyMarket != null && localStorage.setItem('SpotifyMarket', this.user.spotifyMarket);
        }
        catch (err) {
            throw err;
        }
        finally {
            this.isLoading = false;
        }
    }

    public logout(): void {
        this.authService.logout();
    }

    public linkSpotify(): void {
        let spotifyUrl = `https://accounts.spotify.com/en/authorize?client_id=d4eaa206a29d46f19de7ae1f6a386823&response_type=code&redirect_uri=https:%2F%2F${environment.environmentUrl}%2Fcallback&scope=playlist-modify-private%20playlist-modify-public%20user-read-playback-state%20user-modify-playback-state%20user-read-private&state=34fFs29kd09`;
        window.location.href = spotifyUrl;
    }

    public async unlinkSpotifyAsync(): Promise<void> {
        await this.dataService.deleteAsync('Spotify/UnlinkSpotify');
        
        localStorage.removeItem('SpotifyUsername');
        localStorage.removeItem('SpotifyMarket');

        location.reload();
    }

}
