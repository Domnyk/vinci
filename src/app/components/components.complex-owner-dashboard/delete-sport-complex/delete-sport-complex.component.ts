import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { DeleteSportComplex } from '../admin-dashboard-sidebar/admin-dashboard-sidebar.actions';
import { SportComplex } from '../../../models/sport-complex';
import { ShowFlashMessage } from '../../../actions/flash-message.actions';


@Component({
  selector: 'app-delete-sport-complex',
  templateUrl: './delete-sport-complex.component.html',
  styleUrls: ['./delete-sport-complex.component.css']
})
export class DeleteSportComplexComponent implements OnInit {
  @Input() sportComplex: SportComplex;

  sportComplexNameFormControl = new FormControl('');

  constructor(private router: Router, private store: Store) { }

  ngOnInit() {
  }

  isInputDifferentFromSportComplexName(): boolean {
    return this.sportComplexNameFormControl.value !== this.sportComplex.name;
  }

  onSubmit() {
    this.router.navigate(['/owner'])
      .then(() => {
        this.store.dispatch([
          new DeleteSportComplex(this.sportComplex.id),
          new ShowFlashMessage('Kompleks sportowy został pomyślnie usunięty')
        ]);
    });
  }

}
