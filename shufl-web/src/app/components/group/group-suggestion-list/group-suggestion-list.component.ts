import { Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { Subscription } from "rxjs";
import { GroupSuggestionDownloadModel } from "src/app/models/download-models/group-suggestion.model";
import { DataService } from "src/app/services/data.service";
import { ScrollBottomService } from "src/app/services/scroll-bottom.service";

@Component({
    selector: 'app-group-suggestion-list',
    templateUrl: './group-suggestion-list.component.html',
    styleUrls: [
        './group-suggestion-list.component.scss',
        '../../../../assets/scss/wide-container.scss'
    ]
})
export class GroupSuggestionListComponent implements OnInit, OnDestroy {
    @Input() groupId!: string;
    @Input() isActive!: boolean;
    @Output() resized: EventEmitter<null> = new EventEmitter();
    
    @ViewChild('groupSuggestionListContainer') groupSugggestionListContainer!: ElementRef;
    
    scrolledBottomSubscription!: Subscription; 

    groupSuggestions!: Array<GroupSuggestionDownloadModel>;
    page: number = 0;
    pageSize: number = 20;
    allPagesFetched = true;
    isLoading: boolean = true;

    constructor(private dataService: DataService,
                private scrollBottomService: ScrollBottomService) { }

    ngOnInit(): void {
        if (this.groupId != null) {
            this.getGroupSuggestions(this.groupId);

            this.scrolledBottomSubscription = this.scrollBottomService.getScrolledBottomSubject().subscribe(() => {
                if (this.isActive && !this.allPagesFetched) {
                    this.page++;

                    this.getGroupSuggestions(this.groupId);
                }
            });
        }
    }

    private async getGroupSuggestions(groupIdentifier: string): Promise<void> {
        try {
            this.isLoading = true;

            let fetchedSuggestions = await this.dataService
                .getArrayAsync<GroupSuggestionDownloadModel>(`GroupSuggestion/GetAll?groupIdentifier=${groupIdentifier}&page=${this.page}&pageSize=${this.pageSize}`, GroupSuggestionDownloadModel);

            this.allPagesFetched = fetchedSuggestions.length < this.pageSize;

            if (this.groupSuggestions == null) {
                this.groupSuggestions = new Array<GroupSuggestionDownloadModel>();
            }

            this.groupSuggestions.push.apply(this.groupSuggestions, fetchedSuggestions);
        }
        catch (err) {
            throw err;
        }
        finally {
            if (this.allPagesFetched) {
                this.isLoading = false;
            }
            
            window.setTimeout(() => {
                this.resized.emit();
            }, 50);
        }
    }

    ngOnDestroy(): void {
        this.scrolledBottomSubscription.unsubscribe();
    }

}
