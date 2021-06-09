import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Asset } from '../model/Asset';
import { CoinApiService } from '../services/coin-api.service';

@Component({
  selector: 'app-dialog-add',
  templateUrl: './dialog-add.component.html',
  styleUrls: ['./dialog-add.component.css']
})
export class DialogAddComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DialogAddComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private coinService: CoinApiService) { }

  selectedCrypto!: string;
  cryptos: Asset[] = [];

  ngOnInit(): void {

    this.coinService.getAssets().subscribe(data => {
      this.cryptos = data.filter(d => d.type_is_crypto === 1);
      this.cryptos.forEach(element => {
        console.log("id: " + element.asset_id + " name: " + element.name);
      });
    });
    
  }

  add() {
    this.dialogRef.close(this.selectedCrypto);
  }



}


