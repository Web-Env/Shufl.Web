import { IDownloadModel } from "./download-model.interface";
import { User } from "./user.model";

export class Group implements IDownloadModel {
    name!: string;
    identifier!: string;
    isPrivate!: boolean;
    createdBy!: User;
    members!: Array<User>;

    constructor() {}

    // constructor(
    //     name: string,
    //     identifier: string,
    //     isPrivate: boolean,
    //     createdBy: User,
    //     members: Array<User>
    // ) {
    //     this.name = name;
    //     this.identifier = identifier;
    //     this.isPrivate = isPrivate;
    //     this.createdBy = createdBy;
    //     this.members = members;
    // }
}