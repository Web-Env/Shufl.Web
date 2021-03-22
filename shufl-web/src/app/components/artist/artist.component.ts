import { Component, OnInit } from '@angular/core';
import { Title } from "@angular/platform-browser";
import { ActivatedRoute } from '@angular/router';

import { Album } from 'src/app/models/download-models/album.model';
import { Artist } from 'src/app/models/download-models/artist.model';
import { DataService } from 'src/app/services/data.service';
import { LoadingService } from "src/app/services/loading.service";

@Component({
    selector: 'app-artist',
    templateUrl: './artist.component.html',
    styleUrls: [
        './artist.component.scss',
        '../../../assets/scss/wide-container.scss'
    ]
})
export class ArtistComponent implements OnInit {
    genres: string[] = [];
    artistData: Artist = new Artist(
        '',
        '',
        0,
        '',
        []
    );
    artistImageUrl: string = '';
    dataLoaded: boolean = false;

    constructor(private route: ActivatedRoute,
                private titleService: Title,
                private dataService: DataService,
                private loadingService: LoadingService) { }

    ngOnInit(): void {
        var routeParams = this.route.snapshot.params;

        if (routeParams && Object.keys(routeParams).length === 0 && 
            routeParams.constructor === Object && 
            routeParams.artistId !== null) {
            this.fetchAsync('Artist/RandomArtist');
        }
        else {
            this.fetchAsync(`Artist/Artist?artistId=${routeParams.artistId}`);
        }
    }

    private async fetchAsync(url: string): Promise<void> {
        this.loadingService.emitstateEvent(true);
        this.dataLoaded = false;
        this.titleService.setTitle('Shufl');

        this.artistData = this.mapReceivedDataToArtist(
            await this.dataService.getAsync<Artist>(url)
        );

        this.titleService.setTitle(this.artistData.name);
        this.loadingService.emitstateEvent(false);
        this.dataLoaded = true;
    }

    private mapReceivedDataToArtist(receivedData: any): Artist {
        var receivedArtistData = receivedData.artist;
        var receivedGenres = receivedArtistData.genres;
        var albums = this.mapReceivedAlbums(receivedData.albums);

        var artist: Artist = {
            id: receivedArtistData.id,
            name: receivedArtistData.name,
            followers: receivedArtistData.followers.total,
            url: receivedArtistData.externalUrls.spotify,
            albums
        };

        if (receivedGenres.length === 0) {
            this.genres = ['No Genres Listed'];
        }
        else if (receivedGenres.length >= 3) {
            this.genres = receivedGenres.splice(0, 2);
        }
        else {
            this.genres = receivedGenres;
        }

        this.artistImageUrl =
            receivedArtistData.images.length > 0 ? receivedArtistData.images[0].url : 'assets/img/blank-user.png';

        return artist as Artist;
    }

    private mapReceivedAlbums(receivedAlbums: any): Array<Album> {
        var albums = new Array<Album>();

        receivedAlbums.forEach((album: any) => {
            albums.push(new Album(
                album.id,
                album.name,
                album.externalUrls.spotify,
                album.images[album.images.length - 2].url,
                album.releaseDate,
                this.mapReceivedArtists(album.artists),
                []
            ));
        });

        return albums;
    }

    private mapReceivedArtists(receivedArtists: any): Array<Artist> {
        var artists = new Array<Artist>();

        receivedArtists.forEach((artist: any) => {
            artists.push(new Artist(
                artist.id,
                artist.name,
                artist.followers,
                artist.externalUrls.spotify,
                []
            ));
        });

        return artists;
    }
}
