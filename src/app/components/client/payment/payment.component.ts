import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { PaymentStatus } from '../../../models/payment-status';
import { Observable, of } from 'rxjs';
import { flatMap } from 'rxjs/operators';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  paymentStatus$: Observable<PaymentStatus>;

  Status = PaymentStatus;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.paymentStatus$ = this.route.queryParams.pipe(
      flatMap((p: Params) => this.emitStatus(p))
    );
  }

  private emitStatus({ status }: Params): Observable<PaymentStatus> {
    const s = (status === 'success' ? PaymentStatus.SUCCESS : PaymentStatus.FAILURE);
    return of(s);
  }

}
