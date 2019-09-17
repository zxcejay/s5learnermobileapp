import { RemoteServiceProvider } from './../../providers/remote-service/remote-service';
import { AccountsPage } from './../accounts/accounts';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  username: string;
  password: string;
  constructor(public navCtrl: NavController, private _remote: RemoteServiceProvider, public toastCtrl: ToastController) {

  }

  accountsPage(){
    this._remote.get('accounts/login.php?username=' + this.username + '&password=' + this.password).subscribe((data => {
     if(data[0].status == 200) {
      localStorage.setItem('dataId', data[0].id);
      this.navCtrl.setRoot(AccountsPage);
     } else {
       this.showLongToast();
     }
    }));
    
    // this.navCtrl.setRoot(AccountsPage);
  }

  showLongToast() {
    let toast = this.toastCtrl.create({
      message: 'Username or password is incorrect.',
      duration: 2000,
    });
    toast.present();
  }

  createAccount() {
    //
  }

}
