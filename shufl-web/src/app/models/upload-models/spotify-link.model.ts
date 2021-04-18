export class SpotifyLinkUploadModel {
    code!: string;
    callbackUrl!: string;

    constructor(
        code: string,
        callbackUrl: string
    ) {
        this.code = code;
        this.callbackUrl = callbackUrl;
    }
}