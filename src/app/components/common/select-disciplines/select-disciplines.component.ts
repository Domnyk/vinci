import { Component, Input, OnInit } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { SportDiscipline } from '../../../models/sport-discipline';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-select-disciplines',
  templateUrl: './select-disciplines.component.html',
  styleUrls: ['./select-disciplines.component.css']
})
export class SelectDisciplinesComponent implements OnInit {
  @Input() label: string;
  @Input() disciplinesFormControl: FormControl;
  @Select(state => state.sportDisciplines) sportDisciplines$: Observable<SportDiscipline[]>;

  constructor() { }

  ngOnInit() {
  }

}
