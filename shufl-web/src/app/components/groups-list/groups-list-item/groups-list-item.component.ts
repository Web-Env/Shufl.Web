import { Component, Input, OnInit } from '@angular/core';
import { Router } from "@angular/router";

@Component({
    selector: '[app-groups-list-item]',
    templateUrl: './groups-list-item.component.html',
    styleUrls: ['./groups-list-item.component.scss']
})
export class GroupsListItemComponent implements OnInit {
    @Input() group: any;

    constructor(private router: Router) { }

    ngOnInit(): void {
    }

    groupClicked(): void {
        this.router.navigate([`group/${this.group.id}`]);
    }

}
