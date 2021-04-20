import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { ScrollBottomService } from "./services/scroll-bottom.service";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
    @ViewChild('stage') stage!: ElementRef;

    title = 'Shufl';

    scrolledToBottom: boolean = false;

    constructor(private scrollBottomService: ScrollBottomService) { }

    ngAfterViewInit(): void {
        this.stage.nativeElement.addEventListener('scroll', this.processScrollChange, true);
    }

    public processScrollChange = () => {
        var scrollHeight = this.stage.nativeElement.scrollHeight - this.stage.nativeElement.offsetHeight;

        if (this.stage.nativeElement.scrollTop === scrollHeight) {
            if (!this.scrolledToBottom) {
                this.scrollBottomService.sendScrolledBottom();

                this.scrolledToBottom = true;
            }
        }
        else {
            this.scrolledToBottom = false;
        }
    }
}
