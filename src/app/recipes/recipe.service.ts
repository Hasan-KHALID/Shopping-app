import { EventEmitter } from "@angular/core";
import { Recipe } from "./recipe.model";

export class RecipeService{
    recipeSelected = new EventEmitter<Recipe>();
    private recipes: Recipe[] = [
    new Recipe("A test", "this is a test", 
    "https://www.adobe.com/content/dam/cc/us/en/creative-cloud/photography/discover/food-photography/CODERED_B1_food-photography_p1a_690x455.jpg.img.jpg"),
    
    new Recipe("Another test", "this is a test", 
    "https://www.adobe.com/content/dam/cc/us/en/creative-cloud/photography/discover/food-photography/CODERED_B1_food-photography_p1a_690x455.jpg.img.jpg")

  ];

  getRecipes(){
    return this.recipes.slice();
  }

}