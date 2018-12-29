import {Component, forwardRef, OnInit} from '@angular/core';
import { ControlValueAccessor, FormBuilder, FormControl, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { DoctorService } from '../_services/doctor.service';
import { FileService } from '../_services/file.service';
import { RegisterComponent } from '../account/register/register.component';


@Component({
  selector: 'app-doctor-register',
  templateUrl: './doctor-register.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => RegisterComponent)
    }
  ]
})
export class DoctorRegisterComponent implements OnInit, ControlValueAccessor {
  doctorRegisterForm: FormGroup;
  avatar: File;
  onTouched: () => void = () => {};

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private doctorsService: DoctorService,
    private fileService: FileService
  ) { }

  ngOnInit() {
    this.doctorRegisterForm = this.formBuilder.group({
      specialty: new FormControl,
      experience: new FormControl
    });
  }

  onSubmit() {

    // this.doctorRegisterForm.addControl('username', this.userRegisterForm.controls['username']);
    this.doctorsService.registerDoctor(this.doctorRegisterForm.value)
      .pipe(first())
      .subscribe(
        doc => {
          console.log(`Added doctor ${doc}`);
          this.fileService.uploadFile(this.avatar, doc.username)
            .pipe(first())
            .subscribe(data => {
                this.router.navigate(['/login']);
              },
              error => {
                console.log('Failed to upload the image and register doctor');
              });
        },
        errorDoc => {
          console.log('failed to add doctor');
          console.log(errorDoc);
        }
      );
  }

  onFileChanged(event) {
    this.avatar = event.target.files[0];
  }

  registerOnChange(fn: (v: any) => void) {
    this.doctorRegisterForm.valueChanges.subscribe(fn);
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    isDisabled ? this.doctorRegisterForm.disable() : this.doctorRegisterForm.enable();
  }

  writeValue(v: any): void {
    this.doctorRegisterForm.setValue(v, { emitEvent: false });
  }
}
