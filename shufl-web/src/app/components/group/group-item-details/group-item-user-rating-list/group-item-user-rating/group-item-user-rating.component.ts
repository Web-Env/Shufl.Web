import { Component, Input, OnInit } from '@angular/core';
import { Rating } from "src/app/models/download-models/rating.model";

@Component({
    selector: 'app-group-item-user-rating',
    templateUrl: './group-item-user-rating.component.html',
    styleUrls: ['./group-item-user-rating.component.scss']
})
export class GroupItemUserRatingComponent implements OnInit {
    @Input() rating!: Rating;
    @Input() position!: string;

    constructor() { }

    ngOnInit(): void {
    }

}
