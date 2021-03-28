import { Component, Input, OnInit } from '@angular/core';
import { Rating } from "src/app/models/download-models/rating.model";

@Component({
    selector: 'app-group-suggestion-rating',
    templateUrl: './group-suggestion-rating.component.html',
    styleUrls: ['./group-suggestion-rating.component.scss']
})
export class GroupSuggestionRatingComponent implements OnInit {
    @Input() rating!: Rating;
    @Input() embedded: boolean = false;

    constructor() { }

    ngOnInit(): void {
    }

}
