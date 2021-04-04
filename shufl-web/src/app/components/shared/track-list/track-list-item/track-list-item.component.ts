import { Component, Input, OnInit } from '@angular/core';
import { TrackDownloadModel } from "src/app/models/download-models/track.model";

@Component({
    selector: '[app-track-list-item]',
    templateUrl: './track-list-item.component.html',
    styleUrls: ['./track-list-item.component.scss']
})
export class TrackListItemComponent implements OnInit {
    @Input() track!: TrackDownloadModel;

    constructor() { }

    ngOnInit(): void {
    }
}
