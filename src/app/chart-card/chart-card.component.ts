import { Component, Input, OnInit } from '@angular/core';
import { DayData } from '../model/DayData';
import { WeekData } from '../model/WeekData';
import { CoinApiService } from '../services/coin-api.service';

@Component({
  selector: 'app-chart-card',
  templateUrl: './chart-card.component.html',
  styleUrls: ['./chart-card.component.css']
})
export class ChartCardComponent implements OnInit {

  @Input() crypto!: string;
  constructor(private coinService: CoinApiService) { }

  days!: WeekData;
  legend: boolean = false;
  showLabels: boolean = true;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = false;
  xAxisLabel: string = 'Last week';
  yAxisLabel: string = 'Price in USD';
  timeline: boolean = true;

  colorScheme = {
    domain: ['#3A083A']
  };

  daysFromServer: DayData[] = [];
  multi = [
    {
      name: "CRYPTO",
      series: [{ name: "time", value: 0 },]
    }]

  ngOnInit(): void {

    this.coinService.getHistoricData(this.crypto, this.calcStartDate(), this.calcEndDate()).subscribe(data => {

      this.daysFromServer = data;
      let allDataAboutCrypto: WeekData = { name: this.crypto, series: [] };

      this.daysFromServer.forEach(element =>
        allDataAboutCrypto.series.push({
          name: element.time_period_start.slice(5, 10),
          value: element.rate_high.toPrecision(8) as unknown as number
        }));

      this.multi[0].name = this.crypto;
      this.multi[0].series = allDataAboutCrypto.series;

      let multi2 = this.multi;
      this.multi = [...multi2]

    });
  }

  calcStartDate(): string {
    let startDate = new Date();
    startDate.setDate(startDate.getDate() - 8);
    return startDate.toISOString();
  }

  calcEndDate(): string {
    let endDate = new Date()
    endDate.setDate(endDate.getDate() - 1);
    return endDate.toISOString();
  }



}
