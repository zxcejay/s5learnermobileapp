import { RemoteServiceProvider } from './../../providers/remote-service/remote-service';
import { Component } from '@angular/core';
import { NavController, NavParams, ToastController  } from 'ionic-angular';

/**
 * Generated class for the AccountsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-accounts',
  templateUrl: 'accounts.html',
})

export class AccountsPage {
test = '';
gg: any;
  id: number;
  firstname: string;
  middlename: string;
  lastname: string;
  birthday: string;
  section: string;
  guardian: string;
  address: string;
  contact_number: string;
  username: string;
  password: string;
  opassword: string;
  npassword: string;
  cpassword: string;
  accountData: any;
html: any;
  constructor(public navCtrl: NavController, public navParams: NavParams,private _remote: RemoteServiceProvider, public toastCtrl: ToastController) {
    this.accountData = localStorage.getItem('dataId');
    this.getPosts();
  }

  getPosts() {
    this._remote.get('accounts/readById.php?id='+ this.accountData).subscribe((data) => {
      this.id = data[0].id;
      this.firstname = data[0].firstname;
      this.middlename = data[0].middlename;
      this.lastname = data[0].lastname;
      this.birthday = data[0].birthday;
      this.section = data[0].section;
      this.guardian = data[0].guardian;
      this.address = data[0].address;
      this.contact_number = data[0].contact_number;
      this.username = data[0].username;
      this.password = data[0].password;
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AccountsPage');
  }

  saveData() {
    let newPassword = '';
    console.log(this.opassword);
    if ((this.opassword != '' && this.opassword != undefined) && (this.npassword == this.cpassword && this.password == this.opassword)) {
      newPassword = this.npassword;
      this.opassword = '';
      this.npassword = '';
      this.cpassword = '';
    } else if ((this.opassword != '' && this.opassword != undefined) 
                    && (this.npassword != this.cpassword || this.password != this.opassword)
                    && (this.npassword != '' && this.cpassword != '')){
      this.showLongToast();
      return true;
    } else {
      newPassword = this.password;
      this.opassword = '';
      this.npassword = '';
      this.cpassword = '';
    }
    var data = JSON.stringify({
      id: this.id,
      firstname: this.firstname,
      middlename: this.middlename,
      lastname: this.lastname,
      birthday: this.birthday,
      section: this.section,
      guardian: this.guardian,
      address: this.address,
      contact_number: this.contact_number,
      username: this.username,
      password: newPassword,
    });

    this._remote.post('accounts/update.php', data).subscribe((data => {
      console.log(data);
      this.getPosts();
      this.presentToast();
    }));
    
  }

  showLongToast() {
    let toast = this.toastCtrl.create({
      message: 'Password provided is incorrect',
      duration: 2000,
    });
    toast.present();
  }

  presentToast() {
    let toast = this.toastCtrl.create({
      message: 'Account was updated.',
      duration: 3000,
      position: 'bottom'
    });
  
    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });
  
    toast.present();
  }
}
