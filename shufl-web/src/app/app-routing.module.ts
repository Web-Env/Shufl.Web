import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AccountComponent } from "./components/user/account/account.component";
import { AlbumComponent } from './components/album/album.component';
import { ArtistComponent } from './components/artist/artist.component';
import { GroupComponent } from "./components/group/group.component";
import { GroupItemDetailsComponent } from "./components/group/group-item-details/group-item-details.component";
import { GroupsListComponent } from "./components/groups-list/groups-list.component";
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from "./components/shared/user/login/login.component";
import { NotFoundComponent } from './components/shared/not-found/not-found.component';
import { RegisterComponent } from "./components/shared/user/register/register.component";

import { AuthGuardService } from "./services/auth/auth-guard.service";

const routes: Routes = [
    { path: '', component: HomeComponent, pathMatch: 'full' },
    { path: 'account', component: AccountComponent, canActivate: [AuthGuardService] },
    { path: 'album', component: AlbumComponent },
    { path: 'album/:albumId', component: AlbumComponent },
    { path: 'artist', component: ArtistComponent },
    { path: 'artist/:artistId', component: ArtistComponent },
    { path: 'login', component: LoginComponent },
    { path: 'group/:groupId', component: GroupComponent, canActivate: [AuthGuardService]},
    { path: 'group/:groupId/:groupItemId', component: GroupItemDetailsComponent, canActivate: [AuthGuardService]},
    { path: 'groups', component: GroupsListComponent, canActivate: [AuthGuardService]},
    { path: 'track', component: AlbumComponent },
    { path: 'track/:trackId', component: AlbumComponent },
    { path: 'register', component: RegisterComponent },
    { path: '404', component: NotFoundComponent },
    { path: '**', redirectTo: '404' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
