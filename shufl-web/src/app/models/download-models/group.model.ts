import { IDownloadModel } from "./download-model.interface";
import { User } from "./user.model";

export class Group implements IDownloadModel {
    name!: string;
    identifier!: string;
    isPrivate!: boolean;
    createdBy!: User;
    members!: Array<User>;

    constructor() {}
}