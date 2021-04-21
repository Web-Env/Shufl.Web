import { Component, Input, OnInit } from '@angular/core';
import { UserDownloadModel } from "src/app/models/download-models/user.model";

@Component({
    selector: 'app-group-member',
    templateUrl: './group-member.component.html',
    styleUrls: ['./group-member.component.scss']
})
export class GroupMemberComponent {
    @Input() groupMember!: UserDownloadModel;

}
