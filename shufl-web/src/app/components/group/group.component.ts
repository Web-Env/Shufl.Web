import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-group',
    templateUrl: './group.component.html',
    styleUrls: [
        './group.component.scss',
        '../../../assets/scss/wide-container.scss'
    ]
})
export class GroupComponent implements OnInit {
    dataLoaded: boolean = false;
    groupData: any = {
        id: "12rf123t",
        groupName: "The Culture Smorgasbord",
        createdBy: {
            name: "Adam BOD",
            username: "Adam_BOD"
        },
        members: 7
    };

    constructor() { }

    ngOnInit(): void {
        this.dataLoaded = true;
    }

}
