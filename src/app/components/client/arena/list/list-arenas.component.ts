import { Component, Input, OnInit } from '@angular/core';
import { SportArena } from '../../../../models/sport-arena';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-list-arenas',
  templateUrl: './list-arenas.component.html',
  styleUrls: ['./list-arenas.component.css']
})
export class ListArenasComponent implements OnInit {
  @Input() arenas$: Observable<SportArena[]>;

  constructor() { }

  ngOnInit() {
  }

}
