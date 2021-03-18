import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

    constructor(private router: Router,
                private titleService: Title) { }

    ngOnInit(): void {
        this.titleService.setTitle('Shufl');
    }

    public buttonClick(buttonPath: string) {
        this.router.navigate([`${buttonPath}`]);
    }
}
