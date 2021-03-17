import { Album } from "./album.model";

export class Artist {
    id!: string;
    name!: string;
    followers!: number
    url!: string;
    albums!: Array<Album>;
    
    constructor(
        id: string,
        name: string,
        followers: number,
        url: string,
        albums: Array<Album>
    ) {
        this.id = id;
        this.name = name;
        this.followers = followers
        this.url = url;
        this.albums = albums;
    }
}