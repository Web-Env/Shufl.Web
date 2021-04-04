import { Album } from './album.model';
import { ArtistGenre } from "./artist-genre.model";
import { ImageDownloadModel } from "./image.model";

export class Artist {
    id!: string;
    name!: string;
    followers!: number;
    artistGenres!: Array<ArtistGenre>;
    artistImages!: Array<ImageDownloadModel>;
    albums!: Array<Album>;
}