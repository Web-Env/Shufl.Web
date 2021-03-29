import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from "@angular/material/dialog";
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';

import { AppRoutingModule } from './app-routing.module';

import * as components from './components';
import * as services from './services';
import * as pipes from './pipes';

import { environment } from '../environments/environment';

@NgModule({
    declarations: [
       ...components,
        ...pipes
    ],
    imports: [
        AppRoutingModule,
        BrowserAnimationsModule,
        BrowserModule,
        FormsModule,
        HttpClientModule,
        MatDialogModule,
        ReactiveFormsModule,
        ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
    ],
    providers: [ ...services ],
    bootstrap: [AppComponent],
    entryComponents: [
        components.GroupAddAlbumComponent,
        components.GroupCreateInviteComponent
    ]
})
export class AppModule { }
