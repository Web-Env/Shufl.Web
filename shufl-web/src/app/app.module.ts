import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ServiceWorkerModule } from '@angular/service-worker';

import { AppRoutingModule } from './app-routing.module';

import { AlbumComponent } from './components/album/album.component';
import { AlbumIconComponent } from './components/shared/album-icon/album-icon.component';
import { AlbumInfoComponent } from './components/shared/album-info/album-info.component';
import { AppComponent } from './app.component';
import { ArtistComponent } from './components/artist/artist.component';
import { ButtonComponent } from './components/shared/buttons/button/button.component';
import { GroupComponent } from './components/group/group.component';
import { GroupItemComponent } from './components/group/group-item-list/group-item/group-item.component';
import { GroupItemDetailsComponent } from './components/group/group-item-details/group-item-details.component';
import { GroupItemListComponent } from './components/group/group-item-list/group-item-list.component';
import { GroupItemRatingComponent } from './components/shared/group-item-rating/group-item-rating.component';
import { GroupItemUserRatingComponent } from './components/group/group-item-details/group-item-user-rating-list/group-item-user-rating/group-item-user-rating.component';
import { GroupItemUserRatingListComponent } from './components/group/group-item-details/group-item-user-rating-list/group-item-user-rating-list.component';
import { GroupsListComponent } from './components/groups-list/groups-list.component';
import { GroupsListItemComponent } from './components/groups-list/groups-list-item/groups-list-item.component';
import { HomeComponent } from './components/home/home.component';
import { IconButtonComponent } from './components/shared/buttons/icon-button/icon-button.component';
import { InlineArtistsTickerComponent } from './components/shared/inline-artists-ticker/inline-artists-ticker.component';
import { LoadingButtonComponent } from './components/shared/buttons/loading-button/loading-button.component';
import { LoadingIconComponent } from './components/shared/loading-icon/loading-icon.component';
import { LoginComponent } from './components/shared/user/login/login.component';
import { NavBarComponent } from './components/shared/nav-bar/nav-bar.component';
import { NavBarItemComponent } from './components/shared/nav-bar/nav-bar-item/nav-bar-item.component';
import { NotFoundComponent } from './components/shared/not-found/not-found.component';
import { RegisterComponent } from './components/shared/user/register/register.component';
import { StatusCheckerComponent } from './components/shared/status-checker/status-checker.component';
import { TrackListComponent } from './components/shared/track-list/track-list.component';
import { TrackListItemComponent } from './components/shared/track-list/track-list-item/track-list-item.component';
import { VerifyComponent } from './components/shared/user/verify/verify.component';

import { genreFormatter } from './pipes/genreFormatter.pipe';

import { LoadingService } from "./services/loading.service";

import { environment } from '../environments/environment';
import { AuthGuardService } from "./services/auth/auth-guard.service";
import { AuthService } from "./services/auth/auth.service";
import { AccountComponent } from './components/user/account/account.component';

@NgModule({
    declarations: [
        AccountComponent,
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
        GroupsListComponent,
        GroupsListItemComponent,
        HomeComponent,
        IconButtonComponent,
        InlineArtistsTickerComponent,
        LoadingButtonComponent,
        LoadingIconComponent,
        LoginComponent,
        NavBarComponent,
        NavBarItemComponent,
        NotFoundComponent,
        RegisterComponent,
        StatusCheckerComponent,
        TrackListComponent,
        TrackListItemComponent,
        VerifyComponent,

        genreFormatter
    ],
    imports: [
        AppRoutingModule,
        BrowserModule,
        FormsModule,
        HttpClientModule,
        ReactiveFormsModule,
        ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
    ],
    providers: [
        AuthGuardService,
        AuthService,
        LoadingService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
