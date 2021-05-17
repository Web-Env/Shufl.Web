import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-group-playlist-list',
    templateUrl: './group-playlist-list.component.html',
    styleUrls: ['./group-playlist-list.component.scss']
})
export class GroupPlaylistListComponent implements OnInit {
    isLoading: boolean = true;

    constructor() { }

    ngOnInit(): void {
    }

}
