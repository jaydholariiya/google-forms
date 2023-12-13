import { HttpClient } from '@angular/common/http';
import { Component, NgModule } from '@angular/core';
import { DataServiceService } from '../services/data-service.service';
import { CommonModule } from '@angular/common';
import { pipe } from 'rxjs';
import { ReactiveFormsModule } from '@angular/forms';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-store-data',
  standalone: true,
  imports: [CommonModule, JsonPipe, ReactiveFormsModule],
  templateUrl: './store-data.component.html',
  styleUrl: './store-data.component.css',
})
export class StoreDataComponent {
  dataAnswer: any;
  responseData: any;
  dataResult: any;
  finalValue: any;
  dataCheckBox: any;
  mergedData: any;
  constructor(
    private http: HttpClient,
    private dataService: DataServiceService
  ) {
    this.dataService.getSomeData().subscribe((result) => {
      console.log('hellllllllllllllooooooooooooooooo');
      console.warn(result);
      this.dataResult = result;
      console.warn('datarESULT ', this.dataResult);

      this.responseData = result;
      console.warn(this.responseData);
      // this.getData();
      // this.checkboxData();
      this.mergeData();
    });
  }

  OnInit() {
    // this.getData();

    this.mergeData();
  }

  mergeData() {
    if (this.responseData) {
      const mergedDataObjects = this.responseData.map(
        (obj: { [x: string]: any }, index: number) => {
          const mergedDataObject: { [x: string]: any } = {};

          // Process answerData
          Object.keys(obj)
            .filter((key) => key.startsWith('answerData'))
            .forEach((key, answerIndex) => {
              mergedDataObject[`answerData${answerIndex + 1}`] = obj[key];
            });

          // Process checkboxData
          Object.keys(obj)
            .filter((key) => key.startsWith('checkbox'))
            .forEach((key, checkboxIndex) => {
              mergedDataObject[`checkbox${checkboxIndex + 1}`] = obj[key];
            });

          Object.keys(obj)
            .filter((key) => key.startsWith('gender'))
            .forEach((key, selecorInput) => {
              mergedDataObject[`radio${selecorInput + 1}`] = obj[key];
            });

          Object.keys(obj)
            .filter((key) => key.startsWith('date'))
            .forEach((key, selecorInput) => {
              mergedDataObject[`date${selecorInput + 1}`] = obj[key];
            });

          Object.keys(obj)
            .filter((key) => key.startsWith('file'))
            .forEach((key, selecorInput) => {
              mergedDataObject[`file`] = obj[key];
            });

          // Add an index property
          mergedDataObject['index'] = index;

          return mergedDataObject;
        }
      );

      this.mergedData = mergedDataObjects;
      console.log('Merged Data:', this.mergedData);
    }
  }
}
