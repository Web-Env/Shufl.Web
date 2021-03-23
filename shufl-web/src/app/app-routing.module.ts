import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AlbumComponent } from './components/album/album.component';
import { ArtistComponent } from './components/artist/artist.component';
import { HomeComponent } from './components/home/home.component';
import { NotFoundComponent } from './components/shared/not-found/not-found.component';
import { RegisterComponent } from "./components/shared/user/register/register.component";

const routes: Routes = [
    { path: '', component: HomeComponent, pathMatch: 'full' },
    { path: 'album', component: AlbumComponent },
    { path: 'album/:albumId', component: AlbumComponent },
    { path: 'artist', component: ArtistComponent },
    { path: 'artist/:artistId', component: ArtistComponent },
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
