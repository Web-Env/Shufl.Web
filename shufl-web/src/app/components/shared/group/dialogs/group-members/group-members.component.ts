import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-group-members',
    templateUrl: './group-members.component.html',
    styleUrls: ['./group-members.component.scss']
})
export class GroupMembersComponent implements OnInit {
    isLoading: boolean = true;
    groupIdentifier!: string;

    constructor() { }

    ngOnInit(): void {
    }

}
