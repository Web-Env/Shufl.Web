import { IUploadModel } from "./upload-model.interface";

export class User implements IUploadModel {
    Email!: string;
    FirstName!: string;
    LastName!: string;
    Username!: string;
    Password!: string;

    constructor(
        email: string,
        firstName: string,
        lastName: string,
        username: string,
        password: string
    ) {
        this.Email = email;
        this.FirstName = firstName;
        this.LastName = lastName;
        this.Username = username;
        this.Password = password;
    }
}