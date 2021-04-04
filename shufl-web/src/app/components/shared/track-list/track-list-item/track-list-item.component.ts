import { Component, Input, OnInit } from '@angular/core';
import { Artist } from 'src/app/models/download-models/artist.model';
import { Track } from "src/app/models/download-models/track.model";

@Component({
    selector: '[app-track-list-item]',
    templateUrl: './track-list-item.component.html',
    styleUrls: ['./track-list-item.component.scss']
})
export class TrackListItemComponent implements OnInit {
    @Input() track!: Track;

    constructor() { }

    ngOnInit(): void {
    }
}
