import { Component, Input, OnInit } from '@angular/core';
import { CustomEventView } from '../../../../models/custom-event-view';

@Component({
  selector: 'app-show-event',
  templateUrl: './show-event.component.html',
  styleUrls: ['./show-event.component.css']
})
export class ShowEventComponent implements OnInit {
  @Input() modalId: string;
  @Input() event: CustomEventView;

  constructor() { }

  ngOnInit() {
  }
}
