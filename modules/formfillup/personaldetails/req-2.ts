import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-personal-details-form',
  templateUrl: './req-2.html',
  styleUrls: ['./req-2.css']
})
export class PersonalDetailsFormComponent implements OnInit {
  personalDetailsForm: FormGroup;
  currentSection: 'address' | 'other' = 'address';
  profilePreview: string | ArrayBuffer | null = null;

  constructor(private fb: FormBuilder) {
    this.personalDetailsForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      businessId: [''],

      currLine1: ['', Validators.required],
      currLine2: [''],
      currCity: ['', Validators.required],
      currPost: [''],
      currPin: ['', Validators.required],
      currDistrict: ['', Validators.required],
      currState: ['', Validators.required],
      currCountry: ['', Validators.required],

      permLine1: ['', Validators.required],
      permLine2: [''],
      permCity: ['', Validators.required],
      permPost: [''],
      permPin: ['', Validators.required],
      permDistrict: ['', Validators.required],
      permState: ['', Validators.required],
      permCountry: ['', Validators.required],

      sameAsCurrent: [false],

      gender: [''],
      nationality: [''],
      maritalStatus: [''],
      dob: [''],
      religion: [''],
      willingToRelocate: [''],
      socialMedia: [''],
      profileLink: [''],
      profilePhoto: [null]
    });
  }

  ngOnInit(): void {
    // Subscribe to sameAsCurrent checkbox changes to copy address automatically
    this.personalDetailsForm.get('sameAsCurrent')?.valueChanges.subscribe(checked => {
      if (checked) {
        this.copyCurrentToPermanent();
        this.disablePermanentAddress(true);
      } else {
        this.clearPermanentAddress();
        this.disablePermanentAddress(false);
      }
    });
  }

  onSectionChange(section: 'address' | 'other'): void {
    this.currentSection = section;
  }

  onPhotoSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.personalDetailsForm.patchValue({ profilePhoto: file });
      const reader = new FileReader();
      reader.onload = () => {
        this.profilePreview = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

  copyCurrentToPermanent(): void {
    this.personalDetailsForm.patchValue({
      permLine1: this.personalDetailsForm.get('currLine1')?.value,
      permLine2: this.personalDetailsForm.get('currLine2')?.value,
      permCity: this.personalDetailsForm.get('currCity')?.value,
      permPost: this.personalDetailsForm.get('currPost')?.value,
      permPin: this.personalDetailsForm.get('currPin')?.value,
      permDistrict: this.personalDetailsForm.get('currDistrict')?.value,
      permState: this.personalDetailsForm.get('currState')?.value,
      permCountry: this.personalDetailsForm.get('currCountry')?.value,
    });
  }

  clearPermanentAddress(): void {
    this.personalDetailsForm.patchValue({
      permLine1: '',
      permLine2: '',
      permCity: '',
      permPost: '',
      permPin: '',
      permDistrict: '',
      permState: '',
      permCountry: '',
    });
  }

  disablePermanentAddress(disable: boolean): void {
    const controls = [
      'permLine1', 'permLine2', 'permCity', 'permPost', 'permPin', 'permDistrict', 'permState', 'permCountry'
    ];
    controls.forEach(controlName => {
      const control = this.personalDetailsForm.get(controlName);
      if (control) {
        if (disable) {
          control.disable();
        } else {
          control.enable();
        }
      }
    });
  }

  onSubmit(): void {
    if (this.personalDetailsForm.valid) {
      console.log('Form submitted:', this.personalDetailsForm.value);
      // Here you can add your form submission logic, e.g., call an API
    } else {
      console.warn('Form is invalid');
      this.personalDetailsForm.markAllAsTouched();
    }
  }
}
