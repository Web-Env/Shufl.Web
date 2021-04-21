import { Component, OnInit } from '@angular/core';
import { GroupDownloadModel } from "src/app/models/download-models/group.model";
import { UserDownloadModel } from "src/app/models/download-models/user.model";

@Component({
    selector: 'app-group-members',
    templateUrl: './group-members.component.html',
    styleUrls: ['./group-members.component.scss']
})
export class GroupMembersComponent implements OnInit {
    isLoading: boolean = true;
    group!: GroupDownloadModel;
    groupMembers!: Array<UserDownloadModel>;

    constructor() { }

    ngOnInit(): void {
        this.groupMembers = this.group.members;
    }

}
