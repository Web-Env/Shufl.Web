import { AlbumDownloadModel } from './album.model';
import { ArtistGenreDownloadModel } from "./artist-genre.model";
import { ImageDownloadModel } from "./image.model";

export class ArtistDownloadModel {
    id!: string;
    name!: string;
    followers!: number;
    artistGenres!: Array<ArtistGenreDownloadModel>;
    artistImages!: Array<ImageDownloadModel>;
    albums!: Array<AlbumDownloadModel>;
}