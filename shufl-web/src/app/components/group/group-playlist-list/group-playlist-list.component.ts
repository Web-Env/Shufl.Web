import { Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { Subscription } from "rxjs";
import { GroupPlaylistDownloadModel } from "src/app/models/download-models/group-playlist.model";
import { DataService } from "src/app/services/data.service";
import { ScrollBottomService } from "src/app/services/scroll-bottom.service";

@Component({
    selector: 'app-group-playlist-list',
    templateUrl: './group-playlist-list.component.html',
    styleUrls: ['./group-playlist-list.component.scss']
})
export class GroupPlaylistListComponent implements OnInit, OnDestroy {
    @Input() groupId!: string;
    @Input() isActive!: boolean;
    @Output() resized: EventEmitter<null> = new EventEmitter();

    @ViewChild('playlistListContainer') groupPlaylistListContainer!: ElementRef;

    isLoading: boolean = true;
    groupPlaylists!: Array<GroupPlaylistDownloadModel>
    page: number = 0;
    pageSize: number = 20;
    allPagesFetched = true;
    
    scrolledBottomSubscription!: Subscription; 

    constructor(private dataService: DataService,
                private scrollBottomService: ScrollBottomService) { }

    ngOnInit(): void {
        if (this.groupId != null) {
            this.getGroupPlaylists(this.groupId);

            this.scrolledBottomSubscription = this.scrollBottomService.getScrolledBottomSubject().subscribe(() => {
                if (this.isActive && !this.allPagesFetched) {
                    this.page++;

                    this.getGroupPlaylists(this.groupId);
                }
            });
        }
    }

    public async getGroupPlaylists(groupIdentifier: string): Promise<void> {
        try {
            this.isLoading = true;

            let fetchedPlaylists = await this.dataService
                .getArrayAsync<GroupPlaylistDownloadModel>(`GroupPlaylist/GetAll?groupIdentifier=${groupIdentifier}&page=${this.page}&pageSize=${this.pageSize}`, GroupPlaylistDownloadModel);

            this.allPagesFetched = fetchedPlaylists.length < this.pageSize;

            if (this.groupPlaylists == null) {
                this.groupPlaylists = new Array<GroupPlaylistDownloadModel>();
            }

            this.groupPlaylists.push.apply(this.groupPlaylists, fetchedPlaylists);
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
