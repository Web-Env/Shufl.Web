import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-loading-icon',
    templateUrl: './loading-icon.component.html',
    styleUrls: ['./loading-icon.component.scss']
})
export class LoadingIconComponent implements OnInit {
    @Input() dimensions!: number;

    constructor() { }

    ngOnInit(): void {
        if (this.dimensions == null) {
            this.dimensions = 200;
        }
    }
}
