import { Component } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  FormsModule,
  NgForm,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterLink, RouterModule } from '@angular/router';
import { DataServiceService } from '../services/data-service.service';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-data',
  standalone: true,
  imports: [
    RouterLink,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    MatSelectModule,
    CommonModule,
    MatIconModule,
    RouterLink,
  ],
  templateUrl: './add-data.component.html',
  styleUrl: './add-data.component.css',
})
export class AddDataComponent {
  // selectedValue: any;
  selected = 'option2';
  resetForm: [] = [];
  formData = {
    description: '',
  };

  checkboxInputs: string[] = [];
  labelBox: string[] = [];
  myFromData: FormGroup;
  constructor(
    private _snackBar: MatSnackBar,
    private dataService: DataServiceService,
    private fb: FormBuilder
  ) {
    this.myFromData = this.fb.group({
      description: ['', Validators.required],
      selectorInput0: ['', Validators.required],
      selectorInput1: ['', Validators.required],
      selectorInput2: ['', Validators.required],
      selectorInput3: ['', Validators.required],
      ShortselectorInput0: ['', Validators.required],
      ShortselectorInput1: ['', Validators.required],
      ShortselectorInput2: ['', Validators.required],
      ShortselectorInput3: ['', Validators.required],
      checkboxInput0: ['', Validators.required],
      checkboxInput1: ['', Validators.required],
      checkboxInput2: ['', Validators.required],
      checkboxInput3: ['', Validators.required],
      ShortValue0: ['', Validators.required],
      ShortValue1: ['', Validators.required],
      ShortValue2: ['', Validators.required],
      ShortValue: ['', Validators.required],
    });
  }

  insertData(data: any) {
    this.dataService.insertTheData(data).subscribe((result) => {
      console.warn(result);
      return { ...result, checkboxInputs: [this.checkboxInputs] };
    });
    this.formData.description = '';
    this._snackBar.open('Inserted Data Successfully', 'Close');
  }

  addInput() {
    if (this.checkboxInputs.length < 4) {
      this.checkboxInputs.push('');
      console.log(this.checkboxInputs);
    }
  }
  addLabel() {
    if (this.labelBox.length < 4) {
      this.checkboxInputs.push('');
      console.log(this.checkboxInputs);
    }
  }
  openSnackBar(message: string, action: string) {
    setTimeout(() => {
      this._snackBar.open(message, action);
    }, 2000);
  }
}
