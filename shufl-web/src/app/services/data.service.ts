import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from 'src/environments/environment';

const httpOptions = {
    headers: new HttpHeaders({ 
        'Content-Type': 'application/json',
    })
};

@Injectable({
    providedIn: 'root'
})
export class DataService {

    constructor(private httpClient: HttpClient) {}

    public getAsync<T>(endpoint: string): Promise<T> {
        return new Promise((resolve, reject) => {
            let url = `${environment.apiUrl}/${endpoint}`;
            this.httpClient.get<T>(url, httpOptions)
                .subscribe(
                    (data) => {
                        resolve(data as T);
                    },
                    (err) => {
                        reject(err);
                    }
                );
        });
    }
}