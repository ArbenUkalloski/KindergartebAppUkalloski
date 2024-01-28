import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BackendService } from 'src/app/shared/backend.service';
import { StoreService } from 'src/app/shared/store.service';

@Component({
  selector: 'app-add-data',
  templateUrl: './add-data.component.html',
  styleUrls: ['./add-data.component.scss']
})
export class AddDataComponent implements OnInit {
  public addChildForm!: FormGroup;
  @Input() currentPage!: number;

  constructor(
    private formbuilder: FormBuilder,
    public storeService: StoreService,
    public backendService: BackendService
    ) {}

  ngOnInit(): void {
    this.addChildForm = this.formbuilder.group({
      name: ['', [Validators.required]],
      kindergardenId: ['', Validators.required],
      birthDate: [null, Validators.required]
    })
  }

  get nameError() {
    const nameControl = this.addChildForm.get('name');
    return nameControl?.hasError('required') && nameControl.touched;
  }
 
  get kindergardenError() {
    const kindergardenControl = this.addChildForm.get('kindergardenId');
    return kindergardenControl?.hasError('required') && kindergardenControl.touched;
  }
 
  get birthDateError() {
    const birthDateControl = this.addChildForm.get('birthDate');
    return birthDateControl?.hasError('required') && birthDateControl.touched;
  }
  
  onSubmit() {
    if(this.addChildForm.valid) {
      console.log(this.currentPage);
      this.backendService.addChildData(this.addChildForm.value, this.currentPage);
    }
  }
}
