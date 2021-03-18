import { Component, OnInit } from '@angular/core';
import { Title } from "@angular/platform-browser";
import { ActivatedRoute, Router } from '@angular/router';
import { ArtistConsts } from 'src/app/consts/artist.consts';

import { Album } from 'src/app/models/download-models/album.model';
import { Artist } from 'src/app/models/download-models/artist.model';
import { Track } from 'src/app/models/download-models/track.model';
import { DataService } from 'src/app/services/data.service';

@Component({
    selector: 'app-album',
    templateUrl: './album.component.html',
    styleUrls: ['./album.component.scss']
})
export class AlbumComponent implements OnInit {
    VARIOUS_ARTISTS_CONST = ArtistConsts.variousArtistsConst;
    genres: string[] = [];
    albumData: Album = new Album(
        '',
        '',
        '',
        '',
        '',
        [],
        []
    );
    albumCoverArtUrl: string = '';
    dataLoaded: boolean = false;

    constructor(private route: ActivatedRoute,
                private router: Router,
                private titleService: Title,
                private dataService: DataService) { }

    ngOnInit(): void {
        var routeParams = this.route.snapshot.params;
        var isRequestingAlbum = this.isRequestingAlbum(this.router.url);

        if (routeParams && Object.keys(routeParams).length === 0 && routeParams.constructor === Object) {
            if (isRequestingAlbum) {
                this.fetchAsync('Album/RandomAlbum');
            }
            else {
                this.fetchAsync('Track/RandomTrack');
            }
        }
        else {
            if (isRequestingAlbum) {
                this.fetchAsync(`Album/Album?albumId=${routeParams.albumId}`);
            }
            else {
                this.fetchAsync(`Track/Track?trackId=${routeParams.trackId}`);
            }
        }
    }

    private isRequestingAlbum(url: string): boolean {
        var routes = url.match(/(\/[\w+-]+)/g);
        if (routes !== null && routes.length !== 0) {
            if (routes[0] === '/track') {
                return false;
            }
        }
        
        return true;
    }

    private async fetchAsync(url: string): Promise<void> {
        this.dataLoaded = false;
        this.titleService.setTitle('Shufl');
        
        this.albumData = this.mapReceivedDataToAlbum(
            await this.dataService.getAsync<Album>(url)
        );

        this.titleService.setTitle(this.albumData.name);
        this.dataLoaded = true;
    }

    private mapReceivedDataToAlbum(receivedData: any): Album {
        var receivedGenres = receivedData.genres;
        var receivedAlbumData = receivedData.album;
        var tracks = this.mapReceivedTracks(receivedAlbumData.tracks.items);
        var artists = this.mapReceivedArtists(receivedAlbumData.artists);

        var album: Album = {
            id: receivedAlbumData.id,
            name: receivedAlbumData.name,
            url: receivedAlbumData.externalUrls.spotify,
            coverArtUrl: receivedAlbumData.images[0].url,
            releaseDate: receivedAlbumData.releaseDate,
            tracks,
            artists
        };

        if (receivedGenres.length >= 3) {
            this.genres = receivedGenres.splice(0, 2);
        }
        else {
            this.genres = receivedGenres;
        }

        this.albumCoverArtUrl = album.coverArtUrl;

        return album as Album;
    }

    private mapReceivedArtists(receivedArtists: any): Array<Artist> {
        var artists = new Array<Artist>();

        receivedArtists.forEach((artist: any) => {
            artists.push(new Artist (
                artist.id,
                artist.name,
                artist.followers,
                artist.externalUrls.spotify,
                []
            ));
        });

        return artists;
    }

    private mapReceivedTracks(receivedTracks: any): Array<Track> {
        var tracks = new Array<Track>();

        receivedTracks.forEach((track: any) => {
            tracks.push(new Track(
                track.id,
                track.trackNumber,
                track.name,
                this.mapReceivedArtists(track.artists),
                track.durationMs,
                track.externalUrls.spotify
            ));
        });

        return tracks;
    }
}
