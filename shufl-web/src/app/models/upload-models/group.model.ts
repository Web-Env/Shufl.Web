import { IUploadModel } from "./upload-model.interface";

export class Group implements IUploadModel {
    name!: string;
    isPrivate!: boolean;

    constructor(
        name: string,
        isPrivate: boolean
    ) {
        this.name = name;
        this.isPrivate = isPrivate;
    }
}