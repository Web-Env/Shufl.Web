import { Component, Input, OnInit } from '@angular/core';
import { ArtistDownloadModel } from 'src/app/models/download-models/artist.model';

@Component({
    selector: '[app-inline-artists-ticker]',
    templateUrl: './inline-artists-ticker.component.html',
    styleUrls: ['./inline-artists-ticker.component.scss']
})
export class InlineArtistsTickerComponent implements OnInit {
    @Input() artists!: Array<ArtistDownloadModel>;

    constructor() { }

    ngOnInit(): void {
    }

}
