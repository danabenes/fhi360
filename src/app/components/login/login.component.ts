import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { takeUntil} from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: any;
  error: boolean = false;
  errorMessage: string = "";

  constructor(
    public router: Router,
    private apiService: ApiService,
    public formBuilder: FormBuilder
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
  }

  login() {
    this.apiService.postNoHeaders('auth', this.loginForm.value).subscribe(res => {
      localStorage.setItem('token', Object.values(res).toString());
      this.router.navigate(['home']);
    },
    err => {
      console.log(err.error);
      this.error = true;
      this.errorMessage = err.error['password'];
    });
  }
}
