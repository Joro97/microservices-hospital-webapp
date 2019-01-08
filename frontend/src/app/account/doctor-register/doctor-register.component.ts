import { Component, forwardRef, OnInit } from '@angular/core';
import { ControlValueAccessor, FormBuilder, FormGroup, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';

@Component({
  selector: 'app-doctor-register',
  templateUrl: './doctor-register.component.html',
  styleUrls: ['./doctor-register.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => DoctorRegisterComponent)
    }
  ]
})
export class DoctorRegisterComponent implements OnInit, ControlValueAccessor {
  doctorRegisterForm: FormGroup;
  constructor(private formBuilder: FormBuilder) {}

  onTouched: () => void = () => {};

  ngOnInit(): void {
    this.doctorRegisterForm = this.formBuilder.group({
      specialty: ['', Validators.required],
      experience: [0, Validators.required]
      });
  }

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
