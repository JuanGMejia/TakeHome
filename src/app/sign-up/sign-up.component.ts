import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IPostData } from '../app-model';
import { SignUpService } from '../app-service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.sass'],
  encapsulation: ViewEncapsulation.None,
})
export class SignUpComponent implements OnInit {

  signUpForm: FormGroup;

  get defaultSelected() {
    return '- SELECT ONE -';
  }
  options = [this.defaultSelected, 'Yes', 'No'];

  constructor(private signUpService: SignUpService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.signUpForm = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      emailAddress: new FormControl('', [Validators.required, Validators.email]),
      organization: new FormControl('', Validators.required),
      euResident: new FormControl(this.defaultSelected, this.validateHasSelection),
      advances: new FormControl(true),
      alerts: new FormControl(false),
      other: new FormControl(false)
    }, [this.checkIfOneIsSelected]);
  }

  validateHasSelection = (control: FormControl): ValidationErrors | null => {
    const hasSelection = control.value !== this.defaultSelected;
    return hasSelection ? null : { noneSelected: true };
  }

  checkIfOneIsSelected = (form: FormGroup): ValidationErrors | null => {
    if (!(this.isTouched('advances') || this.isTouched('alerts') || this.isTouched('other'))) return null;
    const atLeastOneSelected = form.get('advances').value || form.get('alerts').value && this.isTouched('alerts') || form.get('other').value;
    return atLeastOneSelected ? null : { oneSelected: true };
  }

  isTouched(controlName: string) {
    if (!this.signUpForm) return false;
    return this.signUpForm.get(controlName).dirty
  }

  get hasResidentError() {
    return this.signUpForm.get('euResident').hasError('noneSelected') && this.isTouched('euResident');
  }

  controlHasError(controlName: string) {
    const controlValue = this.signUpForm.get(controlName);
    return controlValue.hasError('required') && controlValue.touched;
  }

  emailHasError(controlName: string) {
    const controlValue = this.signUpForm.get(controlName);
    return controlValue.hasError('email') &&  controlValue.touched;
  }

  submit() {
    const infoData: IPostData = {
      email: this.signUpForm.get('emailAddress').value,
      firstName: this.signUpForm.get('firstName').value,
      lastName: this.signUpForm.get('lastName').value,
      organization: this.signUpForm.get('organization').value,
      alerts: this.signUpForm.get('alerts').value,
      euResident: this.signUpForm.get('euResident').value,
      advances: this.signUpForm.get('advances').value,
      other: this.signUpForm.get('other').value
    }
    this.signUpService.sendInfo(infoData)
    .subscribe(
      (result: any) => this.snackBar.open(result.message, 'ok'),
      (error) => this.snackBar.open(error.message, 'Try again')
    );
  }

  reset() {
    this.signUpForm.reset();
    this.signUpForm.get('advances').patchValue(true);
    this.signUpForm.get('euResident').patchValue(this.defaultSelected);
  }

}
