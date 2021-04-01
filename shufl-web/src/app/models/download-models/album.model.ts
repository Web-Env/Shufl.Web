import { Artist } from './artist.model';
import { Track } from './track.model';

export class Album {
    id!: string;
    name!: string;
    url!: string;
    releaseDate!: string;
    albumImages!: Array<any>;
    artists!: Array<Artist>;
    tracks!: Array<Track>;
}