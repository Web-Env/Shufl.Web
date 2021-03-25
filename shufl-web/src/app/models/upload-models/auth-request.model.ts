import { IUploadModel } from "./upload-model.interface";

export class AuthRequest implements IUploadModel {
    Email!: string;
    Password!: string;

    constructor(
        email: string,
        password: string
    ) {
        this.Email = email;
        this.Password = password;
    }
}