import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";
import { debounceTime } from 'rxjs/operators';
import { AlbumSearchResultsContainerComponent } from "./album-search-results-container/album-search-results-container.component";
import { ArtistSearchResultsContainerComponent } from "./artist-search-results-container/artist-search-results-container.component";

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: [
        './search.component.scss',
        '../../../assets/scss/wide-container.scss',
        '../../../assets/scss/user-form.scss'
    ]
})
export class SearchComponent implements OnInit {
    @ViewChild(AlbumSearchResultsContainerComponent)
    private albumSearchResultsContainerComponent!: AlbumSearchResultsContainerComponent;
    @ViewChild(ArtistSearchResultsContainerComponent)
    private artistSearchResultsContainerComponent!: ArtistSearchResultsContainerComponent;

    isLoading: boolean = false;
    
    searchActive: boolean = false;
    searchPopulated: boolean = false;

    searchForm: FormGroup = new FormGroup({});

    searchTerm!: string;

    constructor(formBuilder: FormBuilder) {
        this.searchForm = formBuilder.group({
            search: ['']
        });
    }

    ngOnInit(): void {
        this.searchForm.controls['search'].valueChanges.pipe(debounceTime(750)).subscribe((searchTerm) => {
            if (searchTerm != null && searchTerm !== '') {
                this.processSearchInput(searchTerm);
            }
        });
    }

    private async processSearchInput(searchTerm: string): Promise<void> {
        if (!this.isLoading) {
            try {
                this.searchTerm = searchTerm;

                this.isLoading = true;
                await Promise.all([
                    this.albumSearchResultsContainerComponent.searchAlbums(this.searchTerm), 
                    this.artistSearchResultsContainerComponent.searchArtists(this.searchTerm)
                ]);
            }
            catch (err) {
                throw err;
            }
            finally {
                this.isLoading = false;
            }
        }
    }

    public changeInputState(active: boolean): void {
        this.searchActive = active;
        this.searchPopulated = this.searchForm.controls['search'].value !== '';
    }

}
