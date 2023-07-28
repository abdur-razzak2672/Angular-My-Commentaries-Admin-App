import { Component, OnInit } from '@angular/core';
import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { GoogleLoginProvider } from '@abacritt/angularx-social-login';
import { Router } from '@angular/router';
 import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-auth-login',
  templateUrl: './auth-login.component.html',
  styleUrls: ['./auth-login.component.css'],
})
export class AuthLoginComponent implements OnInit {
  authState: any=localStorage.getItem('user');
  user: any=  JSON.parse(this.authState);
 
  constructor(private authService: SocialAuthService,
    private router: Router,
    private toastr: ToastrService
     ) {}

  ngOnInit(): void {
    this.authService.authState.subscribe((user) => {     
      localStorage.setItem('user',JSON.stringify(user));
       this.router.navigate(['/dashboard']);
       setTimeout(function(){ window.location.reload(); }, 100);

 
     
     });
  }

  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  signOut(): void {
    this.authService.signOut();
    localStorage.removeItem('user');
    this.router.navigate(['/']);

    setTimeout(function(){ window.location.reload(); }, 100);
  }

  onSubmit() {
     this.toastr.error('Wrong Email or Password', 'Error');

  }

    
}
