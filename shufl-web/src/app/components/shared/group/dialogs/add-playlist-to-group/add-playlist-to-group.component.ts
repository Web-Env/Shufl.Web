import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { PlaylistDownloadModel } from "src/app/models/download-models/playlist.model";
import { GroupPlaylistUploadModel } from "src/app/models/upload-models/group-playlist.model";
import { DataService } from "src/app/services/data.service";

@Component({
    selector: 'app-add-playlist-to-group',
    templateUrl: './add-playlist-to-group.component.html',
    styleUrls: ['./add-playlist-to-group.component.scss']
})
export class AddPlaylistToGroupComponent implements OnInit {
    isLoading: boolean = true;

    groupIdentifier!: string;

    playlists!: Array<PlaylistDownloadModel>;

    spotifyLinkChecked: boolean = false;
    spotifyLinked: boolean = false;

    page: number = 0;
    pageSize: number = 25;
    allPagesFetched: boolean = false;

    constructor(private dialogRef: MatDialogRef<AddPlaylistToGroupComponent>,
                private router: Router,
                private dataService: DataService) { }

    ngOnInit(): void {
        var spotifyUsername = localStorage.getItem('SpotifyUsername');

        this.spotifyLinked = spotifyUsername != null;
        this.spotifyLinkChecked = true;

        if (this.spotifyLinked) {
            this.getUserPlaylists();
        }
    }

    private async getUserPlaylists(): Promise<void> {
        try {
            this.isLoading = true;

            let fetchedPlaylists = await this.dataService
                .getArrayAsync<PlaylistDownloadModel>(`Playlist/GetAll?page=${this.page}&pageSize=${this.pageSize}`, PlaylistDownloadModel);

            this.allPagesFetched = fetchedPlaylists.length < this.pageSize;

            if (this.playlists == null) {
                this.playlists = new Array<PlaylistDownloadModel>();
            }

            this.playlists.push.apply(this.playlists, fetchedPlaylists);
        }
        catch (err) {
            throw err;
        }
        finally {
            this.isLoading = false;
        }
    }

    public linkSpotifyClicked(): void {
        this.dialogRef.close();
        this.router.navigate(['/account']);
    }

    public loadMoreClicked(): void {
        this.page++;
        this.getUserPlaylists();
    }

    public async addToGroupClickedAsync(playlistIdentifier: string): Promise<void> {
        if (this.groupIdentifier != null) {
            try {
                var groupPlaylistUploadModel = new GroupPlaylistUploadModel(
                    this.groupIdentifier,
                    playlistIdentifier
                );

                var newPlaylistId = await this.dataService.postWithStringResponseAsync('GroupPlaylist/Create', groupPlaylistUploadModel);
                console.log (newPlaylistId);

                this.dialogRef.close();
            }
            catch (err) {
                throw err;
            }
        }
        
    }

}
