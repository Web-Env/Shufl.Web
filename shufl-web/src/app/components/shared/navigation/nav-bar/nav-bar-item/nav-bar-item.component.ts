import { Component, Input, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { NavBarItem } from "src/app/models/view-models/nav-bar-item.model";

@Component({
    selector: 'app-nav-bar-item',
    templateUrl: './nav-bar-item.component.html',
    styleUrls: ['./nav-bar-item.component.scss']
})
export class NavBarItemComponent implements OnInit {
    @Input() itemData!: NavBarItem;
    @Input() active: boolean = false;

    constructor(private router: Router) { }

    ngOnInit(): void {
    }

    itemClick(): void {
        this.router.navigate([this.itemData.url]);
    }
}
