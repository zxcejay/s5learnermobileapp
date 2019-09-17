import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { RemoteServiceProvider } from '../../providers/remote-service/remote-service';
import { ListPage } from '../list/list';

/**
 * Generated class for the QuizPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-quiz',
  templateUrl: 'quiz.html',
})
export class QuizPage implements OnInit{
  data: any;
  quarter_id: any;

  maxIndex= 0;
  checked: boolean;
  index= 0;
  loadingSpinner: any;
  score = 0;
  userAnswer: any;
  correctAnswer: any;
  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              private _remote: RemoteServiceProvider, 
              public _loading:LoadingController, 
              public alertCtrl: AlertController,) {
  }
  ngOnInit() {
    // this.data = this.navParams.get('data');
    // this.quarter_id = this.navParams.get('quarter_id');

    // this.checked = false;
    // this.maxIndex = Object.keys(this.data).length;  
    // this.correctAnswer = this.data[this.index].answer; 
  }

  alert() {
    this.showAlert();
    setTimeout(() => {
      this.navCtrl.setRoot(ListPage);
      }, 1500);
  }

  next() {
    if(this.correctAnswer === this.userAnswer) {
      this.score+= 1;
    }
      if(this.index+1 < this.maxIndex ){
        this.index++;
        this.checked = true;
        setTimeout(() => {
            this.checked = false;
            console.log(this.checked);
            this.loading();
        }, 100);

      } else {
        // change exercise status
        // todo: user take exam once only
        this.showAlert();
        setTimeout(() => {
          this.navCtrl.setRoot(ListPage);
          }, 1500);
        console.log('last question');
      } 
      this.correctAnswer = this.data[this.index].answer; 
      console.log('score: ' , this.score);
  }

  loading() {
    this.loadingSpinner = this._loading.create({
      content : "Loading new question ,please wait...",
      spinner: 'bubbles',
    });
    this.loadingSpinner.present();
    setTimeout(() => {
      this.loadingSpinner.dismissAll();
      }, 100);
  }

  showAlert() {
    let alert = this.alertCtrl.create({
      title: 'Done!',
      subTitle: 'It seems you learned a lot !',
      buttons: ['Close']
    });
    alert.present();
  }

  selectedAnswer(event: any) {
    console.log('event', event);
    this.userAnswer = event;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad QuizPage', this.data , this.quarter_id);
  }

}
