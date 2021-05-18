export class GroupPlaylistUploadModel {
    groupIdentifier!: string;
    playlistIdentifier!: string;

    constructor(
        groupIdentifier: string,
        playlistIdentifier: string
    ) {
        this.groupIdentifier = groupIdentifier;
        this.playlistIdentifier = playlistIdentifier;
    }
}