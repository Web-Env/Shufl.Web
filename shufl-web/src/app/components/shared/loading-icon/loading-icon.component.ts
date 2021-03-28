import { Component, Input, OnInit } from '@angular/core';
import { LoadingService } from "src/app/services/loading.service";

@Component({
    selector: 'app-loading-icon',
    templateUrl: './loading-icon.component.html',
    styleUrls: ['./loading-icon.component.scss']
})
export class LoadingIconComponent implements OnInit {
    @Input() isLoading: boolean = false;
    @Input() dimensions: number = 200;
    visible: boolean = false;

    constructor(private loadingService: LoadingService) { }

    ngOnInit(): void {
        this.setupLoadingServiceListener();
    }

    private setupLoadingServiceListener(): void {
        this.loadingService.stateEvent.subscribe((state) => {
            this.visible = state;
        });
    }

}
