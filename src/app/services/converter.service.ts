import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConverterService {

  constructor() { }

  convertToCrypto(value:number, rate:number):number{
      return value/rate;
  }

  convertToUSD(value:number,rate:number){
    return value*rate;
  }
}
