import { Component, Input, OnInit } from '@angular/core';
import { MatDialogRef } from "@angular/material/dialog";

@Component({
    selector: 'app-yes-no-dialog',
    templateUrl: './yes-no-dialog.component.html',
    styleUrls: ['./yes-no-dialog.component.scss']
})
export class YesNoDialogComponent implements OnInit {
    @Input() modalMessage!: string;
    @Input() coloursInverted: boolean = false;

    constructor(private dialogRef: MatDialogRef<YesNoDialogComponent>) { }

    ngOnInit(): void {
    }

    public buttonClicked(isPositive: boolean) {
        this.dialogRef.close({isPositive});
    }

}
