import { Component, NgZone } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  title: string;
  status: string;

  constructor(public navCtrl: NavController,  private zone: NgZone) {
    this.title = "Hello MobileFirst";
  }

  pingMFP() {
    this.zone.run(() => {
      this.title = "Hello MobileFirst";
      this.status = "Connecting to Server...";
    });
    WLAuthorizationManager.obtainAccessToken("").then(
      (token) => {
        console.log('-->  pingMFP(): Success ', token);
        this.zone.run(() => {
          this.title = "Yay!";
          this.status = "Connected to MobileFirst Server";
        });
      }, (error) => {
        console.log('-->  pingMFP(): failure ', error.responseText);
        this.zone.run(() => {
         this.title = "Bummer...";
         this.status = "Failed to connect to MobileFirst Server";
        });
      }
    )
  }

}
