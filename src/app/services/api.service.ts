import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable()
export class ApiService {

    fontsUrl: string = 'https://www.googleapis.com/webfonts/v1/webfonts?key=AIzaSyBep7C3W8d_soUOn1bdRHbXN92B3rXIW04';

    private baseUrl = 'http://54.251.31.63/fhi-api/';

    constructor(
        private http: HttpClient
    ) { }

    getFonts() {
        return this.http.get(this.fontsUrl);
    }

    getApi(endpoint: string) {
        return this.http.get(this.baseUrl + endpoint);
    }

    postApi(endpoint: string, data : any) {
        return this.http.post(this.baseUrl + endpoint, data);
    }

    patchApi(endpoint: string, params: string) {
        console.log(endpoint, params);
    }
}