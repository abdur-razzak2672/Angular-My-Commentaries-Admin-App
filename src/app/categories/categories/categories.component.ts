import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/models/category';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CategoryServiceService } from 'src/app/services/category-service.service';
 
@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  constructor(
    private toastr: ToastrService,
    private categoryService: CategoryServiceService
  ){}

  categoryData: any = {};

  ngOnInit(): void {
    this.categoryService.getAllCategory().subscribe((data) => {
      console.log(data);
      this.categoryData = data;
    });
  }

  onSubmit(formData: NgForm) {
    const categoryData: Category = {
      category: formData.value.category,
      status: true
    };

    this.toastr.success('Category Added Successfully');

    console.log(categoryData);
  }
}
