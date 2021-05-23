import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AccountComponent } from "./components/user/account/account.component";
import { AlbumComponent } from './components/album/album.component';
import { ArtistComponent } from './components/artist/artist.component';
import { GroupComponent } from "./components/group/group.component";
import { GroupInviteComponent } from "./components/shared/group/group-invite/group-invite.component";
import { GroupAlbumDetailsComponent } from "./components/group/group-album-details/group-album-details.component";
import { GroupsListComponent } from "./components/groups-list/groups-list.component";
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from "./components/shared/user/login/login.component";
import { NotFoundComponent } from './components/shared/not-found/not-found.component';
import { PasswordResetComponent } from "./components/shared/user/password-reset/password-reset.component";
import { RegisterComponent } from "./components/shared/user/register/register.component";
import { VerifyComponent } from "./components/shared/user/verify/verify.component";

import { AuthGuardService } from "./services/auth/auth-guard.service";
import { SearchComponent } from "./components/search/search.component";
import { SpotifyCallbackComponent } from "./components/user/spotify-callback/spotify-callback.component";
import { GroupPlaylistDetailsComponent } from "./components/group/group-playlist-details/group-playlist-details.component";

const routes: Routes = [
    { path: '', component: HomeComponent, pathMatch: 'full' },
    { path: 'account', component: AccountComponent, canActivate: [AuthGuardService] },
    { path: 'account/password-reset', component: PasswordResetComponent },
    { path: 'account/password-reset?token=:token', component: PasswordResetComponent },
    { path: 'account/verify', component: VerifyComponent },
    { path: 'account/verify/:token', component: VerifyComponent },
    { path: 'album', component: AlbumComponent },
    { path: 'album/:albumId', component: AlbumComponent },
    { path: 'artist', component: ArtistComponent },
    { path: 'artist/:artistId', component: ArtistComponent },
    { path: 'callback', component: SpotifyCallbackComponent, canActivate: [AuthGuardService] },
    { path: 'login', component: LoginComponent },
    { path: 'group/:groupId', component: GroupComponent, canActivate: [AuthGuardService]},
    { path: 'group/:groupId/a/:groupAlbumId', component: GroupAlbumDetailsComponent, canActivate: [AuthGuardService]},
    { path: 'group/:groupId/p/:groupPlaylistId', component: GroupPlaylistDetailsComponent, canActivate: [AuthGuardService]},
    { path: 'groups/join/:token', component: GroupInviteComponent, canActivate: [AuthGuardService]},
    { path: 'groups', component: GroupsListComponent, canActivate: [AuthGuardService]},
    { path: 'register', component: RegisterComponent },
    { path: 'search', component: SearchComponent },
    { path: 'track', component: AlbumComponent },
    { path: 'track/:trackId', component: AlbumComponent },
    { path: '404', component: NotFoundComponent },
    { path: '**', redirectTo: '404' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
