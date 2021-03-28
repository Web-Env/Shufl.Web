import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { IUploadModel } from "../models/upload-models/upload-model.interface";


@Injectable({
    providedIn: 'root'
})
export class DataService {

    constructor(private httpClient: HttpClient) { }

    private createHttpOptions(): Object {
        let httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('Token')}`
            })
        };

        return httpOptions;
    }

    private createStringHttpOptions(): Object {
        let httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('Token')}`
            }),
            responseType: 'text'
        };

        return httpOptions;
    }

    public async getAsync<T>(endpoint: string, type: { new(): T ;} | undefined = undefined, retry: boolean = false): Promise<T> {
        return new Promise((resolve, reject) => {
            let url = `${environment.apiUrl}/${endpoint}`;

            this.httpClient.get<T>(url, this.createHttpOptions())
                .subscribe(
                    (data) => {
                        if (type != null) {
                            var mappedObject = this.mapJsonToObject<T>(data, type)
                            resolve(mappedObject as T);
                        }
                        else {
                            resolve(data);
                        }
                    },
                    async (err) => {
                        if (err instanceof HttpErrorResponse && err.status === 500 && retry === false) {
                            resolve(await this.getAsync(endpoint, type, true));
                        }
                        else {
                            reject(err);
                        }
                    }
                );
        });
    }

    public async getArrayAsync<T>(endpoint: string, type: { new(): T ;}, retry: boolean = false): Promise<Array<T>> {
        return new Promise((resolve, reject) => {
            let url = `${environment.apiUrl}/${endpoint}`;

            this.httpClient.get<Array<T>>(url, this.createHttpOptions())
                .subscribe(
                    (data) => {
                        if (type != null) {
                            var mappedArray = this.mapJsonArrayToObjectArray<T>(data, type);
                            resolve(mappedArray as Array<T>);
                        }
                        else {
                            resolve(data);
                        }
                    },
                    async (err) => {
                        if (err instanceof HttpErrorResponse && err.status === 500 && retry === false) {
                            resolve(await this.getArrayAsync(endpoint, type, true));
                        }
                        else {
                            reject(err);
                        }
                    }
                );
        });
    }

    public async postAsync<T>(endpoint: string, uploadModel: IUploadModel, type: { new(): T ;}, retry: boolean = false): Promise<T> {
        return new Promise((resolve, reject) => {
            let url = `${environment.apiUrl}/${endpoint}`;

            this.httpClient.post(url, uploadModel, this.createHttpOptions())
                .subscribe(
                    (data) => {
                        var mappedData = new type();
                        Object.assign(mappedData, data);
                        resolve(mappedData as T);
                    },
                    async (err) => {
                        if (err instanceof HttpErrorResponse && err.status === 500 && retry === false) {
                            resolve(await this.postAsync(endpoint, uploadModel, type, true));
                        }
                        else {
                            reject(err);
                        }
                    }
                );
        });
    }

    public async postWithoutBodyAsync(endpoint: string, retry: boolean = false): Promise<any> {
        return new Promise((resolve, reject) => {
            let url = `${environment.apiUrl}/${endpoint}`;

            this.httpClient.post(url, null, this.createStringHttpOptions())
                .subscribe(
                    (data) => {
                        resolve(data);
                    },
                    async (err) => {
                        if (err instanceof HttpErrorResponse && err.status === 500 && retry === false) {
                            resolve(await this.postWithoutBodyAsync(endpoint, true));
                        }
                        else {
                            reject(err);
                        }
                    }
                );
        });
    }

    public async postWithoutResponseAsync(endpoint: string, uploadModel: IUploadModel, retry: boolean = false): Promise<void> {
        return new Promise((resolve, reject) => {
            let url = `${environment.apiUrl}/${endpoint}`;

            this.httpClient.post(url, uploadModel, this.createHttpOptions())
                .subscribe(
                    (_) => {
                        resolve();
                    },
                    async (err) => {
                        if (err instanceof HttpErrorResponse && err.status === 500 && retry === false) {
                            resolve(await this.postWithoutResponseAsync(endpoint, uploadModel, true));
                        }
                        else {
                            reject(err);
                        }
                    }
                );
        });
    }

    public async postWithoutBodyOrResponseAsync(endpoint: string, retry: boolean = false): Promise<void> {
        return new Promise((resolve, reject) => {
            let url = `${environment.apiUrl}/${endpoint}`;

            this.httpClient.post(url, null, this.createHttpOptions())
                .subscribe(
                    (_) => {
                        resolve();
                    },
                    async (err) => {
                        if (err instanceof HttpErrorResponse && err.status === 500 && retry === false) {
                            resolve(await this.postWithoutBodyOrResponseAsync(endpoint, true));
                        }
                        else {
                            reject(err);
                        }
                    }
                );
        });
    }

    private mapJsonToObject<T>(jsonObject: any, type: { new(): T ;}): T {
        var mappedData = new type();
        Object.assign(mappedData, jsonObject);

        return mappedData as T;
    }

    private mapJsonArrayToObjectArray<T>(jsonArray: any[], type: { new(): T ;}): Array<T> {
        let objectArray: Array<T> = [];

        jsonArray.forEach(jsonObject => {
            objectArray.push(this.mapJsonToObject<T>(jsonObject, type));
        });

        return objectArray as Array<T>;
    }
}