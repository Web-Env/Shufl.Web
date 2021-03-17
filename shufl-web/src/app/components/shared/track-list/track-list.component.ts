import { Component, Input, OnInit } from '@angular/core';
import { Track } from 'src/app/models/track.model';

@Component({
    selector: 'app-track-list',
    templateUrl: './track-list.component.html',
    styleUrls: ['./track-list.component.scss']
})
export class TrackListComponent implements OnInit {
    @Input() tracks!: Array<Track>

    constructor() { }

    ngOnInit(): void {
    }

}
