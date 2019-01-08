import {AbstractControl} from '@angular/forms';

export class ConfirmPasswordValidator {
    static MatchPassword(control: AbstractControl) {
       const password = control.get('password').value;

       const confirmPassword = control.get('confirmPassword').value;

        if (password != confirmPassword) {
            control.get('confirmPassword').setErrors( {ConfirmPassword: true} );
        } else {
            return null;
        }
    }
}
