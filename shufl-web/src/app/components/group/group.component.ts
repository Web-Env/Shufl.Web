import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { Title } from "@angular/platform-browser";
import { ActivatedRoute, Router } from "@angular/router";
import { GroupPlaylistDownloadModel } from "src/app/models/download-models/group-playlist.model";
import { GroupDownloadModel } from "src/app/models/download-models/group.model";
import { DataService } from "src/app/services/data.service";
import { UrlHelperService } from "src/app/services/helpers/url-helper.service";
import { AlbumComponent } from "../album/album.component";
import { AddPlaylistToGroupComponent } from "../shared/group/dialogs/add-playlist-to-group/add-playlist-to-group.component";
import { GroupCreateInviteComponent } from "../shared/group/dialogs/group-create-invite/group-create-invite.component";
import { GroupMembersComponent } from "../shared/group/dialogs/group-members/group-members.component";
import { GroupPlaylistListComponent } from "./group-playlist-list/group-playlist-list.component";
import { GroupSuggestionListComponent } from "./group-suggestion-list/group-suggestion-list.component";

@Component({
    selector: 'app-group',
    templateUrl: './group.component.html',
    styleUrls: [
        './group.component.scss',
        '../../../assets/scss/wide-container.scss'
    ]
})
export class GroupComponent implements OnInit {
    @ViewChild(GroupSuggestionListComponent)
    private groupSuggestionListComponent!: GroupSuggestionListComponent;
    @ViewChild(GroupPlaylistListComponent)
    private groupPlaylistListComponent!: GroupPlaylistListComponent;
    
    isLoading: boolean = true;
    currentIndex: number = 0;
    primaryButtonText: string = 'Add a New Album';
    stageHeight!: number;
    
    groupId!: string;
    group!: GroupDownloadModel;

    constructor(private route: ActivatedRoute,
                private router: Router,
                private titleService: Title,
                private dialog: MatDialog,
                private urlHelperService: UrlHelperService,
                private dataService: DataService) { }

    ngOnInit(): void {
        var routeParams = this.route.snapshot.params;

        if (this.urlHelperService.isRouteParamObjectValid(routeParams) && 
            this.urlHelperService.isRouteParamValid(routeParams.groupId)) {
            this.groupId = routeParams.groupId;
            this.getGroupInfoAsync(this.groupId);
        }
        else {
            this.router.navigate(['']);
        }
    }

    private async getGroupInfoAsync(groupIdentifier: string): Promise<void> {
        try {
            this.group = await this.dataService.getAsync<GroupDownloadModel>(`Group/Get?groupIdentifier=${groupIdentifier}`, GroupDownloadModel);
            
            this.titleService.setTitle(this.group.name);
        }
        catch (err) {
            throw err;
        }
        finally {
            this.isLoading = false;
        }
    }

    public tabClicked(index: number): void {
        if (index === 0 && this.currentIndex !== 0) {
            this.currentIndex = 0;
            this.primaryButtonText = 'Add a New Album';
            this.stageHeight = this.groupSuggestionListComponent.groupSugggestionListContainer.nativeElement.offsetHeight;
        }
        else if (index === 1 && this.currentIndex !== 1) {
            this.currentIndex = 1;
            this.primaryButtonText = 'Add a Playlist';
            this.stageHeight = this.groupPlaylistListComponent.groupPlaylistListContainer.nativeElement.offsetHeight;
        }
    }

    public listResized(index: number): void {
        if (index === 0 && this.currentIndex === 0) {
            this.stageHeight = this.groupSuggestionListComponent.groupSugggestionListContainer.nativeElement.offsetHeight;
        }
        else if (index === 1 && this.currentIndex === 1) {
            this.stageHeight = this.groupPlaylistListComponent.groupPlaylistListContainer.nativeElement.offsetHeight;
        }
    }

    public invitePeopleClicked(): void {
        const dialogConfig = new MatDialogConfig();

        dialogConfig.disableClose = false;
        dialogConfig.autoFocus = true;
        dialogConfig.width = '90%';
        dialogConfig.maxWidth = "800px";
        dialogConfig.minHeight = '100px';
        dialogConfig.height = 'fit-content';
        dialogConfig.closeOnNavigation = true;
        

        let dialogRef = this.dialog.open(GroupCreateInviteComponent, dialogConfig);
        let instance = dialogRef.componentInstance;
        instance.groupIdentifier = this.groupId;
    }

    public viewGroupMembers(): void {
        const dialogConfig = new MatDialogConfig();

        dialogConfig.disableClose = false;
        dialogConfig.autoFocus = true;
        dialogConfig.width = '90%';
        dialogConfig.maxWidth = "800px";
        dialogConfig.minHeight = '100px';
        dialogConfig.height = 'fit-content';
        dialogConfig.closeOnNavigation = true;
        

        let dialogRef = this.dialog.open(GroupMembersComponent, dialogConfig);
        let instance = dialogRef.componentInstance;
        instance.group = this.group;
    }

    public addToGroupClicked(): void {
        if (this.currentIndex === 0) {
            this.addNewAlbumClicked();
        }
        else if (this.currentIndex === 1) {
            this.addPlaylistClicked();
        }
    }

    public addNewAlbumClicked(): void {
        const dialogConfig = new MatDialogConfig();

        dialogConfig.disableClose = false;
        dialogConfig.autoFocus = true;
        dialogConfig.width = '90%';
        dialogConfig.maxWidth = "800px";
        dialogConfig.minHeight = '100px';
        dialogConfig.height = 'fit-content';
        dialogConfig.closeOnNavigation = true;
        

        let dialogRef = this.dialog.open(AlbumComponent, dialogConfig);
        let instance = dialogRef.componentInstance;
        instance.isModal = true;
        instance.groupIdentifier = this.groupId;
    }

    public addPlaylistClicked(): void {
        const dialogConfig = new MatDialogConfig();

        dialogConfig.disableClose = false;
        dialogConfig.autoFocus = true;
        dialogConfig.width = '90%';
        dialogConfig.maxWidth = "800px";
        dialogConfig.minHeight = '100px';
        dialogConfig.height = 'fit-content';
        dialogConfig.closeOnNavigation = true;
        

        let dialogRef = this.dialog.open(AddPlaylistToGroupComponent, dialogConfig);
        let instance = dialogRef.componentInstance;
        instance.groupIdentifier = this.groupId;
    }

}
