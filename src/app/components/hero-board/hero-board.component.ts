import { Component, OnInit } from '@angular/core';
import {MarvelService} from "../../services/marvel/marvel.service";
import {Character} from "../../models/character/Character";
import {Filter} from "../../models/Filter";
import {Order} from "../../models/Order";
import {MatDialog, MatSnackBar} from "@angular/material";
import {finalize} from "rxjs/operators";
import {CharacterDialogComponent} from "../character-dialog/character-dialog.component";

@Component({
  selector: 'app-hero-board',
  templateUrl: './hero-board.component.html',
  styleUrls: ['./hero-board.component.scss']
})
export class HeroBoardComponent implements OnInit {
  ERROR_MESSAGE: string = "Error occurred";

  characters: Character[] = [];
  page: number = 1;

  filter: Filter = new Filter();

  isContentLoaded: boolean = false;

  constructor(private marvel: MarvelService, private snackbar: MatSnackBar, private dialog: MatDialog) {

  }

  ngOnInit() {
    this.loadCharacters()
  }

  openSnackbar(message: string) {
    this.snackbar.open(message, 'OK', {
      duration: 2000,
    });
  }

  openDialog(character: Character): void {
    const dialogRef = this.dialog.open(CharacterDialogComponent, {
      width: '500px',
      data: character,
    });
  }

  onScrollDown() {
    this.page++;
    this.loadCharacters();
  }

  loadCharacters() {
    this.isContentLoaded = false;

    if(this.filter.value !== '') {
      this.loadCharactersByName();
    } else {
      this.marvel.getCharacters(this.page, this.filter.chosenOrder)
        .pipe(
          finalize(() => this.isContentLoaded = true)
        )
        .subscribe(
        data => {
          this.characters = this.characters.concat(data.data.results);
        },
        error => {
          this.openSnackbar(this.ERROR_MESSAGE);
        })
    }

  }

  loadCharactersByName() {
    this.marvel.getCharactersNameStartsWith(this.page, this.filter.value, this.filter.chosenOrder)
      .pipe(
        finalize(() => this.isContentLoaded = true)
      )
      .subscribe(
      data => {
        this.characters = this.characters.concat(data.data.results);
      },
      error => {
        this.openSnackbar(this.ERROR_MESSAGE);
      });
  }

  applyFilter(value: string) {
    this.page = 1;
    this.filter.value = value;

    this.characters = [];
    this.loadCharacters();
  }

  applyOrder(order: Order) {
    this.page = 1;
    this.filter.chosenOrder = order;

    this.characters = [];
    this.loadCharacters();
  }
}
