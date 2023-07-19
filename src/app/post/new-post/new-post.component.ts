import { Component, OnInit } from '@angular/core';
import { CategoryServiceService } from 'src/app/services/category-service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css']
})
export class NewPostComponent implements OnInit {

  
  permalink:string = '';
  imgSrc:any = './assets/placeholder-image.jpg';
  selectedImg:any = "";
  cateogylist:Array<any>=[] ;
  postForm: FormGroup

  constructor(
    private categoryService:CategoryServiceService,
    private formBuilder:FormBuilder
  ) { 
    this.postForm = this.formBuilder.group({
      title:["",[Validators.required,Validators.minLength(10)]],
      pmalink:["",[Validators.required]],
      category:["",[Validators.required]],
      excerpt:["",[Validators.required,Validators.minLength(50)]],
      imageUrl:["",[Validators.required]],
      content:["",[Validators.required]],
      image:["",[Validators.required]]

    });

  }

  ngOnInit(): void {
    this.categoryService.getCategoryList().subscribe((data:any) => {
      this.cateogylist = data;
      console.log(this.cateogylist);
    })
  }

  get fc() { 
    return this.postForm.controls;
   }

  onTitleChange($event:any) {
    const title= $event.target.value;
    this.permalink = title.replace(/\s+/g, '-').toLowerCase();

 
  }

  showPreview($event:any) {
    const file = $event.target.files[0];
    if(file) {
      const reader = new FileReader();
      reader.onload = (e:any) => {
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
      image: this.postForm.value.image,
      isFeatured: false,
      isActive: true,
      createdAt: new Date(),

  }  
  
  console.log(postData);
} 

}
