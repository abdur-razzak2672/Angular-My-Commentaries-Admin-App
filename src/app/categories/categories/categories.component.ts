import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/models/category';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CategoryServiceService } from 'src/app/services/category-service.service';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  categoryData: Category[] = [];
  formCategory: string= ''	;
  currentPage: number = 1;
  totalPages: number = 1;
  pageLimit: number = 10;
  formSatatus: string = 'Add';
  categoryId: number = 0;

  constructor(
    private toastr: ToastrService,
    private categoryService: CategoryServiceService,
    private spinner: NgxSpinnerService

  ){}

  ngOnInit(): void {
    this.getAllCategories();
  }
  

 getAllCategories(): void {
   this.spinner.show(); // Show the spinner
    this.categoryService.getAllCategory(this.currentPage,this.pageLimit).subscribe((data:Category[]) => {
      console.log(data);
      this.categoryData = data;
      this.totalPages = (data.length/5);
      console.log("dfgsd",this.totalPages);

       // Hide the spinner
      this.spinner.hide();
    });
  }

  deleteCategory(id: any): void {
    if (confirm('Are you sure you want to delete this category?')) {
      this.categoryService.deleteCategoryData(id).subscribe((data:any) => {
        this.toastr.success('Category Deleted Successfully');
        this.getAllCategories();
      });
    }
  }


  onSubmit(formData: NgForm) {
    const categoryData: Category = {
      category: formData.value.category,
      status: true
    };

     if(this.formSatatus=='Add'){
      this.categoryService.addCategoryData(categoryData).subscribe((data:any) => {
        this.toastr.success('Category Added Successfully');
        formData.reset();
        this.getAllCategories();
        console.log(data);
      });
     }else if(this.formSatatus=='Update'){
      this.categoryService.updateCategoryData(categoryData,this.categoryId).subscribe((data:any) => {
        this.toastr.success('Category Updated Successfully');
         this.getAllCategories();
        console.log(data);
      });
     }
  }

  editCategory(category: any, id: any): void {
    console.log(category);
    this.formCategory = category;
    this.formSatatus = 'Update';
    this.categoryId = id;
    
  }

   goToNextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.getAllCategories();
    }
  }

  goToPreviousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.getAllCategories();
    }
  }
}
