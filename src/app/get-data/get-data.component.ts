import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { DataServiceService } from '../services/data-service.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatSlideToggle,
  MatSlideToggleModule,
} from '@angular/material/slide-toggle';
import { matSelectAnimations } from '@angular/material/select';
import { MatCommonModule } from '@angular/material/core';
@Component({
  selector: 'app-get-data',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatCommonModule,
    MatSlideToggleModule,
  ],
  templateUrl: './get-data.component.html',
  styleUrl: './get-data.component.css',
})
export class GetDataComponent {
  data: any;
  dataIndex: any;
  checkboxInputs: any;
  base64Image: [] = [];
  base64Images: [] = [];
  yourDataArray: [] = [];
  showInputBox = false;
  openInputId = null;
  openInputElement: any;
  inputElement: any;
  dataImage: any;
  optionalDataBool: any = {};
  // In your component.ts file
  visibilityState: boolean[] = [];
  // Inside your component class, perhaps after fetching the data

  checkboxData: any = [];
  checkboxCounter: number = 150;
  selectedCheckBoxes: any = [];

  constructor(
    private http: HttpClient,
    private dataservice: DataServiceService
  ) {
    this.dataservice.getTheData().subscribe((result: any) => {
      console.log(result);
      this.data = result;
      result.map((item: any) => {
        if (item.selected === 'optional') {
          this.optionalDataBool[item.id] = false;
        }
        if (item.selected === 'checkbox') {
          // console.log('qwe', item);

          for (let key in item) {
            if (item.hasOwnProperty(key)) {
              if (key.startsWith('checkboxInput')) {
                let _idNum = key[key.length - 1];

                for (let key2 in item) {
                  if (item.hasOwnProperty(key2)) {
                    if (
                      key2.endsWith(_idNum) &&
                      key2.startsWith('ShortValue')
                    ) {
                      this.checkboxData.push({
                        label: item[key],
                        value: item[key2],
                        id: this.checkboxCounter,
                      });
                      this.checkboxCounter += 1;
                    }
                  }
                }
              }
              // if (key.startsWith('ShortValue')) {
              // }
            }
          }

          // this.checkboxData({id:item.id,value:item.value,label})
        }
      });
    });
  }

  checkboxClickHandler(id: any, value: any, label: any) {
    if (value.checked) {
      this.selectedCheckBoxes.push({ id, value: label });
    } else {
      this.selectedCheckBoxes = this.selectedCheckBoxes.filter(
        (i: any) => i.id !== id
      );
    }
    console.log(this.selectedCheckBoxes);
  }

  dataValueGet(rawData: any) {
    console.log(this.data);

    let res = rawData;

    // res['file'] = this.dataImage;

    let selection: any = [];

    this.selectedCheckBoxes.map((item: any) => {
      selection.push(item.value);
    });

    for (let key in res) {
      console.log(key + ': ' + res[key]);

      if (key.startsWith('checkbox')) {
        res[`checkbox${key[key.length - 1]}`] = selection;
      }
      if (key.startsWith('file')) {
        res[`file${key[key.length - 1]}`] = this.dataImage;
      }
    }

    console.log(res);

    this.dataservice.postFormData(res).subscribe((result) => {
      console.log(result);
    });
  }

  addInput() {
    this.checkboxInputs.push('');
  }
  handleImageUpload(event: any): void {
    const input = event.target;
    const file = input.files && input.files.length > 0 ? input.files[0] : null;

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        this.dataImage = reader.result as string;
        // console.log(dataImage);
      };

      reader.readAsDataURL(file);
      console.warn('file upload');

      const fileName = file.name;
      console.log('File Name:', fileName);
    }
  }

  optionalCheckboxToggle(val: any, id: any) {
    console.log(this.optionalDataBool);
    this.optionalDataBool[id] = val.checked;
    console.log(this.optionalDataBool);

    // this.showInputBox = !this.showInputBox;
  }
}
