import { ExercisePage } from './../pages/exercise/exercise';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { QuarterPage } from './../pages/quarter/quarter';
import { AccountsPage } from '../pages/accounts/accounts';
import { TopicPage } from './../pages/topic/topic';
import { QuizPage } from '../pages/quiz/quiz';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { RemoteServiceProvider } from '../providers/remote-service/remote-service';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { NewAccountPage } from '../pages/new-account/new-account';
import { DragulaModule } from 'ng2-dragula';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    AccountsPage,
    ListPage,
    QuarterPage,
    TopicPage,
    ExercisePage,
    QuizPage,
    NewAccountPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
    HttpClientModule,
    DragulaModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    AccountsPage,
    ListPage,
    QuarterPage,
    TopicPage,
    ExercisePage,
    QuizPage,
    NewAccountPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    RemoteServiceProvider
  ]
})
export class AppModule {}
