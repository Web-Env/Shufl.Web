import { Component, Input, OnInit } from '@angular/core';
import { TrackDownloadModel } from 'src/app/models/download-models/track.model';

@Component({
    selector: 'app-track-list',
    templateUrl: './track-list.component.html',
    styleUrls: ['./track-list.component.scss']
})
export class TrackListComponent implements OnInit {
    @Input() tracks!: Array<TrackDownloadModel>

    constructor() { }

    ngOnInit(): void {
    }

}
