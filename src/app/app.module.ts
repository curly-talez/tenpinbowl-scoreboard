import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FrameScoreDetailsComponent } from 'src/app/components/frame-score-details/frame-score-details.component';
import { FrameDetailsComponent } from 'src/app/components/frame-details/frame-details.component';
import { ScoreDetailsTableComponent } from 'src/app/components/score-detailed-table/score-detailed-table.component';

@NgModule({
  declarations: [
    AppComponent,
    FrameScoreDetailsComponent,
    FrameDetailsComponent,
    ScoreDetailsTableComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
