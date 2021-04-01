import { Component, Input, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { Album } from 'src/app/models/download-models/album.model';

@Component({
    selector: '[app-album-icon]',
    templateUrl: './album-icon.component.html',
    styleUrls: ['./album-icon.component.scss']
})
export class AlbumIconComponent implements OnInit {
    @Input() album!: Album;
    @Input() enabled: boolean = true;

    constructor(private router: Router) { }

    ngOnInit(): void { }

    public albumIconClicked(): void {
        if (this.enabled) {
            this.router.navigate([`album/${this.album.id}`]);
        }
    } 

}
