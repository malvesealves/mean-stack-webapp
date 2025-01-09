import { Component, inject, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CategoryService } from 'src/app/services/category.service';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { Category } from 'src/app/interfaces/category';

@Component({
  selector: 'app-categories',
  standalone: true,
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatButtonModule,
    RouterLink
  ],
})
export class CategoriesComponent {
  displayedColumns: string[] = ['id', 'name', 'action'];
  dataSource: MatTableDataSource<Category>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  categoryService = inject(CategoryService);

  constructor() {
      this.dataSource = new MatTableDataSource([] as Category[]);
  }

  ngOnInit() {
    this.getServerData();
  }

  private getServerData() {
    this.categoryService.getCategories().subscribe((result: any) => {
      this.dataSource.data = result;
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  delete(id: string) {
    this.categoryService.deleteCategoryById(id).subscribe((res) => {
      alert("Category deleted");
      this.getServerData();
    })
  }
}
