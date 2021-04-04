import { Component, OnInit } from '@angular/core';
import { Title } from "@angular/platform-browser";
import { ActivatedRoute } from '@angular/router';

import { Album } from 'src/app/models/download-models/album.model';
import { Artist } from 'src/app/models/download-models/artist.model';
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
    artist: Artist = new Artist();
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

            this.artist = await this.dataService.getAsync<Artist>(url, Artist);

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
