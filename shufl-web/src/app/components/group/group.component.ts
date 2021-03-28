import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { Title } from "@angular/platform-browser";
import { ActivatedRoute, Router } from "@angular/router";
import { Group } from "src/app/models/download-models/group.model";
import { DataService } from "src/app/services/data.service";
import { UrlHelperService } from "src/app/services/helpers/url-helper.service";
import { GroupCreateInviteComponent } from "../shared/group/group-create-invite/group-create-invite.component";

@Component({
    selector: 'app-group',
    templateUrl: './group.component.html',
    styleUrls: [
        './group.component.scss',
        '../../../assets/scss/wide-container.scss'
    ]
})
export class GroupComponent implements OnInit {
    isLoading: boolean = true;
    groupId!: string;
    group!: Group;

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
        this.group = await this.dataService.getAsync<Group>(`Group/Get?groupIdentifier=${groupIdentifier}`);
        
        this.titleService.setTitle(this.group.name);
        this.isLoading = false;
    }

    public invitePeopleClicked(): void {
        const dialogConfig = new MatDialogConfig();

        dialogConfig.disableClose = false;
        dialogConfig.autoFocus = true;
        dialogConfig.width = '90%';
        dialogConfig.maxWidth = "800px";
        dialogConfig.height = '195px';
        dialogConfig.closeOnNavigation = true;
        

        this.dialog.open(GroupCreateInviteComponent, dialogConfig);
    }

}
