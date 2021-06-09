import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Asset } from '../model/Asset';
import { ExchangeRate } from '../model/Exchange';
import { DayData } from '../model/DayData';



@Injectable({
  providedIn: 'root'
})
export class CoinApiService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'X-CoinAPI-Key': '2BA26EC1-3B9F-4A0E-A253-E55B5F317BF7'
    })
  };

  constructor(private http: HttpClient) { }

  getRateUSD(base: string): Observable<ExchangeRate> {
    return this.http.get<ExchangeRate>("https://rest.coinapi.io/v1/exchangerate/" + base.trim() + "/USD", this.httpOptions);
  }

  getHistoricData(currency: string, start: string, end: string): Observable<DayData[]> {
    return this.http.get<DayData[]>("https://rest.coinapi.io/v1/exchangerate/" + currency.trim() + "/USD/history?period_id=1DAY&time_start=" + start + "&time_end=" + end + "&limit=8", this.httpOptions)// + "/?apikey=AF6682A1-CA48-427E-B124-22865EBD0614");
  }

  getAssets(): Observable<Asset[]> {
    return this.http.get<Asset[]>("https://rest.coinapi.io/v1/assets", this.httpOptions);
  }
}
