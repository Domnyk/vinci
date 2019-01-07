import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ModalActionType } from '../../../../models/modal-action-type';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-event-action',
  templateUrl: './event-action.component.html',
  styleUrls: ['./event-action.component.css']
})
export class EventActionComponent implements OnInit {
  @Input() action: ModalActionType;

  @Output() pay = new EventEmitter<void>();
  @Output() resign = new EventEmitter<void>();
  @Output() join = new EventEmitter<void>();

  ModalActionType = ModalActionType;

  disableJoinButton = false;

  constructor() { }

  ngOnInit() {
  }

}
