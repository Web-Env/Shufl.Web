import { EventEmitter, Injectable, Output } from "@angular/core";

@Injectable()
export class LoadingService {
    @Output() stateEvent: EventEmitter<boolean> = new EventEmitter<boolean>();

    public emitstateEvent(state: boolean) {
        this.stateEvent.emit(state);
    }
}