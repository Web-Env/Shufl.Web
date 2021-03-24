import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { IUploadModel } from "../models/upload-models/upload-model.interface";

const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}` 
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

    public postAsync(endpoint: string, uploadModel: IUploadModel, retry: boolean = false): Promise<void> {
        return new Promise((resolve, reject) => {
            let url = `${environment.apiUrl}/${endpoint}`;

            this.httpClient.post(url, uploadModel, httpOptions)
                .subscribe({
                    error: async (err) => {
                        if (err instanceof HttpErrorResponse && err.status === 500 && retry === false) {
                            resolve(await this.postAsync(endpoint, uploadModel, true));
                        }
                        else {
                            reject(err);
                        }
                    }
                });
        });
    }
}