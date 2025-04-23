declare module 'yahoo-finance2' {
  interface Quote {
    regularMarketPrice: number;
    regularMarketChangePercent?: number;
    regularMarketVolume?: number;
    regularMarketDayHigh?: number;
    regularMarketDayLow?: number;
  }

  function quote(symbol: string): Promise<Quote>;

  export default {
    quote
  };
} 