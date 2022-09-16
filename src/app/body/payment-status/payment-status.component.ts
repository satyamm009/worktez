import { Component, OnInit } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/compat/functions';
import { ActivatedRoute, Router } from '@angular/router';
import { StartServiceService } from 'src/app/services/start/start-service.service';
import { Location } from '@angular/common';
@Component({
  selector: 'app-payment-status',
  templateUrl: './payment-status.component.html',
  styleUrls: ['./payment-status.component.css']
})
export class PaymentStatusComponent implements OnInit {
  orderId: string;
  paymentId: string;
  signature: string;
  paymentStatus: string ="waiting";
  subscriptionId: string;
  constructor(public route: ActivatedRoute, public functions: AngularFireFunctions, public router: Router, public startService: StartServiceService, private location: Location) { }

  ngOnInit(): void {
    this.orderId = this.route.snapshot.params['orderId'];
    this.paymentId = this.route.snapshot.params['paymentId'];
    this.signature = this.route.snapshot.params['signature'];
    this.subscriptionId = this.route.snapshot.params['id'];
    // this.verifyPayment();
  }

  verifyPayment(){
    const uid = this.startService.uid;
    const callable = this.functions.httpsCallable("payment/paymentVerification");
    callable({OrderId: this.orderId, PaymentId:this.paymentId, Signature: this.signature, Id: this.subscriptionId}).subscribe({
      next: (data) => {
        this.paymentStatus = "Complete";
        console.log("PaymentStatus", this.paymentStatus);
      },
      error: (error) => {
        this.paymentStatus = "Failed";
        console.log(error);
        console.log("PaymentStatus", this.paymentStatus);
      },
      complete: () => {
        console.log("PaymentSuccessfull");
      }
    })
  }

  retry(){
    this.location.back();
    // this.router.navigate(['/CurrentPlan']);
  }

}
