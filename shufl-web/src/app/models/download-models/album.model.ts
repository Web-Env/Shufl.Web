import { Artist } from './artist.model';
import { Track } from './track.model';

export class Album {
    id!: string;
    name!: string;
    url!: string;
    coverArtUrl!: string;
    releaseDate!: string;
    artists!: Array<Artist>;
    tracks!: Array<Track>;
}