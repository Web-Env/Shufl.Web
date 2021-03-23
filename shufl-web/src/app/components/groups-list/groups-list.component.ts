import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-groups-list',
    templateUrl: './groups-list.component.html',
    styleUrls: [
        './groups-list.component.scss',
        '../../../assets/scss/wide-container.scss'
    ]
})
export class GroupsListComponent implements OnInit {
    dataLoaded: boolean = false;
    groups: any[] = [
        {
            name: "The Culture Smorgasbord",
            id: "sdsdgoenlksvnipe3",
            createdBy: {
                name: "Adam BOD",
                username: "Adam_BOD"
            },
            members: 7
        }
    ];

    constructor() { }

    ngOnInit(): void {
        this.dataLoaded = true;
    }

}
