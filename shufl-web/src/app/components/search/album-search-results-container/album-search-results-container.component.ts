import { Component, OnInit } from '@angular/core';
import { Album } from "src/app/models/download-models/album.model";
import { DataService } from "src/app/services/data.service";

@Component({
    selector: 'app-album-search-results-container',
    templateUrl: './album-search-results-container.component.html',
    styleUrls: ['./album-search-results-container.component.scss']
})
export class AlbumSearchResultsContainerComponent implements OnInit {
    isLoading: boolean = false;
    noResults: boolean = false;

    albums: any[] = [];

    constructor(private dataService: DataService) { }

    ngOnInit(): void {
    }

    public async searchAlbums(name: string): Promise<void> {
        this.isLoading = true;
        this.albums = await this.dataService.getArrayAsync<Album>(`Album/Search?name=${name}`, Album);
        this.noResults = this.albums.length === 0;
        this.isLoading = false;
    }

}
