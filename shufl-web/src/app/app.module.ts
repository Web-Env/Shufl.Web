import { ErrorHandler, Inject, Injectable, InjectionToken, isDevMode, NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from "@angular/material/dialog";
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { ToastrModule } from "ngx-toastr";

import * as Rollbar from 'rollbar';

import { AppRoutingModule } from './app-routing.module';

import { AccountComponent } from './components/user/account/account.component';
import { AddAlbumToGroupComponent } from './components/shared/group/dialogs/add-album-to-group/add-album-to-group.component';
import { AddPlaylistToGroupComponent } from './components/shared/group/dialogs/add-playlist-to-group/add-playlist-to-group.component';
import { AlbumComponent } from './components/album/album.component';
import { AlbumIconComponent } from './components/shared/album-icon/album-icon.component';
import { AlbumInfoComponent } from './components/shared/album-info/album-info.component';
import { AlbumSearchResultsContainerComponent } from './components/search/album-search-results-container/album-search-results-container.component';
import { AppComponent } from './app.component';
import { ArtistComponent } from './components/artist/artist.component';
import { ArtistSearchResultsContainerComponent } from './components/search/artist-search-results-container/artist-search-results-container.component';
import { ArtistSearchResultComponent } from './components/search/artist-search-results-container/artist-search-result/artist-search-result.component';
import { ButtonComponent } from './components/shared/buttons/button/button.component';
import { CardNavBarComponent } from './components/shared/navigation/card-nav-bar/card-nav-bar.component';
import { GroupComponent } from './components/group/group.component';
import { GroupCreateComponent } from './components/shared/group/dialogs/group-create/group-create.component';
import { GroupCreateInviteComponent } from './components/shared/group/dialogs/group-create-invite/group-create-invite.component';
import { GroupInviteComponent } from './components/shared/group/group-invite/group-invite.component';
import { GroupsListComponent } from './components/groups-list/groups-list.component';
import { GroupsListItemComponent } from './components/groups-list/groups-list-item/groups-list-item.component';
import { GroupAlbumComponent } from './components/group/group-album-list/group-album/group-album.component';
import { GroupAlbumDetailsComponent } from './components/group/group-album-details/group-album-details.component';
import { GroupAlbumListComponent } from './components/group/group-album-list/group-album-list.component';
import { GroupAlbumRateComponent } from './components/shared/group/dialogs/group-album-rate/group-album-rate.component';
import { GroupAlbumRatingComponent } from './components/shared/group/group-album-rating/group-album-rating.component';
import { GroupAlbumUserRatingComponent } from './components/group/group-album-details/group-album-user-rating-list/group-album-user-rating/group-album-user-rating.component';
import { GroupAlbumUserRatingListComponent } from './components/group/group-album-details/group-album-user-rating-list/group-album-user-rating-list.component';
import { GroupMemberComponent } from './components/shared/group/dialogs/group-members/group-member/group-member.component';
import { GroupMembersComponent } from './components/shared/group/dialogs/group-members/group-members.component';
import { GroupPlaylistComponent } from './components/group/group-playlist-list/group-playlist/group-playlist.component';
import { GroupPlaylistDetailsComponent } from './components/group/group-playlist-details/group-playlist-details.component';
import { GroupPlaylistListComponent } from './components/group/group-playlist-list/group-playlist-list.component';
import { GroupPlaylistRateComponent } from './components/shared/group/dialogs/group-playlist-rate/group-playlist-rate.component';
import { GroupPlaylistRatingComponent } from './components/shared/group/group-playlist-rating/group-playlist-rating.component';
import { GroupPlaylistUserRatingListComponent } from './components/group/group-playlist-details/group-playlist-user-rating-list/group-playlist-user-rating-list.component';
import { GroupPlaylistUserRatingComponent } from './components/group/group-playlist-details/group-playlist-user-rating-list/group-playlist-user-rating/group-playlist-user-rating.component';
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
import { SearchComponent } from './components/search/search.component';
import { SpotifyCallbackComponent } from './components/user/spotify-callback/spotify-callback.component';
import { StatusCheckerComponent } from './components/shared/status-checker/status-checker.component';
import { TrackListComponent } from './components/shared/track-list/track-list.component';
import { TrackListItemComponent } from './components/shared/track-list/track-list-item/track-list-item.component';
import { UserIconComponent } from "./components/shared/user/user-icon/user-icon.component";
import { VerifyComponent } from './components/shared/user/verify/verify.component';
import { YesNoDialogComponent } from './components/shared/dialogs/yes-no-dialog/yes-no-dialog.component';

import { genreFormatter } from './pipes/genreFormatter.pipe';

import { environment } from '../environments/environment';
import { AuthGuardService } from "./services/auth/auth-guard.service";
import { AuthService } from "./services/auth/auth.service";
import { GroupSuggestionRatingService } from "./services/group-suggestion-rating.service";
import { ScrollBottomService } from "./services/scroll-bottom.service";
import { UrlHelperService } from "./services/helpers/url-helper.service";

const rollbarEnvironment = environment.environmentUrl === 'shufl-qa.webenv.io' ? 'qa' : 'prod';

const rollbarConfig = {
    accessToken: 'a169f2008c504693b8238085f24303da',
    captureUncaught: true,
    captureUnhandledRejections: true,
    verbose: true,
    environment: rollbarEnvironment
};

export const RollbarService = new InjectionToken<Rollbar>('rollbar');

@Injectable()
export class RollbarErrorHandler implements ErrorHandler {
    constructor(@Inject(RollbarService) private rollbar: Rollbar) { }

    handleError(err: any): void {
        if (isDevMode()) {
            console.error(err.originalError || err);
        }
        else {
            this.rollbar.error(err.originalError || err);
        }
    }
}

export function rollbarFactory() {
    return new Rollbar(rollbarConfig);
}

@NgModule({
    declarations: [
        AccountComponent,
        AddAlbumToGroupComponent,
        AddPlaylistToGroupComponent,
        AlbumComponent,
        AlbumIconComponent,
        AlbumInfoComponent,
        AlbumSearchResultsContainerComponent,
        AppComponent,
        ArtistSearchResultsContainerComponent,
        ArtistSearchResultComponent,
        ArtistComponent,
        ButtonComponent,
        CardNavBarComponent,
        GroupComponent,
        GroupCreateComponent,
        GroupCreateInviteComponent,
        GroupInviteComponent,
        GroupAlbumComponent,
        GroupAlbumDetailsComponent,
        GroupAlbumListComponent,
        GroupAlbumRateComponent,
        GroupAlbumRatingComponent,
        GroupAlbumUserRatingComponent,
        GroupAlbumUserRatingListComponent,
        GroupsListComponent,
        GroupsListItemComponent,
        GroupMemberComponent,
        GroupMembersComponent,
        GroupPlaylistComponent,
        GroupPlaylistDetailsComponent,
        GroupPlaylistListComponent,
        GroupPlaylistRatingComponent,
        GroupPlaylistRateComponent,
        GroupPlaylistUserRatingComponent,
        GroupPlaylistUserRatingListComponent,
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
        SearchComponent,
        SpotifyCallbackComponent,
        StatusCheckerComponent,
        TrackListComponent,
        TrackListItemComponent,
        UserIconComponent,
        VerifyComponent,
        YesNoDialogComponent,

        genreFormatter
    ],
    imports: [
        AppRoutingModule,
        BrowserAnimationsModule,
        BrowserModule,
        FormsModule,
        HttpClientModule,
        MatDialogModule,
        ReactiveFormsModule,
        ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
        ToastrModule.forRoot({
            progressBar: true,
            progressAnimation: 'increasing'
        })
    ],
    providers: [
        AuthGuardService,
        AuthService,
        GroupSuggestionRatingService,
        ScrollBottomService,
        UrlHelperService,
        {
            provide: MatDialogRef,
            useValue: {}
        },
        { provide: ErrorHandler, useClass: RollbarErrorHandler },
        { provide: RollbarService, useFactory: rollbarFactory }
    ],
    bootstrap: [AppComponent],
    entryComponents: [
        AddAlbumToGroupComponent,
        GroupCreateInviteComponent,
        GroupAlbumRateComponent
    ]
})
export class AppModule { }
