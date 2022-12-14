import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, catchError, tap, throwError } from "rxjs";
import { User } from "./user.model";


export interface AuthResponsData{
    kind: string,
    idToken: string,
    email: string,
    refreshToken: string,
    expiresIn: string,
    localId: string,
    registered?: boolean;
}

@Injectable({providedIn: 'root'})
export class AuthService{

    user = new BehaviorSubject<User>(null);

    constructor(private http: HttpClient){

    }
    signup(email:string, password: string){
        return this.http.post<AuthResponsData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAUEmqz4v6rrin41rvJN80K1UO6Maas0cU', 
        {
            email: email,
            password: password,
            returnSecureToken: true
        } ).pipe(catchError(this.handleError), tap(resData =>{
            this.handelAuthentication(resData.email, 
                resData.localId, 
                resData.idToken, 
                +resData.expiresIn)
            
        }));
    }

    login(email: string, password: string){
        return this.http.post<AuthResponsData>("https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAUEmqz4v6rrin41rvJN80K1UO6Maas0cU",
          {
            email: email,
            password: password,
            returnSecureToken: true
        }).pipe(catchError(this.handleError), tap(resData =>{
            this.handelAuthentication(resData.email, 
                resData.localId, 
                resData.idToken, 
                +resData.expiresIn)
            }
            )
            );
    }

    private handelAuthentication(email: string, userId: string, token: string, expiresIn: number){
       const expirationDate = new Date(
        new Date().getTime() + expiresIn * 1000
        )
            const user = new User(
                email, 
                userId, 
                userId, 
                expirationDate
                );

                this.user.next(user);  
    }

    private handleError(errorRes: HttpErrorResponse){

        let errorMessage = "an unknown error";

            if (!errorRes.error || !errorRes.error.error){
                return throwError(errorMessage);
            }
            switch(errorRes.error.error.message){
                case 'EMAIL_EXISTS':
                    errorMessage =" this email exits alreday"
                    break;
                case 'EMAIL_NOT_FOUND':
                    errorMessage = "email not found"   
            }
            return throwError(errorMessage);
        }

    
}