import { IUploadModel } from "./upload-model.interface";

export class PasswordResetRequestUploadModel implements IUploadModel {
    email!: string;

    constructor(
        email: string
    ) {
        this.email = email;
    }
}
