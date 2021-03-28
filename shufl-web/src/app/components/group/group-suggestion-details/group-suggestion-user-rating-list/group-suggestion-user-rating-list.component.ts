import { Component, OnInit } from '@angular/core';
import { Rating } from "src/app/models/download-models/rating.model";

@Component({
    selector: 'app-group-suggestion-user-rating-list',
    templateUrl: './group-suggestion-user-rating-list.component.html',
    styleUrls: ['./group-suggestion-user-rating-list.component.scss']
})
export class GroupSuggestionUserRatingListComponent implements OnInit {
    ratingsLeft: Rating[] = [];
    ratingsRight: Rating[] = [];

    ratings: Rating[] = [
        new Rating(
            "",
            7,
            6.3,
            7.2,
            4.8,
            7.4,
            " I have such strong nostalgia for this album having listened to it hundreds of times in the car growing up. I like that they took the risk to experiment with their sound so much in this album they really broke out of the pop-punk genre especially with songs like All of This, Stockholm Syndrome and Go. It's also kinda the last proper blink-182 album coz then the band fell apart so it kind of marks the end of an era.",
            "Adam_BOD",
            "Adam BOD"
        ),
        new Rating(
            "",
            8.3,
            7.5,
            6.1,
            8.0,
            8.1,
            "This music would be nostalgic for me my mam and grandparents would love it. The 50s to 60s pop and rock and roll all do blend and the album does nothing to change that, didn't really like his version of I got a woman needs more soul in it imo but it dod fit the album. Liked the album alot listening to it again without even noticing it.",
            "sean_h",
            "Sean Harrington"
        ),
        new Rating(
            "",
            6.6,
            7.5,
            7.1,
            4.0,
            5.1,
            "I think I listened through this like 3 or so times without realising. It was just good easy listening. Good chill vibes.",
            "dave_k",
            "David Killoughy"
        ),
        new Rating(
            "",
            8.0,
            7.6,
            7.1,
            8.0,
            8.1,
            "Must say I loved this one a lot, as I said that music has a special place in my heart and this just made me feel happy. Granted its simpy but all the music from that time is in the same vein of 'Wooing my special gal'. Extra point for I will follow you, the basis of a few football chants funnily enough",
            "c_dunphy",
            "Conor Dunphy"
        ),
        new Rating(
            "",
            7.5,
            7.6,
            6.9,
            8.2,
            7.4,
            "Love this type of music especially on a Monday morning, good music to do some house work to and just chill, me Grandad use to always have Ricky Nelson on repeat. Good vibes",
            "aegan",
            "Adam Egan"
        ),
        new Rating(
            "",
            7.5,
            7.6,
            6.9,
            8.2,
            7.4,
            "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. N",
            "aegan",
            "Adam Egan"
        )
    ];

    constructor() { }

    ngOnInit(): void {
        this.getDataAsync();
    }

    private async getDataAsync(): Promise<void> {
        this.splitRatings(this.ratings);
    }

    private splitRatings(ratings: Rating[]) {
        for (let i=0; i < ratings.length; i+=2) {
            this.ratingsLeft.push(ratings[i]);
            ratings[i + 1] != null && this.ratingsRight.push(ratings[i + 1]);
        }
    }
}
