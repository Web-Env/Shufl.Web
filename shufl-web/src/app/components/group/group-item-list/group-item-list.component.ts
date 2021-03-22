import { Component, Input, OnInit } from '@angular/core';
import { Album } from "src/app/models/download-models/album.model";
import { Artist } from "src/app/models/download-models/artist.model";
import { Rating } from "src/app/models/download-models/rating.model";

@Component({
    selector: 'app-group-item-list',
    templateUrl: './group-item-list.component.html',
    styleUrls: ['./group-item-list.component.scss']
})
export class GroupItemListComponent implements OnInit {
    @Input() groupId!: string;

    groupItems = [
        {
            id: "aosfniouhe3obnqewfh",
            name: "In the End",
            artistName: "Nothington",
            iconUrl: "https://i.scdn.co/image/ab67616d0000b273dea3022ddc159e50d9556e5a",
            createdOn: "2021-03-20",
            album: new Album(
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
            ),
            rating: new Rating(
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
        },
        {
            id: "aksdjgpahbfs",
            name: "The Paradox",
            artistName: "Jacbo Banks",
            iconUrl: "https://i.scdn.co/image/ab67616d0000b273329dd28ebee61517486ef5fb",
            createdOn: "2021-03-21",
            album: new Album(
                "",
                "The Paradox",
                "",
                "https://i.scdn.co/image/ab67616d0000b273329dd28ebee61517486ef5fb",
                "2012-02-22",
                [
                    new Artist(
                        "0AepkoQhYvkjEzzwIcGxdV",
                        "Jacbo Banks",
                        348124,
                        "https://open.spotify.com/artist/0AepkoQhYvkjEzzwIcGxdV?si=o_vX9hUsQtCw3KZi6AW1Xw",
                        []
                    )
                ],
                []
            ),
            rating: new Rating(
                "",
                8.9,
                8.1,
                8.3,
                9.1,
                8.4,
                "",
                "",
                ""
            )
        },
        {
            id: "alasdngolksaengp",
            name: "Sufferer",
            artistName: "Sufferer",
            iconUrl: "https://i.scdn.co/image/ab67616d0000b2738f590624ff2f05dd9cfc7465",
            createdOn: "2021-03-22",
            album: new Album(
                "",
                "Sufferer",
                "",
                "https://i.scdn.co/image/ab67616d0000b2738f590624ff2f05dd9cfc7465",
                "2012-02-22",
                [
                    new Artist(
                        "353QV3QKqSrakxth2SRGOk",
                        "Sufferer",
                        19871,
                        "https://open.spotify.com/artist/353QV3QKqSrakxth2SRGOk?si=_YwFEzRbSTS4j0T0o_c1cA",
                        []
                    )
                ],
                []
            ),
            rating: new Rating(
                "",
                6.8,
                5.2,
                6.2,
                7.1,
                3.2,
                "",
                "",
                ""
            )
        }
    ];

    constructor() { }

    ngOnInit(): void {
    }

}
