import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from "@angular/material/dialog";
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';

import { AppRoutingModule } from './app-routing.module';

import { AccountComponent } from './components/user/account/account.component';
import { AlbumComponent } from './components/album/album.component';
import { AlbumIconComponent } from './components/shared/album-icon/album-icon.component';
import { AlbumInfoComponent } from './components/shared/album-info/album-info.component';
import { AppComponent } from './app.component';
import { ArtistComponent } from './components/artist/artist.component';
import { ButtonComponent } from './components/shared/buttons/button/button.component';
import { CardNavBarComponent } from './components/shared/navigation/card-nav-bar/card-nav-bar.component';
import { GroupComponent } from './components/group/group.component';
import { GroupCreateComponent } from './components/shared/group/dialogs/group-create/group-create.component';
import { GroupAddAlbumComponent } from './components/shared/group/dialogs/group-add-album/group-add-album.component';
import { GroupCreateInviteComponent } from './components/shared/group/dialogs/group-create-invite/group-create-invite.component';
import { GroupInviteComponent } from './components/shared/group/group-invite/group-invite.component';
import { GroupsListComponent } from './components/groups-list/groups-list.component';
import { GroupsListItemComponent } from './components/groups-list/groups-list-item/groups-list-item.component';
import { GroupSuggestionComponent } from './components/group/group-suggestion-list/group-suggestion/group-suggestion.component';
import { GroupSuggestionDetailsComponent } from './components/group/group-suggestion-details/group-suggestion-details.component';
import { GroupSuggestionListComponent } from './components/group/group-suggestion-list/group-suggestion-list.component';
import { GroupSuggestionRatingComponent } from './components/shared/group/group-suggestion-rating/group-suggestion-rating.component';
import { GroupSuggestionUserRatingComponent } from './components/group/group-suggestion-details/group-suggestion-user-rating-list/group-suggestion-user-rating/group-suggestion-user-rating.component';
import { GroupSuggestionUserRatingListComponent } from './components/group/group-suggestion-details/group-suggestion-user-rating-list/group-suggestion-user-rating-list.component';
import { HomeComponent } from './components/home/home.component';
import { IconButtonComponent } from './components/shared/buttons/icon-button/icon-button.component';
import { InlineArtistsTickerComponent } from './components/shared/inline-artists-ticker/inline-artists-ticker.component';
import { LoadingButtonComponent } from './components/shared/buttons/loading-button/loading-button.component';
import { LoadingIconComponent } from './components/shared/loading-icon/loading-icon.component';
import { LoginComponent } from './components/shared/user/login/login.component';
import { NavBarComponent } from './components/shared/navigation/nav-bar/nav-bar.component';
import { NavBarItemComponent } from './components/shared/navigation/nav-bar/nav-bar-item/nav-bar-item.component';
import { NotFoundComponent } from './components/shared/not-found/not-found.component';
import { PasswordResetComponent } from './components/shared/user/password-reset/password-reset.component';
import { RegisterComponent } from './components/shared/user/register/register.component';
import { StatusCheckerComponent } from './components/shared/status-checker/status-checker.component';
import { TrackListComponent } from './components/shared/track-list/track-list.component';
import { TrackListItemComponent } from './components/shared/track-list/track-list-item/track-list-item.component';
import { UserIconComponent } from "./components/shared/user/user-icon/user-icon.component";
import { VerifyComponent } from './components/shared/user/verify/verify.component';

import { genreFormatter } from './pipes/genreFormatter.pipe';

import { environment } from '../environments/environment';
import { AuthGuardService } from "./services/auth/auth-guard.service";
import { AuthService } from "./services/auth/auth.service";
import { UrlHelperService } from "./services/helpers/url-helper.service";
import { GroupSuggestionRateComponent } from './components/shared/group/dialogs/group-suggestion-rate/group-suggestion-rate.component';

@NgModule({
    declarations: [
        AccountComponent,
        AlbumComponent,
        AlbumIconComponent,
        AlbumInfoComponent,
        AppComponent,
        ArtistComponent,
        ButtonComponent,
        CardNavBarComponent,
        GroupComponent,
        GroupAddAlbumComponent,
        GroupCreateInviteComponent,
        GroupInviteComponent,
        GroupSuggestionComponent,
        GroupSuggestionDetailsComponent,
        GroupSuggestionListComponent,
        GroupSuggestionRatingComponent,
        GroupSuggestionUserRatingComponent,
        GroupSuggestionUserRatingListComponent,
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
        PasswordResetComponent,
        RegisterComponent,
        StatusCheckerComponent,
        TrackListComponent,
        TrackListItemComponent,
        UserIconComponent,
        VerifyComponent,

        genreFormatter,

        GroupCreateComponent,

        GroupSuggestionRateComponent
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
    providers: [
        AuthGuardService,
        AuthService,
        UrlHelperService,
        {
            provide: MatDialogRef,
            useValue: {}
        }
    ],
    bootstrap: [AppComponent],
    entryComponents: [
        GroupAddAlbumComponent,
        GroupCreateInviteComponent
    ]
})
export class AppModule { }
