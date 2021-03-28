import { Component, Input, OnInit } from '@angular/core';
import { Album } from "src/app/models/download-models/album.model";
import { Artist } from "src/app/models/download-models/artist.model";
import { GroupSuggestion } from "src/app/models/download-models/group-suggestion.model";
import { Rating } from "src/app/models/download-models/rating.model";
import { DataService } from "src/app/services/data.service";

@Component({
    selector: 'app-group-item-list',
    templateUrl: './group-item-list.component.html',
    styleUrls: ['./group-item-list.component.scss']
})
export class GroupItemListComponent implements OnInit {
    @Input() groupId!: string;
    groupSuggestions!: Array<GroupSuggestion>;
    isLoading: boolean = true;

    constructor(private dataService: DataService) { }

    ngOnInit(): void {
        if (this.groupId != null) {
            this.getGroupSuggestions(this.groupId);
        }
    }

    private async getGroupSuggestions(groupIdentifier: string): Promise<void> {
        this.groupSuggestions = await this.dataService.getArrayAsync<GroupSuggestion>(`GroupSuggestion/GetAll?groupIdentifier=${groupIdentifier}`, GroupSuggestion);
    }

}
