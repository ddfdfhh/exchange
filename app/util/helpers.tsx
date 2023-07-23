/* eslint-disable*/
export async function makeApiRequest(path: string) {
  try {
    const response = await fetch(`https://min-api.cryptocompare.com/${path}`);
    console.log('calling')
    return response.json();
  } catch (error: any) {
    throw new Error(`CryptoCompare request error: ${error.status}`);
  }
}

// Generates a symbol ID from a pair of the coins
export function generateSymbol(exchange: string, fromSymbol: string, toSymbol: string) {
  const short = `${fromSymbol}/${toSymbol}`;
  return {
    short,
    full: `${exchange}:${short}`,
  };
}

// Returns all parts of the symbol
export function parseFullSymbol(fullSymbol: string) {
  const match = fullSymbol.match(/^(\w+):(\w+)\/(\w+)$/);
  if (!match) {
    return null;
  }
  return { exchange: match[1], fromSymbol: match[2], toSymbol: match[3] };
}
export function formatNumber(v: number) {
  return new Intl.NumberFormat("en-IN").format(v);
}
export function formatDate(v: any) {
  return new Date(v).getDate() == new Date().getDate()
                                                ? new Date(v).getHours() + ':' + new Date(v).getMinutes() + ':' + new Date(v).getSeconds()
                                                :new Date(v).getFullYear() + '/' + new Date(v).getMonth() + '/' + new Date(v).getDate()+' '+new Date(v).getHours() + ':' + new Date(v).getMinutes() + ':' + new Date(v).getSeconds()
                                          
}
export function formatDecimal(v: any, decimals = 4) {
  return parseFloat(v).toFixed(decimals);
}
export function filterOrder(symbol_info: any, input_price: number | string, input_qty: number | string, bid_or_ask: string, avgPrice: number | string, order_type: string, usdt_amount: number | string) {
  let error = '';
  let symbol_filter_ar = symbol_info['filters']
  let decimals = symbol_info['baseAssetPrecision']
  if (order_type == 'LIMIT') {
    const priceFilter = symbol_filter_ar.find((f:any) => f.filterType === 'PRICE_FILTER');
    if (priceFilter) {
      if (Number(input_price) > Number(priceFilter['maxPrice'])) {
        return 'Price can not be greater than max allowed price of ' + priceFilter['maxPrice']
      }
      if (Number(input_price) < Number(priceFilter['minPrice'])) {
        return 'Price can not be less than min allowed price of ' + priceFilter['minPrice']
      }
      // let diff = Number(input_price) - Number(priceFilter['minPrice'])
      // console.log('diff', diff)
      // console.log('divide', diff % Number(priceFilter['tickSize']))
      // if (!Number.isInteger(diff % Number(priceFilter['tickSize']))) {
      //    return  'Price not allowed ,should be a multiple of ' + priceFilter['tickSize']
      // }
    }

    const lotSizeFilter = symbol_filter_ar.find((f:any) => f.filterType === 'LOT_SIZE');
    if (lotSizeFilter) {
      console.log('input qty', input_qty)
      if (Number(input_qty) > Number(lotSizeFilter['maxQty'])) {
        return 'Quantity can not be greater than max allowed qty of ' + lotSizeFilter['maxQty']
      }
      if (Number(input_qty) < Number(lotSizeFilter['minQty'])) {
        return 'Quantity can not be less than min allowed qty of ' + lotSizeFilter['minQty']
      }
      // let diff = Number(input_qty) - Number(lotSizeFilter['minQty'])
      // console.log('diff qty', diff)
      // console.log('divide qty', diff % Number(lotSizeFilter['stepSize']))
      // if (!Number.isInteger(diff % Number(lotSizeFilter['stepSize']))) {
      //    return  'Quantity not allowed ,should be a multiple of ' + lotSizeFilter['stepSize']
      // }
    }
    const percentSideFilter = symbol_filter_ar.find((f:any)=> f.filterType === 'PERCENT_PRICE_BY_SIDE');
    if (percentSideFilter) {
      if (bid_or_ask == 'bid') {
        if (Number(input_price) > Number(avgPrice) * Number(percentSideFilter['bidMultiplierUp'])) {
          return 'Bid Price can not be greater than max allowed price of ' + Number(avgPrice) * Number(percentSideFilter['bidMultiplierUp'])
        }
        else if (Number(input_price) < Number(avgPrice) * Number(percentSideFilter['bidMultiplierDown'])) {
          return 'Bid Price can not be less than min allowed price of ' + Number(avgPrice) * Number(percentSideFilter['bidMultiplierDown'])
        }
      }
      else if (bid_or_ask == 'ask') {
        if (Number(input_price) > Number(avgPrice) * Number(percentSideFilter['askMultiplierUp'])) {
          return 'Ask Price can not be greater than max allowed price of ' + Number(avgPrice) * Number(percentSideFilter['askMultiplierUp'])
        }
        else if (Number(input_price) < Number(avgPrice) * Number(percentSideFilter['askMultiplierDown'])) {
          return 'Ask Price can not be less than min allowed price of ' + Number(avgPrice) * Number(percentSideFilter['askMultiplierDown'])
        }
      }
    }
 
    const percentFilter = symbol_filter_ar.find((f:any) => f.filterType === 'PERCENT_PRICE');
    if (percentFilter) {

      if (Number(input_price) > Number(avgPrice) * Number(percentFilter['multiplierUp'])) {
        return 'Price can not be greater than max allowed price of ' + Number(avgPrice) * Number(percentFilter['multiplierUp'])
      }
      else if (Number(input_price) < Number(avgPrice) * Number(percentFilter['multiplierDown'])) {
        return 'Price can not be less than min allowed price of ' + Number(avgPrice) * Number(percentFilter['multiplierDown'])
      }
    }
  }
  const notionFilter = symbol_filter_ar.find((f:any) => f.filterType === 'NOTIONAL');
  if (notionFilter) {

    if (order_type == 'LIMIT' || notionFilter['applyMinToMarket']) {
      //  let g=Number(input_price) * Number(input_qty)
      if (Number(usdt_amount) < Number(notionFilter['minNotional'])) {
        return 'Total USDT Amount can not be less than ' + notionFilter['minNotional']
      }
    }
    else if (order_type == 'LIMIT' || notionFilter['applyMaxToMarket']) {
      if (Number(usdt_amount) > Number(notionFilter['maxNotional'])) {
        return 'Total USDT amount can not be greater than ' + notionFilter['maxNotional']
      }
    }
  }
  if (order_type == 'MARKET') {
    const marketLotFilter = symbol_filter_ar.find((f:any) => f.filterType === 'MARKET_LOT_SIZE');
    if (marketLotFilter) {

      if (Number(input_qty) > Number(marketLotFilter['maxQty'])) {
        return 'Quantity can not be greater than max allowed qty of ' + marketLotFilter['maxQty']
      }
      else if (Number(input_qty) < Number(marketLotFilter['minQty'])) {
        return 'Quantity can not be less than min allowed qty of ' + marketLotFilter['minQty']
      }
      // let diff = Number(input_qty) - Number(marketLotFilter['minQty'])
      // console.log('diff qty', diff)
      // console.log('divide qty', diff % Number(marketLotFilter['stepSize']))
      // if (!Number.isInteger(diff % Number(marketLotFilter['stepSize']))) {
      //   return  'Quantity not allowed ,should be a multiple of ' + marketLotFilter['stepSize']
      // }
    }
  }
  return '';
}
export function priceRule(symbol_info: any, order_type: string, avgPrice: number | string, bid_or_ask: string) {
  let str = '<ol>';/*usdt ke liye*/
  let str_price = '<ol>';
  let str_qty = '<ol>';
  // let str_multiple = '<ol>';
  // let str_market_price = '<ol>';
  let str_market_qty = '<ol>';
  let max_price_ar: Array<any> = []
  let min_price_ar: Array<any> = []
  let max_qty_ar: Array<any> = []
  let min_qty_ar: Array<any> = []
  let symbol_filter_ar = symbol_info['filters']
  if (order_type == 'LIMIT') {
    const priceFilter = symbol_filter_ar.find((f:any) => f.filterType === 'PRICE_FILTER');
    if (priceFilter) {
      max_price_ar.push(Number(priceFilter['maxPrice']))
      min_price_ar.push(Number(priceFilter['minPrice']))
      str_price += '<li>Price can not be greater than max allowed price of ' + priceFilter['maxPrice'] + '</li>';
      str_price += '<li>Price can not be less than min allowed price of ' + priceFilter['minPrice'] + '</li>';
      // str_price+= '<li>Price should be a multiple of ' + priceFilter['tickSize'] + '</li>';

    }

    const lotSizeFilter = symbol_filter_ar.find((f:any) => f.filterType === 'LOT_SIZE');
    if (lotSizeFilter) {
      max_qty_ar.push(Number(lotSizeFilter['maxQty']))
      min_qty_ar.push(Number(lotSizeFilter['minQty']))
      str_qty += '<li>Quantity can not be greater than max allowed quantity of ' + lotSizeFilter['maxQty'] + '</li>';

      str_qty += '<li>Quantity can not be less than min allowed quantity of ' + lotSizeFilter['minQty'] + '</li>';


      //str_qty += '<li>Quantity should be a multiple of ' + lotSizeFilter['stepSize'] + '</li>';

    }
    const percentSideFilter = symbol_filter_ar.find((f:any) => f.filterType === 'PERCENT_PRICE_BY_SIDE');
    if (percentSideFilter) {
      if (bid_or_ask == 'bid') {
        max_price_ar.push(Number(avgPrice) * Number(percentSideFilter['bidMultiplierUp']))
        min_price_ar.push(Number(avgPrice) * Number(percentSideFilter['bidMultiplierDown']))
        str_price += '<li>Bid Price can not be greater than max allowed price of ' + Number(avgPrice) * Number(percentSideFilter['bidMultiplierUp']) + '</li>';

        str_price += '<li>Bid Price can not be less than min allowed price of ' + Number(avgPrice) * Number(percentSideFilter['bidMultiplierDown']) + '</li>';

      }
      if (bid_or_ask == 'ask') {
        max_price_ar.push(Number(avgPrice) * Number(percentSideFilter['askMultiplierUp']))
        min_price_ar.push(Number(avgPrice) * Number(percentSideFilter['askMultiplierDown']))
        str_price += '<li>Ask Price can not be greater than max allowed price of ' + Number(avgPrice) * Number(percentSideFilter['askMultiplierUp']) + '</li>';

        str_price += '<li>Ask Price can not be less than min allowed price of ' + Number(avgPrice) * Number(percentSideFilter['askMultiplierDown']) + '</li>';

      }
    }
 
    const percentFilter = symbol_filter_ar.find((f:any) => f.filterType === 'PERCENT_PRICE');
    if (percentFilter) {
      max_price_ar.push(Number(avgPrice) * Number(percentFilter['multiplierUp']))
      min_price_ar.push(Number(avgPrice) * Number(percentFilter['multiplierUp']))
      str_price += '<li>Price can not be greater than max allowed price of ' + Number(avgPrice) * Number(percentFilter['multiplierUp']) + '</li>';

      str_price += '<li>Price can not be less than min allowed price of ' + Number(avgPrice) * Number(percentFilter['multiplierDown']) + '</li>';

    }
  }
  const notionFilter = symbol_filter_ar.find((f:any) => f.filterType === 'NOTIONAL');
  if (notionFilter) {

    if (order_type == 'LIMIT' || notionFilter['applyMinToMarket']) {
      str += '<li>Total USDT Amount can not be less than ' + notionFilter['minNotional'] + '</li>';

    }
    if (order_type == 'LIMIT' || notionFilter['applyMaxToMarket']) {
      str += '<li>Total USDT amount can not be greater than ' + notionFilter['maxNotional'] + '</li>';
    }
  }
  if (order_type == 'MARKET') {
    const marketLotFilter = symbol_filter_ar.find((f:any) => f.filterType === 'MARKET_LOT_SIZE');
    if (marketLotFilter) {


      str_market_qty += '<li> Market Order Quantity can not be greater than max allowed qty of ' + marketLotFilter['maxQty'] + '</li>';

      str_market_qty += '<li> Market Order Quantity can not be less than min allowed qty of ' + marketLotFilter['minQty'] + '</li>';


      //str_market_qty += '<li> Market Order Quantity ,should be a multiple of ' + marketLotFilter['stepSize'] + '</li>';

    }
  }


  str_price += '</ol>';
  str_qty += '</ol>';
  str_market_qty += '</ol>';
  return { str_price, str_qty, str_market_qty, str, max_qty_ar, min_qty_ar, max_price_ar, min_price_ar }
}