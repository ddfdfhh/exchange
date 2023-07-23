
/* eslint-disable*/
'use client';

import { CONFIG_FILES } from 'next/dist/shared/lib/constants';
import React, { useCallback, useEffect, useRef, useState } from 'react'


export default function DrnhOrderBook(props:any) {
    const [depth, setDepth] = useState('10');
    const [wsInstance, setWsInstance] = useState<any>(null);
    
   
   



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
                                <th>Amount({ props.coin})</th>
                                <th>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            
                               {  props?.buy_orders!==undefined && props?.buy_orders.length > 0 && props?.buy_orders.map((order: any, index: number) => {
                                    return (
                                        <tr key={ index}>
                                            <td>
                                                <span className="color-price-up">{parseFloat(order?.price).toFixed(5)}</span>
                                            </td>
                                            <td>{parseFloat(order?.size).toFixed(5)}</td>
                                            <td>{order?.volume}</td>
                                        </tr>


                                    )
                                })


                            }

                        </tbody>
                    </table>
                    <div>
                        {
                            props.last_traded_pric > props.second_last_traded_price ?
                                <div style={{ width: '100 %', textAlign: 'center' }}>
                                    <span className="text-success">
                                        {props.last_traded_price}
                                        <i className="icofont-long-arrow-up text-success"></i>
                                    </span>
                                </div>
                                :<div style={{ width: '100 %', textAlign: 'center' }}>
                                    <span className="text-danger">
                                        {props.last_traded_price}
                                        <i className="icofont-long-arrow-up text-danger"></i>
                                    </span>
                                </div>
                        }
                    </div>
                    <table
                        id="priceTabledown"
                        className="priceTable table table-hover custom-table-2 table-bordered align-middle mb-0"
                        style={{ width: "100%" }}
                    >
                        <thead>
                            <tr>
                                <th>Price(USDT)</th>
                                <th>Amount({ props.coin})</th>
                                <th>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                              {   props?.sell_orders!==undefined && props?.sell_orders.length > 0 && props?.sell_orders.map((order: any, index: number) => {
                                    return (
                                        <tr key={ index}>
                                            <td>
                                                <span className="color-price-down">{parseFloat(order?.price).toFixed(5)}</span>
                                            </td>
                                            <td>{parseFloat(order?.size).toFixed(5)}</td>
                                            <td>{order?.volume}</td>
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