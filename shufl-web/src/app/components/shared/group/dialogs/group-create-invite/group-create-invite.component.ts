import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DataService } from "src/app/services/data.service";
import { environment } from "src/environments/environment";

@Component({
    selector: 'app-group-create-invite',
    templateUrl: './group-create-invite.component.html',
    styleUrls: [
        './group-create-invite.component.scss',
        '../../../../../../assets/scss/form.scss'
    ]
})
export class GroupCreateInviteComponent implements OnInit {
    @ViewChild('inviteLinkInput') set content(content: ElementRef) {
        if(content) {
            this.inviteLinkInput = content;
            this.inviteLinkInput.nativeElement.value = this.inviteLink;
        }
    }
    private inviteLinkInput!: ElementRef;

    groupIdentifier!: string;

    isLoading: boolean = true;
    inviteLinkCreatedSuccessfully: boolean = false;
    inviteLink!: string;
    showClipboard: boolean = true;

    constructor(private dataService: DataService) { }

    ngOnInit(): void {
        this.createGroupInvite();
    }

    public async createGroupInvite(): Promise<void> {
        try {
            var inviteLinkIdentifier = await this.dataService.postWithoutBodyAsync(`GroupInvite/Create?groupIdentifier=${this.groupIdentifier}`);
            this.inviteLink = `${environment.environmentUrl}/groups/join/${inviteLinkIdentifier}`;

            if (this.inviteLink != null && this.inviteLink !== '') {
                this.inviteLinkCreatedSuccessfully = true;
            }
        }
        catch (err) {
            this.inviteLinkCreatedSuccessfully = false;
        }
        finally {
            this.isLoading = false;
        }
    }

    public copyInviteLink(): void {
        this.inviteLinkInput.nativeElement.disabled = false;

        this.inviteLinkInput.nativeElement.select();
        this.inviteLinkInput.nativeElement.setSelectionRange(0, this.inviteLinkInput.nativeElement.value.length);

        document.execCommand('copy');

        this.showClipboard = false;
        this.inviteLinkInput.nativeElement.disabled = true;

        window.setTimeout(() => {
            this.showClipboard = true;
        }, 5000);
    }

}
