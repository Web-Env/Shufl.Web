import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { Title } from "@angular/platform-browser";
import { GroupDownloadModel } from "src/app/models/download-models/group.model";
import { DataService } from "src/app/services/data.service";
import { GroupCreateComponent } from "../shared/group/dialogs/group-create/group-create.component";

@Component({
    selector: 'app-groups-list',
    templateUrl: './groups-list.component.html',
    styleUrls: [
        './groups-list.component.scss',
        '../../../assets/scss/wide-container.scss'
    ]
})
export class GroupsListComponent implements OnInit {
    isLoading: boolean = true;
    groups!: GroupDownloadModel[];

    constructor(private titleService: Title,
                private dialog: MatDialog,
                private dataService: DataService) { }

    ngOnInit(): void {
        this.titleService.setTitle('Your Groups');
        this.getUsersGroupsAsync();
    }

    public async getUsersGroupsAsync(): Promise<void> {
        try {
            this.isLoading = true;

            this.groups = await this.dataService.getArrayAsync('Group/GetAll', GroupDownloadModel);
        }
        catch (err) {
            console.log(err);
        }
        finally {
            this.isLoading = false;
        }
    }

    public createNewGroupClicked(): void {
        const dialogConfig = new MatDialogConfig();

        dialogConfig.disableClose = false;
        dialogConfig.autoFocus = true;
        dialogConfig.width = '90%';
        dialogConfig.maxWidth = "800px";
        dialogConfig.height = 'fit-content';
        dialogConfig.closeOnNavigation = true;

        this.dialog.open(GroupCreateComponent, dialogConfig);
    }

}
