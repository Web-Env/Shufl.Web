import { IUploadModel } from "./upload-model.interface";

export class User implements IUploadModel {
    Email!: string;
    FirstName!: number;
    LastName!: string;
    Username!: string;
    Password!: number;

    constructor(
        email: string,
        firstName: number,
        lastName: string,
        username: string,
        password: number
    ) {
        this.Email = email;
        this.FirstName = firstName;
        this.LastName = lastName;
        this.Username = username;
        this.Password = password;
    }
}