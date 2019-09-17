import { ExercisePage } from './../exercise/exercise';
import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { RemoteServiceProvider } from '../../providers/remote-service/remote-service';

/**
 * Generated class for the TopicPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-topic',
  templateUrl: 'topic.html',
})
export class TopicPage implements OnInit{
topic: any;
exercise_status: any;

exercises: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private _remote: RemoteServiceProvider) {
    this.topic = navParams.get('topic');
    console.log(this.topic);
  }

  ngOnInit() {
    this.getExerciseStatus();
  }

  gotoExercise() {
    this._remote.get('questions/getExercises.php?tid=' + this.exercise_status[0].topic_id + '&qid=' + this.exercise_status[0].quarter_id)
      .subscribe((data) => {
      this.navCtrl.push(ExercisePage, {
        data: data , topic_id: this.topic.topic_id
      });
    });
    
  }

  getExerciseStatus() {
    this._remote.get('topic/getExerciseStatus.php?id=' + this.topic.topic_id).subscribe((data) => {
      this.exercise_status = data;
      console.log(data);
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TopicPage');
  }
  
}
