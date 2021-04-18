import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from "@angular/router";

@Component({
    selector: 'app-card-nav-bar',
    templateUrl: './card-nav-bar.component.html',
    styleUrls: ['./card-nav-bar.component.scss']
})
export class CardNavBarComponent implements OnInit {
    @Input() closeVisible: boolean = false;
    @Input() inviteVisible: boolean = false;
    @Input() addVisible: boolean = false;
    @Input() queueVisible: boolean = false;

    @Output() inviteClicked: EventEmitter<null> = new EventEmitter();
    @Output() addClicked: EventEmitter<null> = new EventEmitter();
    @Output() queueClicked: EventEmitter<null> = new EventEmitter();

    constructor(private router: Router) { }

    ngOnInit(): void {
    }

    public navigateBack(): void {
        window.history.back();
    }

    public closeCard(): void {
        this.router.navigate(['']);
    }

    public inviteButtonClicked(): void {
        this.inviteClicked.emit();
    }

    public addButtonClicked(): void {
        this.addClicked.emit();
    }

    public queueButtonClicked(): void {
        this.queueClicked.emit();
    }

}
