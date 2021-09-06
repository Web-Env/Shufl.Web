import { Component, Input, OnInit } from '@angular/core';
import { ArtistConsts } from "src/app/consts/artist.consts";
import { AlbumDownloadModel } from "src/app/models/download-models/album.model";
import { GroupAlbumDownloadModel } from "src/app/models/download-models/group-album.model";

@Component({
    selector: 'app-album-info',
    templateUrl: './album-info.component.html',
    styleUrls: [
        './album-info.component.scss',
        '../../../../assets/scss/music-details.scss'
    ]
})
export class AlbumInfoComponent implements OnInit {
    @Input() album!: AlbumDownloadModel;
    @Input() relatedGroupAlbum!: GroupAlbumDownloadModel;
    @Input() linkDisabled!: boolean;
    
    genres!: string[];

    albumCoverUrl!: string;
    VARIOUS_ARTISTS_CONST = ArtistConsts.variousArtistsConst;

    constructor() { }

    ngOnInit(): void {
        var artistGenres = this.album.artists[0].artistGenres.map((g: any) => g.name);

        if (artistGenres.length > 3) {
            this.genres = artistGenres.splice(0, 3);
        }
        else {
            this.genres = artistGenres;
        }
    }

}
