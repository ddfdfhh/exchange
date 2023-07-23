/* eslint-disable*/
"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { MakeGetRequestNoQuery } from "../util/make_post_request";

let authToken: string | undefined;
const isBrowser = typeof window !== "undefined";

type Trade = {
  price: number;
  quantity: number;
  time: number;
  isBuyer: boolean;
};
let ws: any;

export default function Trade(props:any) {
  const [depth, setDepth] = useState("10");
  const [wsInstance, setWsInstance] = useState<any>(null);

  const [trades, updateTrades] = useState<Array<Trade>>([]);

  useEffect(() => {
    //  updateTrades(trades => []);

    // const url = `https://testnet.binance.vision/api/v3/klines?symbol=BTCUSDT&interval=${interval}&limit=100`
    const url = `https://api.binance.com/api/v3/trades?limit=15&symbol=${props.coin}USDT`;
   /* MakeGetRequestNoQuery(url, authToken).then((res: any) => {
      let res1 = res["data"].map((v: any) => {
        return {
          price: v.price,
          quantity: v["qty"],
          time: v["time"],
          isBuyer: v["isBuyerMaker"],
        };
      });
      res1.sort((a, b) => {
        return b.time - a.time;
      });
      updateTrades((trades) => [...res1]);
      console.log("inside api afiani");
      if (isBrowser) {
        ws = new WebSocket("wss://stream.binance.com:9443/ws");
        ws.onopen = function () {
          ws.send(
            JSON.stringify({
              method: "SUBSCRIBE",
              params: ["bnbusdt@trade"],
              id: 12,
            })
          );
          console.log("Connection opened...");
        };

        ws.onmessage = function (event: any) {
          const r = JSON.parse(event.data);

          if (r["result"] === undefined) {
            let g = {
              price: r["p"],
              quantity: r["q"],
              time: r["T"],
              isBuyer: r["m"],
            };

            updateTrades((trades) => [g, ...trades]);
          }
        };

        ws.onclose = function () {
          console.log("Connection closed...");
        };
      }
    });

    return () => {
      if (ws?.readyState !== 3) ws.close(1000, "unknown");
    };*/
  }, []);

  useEffect(() => {
    if (trades.length > 14) {
      trades.pop();
      updateTrades((trades) => [...trades]);
    }
  }, [trades]);

  return (
    <>
      <div className="card-body">
        <table
          id="priceTabledown"
          className="priceTable table table-hover  align-middle mb-0"
          style={{ width: "100%" }}
        >
          <thead>
            <tr>
              <th>Price(USDT)</th>
              <th>Qty(BTC)</th>
              <th>Time</th>
              
            </tr>
          </thead>
          <tbody>
            {trades.map((v: any) => {
              return (
                <tr>
                  <td>
                    <span
                      className={`color-price-${
                        !v["isBuyer"] ? "up" : "down"
                      }`}
                    >
                      {parseFloat(v["price"]).toFixed(5)}
                    </span>
                  </td>
                  <td>{parseFloat(v["quantity"]).toFixed(5)}</td>
                      <td>{
                           new Date(v['time']).getDate() == new Date().getDate()
                              ? new Date(v['time']).getHours() + ':' + new Date(v['time']).getMinutes() + ':' + new Date(v['time']).getSeconds()
                              :new Date(v['time']).getFullYear() + '/' + new Date(v['time']).getMonth() + '/' + new Date(v['time']).getDate()+' '+new Date(v['time']).getHours() + ':' + new Date(v['time']).getMinutes() + ':' + new Date(v['time']).getSeconds()
                        }</td>
                 
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
