import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, ParamMap, Params, Router} from '@angular/router';

@Component({
  selector: 'app-sport-object',
  templateUrl: './sport-object.component.html',
  styleUrls: ['./sport-object.component.css']
})
export class SportObjectComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => console.log(params.get('id')));
  }

}
