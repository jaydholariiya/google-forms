import { Component } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { RouterLink, RouterModule } from '@angular/router';
import { DataServiceService } from '../services/data-service.service';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

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
  ],
  templateUrl: './add-data.component.html',
  styleUrl: './add-data.component.css',
})
export class AddDataComponent {
  // selectedValue: any;
  selected = 'option2';

  checkboxInputs: string[] = [];
  form: FormGroup;
  constructor(
    private dataService: DataServiceService,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      description: '',
      options: this.fb.array([]),
    });
  }

  insertData(data: any) {
    this.dataService.insertTheData(data).subscribe((result) => {
      console.warn(result);
      return { ...result, checkboxInputs: [this.checkboxInputs] };
    });
  }

  addInput() {
    if (this.checkboxInputs.length < 4) {
      this.checkboxInputs.push('');
      console.log(this.checkboxInputs);
    }
  }
}
