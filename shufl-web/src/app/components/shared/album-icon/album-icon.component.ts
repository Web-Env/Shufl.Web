import { Component, Input, OnInit } from '@angular/core';
import { Album } from 'src/app/models/download-models/album.model';

@Component({
    selector: '[app-album-icon]',
    templateUrl: './album-icon.component.html',
    styleUrls: ['./album-icon.component.scss']
})
export class AlbumIconComponent implements OnInit {
    @Input() album!: Album

    constructor() { }

    ngOnInit(): void { }
}
