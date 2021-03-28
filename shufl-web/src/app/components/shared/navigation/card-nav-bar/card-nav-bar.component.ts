import { Component, Input, OnInit } from '@angular/core';
import { Router } from "@angular/router";

@Component({
    selector: 'app-card-nav-bar',
    templateUrl: './card-nav-bar.component.html',
    styleUrls: ['./card-nav-bar.component.scss']
})
export class CardNavBarComponent implements OnInit {
    @Input() closeVisible: boolean = false;

    constructor(private router: Router) { }

    ngOnInit(): void {
    }

    public navigateBack(): void {
        window.history.back();
    }

    public closeCard(): void {
        this.router.navigate(['']);
    }

}
