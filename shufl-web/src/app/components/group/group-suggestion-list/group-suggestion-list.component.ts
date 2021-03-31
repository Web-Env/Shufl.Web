import { Component, Input, OnInit } from '@angular/core';
import { GroupSuggestion } from "src/app/models/download-models/group-suggestion.model";
import { DataService } from "src/app/services/data.service";

@Component({
    selector: 'app-group-suggestion-list',
    templateUrl: './group-suggestion-list.component.html',
    styleUrls: ['./group-suggestion-list.component.scss']
})
export class GroupSuggestionListComponent implements OnInit {
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
        try {
            this.groupSuggestions = await this.dataService.getArrayAsync<GroupSuggestion>(`GroupSuggestion/GetAll?groupIdentifier=${groupIdentifier}`, GroupSuggestion);
        }
        catch (err) {
            console.log(err);
        }
        finally {
            this.isLoading = false;
        }
    }

}
