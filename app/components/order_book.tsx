
/* eslint-disable*/
'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react'
import { MakeGetRequestNoQuery, MakeGetRequestRemoteQueryNoParam } from '../util/make_post_request'


let authToken: string | undefined
const isBrowser = typeof window !== "undefined";
type Bid = {
    amount: number;
    quantity: number;

}
type Ask = {
    amount: number;
    quantity: number;

}
let ws: any

export default function OrderBook(props:any) {
    const [depth, setDepth] = useState('10');
    const [wsInstance, setWsInstance] = useState<any>(null);

    const [bid, updateBid] = useState<Array<Array<number>>>([])
    const [ask, updateAsk] = useState<Array<Array<number>>>([])


    // useEffect(() => {
    //     console.log('inteval changed')

    //     updateData(data => []);
    // }, [interval])

    useEffect(() => {
        updateBid(bid => []);
        updateAsk(ask => []);

        // const url = `https://testnet.binance.vision/api/v3/klines?symbol=BTCUSDT&interval=${interval}&limit=100`
        const url = `https://api.binance.com/api/v3/depth?limit=10&symbol=${props.coin}USDT`
        MakeGetRequestRemoteQueryNoParam(url)
            .then((res: any) => {

                updateBid(bid => [...res['data']['bids']])
                updateAsk(bid => [...res['data']['asks']])

                if (isBrowser) {
                    ws = new WebSocket('wss://stream.binance.com:9443/ws');
                    ws.onopen = function () {
                        ws.send(JSON.stringify(
                            {
                                "method": "SUBSCRIBE",
                                "params": [
                                    "bnbusdt@depth5"

                                ],
                                "id": 12
                            }
                        ))
                        console.log("Connection opened...");
                    };

                    ws.onmessage = function (event: any) {
                        const r = JSON.parse(event.data);
                        console.log('socket bids', r['bids'])
                        if (r['result'] === undefined) {


                            updateBid(bid => [...r['bids']])
                            updateAsk(bid => [...r['asks']])
                        }
                    };

                    ws.onclose = function () {
                        console.log("Connection closed...");
                    };



                }
            })



        return () => {

            if (ws!==undefined && ws?.readyState !== 3)
                ws.close(1000, 'unknown')


        }
        
    }, []);



    return <>
        <div className="card-body" style={{ paddingLeft: '1px' }}>

            <div className="tab-content">
                <div className="tab-pane fade show active" id="Both">
                    <table
                        id="priceTableup"
                        className="priceTable table table-hover custom-table-2 table-bordered align-middle mb-0"
                        style={{ width: "100%" }}
                    >
                        <thead>
                            <tr>
                                <th>Price(USDT)</th>
                                <th>Amount(BTC)</th>
                                <th>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                bid.map((v: any) => {
                                    return (
                                        <tr>
                                            <td>
                                                <span className="color-price-up">{parseFloat(v[0]).toFixed(5)}</span>
                                            </td>
                                            <td>{parseFloat(v[1]).toFixed(5)}</td>
                                            <td>{(v[0] * v[1]).toFixed(5)}</td>
                                        </tr>


                                    )
                                })


                            }

                        </tbody>
                    </table>
                    <table
                        id="priceTabledown"
                        className="priceTable table table-hover custom-table-2 table-bordered align-middle mb-0"
                        style={{ width: "100%" }}
                    >
                        <thead>
                            <tr>
                                <th>Price(USDT)</th>
                                <th>Amount(BTC)</th>
                                <th>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                ask.map((v: any) => {
                                    return (
                                        <tr>
                                            <td>
                                                <span className="color-price-down">{parseFloat(v[0]).toFixed(5)}</span>
                                            </td>
                                            <td>{parseFloat(v[1]).toFixed(5)}</td>
                                            <td>{(v[0] * v[1]).toFixed(5)}</td>
                                        </tr>


                                    )
                                })


                            }

                        </tbody>
                    </table>
                </div>

            </div>
        </div>
    </>
}