import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { ServiceWorkerModule } from '@angular/service-worker';

import { AppRoutingModule } from './app-routing.module';

import { AlbumComponent } from './components/album/album.component';
import { AlbumIconComponent } from './components/shared/album-icon/album-icon.component';
import { AlbumInfoComponent } from './components/shared/album-info/album-info.component';
import { AppComponent } from './app.component';
import { ArtistComponent } from './components/artist/artist.component';
import { ButtonComponent } from './components/shared/button/button.component';
import { GroupComponent } from './components/group/group.component';
import { GroupItemComponent } from './components/group/group-item-list/group-item/group-item.component';
import { GroupItemDetailsComponent } from './components/group/group-item-details/group-item-details.component';
import { GroupItemListComponent } from './components/group/group-item-list/group-item-list.component';
import { GroupItemRatingComponent } from './components/shared/group-item-rating/group-item-rating.component';
import { GroupItemUserRatingComponent } from './components/group/group-item-details/group-item-user-rating-list/group-item-user-rating/group-item-user-rating.component';
import { GroupItemUserRatingListComponent } from './components/group/group-item-details/group-item-user-rating-list/group-item-user-rating-list.component';
import { HomeComponent } from './components/home/home.component';
import { IconButtonComponent } from './components/shared/icon-button/icon-button.component';
import { InlineArtistsTickerComponent } from './components/shared/inline-artists-ticker/inline-artists-ticker.component';
import { LoadingIconComponent } from './components/shared/loading-icon/loading-icon.component';
import { NavBarComponent } from './components/shared/nav-bar/nav-bar.component';
import { NavBarItemComponent } from './components/shared/nav-bar/nav-bar-item/nav-bar-item.component';
import { NotFoundComponent } from './components/shared/not-found/not-found.component';
import { TrackListComponent } from './components/shared/track-list/track-list.component';
import { TrackListItemComponent } from './components/shared/track-list/track-list-item/track-list-item.component';

import { genreFormatter } from './pipes/genreFormatter.pipe';

import { LoadingService } from "./services/loading.service";

import { environment } from '../environments/environment';

@NgModule({
    declarations: [
        AlbumComponent,
        AlbumIconComponent,
        AlbumInfoComponent,
        AppComponent,
        ArtistComponent,
        ButtonComponent,
        GroupComponent,
        GroupItemComponent,
        GroupItemDetailsComponent,
        GroupItemListComponent,
        GroupItemRatingComponent,
        GroupItemUserRatingComponent,
        GroupItemUserRatingListComponent,
        HomeComponent,
        IconButtonComponent,
        InlineArtistsTickerComponent,
        LoadingIconComponent,
        NavBarComponent,
        NavBarItemComponent,
        NotFoundComponent,
        TrackListComponent,
        TrackListItemComponent,

        genreFormatter
    ],
    imports: [
        AppRoutingModule,
        BrowserModule,
        HttpClientModule,
        ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
    ],
    providers: [
        LoadingService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
