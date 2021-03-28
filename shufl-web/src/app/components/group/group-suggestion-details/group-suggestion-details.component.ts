import { Component, OnInit } from '@angular/core';
import { Album } from "src/app/models/download-models/album.model";
import { Artist } from "src/app/models/download-models/artist.model";
import { Rating } from "src/app/models/download-models/rating.model";

@Component({
    selector: 'app-group-suggestion-details',
    templateUrl: './group-suggestion-details.component.html',
    styleUrls: [
        './group-suggestion-details.component.scss',
        '../../../../assets/scss/music-details.scss'
    ]
})
export class GroupSuggestionDetailsComponent implements OnInit {
    dataLoaded: boolean = false;

    album: Album = new Album(
        "",
        "In the End",
        "",
        "https://i.scdn.co/image/ab67616d0000b273dea3022ddc159e50d9556e5a",
        "2005-12-22",
        [
            new Artist(
                "0mTf5njyjkaAb4tpJsTQYE",
                "Nothington",
                30407,
                "https://open.spotify.com/artist/0mTf5njyjkaAb4tpJsTQYE?si=Ndnc8_9yQ3mAbry1xHWGPw",
                []
            )
        ],
        []
    );
    
    overallRating = new Rating(
        "",
        6,
        4.5,
        3.1,
        6.0,
        4.1,
        "",
        "",
        ""
    );

    ratings: Rating[] = [
        new Rating(
            "",
            4,
            4.9,
            2.8,
            5.1,
            1.6,
            "",
            "",
            ""
        )
    ];

    genres: string[] = [
        "alt-rock",
        "indie-rock"
    ];

    constructor() { }

    ngOnInit(): void {
        this.dataLoaded = true;
    }

}
