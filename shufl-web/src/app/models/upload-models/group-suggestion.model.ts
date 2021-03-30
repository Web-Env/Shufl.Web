import { IUploadModel } from "./upload-model.interface";

export class GroupSuggestion implements IUploadModel {
    groupIdentifier!: string;
    albumIdentifier!: string;
    isRandom!: boolean;

    constructor(
        groupIdentifier: string,
        albumIdentifier: string,
        isRandom: boolean
    ) {
        this.groupIdentifier = groupIdentifier;
        this.albumIdentifier = albumIdentifier;
        this.isRandom = isRandom;
    }
}