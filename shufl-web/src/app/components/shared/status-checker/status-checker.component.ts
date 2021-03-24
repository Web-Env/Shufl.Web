import { Component, Input, OnInit } from '@angular/core';
import { DataService } from "src/app/services/data.service";

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

    constructor() { }

    ngOnInit(): void {
    }

    public async verifyInputAsync(input: string, verificationUrl: string, dataService: DataService): Promise<boolean> {
        this.isPositive = false;
        this.isNegative = false;
        this.isLoading = true;

        let response = await dataService.getAsync<boolean>(`${verificationUrl}${input}`);

        response ? this.setPositive() : this.setNegative();
        
        return response;
    }

    public setPositive(): void {
        this.isLoading = false;
        this.isNegative = false;
        this.isPositive = true;
    }

    public setNegative(): void {
        this.isLoading = false;
        this.isPositive = false;
        this.isNegative = true;
    }

}
