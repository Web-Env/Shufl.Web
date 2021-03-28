import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";

@Component({
    selector: '[app-group-item]',
    templateUrl: './group-item.component.html',
    styleUrls: ['./group-item.component.scss']
})
export class GroupItemComponent implements OnInit {
    @Input() groupSuggestion!: any;

    constructor(private router: Router,
        private activatedRoute: ActivatedRoute) { }

    ngOnInit(): void {
    }

    groupItemClicked(): void {
        this.router.navigate([`./${this.groupSuggestion.id}`],
            { relativeTo: this.activatedRoute });
    }

}
