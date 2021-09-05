import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from "@angular/material/dialog";
import { Title } from "@angular/platform-browser";
import { ActivatedRoute, Router } from '@angular/router';
import { ArtistConsts } from 'src/app/consts/artist.consts';

import { AlbumDownloadModel } from 'src/app/models/download-models/album.model';
import { GroupAlbumUploadModel } from "src/app/models/upload-models/group-album.model";
import { DataService } from 'src/app/services/data.service';
import { UrlHelperService } from "src/app/services/helpers/url-helper.service";
import { AddAlbumToGroupComponent } from "../shared/group/dialogs/add-album-to-group/add-album-to-group.component";
import { AuthService } from "src/app/services/auth/auth.service";
import { ArtistGenreDownloadModel } from "src/app/models/download-models/artist-genre.model";

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
    isRandom: boolean = false;
    isModal: boolean = false;
    groupIdentifier!: string;
    VARIOUS_ARTISTS_CONST = ArtistConsts.variousArtistsConst;
    genres: ArtistGenreDownloadModel[] = [];
    album!: AlbumDownloadModel;
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

        if (!this.isModal && this.groupIdentifier == null) {
            var routeParams = this.route.snapshot.params;
            var isRequestingAlbum = this.isRequestingAlbum(this.router.url);

            if (this.urlHelperService.isRouteParamObjectValid(routeParams) && (this.urlHelperService.isRouteParamValid(routeParams.albumId) || this.urlHelperService.isRouteParamValid(routeParams.trackId))) {
                this.isRandom = false;
                
                if (isRequestingAlbum) {
                    this.fetchAsync(`Album/Album?albumId=${routeParams.albumId}`);
                }
                else {
                    this.fetchAsync(`Track/Track?trackId=${routeParams.trackId}`);
                }
            }
            else {
                this.isRandom = true;

                if (isRequestingAlbum) {
                    this.fetchAsync('Album/RandomAlbum');
                }
                else {
                    this.fetchAsync('Track/RandomTrack');
                }
            }
        }
        else {
            this.isRandom = true;

            this.fetchAsync('Album/RandomGroupAlbum');
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
        try {
            this.isLoading = true;
            this.titleService.setTitle('Shufl');

            this.album = await this.dataService.getAsync<AlbumDownloadModel>(url, AlbumDownloadModel);
            this.genres = this.album.artists[0].artistGenres;

            if (this.genres.length > 3) {
                this.genres = this.genres.splice(0, 3);
            }

            if (!this.isModal) {
                this.titleService.setTitle(this.album.name);
            }
        }
        catch (err) {
            throw err;
        }
        finally {
            this.isLoading = false;
        }
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
        

        let dialogRef = this.dialog.open(AddAlbumToGroupComponent, dialogConfig);
        let instance = dialogRef.componentInstance;
        instance.album = this.album;
        instance.isRandom = this.isRandom;
    }

    public async addToGroupAsync(): Promise<void> {
        if (!this.addingAlbumToGroup) {
            try {
                this.addingAlbumToGroup = true;

                var newGroupAlbum = new GroupAlbumUploadModel(
                    this.groupIdentifier,
                    this.album.id,
                    true
                );

                var groupAlbumIdentifier = await this.dataService.postWithStringResponseAsync('GroupAlbum/Create', newGroupAlbum);

                this.dialogRef.close();
                this.router.navigate([`/group/${this.groupIdentifier}/a/${groupAlbumIdentifier}`]);

                this.addedAlbumToGroupSuccessfully = true;
            }
            catch (err) {
                this.errorVisible = true;
                throw err;
            }
            finally {
                this.addingAlbumToGroup = false;
            }
        }
    }

    public navigateToSearch(): void {
        this.dialogRef.close();
        this.router.navigate(['/search']);
    }
}
