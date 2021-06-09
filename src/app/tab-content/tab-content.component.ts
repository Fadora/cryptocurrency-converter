import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CoinApiService } from '../services/coin-api.service';
import { ConverterService } from '../services/converter.service';

@Component({
  selector: 'app-tab-content',
  templateUrl: './tab-content.component.html',
  styleUrls: ['./tab-content.component.css']
})
export class TabContentComponent implements OnInit {
  @Input() crypto!: string;
  @Output() deleted = new EventEmitter<string>();


  constructor(private converterService: ConverterService,
    private coinService: CoinApiService) { }


  cryptoValue: string = "?";
  usdValue: string = "?";
  usd!: number;
  cry!: number;
  rateBasedUSD!: number;

  ngOnInit(): void { }

  convertFromUSD(amount: number) {
    this.coinService.getRateUSD(this.crypto).subscribe(data => {
      this.rateBasedUSD = data.rate
      this.cryptoValue = this.converterService.convertToCrypto(amount, this.rateBasedUSD).toPrecision(8);
    });
  }

  convertFromCrypto(amount: number) {
    this.coinService.getRateUSD(this.crypto).subscribe(data => {
      this.rateBasedUSD = data.rate;
      this.usdValue = this.converterService.convertToUSD(amount, this.rateBasedUSD).toPrecision(8);
    })
  }

  deleteCrypto(c: string) {
    this.deleted.emit(c);
  }
}
