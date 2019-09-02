import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {Character} from "../../models/character/Character";

@Component({
  selector: 'app-character-dialog',
  templateUrl: './character-dialog.component.html',
  styleUrls: ['./character-dialog.component.scss']
})
export class CharacterDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<CharacterDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Character) {}

  ngOnInit() {
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
