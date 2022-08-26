import { EventEmitter, Injectable } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Recipe } from "./recipe.model";

@Injectable()
export class RecipeService{
    recipeSelected = new EventEmitter<Recipe>();
    private recipes: Recipe[] = [
    new Recipe("A test", "this is a test", 
    "https://www.adobe.com/content/dam/cc/us/en/creative-cloud/photography/discover/food-photography/CODERED_B1_food-photography_p1a_690x455.jpg.img.jpg",
    [
        new Ingredient("Meet", 1),
        new Ingredient("french fries", 39)
    ]),
    
    new Recipe("Another test", "this is a test", 
    "https://www.adobe.com/content/dam/cc/us/en/creative-cloud/photography/discover/food-photography/CODERED_B1_food-photography_p1a_690x455.jpg.img.jpg",
    [
        new Ingredient("bread", 13),
        new Ingredient("pizza", 39)
    ])

  ];

  constructor(private slService: ShoppingListService){}

  getRecipes(){
    return this.recipes.slice();
  }

  addIngredientToShoppingList(ingredients: Ingredient[]){
    this.slService.addIngredients(ingredients);
  }

}