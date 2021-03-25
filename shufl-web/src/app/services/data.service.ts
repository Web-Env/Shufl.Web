import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { IUploadModel } from "../models/upload-models/upload-model.interface";

const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('Token')}`
    })
};

@Injectable({
    providedIn: 'root'
})
export class DataService {

    constructor(private httpClient: HttpClient) { }

    public getAsync<T>(endpoint: string, retry: boolean = false): Promise<T> {
        return new Promise((resolve, reject) => {
            let url = `${environment.apiUrl}/${endpoint}`;

            this.httpClient.get<T>(url, httpOptions)
                .subscribe(
                    (data) => {
                        resolve(data as T);
                    },
                    async (err) => {
                        if (err instanceof HttpErrorResponse && err.status === 500 && retry === false) {
                            resolve(await this.getAsync(endpoint, true));
                        }
                        else {
                            reject(err);
                        }
                    }
                );
        });
    }

    public postWithoutResponseAsync(endpoint: string, uploadModel: IUploadModel, retry: boolean = false): Promise<boolean> {
        return new Promise((resolve, reject) => {
            let url = `${environment.apiUrl}/${endpoint}`;

            this.httpClient.post(url, uploadModel, httpOptions)
                .subscribe(
                    (_) => {
                        resolve(true);
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

    public postAsync<T>(endpoint: string, uploadModel: IUploadModel, type: { new(): T ;}, retry: boolean = false): Promise<T> {
        return new Promise((resolve, reject) => {
            let url = `${environment.apiUrl}/${endpoint}`;

            this.httpClient.post(url, uploadModel, httpOptions)
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
}