'use client';

import Deposit from "@/app/components/wallet/deposit";
import Withdraw from "@/app/components/wallet/withdraw";
import { MakeGetRequestNoQuery } from "@/app/util/make_post_request";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

const network_options = {
    BTC: [
        { value: "BEP20", label: "Binance Smart Chain BEP20" },
        { value: "Bitcoin", label: "Bitcoin" }

    ],
    BNB: [
        { value: "BEP20", label: "Binance Smart Chain BEP20" },
        { value: "", label: "" },
    ],
    ETH: [
        { value: "Ethereum", label: "Ethereum" },
        { value: "", label: "" },
    ],

    USDT: [

        { value: "BEP20", label: "BEP20" },
        { value: "", label: "" },
    ],
    DRNH: [
        { value: "BEP20", label: "Binance Smart Chain" },
        { value: "", label: "" },
    ]
} as any;
 let authToken: string | undefined
export default function Wallet() {
    const { status, data: session } = useSession()
   
     useEffect(() => { 
       
       if (status == 'authenticated') {
         authToken = session?.user?.accessToken
          
       
      
       }
       else if (status == 'unauthenticated') {
         return redirect('auth/login')
      
       }
          
        
      
    },[status])
  
   
    return (
        <div className="body d-flex py-3">
            <div className="container-xxl">
                <div className="row align-items-center">
                    <div className="border-0 mb-4">
                        <div className="card-header py-3 no-bg bg-transparent d-flex align-items-center px-0 justify-content-between border-bottom flex-wrap">
                            <h3 className="fw-bold mb-0"> Wallet1</h3>
                        </div>
                    </div>
                </div>
                <div className="container-xxl">
                  
                    <div className="row g-3 mb-3 row-deck">

                        <div className="col-xl-6 col-xxl-6">
                            <div className="card">
                                <div className="card-header py-3 d-flex justify-content-between bg-transparent align-items-center">
                                    <h6 className="mb-0 fw-bold">Withdraw Crypto</h6>
                                </div>
                                <Withdraw network_options={network_options} token={ authToken} />
                            </div>
                        </div>
                        <div className="col-xl-6 col-xxl-6">
                            <div className="card">
                                <div className="card-header py-3 d-flex justify-content-between bg-transparent border-bottom align-items-center flex-wrap">
                                    <h6 className="mb-0 fw-bold">Deposit</h6>
                                    
                                </div>
                                <Deposit network_options={network_options } token={ authToken} />
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-xl-12">
                            <div className="card no-bg">
                                <div className="card-header py-3 d-flex justify-content-between">
                                    <h6 className="mb-0 fw-bold">Transaction History</h6>
                                </div>
                                <div className="card-body">
                                    <table
                                        id="ordertabthree"
                                        className="priceTable table table-hover custom-table table-bordered align-middle mb-0"
                                        style={{ width: "100%" }}
                                    >
                                        <thead>
                                            <tr>
                                                <th>Date</th>
                                                <th>Type</th>
                                                <th>Asset</th>
                                                <th>Amount</th>
                                                <th>Status</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>2021-09-22 22:04</td>
                                                <td>Withdraw</td>
                                                <td>USDT</td>
                                                <td>481.90172092</td>
                                                <td>
                                                    <span className="color-price-up">Completed</span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>2021-09-01 23:50</td>
                                                <td>Deposit</td>
                                                <td>USDT</td>
                                                <td>323.50000000</td>
                                                <td>
                                                    <span className="color-price-up">Completed</span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>2021-08-21 14:07</td>
                                                <td>Withdraw</td>
                                                <td>USDT</td>
                                                <td>99.00000000</td>
                                                <td>
                                                    <span className="color-price-up">Completed</span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>2021-08-18 13:07</td>
                                                <td>Deposit</td>
                                                <td>USDT</td>
                                                <td>459.00000000</td>
                                                <td>
                                                    <span className="color-price-down">Cancle</span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>2021-07-28 22:06</td>
                                                <td>Deposit</td>
                                                <td>BNB</td>
                                                <td>459.00000000</td>
                                                <td>
                                                    <span className="color-price-up">Completed</span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>2021-07-27 22:06</td>
                                                <td>Deposit</td>
                                                <td>BTC</td>
                                                <td>59.00000000</td>
                                                <td>
                                                    <span className="color-price-up">Completed</span>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Row End */}
                </div>

            </div>
        </div>

    )
}