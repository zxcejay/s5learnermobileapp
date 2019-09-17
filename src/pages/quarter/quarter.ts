import { TopicPage } from './../topic/topic';
import { RemoteServiceProvider } from './../../providers/remote-service/remote-service';
import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { QuizPage } from '../quiz/quiz';

/**
 * Generated class for the QuarterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-quarter',
  templateUrl: 'quarter.html',
})
export class QuarterPage implements OnInit {
topics: any;
quarter_id: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private _remote: RemoteServiceProvider) {
  }

  ngOnInit() {
    this.topics = this.navParams.get('quarterItems');
    this.quarter_id = this.navParams.get('i');
    console.log(this.topics, this.quarter_id);
  }

  itemTapped(event,topic: any) {
    // That's right, we're pushing to ourselves!
    this.navCtrl.push(TopicPage, {
      topic: topic
    });
  }

  gotoQuiz() {
    // this._remote.get('questions/getQuestionsByQuarterId.php?id=' + this.quarter_id).subscribe((data) => {
    //   this.navCtrl.push(QuizPage, {
    //     data: data , quarter_id: this.quarter_id
    //   });
    // });

    this.navCtrl.push(QuizPage, {
       quarter_id: this.quarter_id
    });
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad QuarterPage');
  }

}
