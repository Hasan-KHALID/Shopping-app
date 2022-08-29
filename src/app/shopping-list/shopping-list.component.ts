import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredient!: Ingredient[];
  private igChangeSub!: Subscription

  constructor(private slService: ShoppingListService) { }

  ngOnInit(): void {
    this.ingredient = this.slService.getIngredient();
    this.igChangeSub= this.slService.ingredientsChanged.subscribe((ingredients: Ingredient[])=>{
      this.ingredient = ingredients;
    });
  }
  ngOnDestroy(): void {
    this.igChangeSub.unsubscribe();
  }

  

}
