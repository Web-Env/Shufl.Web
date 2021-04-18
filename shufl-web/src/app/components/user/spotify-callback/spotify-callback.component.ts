import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { SpotifyLinkUploadModel } from "src/app/models/upload-models/spotify-link.model";
import { DataService } from "src/app/services/data.service";
import { environment } from "src/environments/environment";

@Component({
    selector: 'app-spotify-callback',
    templateUrl: './spotify-callback.component.html'
})
export class SpotifyCallbackComponent implements OnInit {

    constructor(private route: ActivatedRoute,
                private router: Router,
                private dataService: DataService) { }

    async ngOnInit(): Promise<void> {
        var queryParams = this.route.snapshot.queryParams;

        if (queryParams && Object.keys(queryParams).length !== 0 && 
            queryParams.constructor === Object && 
            (queryParams.code !== null && queryParams.code !== '')) {

            let spotifyLinkUploadModel = new SpotifyLinkUploadModel(
                queryParams.code,
                environment.environmentUrl
            );

            await this.dataService.postWithoutResponseAsync('Spotify/LinkSpotify', spotifyLinkUploadModel);

            this.router.navigate(['account']);
        }
        else {
            this.router.navigate(['account']);
        }
    }

}
