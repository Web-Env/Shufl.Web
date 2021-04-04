import { Component, OnInit } from '@angular/core';
import { Title } from "@angular/platform-browser";
import { ActivatedRoute } from '@angular/router';

import { AlbumDownloadModel } from 'src/app/models/download-models/album.model';
import { ArtistDownloadModel } from 'src/app/models/download-models/artist.model';
import { DataService } from 'src/app/services/data.service';
import { UrlHelperService } from "src/app/services/helpers/url-helper.service";

@Component({
    selector: 'app-artist',
    templateUrl: './artist.component.html',
    styleUrls: [
        './artist.component.scss',
        '../../../assets/scss/music-details.scss'
    ]
})
export class ArtistComponent implements OnInit {
    genres: string[] = [];
    artist: ArtistDownloadModel = new ArtistDownloadModel();
    artistImageUrl: string = '';
    isLoading: boolean = true;

    constructor(private route: ActivatedRoute,
                private titleService: Title,
                private dataService: DataService,
                private urlHelperService: UrlHelperService) { }

    ngOnInit(): void {
        var routeParams = this.route.snapshot.params;

        if (this.urlHelperService.isRouteParamObjectValid(routeParams) &&  this.urlHelperService.isRouteParamValid(routeParams.artistId)) {
            this.fetchAsync(`Artist/Artist?artistId=${routeParams.artistId}`);
        }
        else {
            this.fetchAsync('Artist/RandomArtist');
        }
    }

    private async fetchAsync(url: string): Promise<void> {
        try {
            this.isLoading = true;
            this.titleService.setTitle('Shufl');

            this.artist = await this.dataService.getAsync<ArtistDownloadModel>(url, ArtistDownloadModel);

            this.titleService.setTitle(this.artist.name);
        }
        catch (err) {
            console.log(err);
        }
        finally {
            this.isLoading = false;
        }
    }
}
