export interface Asset {
  asset_id: string,
  name: string,
  type_is_crypto: number,
  data_start: string,
  data_end: string,
  data_quote_start: string,
  data_quote_end: string,
  data_orderbook_start: string,
  data_orderbook_end: string,
  data_trade_start: string,
  data_trade_end: string,
  data_symbols_count: number,
  volume_1hrs_usd: number,
  volume_1day_usd: number,
  volume_1mth_usd: number,
  price_usd: number
}



export const ASSETS: Asset[] = [
  {
    asset_id: "BTC",
    name: "Bitcoin",
    type_is_crypto: 1,
    data_start: "2010-07-17",
    data_end: "2019-11-03",
    data_quote_start: "2014-02-24T17:43:05.0000000Z",
    data_quote_end: "2019-11-03T17:55:07.6724523Z",
    data_orderbook_start: "2014-02-24T17:43:05.0000000Z",
    data_orderbook_end: "2019-11-03T17:55:17.8592413Z",
    data_trade_start: "2010-07-17T23:09:17.0000000Z",
    data_trade_end: "2019-11-03T17:55:11.8220000Z",
    data_symbols_count: 22711,
    volume_1hrs_usd: 102894431436.49,
    volume_1day_usd: 2086392323256.16,
    volume_1mth_usd: 57929168359984.54,
    price_usd: 9166.207274778093436220194944
  },

  {
    asset_id: "USD",
    name: "US Dollar",
    type_is_crypto: 0,
    data_start: "2010-07-17",
    data_end: "2019-11-03",
    data_quote_start: "2014-02-24T17:43:05.0000000Z",
    data_quote_end: "2019-11-03T17:54:49.3807706Z",
    data_orderbook_start: "2014-02-24T17:43:05.0000000Z",
    data_orderbook_end: "2019-11-03T17:55:13.1863931Z",
    data_trade_start: "2010-07-17T23:09:17.0000000Z",
    data_trade_end: "2019-11-03T17:55:07.7870000Z",
    data_symbols_count: 10728,
    volume_1hrs_usd: 9466454016.52,
    volume_1day_usd: 221580758173.49,
    volume_1mth_usd: 11816685174661.70,
    price_usd: 1.0
  },

];

  