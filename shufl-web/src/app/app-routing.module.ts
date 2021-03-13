import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AlbumComponent } from "./components/album/album.component";
import { HomeComponent } from "./components/home/home.component";
import { NotFoundComponent } from "./components/shared/not-found/not-found.component";

const routes: Routes = [
    {path: '', component: HomeComponent, pathMatch: 'full'},
    {path: 'album', component: AlbumComponent},
    {path: 'album/:albumId', component: AlbumComponent},
    {path: '404', component: NotFoundComponent},
    {path: '**', redirectTo: '404'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
