import { HttpErrorResponse } from "@angular/common/http";
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { AlbumDownloadModel } from "src/app/models/download-models/album.model";
import { GroupDownloadModel } from "src/app/models/download-models/group.model";
import { GroupAlbumUploadModel } from "src/app/models/upload-models/group-album.model";
import { DataService } from "src/app/services/data.service";

@Component({
    selector: 'app-add-album-to-group',
    templateUrl: './add-album-to-group.component.html',
    styleUrls: ['./add-album-to-group.component.scss']
})
export class AddAlbumToGroupComponent implements OnInit {
    isLoading: boolean = true;
    isRandom: boolean = false;
    isQueueLoading: boolean = false;
    album!: AlbumDownloadModel;
    spotifyUsername!: string | null;
    groups!: Array<GroupDownloadModel>;

    constructor(private dialogRef: MatDialogRef<AddAlbumToGroupComponent>,
                private router: Router,
                private toastr: ToastrService,
                private dataService: DataService) { }

    ngOnInit(): void {
        this.spotifyUsername = localStorage.getItem('SpotifyUsername');

        this.getUsersGroupsAsync();
    }

    private async getUsersGroupsAsync(): Promise<void> {
        try {
            this.isLoading = true;
            this.groups = await this.dataService.getArrayAsync<GroupDownloadModel>('Group/GetAll', GroupDownloadModel);
        }
        catch (err) {
            throw err;
        }
        finally {
            this.isLoading = false;
        }
    }

    public async addToQueueAsync(): Promise<void> {
        try {
            this.isQueueLoading = true;

            await this.dataService.postWithoutBodyOrResponseAsync(`Spotify/QueueAlbum?albumId=${this.album.id}`, true);

            this.toastr.success(`${this.album.name} has been added to your queue`, 'Added to Queue');
        }
        catch (err) {
            if (err instanceof HttpErrorResponse) {
                if (err.status === 400) {
                    if (err.error.errorType != null && err.error.errorType === 'SpotifyNoActiveDevicesException') {
                        this.toastr.clear();
                        this.toastr.warning('There are no active devices to add this album to the queue', 'Error Queueing Album');
                    }
                    else {
                        this.dataService.handleError(err);
                    }
                }
                else {
                    this.dataService.handleError(err);
                }
            }

            throw err;
        }
        finally {
            this.isQueueLoading = false;
        }
    }

    public async addToGroupClickedAsync(groupIdentifier: string): Promise<void> {
        try {
            this.isLoading = true;

            var newGroupAlbum = new GroupAlbumUploadModel(
                groupIdentifier,
                this.album.id,
                this.isRandom
            );

            var groupAlbumIdentifier = await this.dataService.postWithStringResponseAsync('GroupAlbum/Create', newGroupAlbum);

            if (groupAlbumIdentifier != null && groupAlbumIdentifier !== '') {
                this.dialogRef.close();
                this.router.navigate([`/group/${groupIdentifier}/a/${groupAlbumIdentifier}`]);
            }
        }
        catch (err) {
            throw err;
        }
        finally {
            this.isLoading = false;
        }
    }

}
