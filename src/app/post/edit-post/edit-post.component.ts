import { Component, OnInit } from '@angular/core';
import { CategoryServiceService } from 'src/app/services/category-service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Post } from 'src/app/models/post';
import { PostService } from 'src/app/services/post.service';
import { ToastrService } from 'ngx-toastr';
 import { NgxSpinnerService } from 'ngx-spinner'; 
 import { Router } from '@angular/router';
 import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css']
})
export class EditPostComponent implements OnInit {
  
  permalink: string = '';
  imgSrc: any = './assets/placeholder-image.jpg';
  selectedImg: any = "";
  cateogylist: Array<any> = [];
  postForm: FormGroup;
  postDataDetail: any=[];
  id :any;
 
 

  constructor(
    private categoryService: CategoryServiceService,
    private formBuilder: FormBuilder,
    private postService: PostService,
    private toastr: ToastrService,
   private spinner: NgxSpinnerService,
    private  router:Router,
    private route: ActivatedRoute
  ) {
    this.postForm = this.formBuilder.group({
      title: [this.postDataDetail.title, [Validators.required, Validators.minLength(10)]],
      pmalink: ["", [Validators.required]],
      category: ["", [Validators.required]],
      excerpt: ["", [Validators.required, Validators.minLength(50)]],
      imageUrl: ["", [Validators.required]],
      content: ["", [Validators.required]],
      image: ["", [Validators.required]]

    });

  }
 
  ngOnInit(): void {

    this.getAllPost();

    

    this.categoryService.getCategoryList().subscribe((data: any) => {
      this.cateogylist = data;
      console.log(this.cateogylist);
    })
  }

  getAllPost(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.spinner.show();
    this.postService.PostDetail(this.id).subscribe(
      (data: any) => {
        this.postDataDetail = data;
        this.spinner.hide();
        this.imgSrc = this.postDataDetail.image;
 
         this.postForm.patchValue({
          title: this.postDataDetail.title,
          pmalink: this.postDataDetail.pmalink,
          category: this.postDataDetail.category.id + '-' + this.postDataDetail.category.category,
          excerpt: this.postDataDetail.excerpt,
          imageUrl: this.postDataDetail.imageUrl,
          content: this.postDataDetail.content,
         });
      },
      (error) => {
        // Handle the error if necessary
        console.error('Error fetching post data:', error);
        this.spinner.hide();
      }
    );
  }
  
 
  get fc() {
    return this.postForm.controls;
  }

  onTitleChange($event: any) {
    const title = $event.target.value;
    this.permalink = title.replace(/\s+/g, '-').toLowerCase();

  }

  showPreview($event: any) {
     const file = $event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imgSrc = e.target.result;
      }
      reader.readAsDataURL(file);
    }

    this.selectedImg = file;

  }



  onSubmit() {

    const splitted = this.postForm.value.category.split('-');
 
    const postData = {
      title: this.postForm.value.title,
      pmalink: this.postForm.value.pmalink,
      category: {
        id: splitted[0],
        category: splitted[1]
      },
      excerpt: this.postForm.value.excerpt,
      imageUrl: this.postForm.value.imageUrl,
      content: this.postForm.value.content,
      image: this.postForm.value.imageUrl,
      isFeatured: false,
      isActive: true,
      createdAt: new Date(),

    }

    this.postService.updatePostData(postData,this.id).subscribe((data:any) => {
      this.toastr.success('Post Updated Successfully');
       this.router.navigate(['/posts']);

      console.log(data);
    })



    console.log(postData);
  }


}
