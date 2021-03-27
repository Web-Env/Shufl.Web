import { Component, OnInit } from '@angular/core';
import { Group } from "src/app/models/download-models/group.model";
import { DataService } from "src/app/services/data.service";

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
    groups: Group[] = [];

    constructor(private dataService: DataService) { }

    ngOnInit(): void {
        this.getUsersGroupsAsync();
    }

    public async getUsersGroupsAsync(): Promise<void> {
        let userGroups = await this.dataService.getArrayAsync('Group/GetAll', Group);
        this.isLoading = false;
        this.groups = userGroups;
    }

    public createNewGroupClicked(): void {

    }

}
