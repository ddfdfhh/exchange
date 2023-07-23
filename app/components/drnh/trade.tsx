/* eslint-disable*/
"use client";

import { formatDate } from "@/app/util/helpers";
import React, { useCallback, useEffect, useRef, useState } from "react";

export default function DrnhTrade(props:any) {
  const [depth, setDepth] = useState("10");
 

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
           {  props?.trades!==undefined && props?.trades.length > 0 && props?.trades.map((trade: any, index: number) => {
                                    return (
                                        <tr key={ index}>
                                           
                                        <td>
                                          <span
                                            className="color-price-up"
                                          >
                                            {parseFloat(trade["price"]).toFixed(5)}
                                          </span>
                                        </td>
                                       <td>{parseFloat(trade["size"]).toFixed(5)}</td>
                                        <td>{ formatDate(trade['created_at'])}
                                           </td>
                 
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
