
'use client';
import Indicator from "@/app/components/candlestick";
import OrderBook from "@/app/components/order_book";
import Trade from "@/app/components/trade";
import { useEffect, useState } from "react";
const crypto = require('crypto');
import axios from 'axios'
import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";
import { MakeGetRequestNoQuery, MakeGetRequestRemoteQuery, MakePostRequest } from "@/app/util/make_post_request";
import { Ticker } from "@/app/components/ticker";
import { filterOrder, formatDecimal, priceRule } from "@/app/util/helpers";
import SuccessAlert from "@/app/components/success_alert";
import ErrorAlert from "@/app/components/error_alert";
import { useParams,useRouter } from "next/navigation";
let ws: WebSocket;
let authToken: string | undefined
export default function Exchange() {
  const { status, data: session } = useSession()
   const router = useRouter();
    
  const searchParams = useParams();
  console.log('symbol',searchParams['symbol'])
  const symbol = searchParams['symbol'] as unknown as string;
  const binance_url = 'https://testnet.binance.vision/api/v3';
  const binance_stream = 'wss://testnet.binance.vision/ws';
  const [wsInstance, setWsInstance] = useState<any>(null);

  const [side, setSide] = useState<any>(null);
  const [mainCoinBalance, setMainCoinBalance] = useState<number|string>(0)
  const [marketPrice, setMarketPrice] = useState<any>()
  const [type, setType] = useState<any>('LIMIT')
  const [ticker, setTicker] = useState<any | undefined>()
  const [usdtInput, setUsdtInput] = useState<any>(0)
  const [symbolPriceRules, setSymbolPriceRules] = useState<any>()
  const [htmlPriceRulesBuy, setHtmlPriceRulesBuy] = useState<any>()
  const [htmlPriceRulesSell, setHtmlPriceRulesSell] = useState<any>()

  const [btcInput, setBtcInput] = useState<any>(1)
  const [usdtInputSell, setUsdtInputSell] = useState<any>(0)
  const [btcInputSell, setBtcInputSell] = useState<any>(1)
  const [priceInputBuy, setPriceInputBuy] = useState<any>()
  const [priceInputSell, setPriceInputSell] = useState<any>()

  const [usdtInputSellMarket, setUsdtInputSellMarket] = useState<any>(0)
  const [btcInputSellMarket, setBtcInputSellMarket] = useState<any>(1)
  const [usdtInputBuyMarket, setUsdtInputBuyMarket] = useState<any>(0)
  const [btcInputBuyMarket, setBtcInputBuyMarket] = useState<any>(1)

  const [loadingBuy, setLoadingBuy] = useState<boolean>(false)
  const [loadingSell, setLoadingSell] = useState<boolean>(false)

  const [loadingBuyMarket, setLoadingBuyMarket] = useState<boolean>(false)
  const [loadingSellMarket, setLoadingSellMarket] = useState<boolean>(false)

  const [btnDisabled, setBtnDisabled] = useState<boolean>(false)
  const [usdtBalance, setUsdtBalance] = useState<number|string>(0)
  const [errorBuySide, setErrorBuySide] = useState<any | undefined>()
  const [errorSellSide, setErrorSellSide] = useState<any | undefined>()

  const [errorBuySideMarket, setErrorBuySideMarket] = useState<any | undefined>()
  const [errorSellSideMarket, setErrorSellSideMarket] = useState<any | undefined>()
  const [orderList, setOrderList] = useState<Array<any>>([])
  const [errorAlert, setErrorAlert] = useState<{ show: boolean; message: string }>({
    show: false, message: ''
  })
  const [successAlert, setSuccessAlert] = useState<{ show: boolean; message: string }>({
    show: false, message: ''
  })
 // const symbol = 'BTCUSDT'
  let network = 'BEP20';

  const main_currency = symbol.substr(
    0,
    symbol.indexOf('USDT'),
  );
  if (main_currency == 'BTC')
    network = 'Bitcoin';
  else if (main_currency == 'ETH')
    network = 'Ethereum';
  else if (main_currency == 'DRNH' || main_currency == 'BNB')
    network = 'BEP20';

  const time = Date.now() + 10000;
  // var timestamp = moment().unix();
  useEffect(() => {
    if (marketPrice !== undefined) {
      setUsdtInput(priceInputBuy * btcInput)
      setUsdtInputSell(priceInputSell * btcInputSell)
    }
  },
    [marketPrice])

  useEffect(() => {

    if (status == 'authenticated') {
      authToken = session?.user?.accessToken
      console.log('token', authToken)
      MakeGetRequestNoQuery(`binance/allUserOrders`,authToken)
      .then((resp:any) => {
        let x = resp.data.data
       
        console.log('orders list resp', JSON.parse(x))
        setOrderList(JSON.parse(x))

      }).catch(err => {
        console.log('error in feetchign orders')
      })
      MakePostRequest({ network, coin: main_currency }, 'binance/fetchBalanceFromTable', authToken)
        .then(resp => {
          let wallet = resp.data.data
          setMainCoinBalance(wallet['main_balance'])
          setUsdtBalance(wallet['usdt_balance'])

        }).catch(err => {
          console.log('balacne error', err)
          setMainCoinBalance(0)
          setUsdtBalance(0)
        })
    }
   

  }, [status, main_currency])
  useEffect(() => {
    const { Popover } = require("bootstrap");
    if (type == 'LIMIT') {
      if (symbolPriceRules !== undefined && marketPrice !== undefined) {

        let ruleForBid: any = priceRule(symbolPriceRules, type, marketPrice, 'bid')
        console.log('bid rule', ruleForBid)
        let htmlForPrice = `<h6>Bid Price Rule</h6><span class='text-muted fw-lighter'>Max Allowed Price-<b>${Math.min(...ruleForBid.max_price_ar)}</b>, 
                Min Allowed Price-<b>${Math.max(...ruleForBid.min_price_ar)}</b></span><br>${ruleForBid['str_price']}`
        let htmlForQty = `<h6>Quantity Rule</h6><span class='fw-lighter'>Max Allowed Qty-<b>${Math.min(ruleForBid.max_qty_ar)}</b>, 
                          Min Allowed Qty-<b>${Math.max(ruleForBid.min_qty_ar)}</b></span><br>${ruleForBid['str_qty']}`
        let htmlForUsdt = `<h6>USDT Amount Rule</h6>${ruleForBid['str']}`
        htmlForQty = type == 'MARKET' ? `<h6>Quantity Rule</h6>${ruleForBid['str_market_qty']}` : `${htmlForQty}`
        let content = type == 'LIMIT' ? htmlForPrice + htmlForQty + htmlForUsdt : htmlForQty + htmlForUsdt
        const popoverBuy = new Popover(document.querySelector('#popBuy'), {
          html: true, content: content
        })
        let ruleForAsk: any = priceRule(symbolPriceRules, type, marketPrice, 'ask')

        htmlForPrice = `<h6>Ask Price Rule</h6><span class='fw-lighter'>Max Allowed Price-<b>${Math.min(...ruleForAsk.max_price_ar)}</b>,
                        Min Allowed Price-<b>${Math.max(...ruleForAsk.min_price_ar)}</b></span><br>${ruleForAsk['str_price']}`
        htmlForQty = `<h6>Quantity Rule</h6><span class='fw-lighter'>Max Allowed Qty-<b>${Math.min(...ruleForAsk.max_qty_ar)}</b>,
        Min Allowed Qty-<b>${Math.max(...ruleForAsk.min_qty_ar)}</b></span><br>${ruleForAsk['str_qty']}`
        htmlForUsdt = `<h6>USDT Amount Rule</h6>${ruleForAsk['str']}`
        htmlForQty = type == 'MARKET' ? `<h6>Quantity Rule</h6>${ruleForAsk['str_market_qty']}` : `${htmlForQty}`
        content = type == 'LIMIT' ? htmlForPrice + htmlForQty + htmlForUsdt : htmlForQty + htmlForUsdt
        const popoverSell = new Popover(document.querySelector('#popSell'), {
          html: true, content: content
        })
        //  setHtmlPriceRulesBuy(htmlForBuy)
        //  setHtmlPriceRulesSell(htmlForSell)
      }
    }
    else {
      if (symbolPriceRules !== undefined && marketPrice !== undefined) {

        let ruleForBid: any = priceRule(symbolPriceRules, type, marketPrice, 'bid')

        let htmlForQty = `<h6>Quantity Rule</h6><span class='fw-lighter'>Max Allowed Qty-<b>${Math.min(ruleForBid.max_qty_ar)}</b>, 
                          Min Allowed Qty-<b>${Math.max(ruleForBid.min_qty_ar)}</b></span><br>${ruleForBid['str_qty']}`
        let htmlForUsdt = `<h6>USDT Amount Rule</h6>${ruleForBid['str']}`
        htmlForQty = type == 'MARKET' ? `<h6>Quantity Rule</h6>${ruleForBid['str_market_qty']}` : `${htmlForQty}`
        let content = htmlForQty + htmlForUsdt
        const popoverBuy = new Popover(document.querySelector('#popBuy1'), {
          html: true, content: content
        })
        let ruleForAsk: any = priceRule(symbolPriceRules, type, marketPrice, 'ask')


        htmlForQty = `<h6>Quantity Rule</h6><span class='fw-lighter'>Max Allowed Qty-<b>${Math.min(...ruleForAsk.max_qty_ar)}</b>,
        Min Allowed Qty-<b>${Math.max(...ruleForAsk.min_qty_ar)}</b></span><br>${ruleForAsk['str_qty']}`
        htmlForUsdt = `<h6>USDT Amount Rule</h6>${ruleForAsk['str']}`
        htmlForQty = type == 'MARKET' ? `<h6>Quantity Rule</h6>${ruleForAsk['str_market_qty']}` : `${htmlForQty}`
        content = htmlForQty + htmlForUsdt
        const popoverSell = new Popover(document.querySelector('#popSell1'), {
          html: true, content: content
        })
      }
    }
  }
    , [type, symbolPriceRules, marketPrice]);
  useEffect(() => {


    MakeGetRequestRemoteQuery({ symbol }, `${binance_url}/exchangeInfo?symbol=${main_currency}USDT`)
      .then(resp => {
        let x = resp.data
        let symbolPriceRulesp = x['symbols'][0];
        console.log('filer resp', symbolPriceRulesp)
        setSymbolPriceRules(symbolPriceRulesp)

      }).catch(err => {
        console.log('error in feetchign exhnge info')
      })
    MakeGetRequestRemoteQuery({ network, coin: main_currency }, `${binance_url}/ticker/24hr?symbol=${main_currency}USDT`)
      .then(resp => {
        let x = resp.data
        console.log('24h re', resp.data)
        let item = {
          priceChange: x.priceChange,
          priceChangePercent: x.priceChangePercent,
          lastPrice: x.lastPrice,
          highPrice: x.highPrice,
          lowPrice: x.lowPrice,
          volume: x.volume,
          quoteVolume: x.quoteVolume,
        }
        setTicker(item)
        setMarketPrice(formatDecimal(resp.data.lastPrice, 5))
        setPriceInputBuy(formatDecimal(resp.data.lastPrice, 5))
        setPriceInputSell(formatDecimal(resp.data.lastPrice, 5))
        /*    ws = new WebSocket(binance_stream);
            ws.onopen = function () {
              ws.send(JSON.stringify(
                {
                  "method": "SUBSCRIBE",
                  "params": [
                    `bnbusdt@ticker`,
    
    
                  ],
                  "id": 12
                }
              ))
              console.log("Connection opened...");
            };
    
            ws.onmessage = function (event: any) {
              const r = JSON.parse(event.data);
              console.log('socket reultr', r['result'])
              if (r['result'] === undefined) {
                console.log('here goes ', r)
                let item = {
                  priceChange: r.p,
                  priceChangePercent: r.P,
                  lastPrice: r.c,
                  highPrice: r.h,
                  lowPrice: r.l,
                  volume: r.v,
                  quoteVolume: r.q,
                }
                setTicker(item)
    
                // updateData(data => [...data, res1]); console.log('now', data)
              }
            };
    
            ws.onclose = function () {
              console.log("Connection closed...");
            };
    */
      }).catch(err => {
        console.log('balacne error', err)
        setMainCoinBalance(0)
        setUsdtBalance(0)
      })



  }, [])
  useEffect(() => {
     setErrorBuySide(undefined)
    verifyBalanceAndQty(usdtInput, 'USDT')
    if (symbolPriceRules !== undefined && marketPrice !== undefined && symbolPriceRules !== undefined) {
      const filter_error: any = filterOrder(symbolPriceRules, priceInputBuy, btcInput, 'bid', marketPrice, type, usdtInput)
      if (filter_error.length > 2) {
        setErrorBuySide(filter_error)
      }
      // else  setErrorBuySide(undefined)
    }
  }, [usdtInput])
  useEffect(() => {
setErrorBuySide(undefined)
    verifyBalanceAndQty(usdtInput, 'USDT')
    if (symbolPriceRules !== undefined && marketPrice !== undefined && symbolPriceRules !== undefined) {
      const filter_error: any = filterOrder(symbolPriceRules, priceInputBuy, btcInput, 'bid', marketPrice, type, usdtInput)
      if (filter_error.length > 2) {
        setErrorBuySide(filter_error)
      }
      // else  setErrorBuySide(undefined)
    }
  }, [btcInput])
  useEffect(() => {
     setErrorSellSide(undefined)
    verifyBalanceAndQty(btcInputSell, 'BTC')
    if (symbolPriceRules !== undefined && marketPrice !== undefined && symbolPriceRules !== undefined) {
      const filter_error: any = filterOrder(symbolPriceRules, priceInputSell, btcInputSell, 'ask', marketPrice, type, usdtInputSell)
      if (filter_error.length > 2) {
        setErrorSellSide(filter_error)
      }
      // else  setErrorSellSide(undefined)
    }
  }, [usdtInputSell])
  useEffect(() => {
    setErrorSellSide(undefined)
    verifyBalanceAndQty(btcInputSell, 'BTC')
    if (symbolPriceRules !== undefined && marketPrice !== undefined && symbolPriceRules !== undefined) {
      const filter_error: any = filterOrder(symbolPriceRules, priceInputSell, btcInputSell, 'ask', marketPrice, type, usdtInputSell)
      if (filter_error.length > 2) {
        setErrorSellSide(filter_error)
      }
      // else  setErrorSellSide(undefined)
    }
  }, [btcInputSell])
  useEffect(() => {
      setErrorBuySideMarket(undefined)
    verifyBalanceAndQty(usdtInputBuyMarket, 'USDT')
    if (symbolPriceRules !== undefined && marketPrice !== undefined && symbolPriceRules !== undefined) {
      const filter_error: any = filterOrder(symbolPriceRules, priceInputSell, btcInputBuyMarket, 'ask', marketPrice, type, usdtInputBuyMarket)
      if (filter_error.length > 2) {
        setErrorBuySideMarket(filter_error)
      }
     
    }
   
  }, [usdtInputBuyMarket])
  useEffect(() => {
     setErrorSellSideMarket(undefined)
    verifyBalanceAndQty(btcInputSellMarket, 'BTC')
    if (symbolPriceRules !== undefined && marketPrice !== undefined && symbolPriceRules !== undefined) {
      const filter_error: any = filterOrder(symbolPriceRules, priceInputSell, btcInputSellMarket, 'ask', marketPrice, type, usdtInputSellMarket)
      if (filter_error.length > 2) {
        setErrorSellSideMarket(filter_error)
      }
      
    }
  }, [usdtInputSellMarket])
  useEffect(() => {
       setErrorSellSideMarket(undefined)
    verifyBalanceAndQty(btcInputSellMarket, 'BTC')
    if (symbolPriceRules !== undefined && marketPrice !== undefined && symbolPriceRules !== undefined) {
      const filter_error: any = filterOrder(symbolPriceRules, priceInputSell, btcInputSellMarket, 'ask', marketPrice, 'MARKET', usdtInputSellMarket)
      if (filter_error.length > 2) {
        setErrorSellSideMarket(filter_error)
      }
    
    }
  }, [btcInputSellMarket])
  useEffect(() => {
     setErrorBuySideMarket(undefined)
    verifyBalanceAndQty(usdtInputBuyMarket, 'USDT')
    if (symbolPriceRules !== undefined && marketPrice !== undefined && symbolPriceRules !== undefined) {
      const filter_error: any = filterOrder(symbolPriceRules, priceInputSell, btcInputBuyMarket, 'bid', marketPrice, 'MARKET', usdtInputBuyMarket)
      if (filter_error.length > 2) {
        setErrorBuySideMarket(filter_error)
      }
     
    }
  }, [btcInputBuyMarket])
  useEffect(() => {
setErrorBuySide(undefined)
    verifyBalanceAndQty(usdtInput, 'USDT')
    if (symbolPriceRules !== undefined && marketPrice !== undefined && symbolPriceRules !== undefined) {

      const filter_error: any = filterOrder(symbolPriceRules, priceInputBuy, btcInput, 'bid', marketPrice, type, usdtInput)
      if (filter_error.length > 2) {
        setErrorBuySide(filter_error)
      }
      // else  setErrorBuySide(undefined)
    }
  }, [priceInputBuy])
  useEffect(() => {
     setErrorSellSide(undefined)
    verifyBalanceAndQty(btcInputSell, 'BTC')
    if (symbolPriceRules !== undefined && marketPrice !== undefined && symbolPriceRules !== undefined) {
      const filter_error: any = filterOrder(symbolPriceRules, priceInputSell, btcInputSell, 'ask', marketPrice, type, usdtInputSell)
      if (filter_error.length > 2) {
        setErrorSellSide(filter_error)
      }
      // else  setErrorSellSide(undefined)
    }
  }, [priceInputSell])

  const handlePriceInputBuyChange = (e: any) => {
    setPriceInputBuy(e.currentTarget.value)
    if (btcInput !== undefined)
      setUsdtInput(formatDecimal(e.currentTarget.value * btcInput, 5))


  }
  const handleBtcInputChange = (e: any) => {
    setBtcInput(e.currentTarget.value)
    if (marketPrice !== undefined)
      setUsdtInput(formatDecimal(e.currentTarget.value * priceInputBuy, 5))

  }

  const handlePriceInputSellChange = (e: any) => {
    setPriceInputSell(e.currentTarget.value)
    if (btcInput !== undefined)
      setUsdtInputSell(formatDecimal(e.currentTarget.value * btcInputSell, 5))

  }
  const handleBtcInputSellChange = (e: any) => {
    setBtcInputSell(e.currentTarget.value)
    if (priceInputSell !== undefined)
      setUsdtInputSell(formatDecimal(e.currentTarget.value * priceInputSell, 5))

  }
  const handleUsdtInputBuyChange = (e: any) => {
    setUsdtInput(e.currentTarget.value)
    if (priceInputSell !== undefined && priceInputBuy > 0)
      setBtcInput(formatDecimal(e.currentTarget.value / priceInputBuy, 5))

  }
  const handleUsdtInputSellChange = (e: any) => {
    setUsdtInputSell(e.currentTarget.value)
    if (priceInputSell !== undefined && priceInputBuy > 0)
      setBtcInputSell(formatDecimal(e.currentTarget.value / priceInputSell, 5))

  }
  const handleUsdtInputBuyMarketChange = (e: any) => {
    setUsdtInputBuyMarket(e.currentTarget.value)
    if (marketPrice !== undefined && marketPrice > 0)
      setBtcInputBuyMarket(formatDecimal(e.currentTarget.value / marketPrice, 5))

  }
  const handleUsdtInputSellMarketChange = (e: any) => {
    setUsdtInputSellMarket(e.currentTarget.value)
    if (marketPrice !== undefined && marketPrice > 0)
      setBtcInputSellMarket(formatDecimal(e.currentTarget.value / marketPrice, 5))

  }
  const handleBtcInputBuyMarketChange = (e: any) => {
    setBtcInputBuyMarket(e.currentTarget.value)
    if (marketPrice !== undefined)
      setUsdtInputBuyMarket(formatDecimal(e.currentTarget.value * marketPrice, 5))

  }
  const handleBtcInputSellMarketChange = (e: any) => {
    setBtcInputSellMarket(e.currentTarget.value)
    if (marketPrice !== undefined)
      setUsdtInputSellMarket(formatDecimal(e.currentTarget.value * marketPrice, 5))

  }
  const handlePercentChange = (side1: string, percent: any) => {
    if (type == 'LIMIT') {
      if (side1 == 'BUY') {
        let f = (Number(usdtBalance) * percent) / 100
        setUsdtInput(formatDecimal(f, 5))
        setBtcInput(formatDecimal(f / priceInputBuy, 5))
      }
      else {
        let f = (Number(mainCoinBalance) * percent) / 100
        setBtcInputSell(formatDecimal(f, 5))
        setUsdtInputSell(formatDecimal(f * priceInputSell, 5))
      }
    }
    else {
      if (side1 == 'BUY') {
        let f = (Number(usdtBalance) * percent) / 100
        setUsdtInputBuyMarket(formatDecimal(f, 5))
        setBtcInputBuyMarket(formatDecimal(f / marketPrice, 5))
      }
      else {
        let f = (Number(mainCoinBalance) * percent) / 100
        setBtcInputSellMarket(formatDecimal(f, 5))
        setUsdtInputSellMarket(formatDecimal(f * marketPrice, 5))
      }
    }


  }
  const verifyBalanceAndQty = (inputAmount: any, coin: string) => {
    if (type == 'LIMIT'){
      if (coin == main_currency) {/**means sell side */
        if (parseFloat(inputAmount) > Number(mainCoinBalance)) {
          // setBtcInputSell(0.0)
          setErrorSellSide('Insufficient Balance')
        }
        else {
          setErrorSellSide(undefined)
        }

      }
      else { /**means buy side */
        if (parseFloat(inputAmount) > Number(usdtBalance)) {
          // setBtcInputSell(0.0)
          setErrorBuySide('Insufficient Balance')
        }
        else {
          setErrorBuySide(undefined)
        }
      }
    }
    else {
      if (coin == main_currency) {
        if (parseFloat(inputAmount) > Number(mainCoinBalance)) {
          // setBtcInputSell(0.0)
          setErrorSellSideMarket('Insufficient Balance')
        }
        else {
          setErrorSellSideMarket(undefined)
        }

      }
      else { /**means buy side */
        if (parseFloat(inputAmount) > Number(usdtBalance)) {
         console.log('hrerr')
          setErrorBuySideMarket('Insufficient Balance')
        }
        
      }
    }

  }

  const handleSubmit = async (e: any, side1: string) => {

    e.preventDefault();
    if (type == 'LIMIT') {
      if (side1 == 'BUY') {
        if (usdtInput <= 0 || btcInput <= 0)
          return;
      }
      else {
        if (btcInputSell <= 0 || usdtInputSell <= 0)
          return;
      }
      if (authToken === undefined) alert('Please login')
      try {
        //alert(btcInput)
        let quantity = side1 == 'BUY' ? btcInput : btcInputSell;
        if (quantity < 1)
          quantity = String(Number(quantity)).padStart(0);
         let price = side1 == 'BUY' ? priceInputBuy : priceInputSell;
        if (price < 1)
          price = String(Number(price)).padStart(0);

       
        side1 == 'BUY' ? setLoadingBuy(true) : setLoadingSell(true)
        const response = await MakePostRequest({
          side: side1, type, symbol, price, quantity, main_currency, secondary_currency: 'USDT'
        }, 'binance/placeOrder', authToken)
        console.log('place orde repose', response.data.data)
        setOrderList(JSON.parse(response.data.data))
        if (response.data.success)
          setSuccessAlert({ show: true, message: response.data.message })
        else
          setErrorAlert({ show: true, message: response.data.message })
        side1 == 'BUY' ? setLoadingBuy(false) : setLoadingSell(false)
      }
      catch (err: any) {
        side1 == 'BUY' ? setLoadingBuy(false) : setLoadingSell(false)
        if (err.isAxiosError) {
          console.log(err.response.data)
          setErrorAlert({ show: true, message: err.response.data.message })

        }
        else
          setErrorAlert({ show: true, message: err })
      }
    }
    else { /***Market submit */
      if (side1 == 'BUY') {
        if (usdtInputBuyMarket <= 0 || btcInputBuyMarket <= 0)
          return;
      }
      else {
        if (btcInputSellMarket <= 0 || usdtInputSellMarket <= 0)
          return;
      }
      if (authToken === undefined) alert('Please login')
      try {
        //alert(btcInput)
        let quantity = side1 == 'BUY' ? btcInputBuyMarket : btcInputSellMarket;
        if (quantity < 1)
          quantity = String(Number(quantity)).padStart(0);
        side1 == 'BUY' ? setLoadingBuyMarket(true) : setLoadingSellMarket(true)
        const response = await MakePostRequest({
          side: side1, type, symbol, price: null, quantity, main_currency, secondary_currency: 'USDT'
        }, 'binance/placeOrder', authToken)
        console.log('place orde market repose', response.data)
        if (response.data.success)
          setSuccessAlert({ show: true, message: response.data.message })
        else
          setErrorAlert({ show: true, message: response.data.message })
        side1 == 'BUY' ? setLoadingBuyMarket(false) : setLoadingSellMarket(false)
      }
      catch (err: any) {
        side1 == 'BUY' ? setLoadingBuyMarket(false) : setLoadingSellMarket(false)
        if (err.isAxiosError) {
          console.log(err.response.data)
          setErrorAlert({ show: true, message: err.response.data.message })

        }
        else
          setErrorAlert({ show: true, message: err })
      }
    }
  }
  function goToLogin() {
    //alert()
     router.push('/auth/login')
  }
  return (
    <div className="body d-flex py-3 pt-4">
      <div className="container-xxl">
        {successAlert.show && <SuccessAlert message={successAlert.message} />}
        {errorAlert.show && <ErrorAlert message={errorAlert.message} />}
        <div className="card">
          <div className="card-body">
            <div className="row">
              <div className="col-md-2 text-center  pt-3">
                <h5>{main_currency}/USDT</h5></div>
              <div className="col-md-10 pt-2">
                {ticker !== undefined ? <Ticker ticker={ticker} mainCurrency={main_currency} /> : ''}
              </div>
            </div>


          </div>


        </div>

        <div className="row  mb-3">

          <div className="col-md-3">

            <div className="card">
              <div className="card-header py-3 d-flex justify-content-between bg-transparent border-bottom-0">
                <h6 className="mb-0 fw-bold ">Order Book</h6>
              </div>
              <OrderBook coin={main_currency} />
            </div>

          </div>
          <div className="col-md-6">
            <div className="card">
              <div className="card-body">

                {/* TradingView Widget BEGIN */}
                <div className="tradingview-widget-container">
                  <Indicator coin={main_currency} />
                </div>
                {/* TradingView Widget END */}
              </div>
            </div>
            <div className="card mb-3">
              <div className="card-header py-3 d-flex justify-content-between bg-transparent border-bottom-0">
                <h6 className="mb-0 fw-bold ">Place Order</h6>
              </div>
              <div className="card-body">
                <ul
                  className="nav nav-tabs tab-body-header rounded d-inline-flex"
                  role="tablist"
                >
                  <li className="nav-item">
                    <a
                      className={`nav-link pointer ${type == 'LIMIT' ? 'active' : ''}`}
                      onClick={e => setType('LIMIT')}
                      role="tab"
                    >
                      Limit
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className={`nav-link pointer ${type == 'MARKET' ? 'active' : ''}`}
                      onClick={e => setType('MARKET')}
                      role="tab"
                    >
                      Market
                    </a>
                  </li>

                </ul>
                <div className="tab-content">
                  <div className={`tab-pane fade ${type == 'LIMIT' ? 'show active' : ''}`} id="Limit">
                    <div className="row g-3">
                      <div className="col-lg-6">
                        <div className="d-flex align-items-center justify-content-between my-3">
                          <span className="small text-muted">Avbl</span>
                          <span className="">{formatDecimal(usdtBalance, 5)} USDT</span>
                        </div>
                        <form>
                          <a data-trigger="focus" style={{ borderBottom: '1px dotted blue' }} role="button" type="button" className="mb-1" id="popBuy"
                            data-bs-toggle="popover" title="Order Rules" >
                            <small>&nbsp;&nbsp;Price Rules</small> </a>
                          <div className="input-group mb-3">

                            <span className="input-group-text">Price</span>

                            <input type="text" className="form-control" value={priceInputBuy} onChange={e => handlePriceInputBuyChange(e)} />
                            <span className="input-group-text">USDT</span>
                          </div>
                          <div className="input-group mb-3">
                            <span className="input-group-text">Amount</span>
                            <input type="text" className="form-control" value={btcInput} onChange={e => handleBtcInputChange(e)} />
                            <span className="input-group-text">{main_currency}</span>
                          </div>
                          <div className="input-group mb-3">
                            <div className="mb-2 d-flex justify-content-between align-items-center w-100">
                              <span className="text-muted pointer" onClick={e => handlePercentChange('BUY', 0)}>0%</span>
                              <span className="text-muted px-2 pointer" onClick={e => handlePercentChange('BUY', 25)}>25%</span>
                              <span className="text-muted px-1 pointer" onClick={e => handlePercentChange('BUY', 50)}>50%</span>
                              <span className="text-muted px-1 pointer" onClick={e => handlePercentChange('BUY', 75)}>75%</span>
                              <span className="text-muted pointer" onClick={e => handlePercentChange('BUY', 100)}>100%</span>
                            </div>

                          </div>
                          <div className="input-group mb-3">
                            <span className="input-group-text">Total</span>
                            <input type="text" className="form-control" value={usdtInput} onChange={e => handleUsdtInputBuyChange(e)} />
                            <span className="input-group-text">USDT</span>
                          </div>
                          {
                            errorBuySide !== undefined
                              ? <span className="text-danger m-2">{errorBuySide}</span>
                              : <span>&nbsp;</span>
                          }
                          {
                            status == 'unauthenticated' ?
                              <button
                                type="button" onClick={e => goToLogin()}
                                className="btn flex-fill btn-light-success py-2 fs-5 text-uppercase px-5 w-100"
                              >
                                Login Or Signup

                              </button>
                              :
                              <button
                                disabled={loadingBuy || (errorBuySide !== undefined && errorBuySide.length > 0)}
                                type="button" onClick={e => handleSubmit(e, 'BUY')}
                                className="btn flex-fill btn-light-success py-2 fs-5 text-uppercase px-5 w-100"
                              >
                                {
                                  loadingBuy ?
                                    <div className="d-flex align-items-center align-content-center ">
                                      <span className="spinner-border spinner-border-md"></span>BUY {main_currency}
                                    </div>
                                    : <span> BUY {main_currency} </span>
                                }

                              </button>
                          }
                        </form>
                      </div>
                      <div className="col-lg-6">
                        <div className="d-flex align-items-center justify-content-between my-3">
                          <span className="small text-muted">Avbl</span>
                          <span className="">{formatDecimal(mainCoinBalance, 5)} {main_currency}</span>
                        </div>
                        <form>
                          <a data-trigger="focus" style={{ borderBottom: '1px dotted blue' }} role="button" type="button" className="mb-1" id="popSell"
                            data-bs-toggle="popover" title="order Rules" >
                            <small>&nbsp;&nbsp;Price Rules</small> </a>
                          <div className="input-group mb-3">

                            <span className="input-group-text">Price</span>
                            <input type="text" className="form-control" value={priceInputSell} onChange={e => handlePriceInputSellChange(e)} />
                            <span className="input-group-text">USDT</span>
                          </div>
                          <div className="input-group mb-3">
                            <span className="input-group-text">Amount</span>
                            <input type="text" className="form-control" value={btcInputSell} onChange={e => handleBtcInputSellChange(e)} />
                            <span className="input-group-text">{main_currency}</span>
                          </div>
                          <div className="input-group mb-3">
                            <div className="mb-2 d-flex justify-content-between align-items-center w-100">
                              <span className="text-muted pointer" onClick={e => handlePercentChange('SELL', 0)}>0%</span>
                              <span className="text-muted px-2 pointer" onClick={e => handlePercentChange('SELL', 25)}>25%</span>
                              <span className="text-muted px-1 pointer" onClick={e => handlePercentChange('SELL', 50)}>50%</span>
                              <span className="text-muted px-1 pointer" onClick={e => handlePercentChange('SELL', 75)}>75%</span>
                              <span className="text-muted pointer" onClick={e => handlePercentChange('SELL', 100)}>100%</span>
                            </div>

                          </div>
                          <div className="input-group mb-3">
                            <span className="input-group-text">Total</span>
                            <input type="text" className="form-control" value={usdtInputSell} onChange={e => handleUsdtInputSellChange(e)} />
                            <span className="input-group-text">USDT</span>
                          </div>
                          {
                            errorSellSide !== undefined
                              ? <span className="text-danger m-2">{errorSellSide}</span>
                              : <span>&nbsp;</span>
                          }
                          {
                            status == 'unauthenticated' ?
                              <button
                                type="button" onClick={e => goToLogin()}
                                className="btn flex-fill btn-light-danger py-2 fs-5 text-uppercase px-5 w-100"
                              >
                                Login Or Signup

                              </button>
                              :
                              <button
                                disabled={loadingSell || (errorSellSide !== undefined && errorSellSide.length > 0)}
                                type="button" onClick={e => handleSubmit(e, 'SELL')}
                                className="btn flex-fill btn-light-danger py-2 fs-5 text-uppercase px-5 w-100"
                              >                             {
                                  loadingSell ?
                                    <div className="d-flex align-items-center align-content-center ">
                                      <span className="spinner-border spinner-border-md"></span>SELL {main_currency}
                                    </div>
                                    : <span> SELL {main_currency} </span>
                                }
                              </button>
                          }
                        </form>
                      </div>
                    </div>
                  </div>
                  {/* Limit Tab End */}
                  <div className={`tab-pane fade ${type == 'MARKET' ? 'show active' : ''}`} id="Market">
                    <div className="row g-3">
                      <div className="col-lg-6">
                        <div className="d-flex align-items-center justify-content-between my-3">
                          <span className="small text-muted">Avbl</span>
                          <span className="">{formatDecimal(usdtBalance, 5)} USDT</span>
                        </div>
                        <form>
                          <a data-trigger="focus" style={{ borderBottom: '1px dotted blue' }} role="button" type="button" className="mb-1" id="popBuy1"
                            data-bs-toggle="popover" title="Order Rules" >
                            <small>&nbsp;&nbsp;Price Rules</small> </a>
                          <div className="input-group mb-3">
                            <span className="input-group-text">Amount</span>
                            <input type="text" className="form-control" value={btcInputBuyMarket} onChange={e => handleBtcInputBuyMarketChange(e)} />
                            <span className="input-group-text">{main_currency}</span>
                          </div>
                          <div className="input-group mb-3">
                            <div className="mb-2 d-flex justify-content-between align-items-center w-100">
                              <span className="text-muted pointer" onClick={e => handlePercentChange('BUY', 0)}>0%</span>
                              <span className="text-muted px-2 pointer" onClick={e => handlePercentChange('BUY', 25)}>25%</span>
                              <span className="text-muted px-1 pointer" onClick={e => handlePercentChange('BUY', 50)}>50%</span>
                              <span className="text-muted px-1 pointer" onClick={e => handlePercentChange('BUY', 75)}>75%</span>
                              <span className="text-muted pointer" onClick={e => handlePercentChange('BUY', 100)}>100%</span>
                            </div>

                          </div>
                          <div className="input-group mb-3">
                            <span className="input-group-text">Total</span>
                            <input type="text" className="form-control" value={usdtInputBuyMarket} onChange={e => handleUsdtInputBuyMarketChange(e)} />
                            <span className="input-group-text">USDT</span>
                          </div>
                          {
                            errorBuySideMarket !== undefined
                              ? <span className="text-danger m-2">{errorBuySideMarket}</span>
                              : <span>&nbsp;</span>
                          }
                          {
                            status == 'unauthenticated' ?
                              <button
                                type="button" onClick={e => goToLogin()}
                                className="btn flex-fill btn-light-success py-2 fs-5 text-uppercase px-5 w-100"
                              >
                                Login Or Signup

                              </button>
                              :
                              <button
                                disabled={loadingBuyMarket || (errorBuySideMarket !== undefined && errorBuySideMarket.length > 0)}
                                type="button" onClick={e => handleSubmit(e, 'BUY')}
                                className="btn flex-fill btn-light-success py-2 fs-5 text-uppercase px-5 w-100"
                              >                             {
                                  loadingBuyMarket ?
                                    <div className="d-flex align-items-center align-content-center ">
                                      <span className="spinner-border spinner-border-md"></span>BUY {main_currency}
                                    </div>
                                    : <span> BUY {main_currency} </span>
                                }
                              </button>
                          }
                        </form>
                      </div>
                      <div className="col-lg-6">

                        <div className="d-flex align-items-center justify-content-between my-3">
                          <span className="small text-muted">Avbl</span>
                          <span className="">{mainCoinBalance} {main_currency}</span>
                        </div>
                        <form>
                          <a data-trigger="focus" style={{ borderBottom: '1px dotted blue' }} role="button" type="button" className="mb-1" id="popSell1"
                            data-bs-toggle="popover" title="Order Rules" >
                            <small>&nbsp;&nbsp;Price Rules</small> </a>
                          <div className="input-group mb-3">
                            <span className="input-group-text">Amount</span>
                            <input type="text" className="form-control" value={btcInputSellMarket} onChange={e => handleBtcInputSellMarketChange(e)} />
                            <span className="input-group-text">{main_currency}</span>
                          </div>
                          <div className="input-group mb-3">
                            <div className="mb-2 d-flex justify-content-between align-items-center w-100">
                              <span className="text-muted pointer" onClick={e => handlePercentChange('SELL', 0)}>0%</span>
                              <span className="text-muted px-2 pointer" onClick={e => handlePercentChange('SELL', 25)}>25%</span>
                              <span className="text-muted px-1 pointer" onClick={e => handlePercentChange('SELL', 50)}>50%</span>
                              <span className="text-muted px-1 pointer" onClick={e => handlePercentChange('SELL', 75)}>75%</span>
                              <span className="text-muted pointer" onClick={e => handlePercentChange('SELL', 100)}>100%</span>
                            </div>

                          </div>
                          <div className="input-group mb-3">
                            <span className="input-group-text">Total</span>
                            <input type="text" className="form-control" value={usdtInputSellMarket} onChange={e => handleUsdtInputSellMarketChange(e)} />
                            <span className="input-group-text">USDT</span>
                          </div>
                          {
                            errorSellSideMarket !== undefined
                              ? <span className="text-danger m-2">{errorSellSideMarket}</span>
                              : <span>&nbsp;</span>
                          }
                          {
                            status == 'unauthenticated' ?
                              <button
                                type="button" onClick={e => goToLogin()}
                                className="btn flex-fill btn-light-danger py-2 fs-5 text-uppercase px-5 w-100"
                              >
                                Login Or Signup

                              </button>
                              :
                              <button
                                disabled={loadingSellMarket || (errorSellSideMarket !== undefined && errorSellSideMarket.length > 0)}
                                type="button" onClick={e => handleSubmit(e, 'SELL')}
                                className="btn flex-fill btn-light-danger py-2 fs-5 text-uppercase px-5 w-100"
                              >                             {
                                  loadingSellMarket ?
                                    <div className="d-flex align-items-center align-content-center ">
                                      <span className="spinner-border spinner-border-md"></span>SELL {main_currency}
                                    </div>
                                    : <span> SELL {main_currency} </span>
                                }
                              </button>
                          }
                        </form>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>
          <div className="col-md-3">

            <div className="card">
              <div className="card-header py-3 d-flex justify-content-between bg-transparent border-bottom-0">
                <h6 className="mb-0 fw-bold ">Trades ({main_currency} /USDT)</h6>
              </div>
              <Trade coin={main_currency} />
            </div>

          </div>
        </div>
        {/* Row End */}


        <div className="row g-3 mb-3">

          <div className="col-xxl-12">

            <div className="card">
              <div className="card-header py-3 d-flex justify-content-between bg-transparent border-bottom-0">
                <h6 className="mb-0 fw-bold ">Order History</h6>
              </div>
              <div className="card-body">
                <ul
                  className="nav nav-tabs tab-body-header rounded d-inline-flex mb-3"
                  role="tablist"
                >
                  <li className="nav-item">
                    <a
                      className="nav-link active"
                      data-bs-toggle="tab"
                      href="#OpenOrder"
                      role="tab"
                    >
                      Open Order
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className="nav-link"
                      data-bs-toggle="tab"
                      href="#OrderHistory"
                      role="tab"
                    >
                      Order History
                    </a>
                  </li>

                </ul>
                <div className="tab-content">
                  <div className="tab-pane fade show active" id="OpenOrder">
                    <table
                      id="ordertabone"
                      className="priceTable table table-hover custom-table-2 table-bordered align-middle mb-0"
                      style={{ width: "100%" }}
                    >
                      <thead>
                        <tr>
                          <th>Date</th>
                          <th>Pair</th>
                          <th>Type</th>
                          <th>Side</th>
                          <th>Price</th>
                          <th>Amount</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                          orderList != undefined && orderList.length > 0 ? orderList.filter(v => { return  v['status']!='FILLED'}).map(v => { 
                            return (  <tr>
                              <td>{ v['created_at']}</td>
                          <td>
                            <img src={`assets/images/coin/${v['symbol'].substr( 0, v['symbol'].indexOf('USDT'))}.png`}
                              alt="s"
                              className="img-fluid avatar mx-1"
                            />
                                {v['symbol'].substr( 0, v['symbol'].indexOf('USDT'))}/USDT
                          </td>
                              <td>{v['type']}</td>
                          <td>
                            <span className={`color-price-${v['side']=='SELL'?'down':'up'}`}>{v['side']}</span>
                          </td>
                          <td>{v['settled_price']}</td>
                          <td>{v['executedQty']}</td>
                          <td>
                            <div className="btn-group" role="group">
                              <button
                                type="button"
                                className="btn btn-outline-secondary"
                              >
                                <i className="icofont-edit text-success" />
                              </button>
                              <button
                                type="button"
                                className="btn btn-outline-secondary deleterow"
                              >
                                <i className="icofont-ui-delete text-danger" />
                              </button>
                            </div>
                          </td>
                            </tr>)
                          })
                         
                            : <tr><td colSpan={7} style={{textAlign:'center'}}>No orders</td></tr>
                       }
                      </tbody>
                    </table>
                  </div>
                  {/* OpenOrdertab End */}
                  <div className="tab-pane fade" id="OrderHistory">
                    <table
                      id="ordertabtwo"
                      className="priceTable table table-hover custom-table-2 table-bordered align-middle mb-0"
                      style={{ width: "100%" }}
                    >
                      <thead>
                        <tr>
                          <th>Date</th>
                          <th>Pair</th>
                          <th>Type</th>
                          <th>Side</th>
                          <th>Average</th>
                          <th>Price</th>
                          <th>Executed</th>
                          <th>Amount</th>
                          <th>Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                          orderList != undefined && orderList.length > 0 ? orderList.map(v => { 
                            return (  <tr>
                              <td>{ v['created_at']}</td>
                          <td>
                            <img src={`assets/images/coin/${v['symbol'].substr( 0, v['symbol'].indexOf('USDT'))}.png`}
                              alt="s"
                              className="img-fluid avatar mx-1"
                            />
                                {v['symbol'].substr( 0, v['symbol'].indexOf('USDT'))}/USDT
                          </td>
                              <td>{v['type']}</td>
                          <td>
                            <span className={`color-price-${v['side']=='SELL'?'down':'up'}`}>{v['side']}</span>
                          </td>
                          <td>{v['settled_price']}</td>
                          <td>{v['executedQty']}</td>
                          <td>
                            <div className="btn-group" role="group">
                              <button
                                type="button"
                                className="btn btn-outline-secondary"
                              >
                                <i className="icofont-edit text-success" />
                              </button>
                              <button
                                type="button"
                                className="btn btn-outline-secondary deleterow"
                              >
                                <i className="icofont-ui-delete text-danger" />
                              </button>
                            </div>
                          </td>
                            </tr>)
                          })
                         
                            : <tr><td colSpan={7} style={{textAlign:'center'}}>No orders</td></tr>
                       }
                      </tbody>
                    </table>
                  </div>

                  {/* Fundstab End */}
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Row End */}


      </div>
    </div >

  )
}