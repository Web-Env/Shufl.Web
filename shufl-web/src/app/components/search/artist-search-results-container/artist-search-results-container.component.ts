import { Component, OnInit } from '@angular/core';
import { ArtistDownloadModel } from "src/app/models/download-models/artist.model";
import { DataService } from "src/app/services/data.service";

@Component({
    selector: 'app-artist-search-results-container',
    templateUrl: './artist-search-results-container.component.html',
    styleUrls: ['./artist-search-results-container.component.scss']
})
export class ArtistSearchResultsContainerComponent implements OnInit {
    isLoading: boolean = false;
    hasSearched: boolean = false;
    noResults: boolean = false;

    artists: ArtistDownloadModel[] = [];

    constructor(private dataService: DataService) { }

    ngOnInit(): void {
    }

    public async searchArtists(name: string): Promise<void> {
        this.isLoading = true;

        this.artists = await this.dataService.getArrayAsync<ArtistDownloadModel>(`Artist/Search?name=${name}`, ArtistDownloadModel);

        this.hasSearched = true;
        this.noResults = this.artists.length === 0;
        
        this.isLoading = false;
    }

}
