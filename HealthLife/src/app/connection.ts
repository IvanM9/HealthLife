import { environment } from "src/environments/environment";
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class Connection {
    api: string;
    constructor(private clientHttp: HttpClient) {
        this.api = environment.api;

    }

    get(route: string) {
        try {
            let opciones = {
                headers: new HttpHeaders({
                    'Content-Type': 'application/json',
                    'Accept': "/",
                    'Authorizationorization': 'Bearer ' + sessionStorage.getItem("token_id")
                })
            };
            return this.clientHttp.get(this.api + route, opciones);

        } catch (error) {
            throw new Error("error");
        }
    }

    post(route: string, data: any) {
        try {
            let opciones = {
                headers: new HttpHeaders({
                    'Content-Type': 'application/json',
                    'Accept': "/",
                    'Authorizationorization': 'Bearer ' + sessionStorage.getItem("token_id")?.toString()
                })
            };
            return this.clientHttp.post(this.api + route, data, opciones)


        } catch (error) {
            throw new Error("error");

        }
    }

    put(route: string, data: any) {
        try {
            let opciones = {
                headers: new HttpHeaders({
                    'Content-Type': 'application/json',
                    'Accept': "/",
                    'Authorization': 'Bearer ' + sessionStorage.getItem("token_id")?.toString()
                })
            };
            return this.clientHttp.put(this.api + route, data, opciones)

        } catch (error) {
            throw new Error("error");
        }
    }

    delete(route: string) {
        try {
            let opciones = {
                headers: new HttpHeaders({
                    'Content-Type': 'application/json',
                    'Accept': "/",
                    'Authorization': 'Bearer ' + sessionStorage.getItem("token_id")?.toString()
                })
            };
            return this.clientHttp.delete(this.api + route, opciones)

        } catch (error) {
            throw new Error("error");
        }
    }
}
