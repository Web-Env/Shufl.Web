import { Component, Input, OnInit } from '@angular/core';
import { Rating } from "src/app/models/download-models/rating.model";

@Component({
    selector: 'app-group-suggestion-user-rating',
    templateUrl: './group-suggestion-user-rating.component.html',
    styleUrls: ['./group-suggestion-user-rating.component.scss']
})
export class GroupSuggestionUserRatingComponent implements OnInit {
    @Input() rating!: Rating;
    @Input() position!: string;

    constructor() { }

    ngOnInit(): void {
    }

}
