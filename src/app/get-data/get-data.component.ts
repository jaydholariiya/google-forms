import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { DataServiceService } from '../services/data-service.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-get-data',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './get-data.component.html',
  styleUrl: './get-data.component.css',
})
export class GetDataComponent {
  data: any;
  constructor(
    private http: HttpClient,
    private dataservice: DataServiceService
  ) {
    this.dataservice.getTheData().subscribe((result) => {
      console.warn(result);
      this.data = result;
    });
  }
}
