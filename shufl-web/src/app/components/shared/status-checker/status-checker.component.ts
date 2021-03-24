import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-status-checker',
    templateUrl: './status-checker.component.html',
    styleUrls: ['./status-checker.component.scss']
})
export class StatusCheckerComponent implements OnInit {
    @Input() isHighContrast: boolean = false;
    
    isLoading: boolean = false;
    isPositive: boolean = false;
    isNegative: boolean = false;

    reservedInputs: string[] = [
        'adambod',
        'adam_bod',
        'ivanyoo',
        'munglord'
    ];

    constructor() { }

    ngOnInit(): void {
    }

    public verifyInput(input: string): boolean {
        this.isPositive = false;
        this.isNegative = false;
        this.isLoading = true;

        let inputNotAvailable: boolean = this.reservedInputs.includes(input.toLowerCase());
        inputNotAvailable ? this.isNegative = true : this.isPositive = true;

        
        this.isLoading = false;
        return !inputNotAvailable;
    }

}
