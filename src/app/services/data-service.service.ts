import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DataServiceService {
  constructor(private http: HttpClient) {}
  insertTheData(data: any) {
    return this.http.post('http://localhost:3000/data', data, {
      observe: 'response',
    });
  }
  getTheData() {
    return this.http.get('http://localhost:3000/data');
  }

  postFormData(data: any) {
    return this.http.post('http://localhost:3000/FormData', data, {
      observe: 'response',
    });
  }
  getSomeData() {
    return this.http.get('http://localhost:3000/formData');
  }
}
