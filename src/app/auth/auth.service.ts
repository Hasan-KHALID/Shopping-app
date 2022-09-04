import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, throwError } from "rxjs";


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
        } ).pipe(catchError(errorRes =>{
            let errorMessage = "an unknown error";
            if (!errorRes.error || !errorRes.error.error){
                return throwError(errorMessage);
            }
            switch(errorRes.error.error.message){
                case 'EMAIL_EXISTS':
                    errorMessage =" this email exits alreday"
            }
            return throwError(errorMessage);
        }))
    }
}