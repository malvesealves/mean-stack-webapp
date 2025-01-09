import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-category-form',
  standalone: true,
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss'],
  imports: [FormsModule, MatInputModule, MatButtonModule],
})
export class CategoryFormComponent {
  name!: string;
  categoryService = inject(CategoryService);
  router = inject(Router);
  route = inject(ActivatedRoute);
  isEdit: boolean = false;
  id!: string;

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];

    if (this.id) {
      this.isEdit = true;
      this.categoryService.getCategoryById(this.id).subscribe((res: any) => {
        this.name = res.name;
      });
    }
  }

  add() {
    this.categoryService.addCategory(this.name).subscribe((res) => {
      alert('Category added');
      this.router.navigateByUrl('/admin/categories');
    });
  }

  update() {
    this.categoryService.updateCategory(this.id, this.name).subscribe((res) => {
      alert('Category updated');
      this.router.navigateByUrl('/admin/categories');
    });
  }
}
