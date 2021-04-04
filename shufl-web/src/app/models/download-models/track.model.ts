import { Artist } from './artist.model';

export class Track {
    id!: string;
    trackNumber!: number;
    name!: string;
    artists!: Array<Artist>;
    duration!: number;
}