import { Component, OnInit } from '@angular/core';
import { Album } from "src/app/models/download-models/album.model";
import { DataService } from "src/app/services/data.service";

@Component({
    selector: 'app-album-search-results-container',
    templateUrl: './album-search-results-container.component.html',
    styleUrls: ['./album-search-results-container.component.scss']
})
export class AlbumSearchResultsContainerComponent implements OnInit {
    isLoading: boolean = true;

    albums: any[] = [];

    constructor(private dataService: DataService) { }

    ngOnInit(): void {
    }

    public async searchAlbums(name: string): Promise<void> {
        var receivedAlbums = await this.dataService.getArrayAsync<String>(`Album/Search?name=${name}`, String);
        console.log (receivedAlbums);
    }

}
