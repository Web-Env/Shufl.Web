import { Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { Subscription } from "rxjs";
import { GroupAlbumDownloadModel } from "src/app/models/download-models/group-album.model";
import { DataService } from "src/app/services/data.service";
import { ScrollBottomService } from "src/app/services/scroll-bottom.service";

@Component({
    selector: 'app-group-album-list',
    templateUrl: './group-album-list.component.html',
    styleUrls: [
        './group-album-list.component.scss',
        '../../../../assets/scss/wide-container.scss'
    ]
})
export class GroupAlbumListComponent implements OnInit, OnDestroy {
    @Input() groupId!: string;
    @Input() isActive!: boolean;
    @Output() resized: EventEmitter<null> = new EventEmitter();
    
    @ViewChild('groupAlbumListContainer') groupSugggestionListContainer!: ElementRef;
    
    scrolledBottomSubscription!: Subscription; 

    groupAlbums!: Array<GroupAlbumDownloadModel>;
    page: number = 0;
    pageSize: number = 20;
    allPagesFetched = true;
    isLoading: boolean = true;

    constructor(private dataService: DataService,
                private scrollBottomService: ScrollBottomService) { }

    ngOnInit(): void {
        if (this.groupId != null) {
            this.getGroupAlbums(this.groupId);

            this.scrolledBottomSubscription = this.scrollBottomService.getScrolledBottomSubject().subscribe(() => {
                if (this.isActive && !this.allPagesFetched) {
                    this.page++;

                    this.getGroupAlbums(this.groupId);
                }
            });
        }
    }

    private async getGroupAlbums(groupIdentifier: string): Promise<void> {
        try {
            this.isLoading = true;

            let fetchedAlbums = await this.dataService
                .getArrayAsync<GroupAlbumDownloadModel>(`GroupAlbum/GetAll?groupIdentifier=${groupIdentifier}&page=${this.page}&pageSize=${this.pageSize}`, GroupAlbumDownloadModel);

            this.allPagesFetched = fetchedAlbums.length < this.pageSize;

            if (this.groupAlbums == null) {
                this.groupAlbums = new Array<GroupAlbumDownloadModel>();
            }

            this.groupAlbums.push.apply(this.groupAlbums, fetchedAlbums);
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
