import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environments.prod';
import { error } from 'console';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-test-error',
  imports: [NgIf, NgFor],
  templateUrl: './test-error.component.html',
  styleUrl: './test-error.component.scss',
})
export class TestErrorComponent implements OnInit {
  baseUrl = environment.apiUrl;
  validationErrors: any;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {}

  get404Error() {
    return this.http.get(this.baseUrl + 'products/88').subscribe({
      next: (response) => console.log(response),
      error: (error) => console.log(error),
    });
  }

  get400Error() {
    return this.http.get(this.baseUrl + 'Bugs/bad-request').subscribe(
      (response) => {
        console.log(response);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  get500Error() {
    return this.http.get(this.baseUrl + 'Bugs/server-error').subscribe(
      (response) => {
        console.log(response);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  get400ValidationError() {
    return this.http.get(this.baseUrl + 'products/iShouldBeNumber').subscribe(
      (response) => {
        console.log(response);
      },
      (error) => {
        console.log(error);
        this.validationErrors = error.errors;
      }
    );
  }
}
