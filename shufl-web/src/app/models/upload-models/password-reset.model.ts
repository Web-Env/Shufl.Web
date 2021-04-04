import { IUploadModel } from "./upload-model.interface";

export class PasswordResetUploadModel implements IUploadModel {
    passwordResetToken!: string;
    newPassword!: string;

    constructor(
        passwordResetToken: string,
        newPassword: string
    ) {
        this.passwordResetToken = passwordResetToken;
        this.newPassword = newPassword;
    }
}
