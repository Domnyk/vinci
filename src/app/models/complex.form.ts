import { FormControl, Validators } from '@angular/forms';
import { DTO } from '../interfaces/dto';
import { ValidationService } from '../services/validation.service';

export class ComplexForm implements DTO {
  name = new FormControl('', [Validators.required], [this.validationService.uniqueComplexNameValidator()]);

  constructor(private validationService: ValidationService, init?: InitialValue) {
    if (!!init) {
      this.name.setValue(init.name);
    }
  }

  isValid(): boolean {
    return this.name.valid;
  }

  dto(): ComplexDTO {
    return {
      name: this.name.value
    };
  }
}

export interface ComplexDTO {
  name: string;
}

export interface InitialValue {
  name: string;
}
