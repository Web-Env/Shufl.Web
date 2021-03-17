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

    constructor(
        id: string,
        name: string,
        url: string,
        coverArtUrl: string,
        releaseDate: string,
        artists: Array<Artist>,
        tracks: Array<Track>,
    ) {
        this.id = id;
        this.name = name;
        this.url = url;
        this.coverArtUrl = coverArtUrl;
        this.releaseDate = releaseDate;
        this.artists = artists;
        this.tracks = tracks;
    }
}