import { Component,OnInit } from '@angular/core';
import { PostService } from 'src/app/services/post.service';
import { Post } from 'src/app/models/post';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-all-post',
  templateUrl: './all-post.component.html',
  styleUrls: ['./all-post.component.css']
})
export class AllPostComponent implements OnInit {
  constructor(
    private postService: PostService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService
  ) { }
  postData: Post[] = [];
  currentPage: number = 1;
  totalPages: number = 1;
  pageLimit: number = 4;





  ngOnInit(): void {
    this.getAllCategories();

    
  }

  getAllCategories(): void {
    this.spinner.show(); // Show the spinner
     this.postService.getAllPost(this.currentPage,this.pageLimit).subscribe((data:Post[]) => {
       console.log(data);
       this.postData = data;
       this.totalPages = (data.length/2);
       console.log("dfgsd",this.totalPages);
 
        // Hide the spinner
       this.spinner.hide();
     });
   }

   deletePost(id: any): void {
    if (confirm('Are you sure you want to delete this category?')) {
      this.postService.deletePostData(id).subscribe((data:any) => {
        this.toastr.success('Category Deleted Successfully');
        this.getAllCategories();
      });
    }
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
