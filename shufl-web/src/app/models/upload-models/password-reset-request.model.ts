import { IUploadModel } from "./upload-model.interface";

export class PasswordResetRequest implements IUploadModel {
    email!: string;

    constructor(
        email: string
    ) {
        this.email = email;
    }
}
