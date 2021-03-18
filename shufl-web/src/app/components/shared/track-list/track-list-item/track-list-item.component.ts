import { Component, Input, OnInit } from '@angular/core';
import { Artist } from 'src/app/models/download-models/artist.model';

@Component({
    selector: '[app-track-list-item]',
    templateUrl: './track-list-item.component.html',
    styleUrls: ['./track-list-item.component.scss']
})
export class TrackListItemComponent implements OnInit {
    @Input() trackNumber!: number;
    @Input() trackName!: string;
    @Input() trackArtists!: Array<Artist>;
    @Input() trackDuration!: number;
    @Input() trackUrl!: string

    constructor() { }

    ngOnInit(): void {
    }
}
