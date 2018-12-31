import {Component, forwardRef, OnInit} from '@angular/core';
import {ControlValueAccessor, FormBuilder, FormControl, FormGroup, NG_VALUE_ACCESSOR, Validators} from '@angular/forms';
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
      useExisting: forwardRef(() => DoctorRegisterComponent)
    }
  ]
})
export class DoctorRegisterComponent implements ControlValueAccessor {
  doctorRegisterForm: FormGroup = new FormGroup({
    specialty: new FormControl,
    experience: new FormControl
    });

  onTouched: () => void = () => {};

  writeValue(v: any) {
    this.doctorRegisterForm.setValue(v, { emitEvent: false });
  }

  registerOnChange(fn: (v: any) => void) {
    this.doctorRegisterForm.valueChanges.subscribe(fn);
  }

  setDisabledState(disabled: boolean) {
    disabled ? this.doctorRegisterForm.disable() : this.doctorRegisterForm.enable();
  }

  registerOnTouched(fn: () => void) {
    this.onTouched = fn;
  }
}
