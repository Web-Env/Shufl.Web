import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { AlbumDownloadModel } from "src/app/models/download-models/album.model";
import { GroupDownloadModel } from "src/app/models/download-models/group.model";
import { GroupSuggestionUploadModel } from "src/app/models/upload-models/group-suggestion.model";
import { DataService } from "src/app/services/data.service";

@Component({
    selector: 'app-add-to-group',
    templateUrl: './add-to-group.component.html',
    styleUrls: ['./add-to-group.component.scss']
})
export class AddToGroupComponent implements OnInit {
    isLoading: boolean = true;
    isQueueLoading: boolean = false;
    album!: AlbumDownloadModel;
    spotifyUsername!: string | null;
    groups!: Array<GroupDownloadModel>;

    constructor(private dialogRef: MatDialogRef<AddToGroupComponent>,
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

            await this.dataService.postWithoutBodyOrResponseAsync(`Spotify/QueueAlbum?albumId=${this.album.id}`);

            this.toastr.success(`${this.album.name} has been added to your queue`, 'Added to Queue');
        }
        catch (err) {
            throw err;
        }
        finally {
            this.isQueueLoading = false;
        }
    }

    public async addToGroupClickedAsync(groupIdentifier: string): Promise<void> {
        try {
            this.isLoading = true;

            var newGroupSuggestion = new GroupSuggestionUploadModel(
                groupIdentifier,
                this.album.id,
                false
            );

            var groupSuggestionIdentifier = await this.dataService.postWithStringResponseAsync('GroupSuggestion/Create', newGroupSuggestion);

            if (groupSuggestionIdentifier != null && groupSuggestionIdentifier !== '') {
                this.dialogRef.close();
                this.router.navigate([`/group/${groupIdentifier}/${groupSuggestionIdentifier}`]);
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
