import { HttpErrorResponse } from "@angular/common/http";
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { GroupDownloadModel } from "src/app/models/download-models/group.model";
import { DataService } from "src/app/services/data.service";
import { UrlHelperService } from "src/app/services/helpers/url-helper.service";

@Component({
    selector: 'app-group-invite',
    templateUrl: './group-invite.component.html',
    styleUrls: [
        './group-invite.component.scss',
        '../../../../../assets/scss/user-form.scss'
    ]
})
export class GroupInviteComponent implements OnInit {
    inviteToken!: string;
    isValidInvite: boolean = false;
    verificationRequestSentSuccessfully: boolean = false;
    group!: GroupDownloadModel;
    acceptRequestIsLoading!: boolean;
    inviteErrorMessage!: string;
    groupsButtonVisible!: boolean;

    constructor(private route: ActivatedRoute,
                private router: Router,
                private dataService: DataService,
                private urlHelperService: UrlHelperService) { }

    ngOnInit(): void {
        var routeParams = this.route.snapshot.params;

        if (this.urlHelperService.isRouteParamObjectValid(routeParams) && 
            this.urlHelperService.isRouteParamValid(routeParams.token)) {
            this.inviteToken = routeParams.token;
            this.validateInviteTokenAsync(this.inviteToken);
        }
        else {
            this.router.navigate(['']);
        }
    }

    private async validateInviteTokenAsync(token: string): Promise<void> {
        try {
            this.group = await this.dataService.getAsync<GroupDownloadModel>(`GroupInvite/Validate?groupInviteIdentifier=${token}`, GroupDownloadModel);
            this.isValidInvite = this.group != null;
        }
        catch (err) {
            this.isValidInvite = false;

            if (err instanceof HttpErrorResponse) {
                if (err.error != null && err.error.errorType != null) {
                    if (err.error.errorType === 'UserAlreadyGroupMemberException') {
                        this.inviteErrorMessage = "You are already a member of this group";
                        this.groupsButtonVisible = true;
                    }
                    else if (err.error.errorType === 'InvalidTokenException') {
                        this.inviteErrorMessage = err.error.errorMessage;
                    }
                }
            }
        }
        finally {
            this.verificationRequestSentSuccessfully = true;
        }
    }

    public async acceptInvitationAsync(): Promise<void> {
        try {
            this.acceptRequestIsLoading = true;
            await this.dataService.postWithoutBodyOrResponseAsync(`GroupInvite/Join?groupInviteIdentifier=${this.inviteToken}`);
            this.router.navigate([`/group/${this.group.identifier}`]);
        }
        catch (err) {
            console.log (err);
            this.inviteErrorMessage = "There has been an error joining this group, please try again";
            this.isValidInvite = false;
        }
        finally {
            this.acceptRequestIsLoading = false;
        }
    }

    public declineInvitation(): void {
        this.redirectToGroups();
    }

    public redirectToGroups(): void {
        this.router.navigate([`/groups`]);
    }

}
