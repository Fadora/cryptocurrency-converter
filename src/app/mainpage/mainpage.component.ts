import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddComponent } from '../dialog-add/dialog-add.component';
import { AuthService } from '../services/auth.service';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-mainpage',
  templateUrl: './mainpage.component.html',
  styleUrls: ['./mainpage.component.css']
})
export class MainpageComponent implements OnInit {

  constructor(
    public authService: AuthService, //for checking if user is logged in
    private storageService: StorageService,
    public dialog: MatDialog
  ) { }

  cryptos: string[] = [];
  selected = new FormControl(0); //init at first tab


  ngOnInit(): void {
    this.cryptos = this.getCurrentCryptos();
  }

  userHasCryptos(): boolean {
    return !(this.cryptos.length === 1 && this.cryptos[0] === "");
  }

  deleteCrypto(idx: number, crypto: string) {
    this.cryptos.splice(idx, 1);
    this.storageService.deleteCrypto(crypto);
    if (idx === 0) {
      this.selected.setValue(idx);
    }
    else this.selected.setValue(idx - 1);
  }

  openDialog(): void {
    let dialogRef = this.dialog.open(DialogAddComponent, {});
    dialogRef.afterClosed().subscribe(result => {
      if (result.length > 0) {
        this.storageService.setupLoggedInUserWithAsset(result);
        this.cryptos = this.getCurrentCryptos();
        this.selected.setValue(0);
      }
    });
  }

  getCurrentCryptos(): string[] {
    return this.storageService.getCryptosForCurrentUser()?.split(",") as string[];
  }




}
