import { RemoteServiceProvider } from './../../providers/remote-service/remote-service';
import { QuarterPage } from './../quarter/quarter';
import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular'; 

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage implements OnInit{
  selectedItem: any;
  icons: string[];
  items: Array<{ title: string, icon: string }>;
  quarterItems: any;
  title: string[];
data: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private _remote: RemoteServiceProvider,
    ) {
  }

  ngOnInit() {
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedItem = this.navParams.get('item');

    // Let's populate this page with some filler content for funzies
    this.icons = ['build', 'paper-plane', 'beer', 'basketball'];
    this.title = ['Quarter 1', 'Quarter 2', 'Quater 3', 'Quarter 4'];

    this.items = [];
    for (let i = 0; i < this.title.length; i++) {
      this.items.push({
        title: this.title[i],
        // note: 'This is item #' + i,
        icon: this.icons[i]
      });
    }
  }

  itemTapped(event, item) {
    // That's right, we're pushing to ourselves!
    this._remote.get('topic/readById.php?quarter_id=' + item).subscribe((data) => {
      this.navCtrl.push(QuarterPage, {
        quarterItems: data, i: item
      });
    });
  }

}
