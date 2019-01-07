import { Component, Input, OnInit } from '@angular/core';
import { ModalActionType } from '../../../../models/modal-action-type';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-event-action',
  templateUrl: './event-action.component.html',
  styleUrls: ['./event-action.component.css']
})
export class EventActionComponent implements OnInit {
  @Input() action: ModalActionType;
  @Input() join: () => Observable<any>;
  @Input() resign: () => Observable<any>;
  @Input() pay: () => Observable<any>;

  ModalActionType = ModalActionType;

  showWaitMessageOnJoin = false;
  disableJoinButton = false;

  joinEvent() {
    this.showWaitMessageOnJoin = true;
    this.disableJoinButton = true;

    this.join().subscribe(() => {
      console.log('Subscribe callback fired');
      this.showWaitMessageOnJoin = false;
      this.disableJoinButton = false;
    });
  }

  constructor() { }

  ngOnInit() {
  }

}
