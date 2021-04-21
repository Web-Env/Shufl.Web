import { Component, Input, OnInit } from '@angular/core';
import { UserDownloadModel } from "src/app/models/download-models/user.model";

@Component({
    selector: 'app-user-icon',
    templateUrl: './user-icon.component.html',
    styleUrls: ['./user-icon.component.scss']
})
export class UserIconComponent implements OnInit {
    @Input() user!: UserDownloadModel;
    @Input() enabled: boolean = true;

    constructor() { }

    ngOnInit(): void {
    }

}
