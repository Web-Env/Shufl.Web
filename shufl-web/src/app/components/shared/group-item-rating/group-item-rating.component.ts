import { Component, Input, OnInit } from '@angular/core';
import { Rating } from "src/app/models/download-models/rating.model";

@Component({
    selector: 'app-group-item-rating',
    templateUrl: './group-item-rating.component.html',
    styleUrls: ['./group-item-rating.component.scss']
})
export class GroupItemRatingComponent implements OnInit {
    @Input() rating!: Rating;
    @Input() embedded: boolean = false;

    constructor() { }

    ngOnInit(): void {
    }

}
