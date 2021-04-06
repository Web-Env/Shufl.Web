import { Component, Input, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { ArtistDownloadModel } from "src/app/models/download-models/artist.model";

@Component({
    selector: '[app-artist-search-result]',
    templateUrl: './artist-search-result.component.html',
    styleUrls: ['./artist-search-result.component.scss']
})
export class ArtistSearchResultComponent implements OnInit {
    @Input() artist!: ArtistDownloadModel;

    constructor(private router: Router) { }

    ngOnInit(): void { }

    public artistResultClicked(): void {
        this.router.navigate([`/artist/${this.artist.id}`]);
    }

}
