import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ScrollBottomService } from "./services/scroll-bottom.service";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit, OnInit {
    @ViewChild('stage') stage!: ElementRef;

    title = 'Shufl';

    scrolledToBottom: boolean = false;
    isApp: boolean = false;

    constructor(private scrollBottomService: ScrollBottomService) { }

    ngOnInit(): void {
        let isIos = () => {
            const userAgent = window.navigator.userAgent.toLowerCase();
            return /iphone|ipad|ipod/.test(userAgent);
        };
        let isInStandaloneMode = () => ('standalone' in window.navigator) && (window.navigator['standalone']);
          
        this.isApp = isIos() && isInStandaloneMode();
    }

    ngAfterViewInit(): void {
        this.stage.nativeElement.addEventListener('scroll', this.processScrollChange, true);
    }

    public processScrollChange = () => {
        var scrollHeight = this.stage.nativeElement.scrollHeight - this.stage.nativeElement.offsetHeight;

        if (this.stage.nativeElement.scrollTop >= scrollHeight - 50) {
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
