import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";

@Component({
    selector: '[app-group-suggestion]',
    templateUrl: './group-suggestion.component.html',
    styleUrls: ['./group-suggestion.component.scss']
})
export class GroupSuggestionComponent implements OnInit {
    @Input() groupSuggestion!: any;

    constructor(private router: Router,
        private activatedRoute: ActivatedRoute) { }

    ngOnInit(): void {
    }

    groupSuggestionClicked(): void {
        this.router.navigate([`./${this.groupSuggestion.id}`],
            { relativeTo: this.activatedRoute });
    }

}
