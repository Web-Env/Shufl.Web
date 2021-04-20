import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable()
export class ScrollBottomService {
    private scrolledBottom: Subject<any> = new Subject<any>();

    public getScrolledBottomSubject(): Subject<any> {
        return this.scrolledBottom;
    }

    public sendScrolledBottom(): void {
        this.scrolledBottom.next();
    }
}