
import { Component } from "@angular/core";
import { flush } from "@angular/core/testing";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { AuthResponsData, AuthService } from "./auth.service";

@Component({
    selector: 'app-auth',
    templateUrl:'./auth.component.html'
})
export class AuthComponent{

    isLoginMode = true;
    isLoading= false;
    error!: string; 
    

    constructor(private authService: AuthService, private router:Router){}
    
    onSwitchMode(){
        this.isLoginMode = !this.isLoginMode;
    }

    onSubmit(form: NgForm){
        if (!form.valid){
            return;
        }
        const email = form.value.email;
        const password = form.value.password;

        let authObs: Observable<AuthResponsData>;

        this.isLoading = true;

        if (this.isLoginMode){
            authObs= this.authService.login(email, password)
        }else{
            authObs= this.authService.signup(email, password)

        }
        authObs.subscribe(resData =>
            {console.log(resData);
                this.isLoginMode =false;
                this.router.navigate(['/recipes']);
        },
        errorMessage=>{
            console.log(errorMessage)
            this.error = errorMessage
            this.isLoading = false;
        });

        form.reset();
    }

}