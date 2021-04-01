import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from "@angular/material/dialog";
import { Title } from "@angular/platform-browser";
import { ActivatedRoute, Router } from '@angular/router';
import { ArtistConsts } from 'src/app/consts/artist.consts';

import { Album } from 'src/app/models/download-models/album.model';
import { Artist } from 'src/app/models/download-models/artist.model';
import { GroupSuggestion } from "src/app/models/upload-models/group-suggestion.model";
import { Track } from 'src/app/models/download-models/track.model';
import { DataService } from 'src/app/services/data.service';
import { UrlHelperService } from "src/app/services/helpers/url-helper.service";
import { AddToGroupComponent } from "../shared/group/dialogs/add-to-group/add-to-group.component";
import { AuthService } from "src/app/services/auth/auth.service";

@Component({
    selector: 'app-album',
    templateUrl: './album.component.html',
    styleUrls: [
        './album.component.scss',
        '../../../assets/scss/music-details.scss'
    ]
})
export class AlbumComponent implements OnInit {
    isLoading: boolean = true;
    isLoggedIn: boolean = false;
    isModal: boolean = false;
    groupId!: string;
    VARIOUS_ARTISTS_CONST = ArtistConsts.variousArtistsConst;
    genres: string[] = [];
    albumData!: Album;
    albumCoverArtUrl: string = '';

    addingAlbumToGroup: boolean = false;
    addedAlbumToGroupSuccessfully: boolean = false;
    errorVisible: boolean = false;

    constructor(private dialogRef: MatDialogRef<AlbumComponent>,
                private route: ActivatedRoute,
                private router: Router,
                private dialog: MatDialog,
                private titleService: Title,
                private authService: AuthService,
                private dataService: DataService,
                private urlHelperService: UrlHelperService) { }

    ngOnInit(): void {
        this.isLoggedIn = this.authService.isLoggedIn();

        if (!this.isModal && this.groupId == null) {
            var routeParams = this.route.snapshot.params;
            var isRequestingAlbum = this.isRequestingAlbum(this.router.url);

            if (this.urlHelperService.isRouteParamObjectValid(routeParams) && (this.urlHelperService.isRouteParamValid(routeParams.albumId) || this.urlHelperService.isRouteParamValid(routeParams.trackId))) {
                if (isRequestingAlbum) {
                    this.fetchAsync(`Album/Album?albumId=${routeParams.albumId}`);
                }
                else {
                    this.fetchAsync(`Track/Track?trackId=${routeParams.trackId}`);
                }
            }
            else {
                if (isRequestingAlbum) {
                    this.fetchAsync('Album/RandomAlbum');
                }
                else {
                    this.fetchAsync('Track/RandomTrack');
                }
            }
        }
        else {
            this.fetchAsync('Album/RandomAlbum');
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

    public async fetchAsync(url: string): Promise<void> {
        this.isLoading = true;
        this.titleService.setTitle('Shufl');

        this.albumData = this.mapReceivedDataToAlbum(
            await this.dataService.getAsync<Album>(url, Album)
        );

        if (!this.isModal) {
            this.titleService.setTitle(this.albumData.name);
        }

        this.isLoading = false;
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
            albumImages: receivedAlbumData.images,
            releaseDate: receivedAlbumData.releaseDate,
            tracks,
            artists
        };

        if (receivedGenres.length > 3) {
            this.genres = receivedGenres.splice(0, 2);
        }
        else {
            this.genres = receivedGenres;
        }

        this.albumCoverArtUrl = receivedAlbumData.images[0].url;

        return album as Album;
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

    public addClicked(): void {
        const dialogConfig = new MatDialogConfig();

        dialogConfig.disableClose = false;
        dialogConfig.autoFocus = true;
        dialogConfig.width = '90%';
        dialogConfig.maxWidth = "800px";
        dialogConfig.minHeight = '200px';
        dialogConfig.height = 'fit-content';
        dialogConfig.closeOnNavigation = true;
        

        let dialogRef = this.dialog.open(AddToGroupComponent, dialogConfig);
        let instance = dialogRef.componentInstance;
        instance.album = this.albumData;
    }

    public async addToGroupAsync(): Promise<void> {
        if (!this.addingAlbumToGroup) {
            try {
                this.addingAlbumToGroup = true;

                var newGroupSuggestion = new GroupSuggestion(
                    this.groupId,
                    this.albumData.id,
                    true
                );

                var groupSuggestionIdentifier = await this.dataService.postWithStringResponseAsync('GroupSuggestion/Create', newGroupSuggestion);

                this.dialogRef.close();
                this.router.navigate([`/group/${this.groupId}/${groupSuggestionIdentifier}`]);

                this.addedAlbumToGroupSuccessfully = true;
            }
            catch (err) {
                this.errorVisible = true;
            }
            finally {
                this.addingAlbumToGroup = false;
            }
        }
    }
}
