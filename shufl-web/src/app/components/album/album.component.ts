import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { ArtistConsts } from "src/app/consts/artist.consts";

import { Album } from "src/app/models/album.model";
import { Artist } from "src/app/models/artist.model";
import { Track } from "src/app/models/track.model";
import { DataService } from "src/app/services/data.service";

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
                private dataService: DataService) { }

    async ngOnInit(): Promise<void> {
        var routeParams = this.route.snapshot.params;
        var isRequestingAlbum = this.isRequestingAlbum(this.router.url);

        if (routeParams && Object.keys(routeParams).length === 0 && routeParams.constructor === Object) {
            if (isRequestingAlbum) {
                await this.fetchRandomAsync('Album/RandomAlbum');
            }
            else {
                await this.fetchRandomAsync('Track/RandomTrack');
            }
        }
        else {
            if (isRequestingAlbum) {
                await this.fetchAsync(`Album/Album?albumId=${routeParams.albumId}`);
            }
            else {
                await this.fetchAsync(`Track/Track?trackId=${routeParams.trackId}`);
            }
        }
    }

    private isRequestingAlbum(url: string): boolean {
        var routes = url.match(/(\/[\w+-]+)/g);
        if (routes !== null && routes.length !== 0) {
            if (routes[0] === "/track") {
                return false;
            }
        }
        
        return true;
    }

    private async fetchRandomAsync(url: string): Promise<void> {
        this.dataLoaded = false;

        this.albumData = this.mapReceivedDataToAlbum(
            await this.dataService.getAsync<Album>(url)
        );

        this.dataLoaded = true;
    }

    private async fetchAsync(url: string): Promise<void> {
        this.dataLoaded = false;
        
        this.albumData = this.mapReceivedDataToAlbum(
            await this.dataService.getAsync<Album>(url)
        );

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
            tracks: tracks,
            artists: artists
        };

        if (receivedGenres.length >= 3) {
            this.genres = receivedData.genres.splice(0, 2);
        }
        else {
            this.genres = receivedData.genres;
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
                artist.externalUrls.spotify,
                undefined
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
