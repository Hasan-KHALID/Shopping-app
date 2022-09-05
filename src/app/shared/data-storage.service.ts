import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Recipe } from "../recipes/recipe.model";
import { RecipeService } from "../recipes/recipe.service";
import { map, take, tap } from "rxjs";
import { AuthService } from "../auth/auth.service";

@Injectable({providedIn: 'root'})

export class DataStorageService{
    constructor(private http : HttpClient, private recipeService: RecipeService, private authService: AuthService){

    };

    storeRecipe(){
        const recipes = this.recipeService.getRecipes();
        this.http.put('https://recipe-book-ad08d-default-rtdb.asia-southeast1.firebasedatabase.app/recipes.json', recipes)
        .subscribe(response=>{
            console.log(response);
        })
    }

    fetchRecipe(){
        this.authService.user.pipe(take(1)).subscribe(user => {})
         return this.http.get<Recipe[]>( 'https://recipe-book-ad08d-default-rtdb.asia-southeast1.firebasedatabase.app/recipes.json' )
        .pipe(map(recipes=>{
            return recipes.map(recipe=>{
                return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients: []};
            })
        }), tap(recipes =>{
            this.recipeService.setRecipe(recipes);
        })
        )
    }


}