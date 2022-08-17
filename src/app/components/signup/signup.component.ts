import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  registerForm = this.formBuilder.group({
    email: '',
    password: '',
    confirm_password: '',
    firstname: '',
    lastname: '',
    contact: '',
    region: ''
  });

  constructor(
    private apiService: ApiService,
    public formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  register() {
    this.apiService.postNoHeaders('me/account', this.registerForm.value).subscribe((data) => {
      this.router.navigate(['login'])
    });
  }

}
