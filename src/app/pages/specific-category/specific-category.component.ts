import { Component } from '@angular/core';
import { CategoryService } from '../../core/service/category.service';
import { ActivatedRoute } from '@angular/router';
import { IProducts } from '../../core/interfaces/http';
import { CardComponent } from "../../shared/card/card/card.component";

@Component({
  selector: 'app-specific-category',
  standalone: true,
  imports: [CardComponent],
  templateUrl: './specific-category.component.html',
  styleUrl: './specific-category.component.scss',
})
export class SpecificCategoryComponent {
  categoryType: string= '';
  products: IProducts[] = [];
  constructor(
    private _categoryService: CategoryService,
    private _activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.categoryType = this._activatedRoute.snapshot.paramMap.get('type') ?? '';
    this.displaySpecificCategory(this.categoryType);
  }

  displaySpecificCategory(type: string) {
    this._categoryService
      .getSpecificCategory(type)
      .subscribe((next) => (this.products = next.products));
  }
}
