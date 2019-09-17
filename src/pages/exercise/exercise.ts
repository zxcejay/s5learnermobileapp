import { RemoteServiceProvider } from './../../providers/remote-service/remote-service';
import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { TopicPage } from '../topic/topic';
import { ListPage } from '../list/list';

/**
 * Generated class for the ExercisePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-exercise',
  templateUrl: 'exercise.html',
})
export class ExercisePage implements OnInit{
  topic_id: any;
  exercise: any;
  maxIndex= 0;
  checked: boolean;
  index= 0;
  loadingSpinner: any;
  score = 0;
  userAnswer: any;
  correctAnswer: any;

  one_1:any;
  one_2:any;
  one_3:any;
  one_4:any;
  one_5:any;
  one_6:any;
  one_7:any;
  one_8:any;

  two_1:any;
  two_2:any;
  two_3:any;
  two_4:any;
  two_5:any;
  two_6:any;
  two_7:any;

  three_1:any;
  three_2:any;
  three_3:any;
  three_4:any;
  three_5:any;
  three_6:any;

  four_1:any;
  four_2:any;
  four_3:any;
  four_4:any;
  four_5:any;

  five_1:any;
  five_2:any;
  five_3:any;
  five_4:any;

  one: any;
  two: any;
  three: any;
  four: any;
  five: any;


  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              private _remote: RemoteServiceProvider, 
              public _loading:LoadingController, 
              public alertCtrl: AlertController,) {
  
  }

  ngOnInit() {
      this.exercise = this.navParams.get('data');
      this.topic_id = this.navParams.get('topic_id');
      this.one = (this.exercise[0]) ? this.exercise[0].answer : '';
      this.two = (this.exercise[1]) ? this.exercise[1].answer : '';
      this.three = (this.exercise[2]) ? this.exercise[2].answer : '';
      this.four = (this.exercise[3]) ? this.exercise[3].answer : '';
      this.five = (this.exercise[4]) ? this.exercise[4].answer : '';

      // this.checked = false;
      // this.maxIndex = Object.keys(this.exercise).length;  
      // this.correctAnswer = this.exercise[this.index].answer; 
  }

  checkScore() {
    console.log(this.two[0]);
    console.log(this.two[1]);
    console.log(this.two[2]);
    console.log(this.two[3]);
    this.navCtrl.pop();
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
        this.updateExerciseStatus();
        this.showAlert();
        setTimeout(() => {
          this.navCtrl.setRoot(ListPage);
          }, 1500);
        console.log('last question');
      } 
      this.correctAnswer = this.exercise[this.index].answer; 
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

  selectedAnswer(event: any) {
    console.log('event', event);
    this.userAnswer = event;
  }

  showAlert() {
    let alert = this.alertCtrl.create({
      title: 'Done!',
      subTitle: 'It seems you learned a lot !',
      buttons: ['Close']
    });
    alert.present();
  }
  

  updateExerciseStatus() {
    // done taking exercise ; set to true
    var data = JSON.stringify({
      topic_id: this.topic_id,
      status: 'true',
    });

    this._remote.put('topic/updateExerciseStatus.php' , data).subscribe((data) => {
      console.log(data);
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ExercisePage');
  }

}
