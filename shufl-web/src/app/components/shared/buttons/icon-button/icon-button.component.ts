import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-icon-button',
    templateUrl: './icon-button.component.html',
    styleUrls: ['./icon-button.component.scss']
})
export class IconButtonComponent implements OnInit {
    @Input() buttonText!: string;
    @Input() buttonIconSource!: string;
    @Input() height: number = 75;

    constructor() { }

    ngOnInit(): void {
    }

}
