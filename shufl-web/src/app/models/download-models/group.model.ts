import { IDownloadModel } from "./download-model.interface";
import { UserDownloadModel } from "./user.model";

export class GroupDownloadModel implements IDownloadModel {
    name!: string;
    identifier!: string;
    isPrivate!: boolean;
    createdBy!: UserDownloadModel;
    members!: Array<UserDownloadModel>;
}