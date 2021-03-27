export class User {
    username!: string;
    displayName!: string;
    pictureUrl!: string;

    constructor(
        username: string,
        displayName: string,
        pictureUrl: string
    ) {
        this.username = username;
        this.displayName = displayName;
        this.pictureUrl = pictureUrl;
    }
}