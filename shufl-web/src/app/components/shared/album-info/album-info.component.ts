import { Component, Input, OnInit } from '@angular/core';
import { ArtistConsts } from "src/app/consts/artist.consts";
import { Album } from "src/app/models/download-models/album.model";

@Component({
    selector: 'app-album-info',
    templateUrl: './album-info.component.html',
    styleUrls: [
        './album-info.component.scss',
        '../../../../assets/scss/music-details.scss'
    ]
})
export class AlbumInfoComponent implements OnInit {
    @Input() album!: any;
    @Input() genres!: string[];
    @Input() linkDisabled!: boolean;

    albumCoverUrl!: string;
    VARIOUS_ARTISTS_CONST = ArtistConsts.variousArtistsConst;

    constructor() { }

    ngOnInit(): void {
    }

}
