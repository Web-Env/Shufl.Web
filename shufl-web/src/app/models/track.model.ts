import { Artist } from './artist.model';

export class Track {
    id!: string;
    trackNumber!: number;
    name!: string;
    artists!: Array<Artist>;
    duration!: number;
    url!: string;

    constructor(
        id: string,
        trackNumber: number,
        name: string,
        artists: Array<Artist>,
        duration: number,
        url: string
    ) {
        this.id = id;
        this.trackNumber = trackNumber;
        this.name = name;
        this.artists = artists;
        this.duration = duration;
        this.url = url;
    }
}