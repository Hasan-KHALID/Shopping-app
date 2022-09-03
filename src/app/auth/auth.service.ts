import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";


interface AuthResponsData{
    kind: string,
    idToken: string,
    email: string,
    refreshToken: string,
    expiresIn: string,
    localId: string,
}

@Injectable({providedIn: 'root'})
export class AuthService{ 

    constructor(private http: HttpClient){

    }
    signup(email:string, password: string){
        return this.http.post<AuthResponsData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAUEmqz4v6rrin41rvJN80K1UO6Maas0cU', 
        {
            email: email,
            password: password,
            returnSecureToken: true
        } )
    }
}