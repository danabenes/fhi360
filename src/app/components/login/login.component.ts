import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
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

  loginForm = this.formBuilder.group({
    email: '',
    password: ''
  });

  constructor(
    public router: Router,
    private apiService: ApiService,
    public formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
  }

  login() {
    this.apiService.postNoHeaders('auth', this.loginForm.value).subscribe((res) => {
      localStorage.setItem('token', Object.values(res).toString());
      this.router.navigate(['home']);
    });
  }
}
