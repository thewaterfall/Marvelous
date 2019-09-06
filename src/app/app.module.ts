import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeroBoardComponent } from './components/hero-board/hero-board.component';
import {MaterialModule} from "./modules/material/material.module";
import {FlexLayoutModule} from "@angular/flex-layout";
import {MarvelService} from "./services/marvel/marvel.service";
import {HttpClientModule} from "@angular/common/http";
import {InfiniteScrollModule} from "ngx-infinite-scroll";
import { HeaderComponent } from './components/header/header.component';
import { CharacterDialogComponent } from './components/character-dialog/character-dialog.component';
import { ScrollToTopComponent } from './components/scroll-to-top/scroll-to-top.component';

@NgModule({
  declarations: [
    AppComponent,
    HeroBoardComponent,
    HeaderComponent,
    CharacterDialogComponent,
    ScrollToTopComponent
  ],
  imports: [
    FlexLayoutModule,
    MaterialModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    InfiniteScrollModule,
  ],
  providers: [MarvelService],
  bootstrap: [AppComponent],
  entryComponents: [CharacterDialogComponent],
})
export class AppModule { }
