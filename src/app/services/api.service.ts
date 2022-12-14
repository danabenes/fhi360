import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { throwError } from "rxjs";
import { catchError, map } from "rxjs/operators";

@Injectable()
export class ApiService {

    fontsUrl: string = 'https://www.googleapis.com/webfonts/v1/webfonts?key=AIzaSyBep7C3W8d_soUOn1bdRHbXN92B3rXIW04';

    private baseUrl = 'http://54.251.31.63/api/';

    headers: HttpHeaders = new HttpHeaders(
        {
            "Access-Control-Allow-Origin": "*"
        }
    );

    constructor(
        private http: HttpClient,
        private router: Router
    ) {
        this.headers = this.headers.append('Authorization', "Bearer " + localStorage.getItem('token'));
    }

    getApi(endpoint: string) {
        return this.http.get(this.baseUrl + endpoint, {observe: 'response', 'headers': this.headers}).pipe(
            map((resp: any) => {
                return resp;
            })
        );
        // return this.http.get(this.baseUrl + endpoint, { 'headers': this.headers });
    }

    postApi(endpoint: string, data : any) {
        return this.http.post(this.baseUrl + endpoint, data, { headers:this.headers });
    }

    postNoHeaders(endpoint: string, data : any) {
        return this.http.post(this.baseUrl + endpoint, data);
    }
}