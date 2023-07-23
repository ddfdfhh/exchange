'use client';
import { useSession } from "next-auth/react";
import { getServerSession  } from "next-auth/next";
import { authOptions } from "@/app/lib/auth";
import { redirect } from 'next/navigation';
import { MakeGetRequestNoQuery } from "@/app/util/make_post_request";
import { useEffect } from "react";
export default   function Home() {
    const { status, data: session } = useSession()
   let authToken: string | undefined
     useEffect(() => { 
       
       if (status == 'authenticated') {
         authToken = session?.user?.accessToken
          MakeGetRequestNoQuery('http://localhost:4000/auth/profile', session?.user?.accessToken).then(res => { 
         console.log('got profiel resp', res.data)
        })
      
       }
       else if (status == 'unauthenticated') {
         return redirect('auth/login')
      
       }
          
        
      
    },[status])
  
    
 
  return (
    <div className="body d-flex py-3">
      <div className="container-xxl">{ }
            <div className="row g-3 mb-3">
              <div className="col-lg-12">
                <div className="card">
                  <div className="card-body">
                    <div className="row g-3 align-items-center">
                      <div className="col-md-6 col-lg-6 col-xl-6">
                        <div className="d-flex">
                          <img
                            className="avatar rounded-circle"
                            src="assets/images/profile_av.svg"
                            alt="profile"
                          />
                          <div className="flex-fill ms-3">
                            <p className="mb-0">
                              <span className="font-weight-bold">{session?.user?.name}</span>
                            </p>
                        <small className="">{session?.user?.email}</small>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6 col-lg-6 col-xl-6">
                        <div className="d-flex flex-column">
                          <span className="text-muted mb-1"><b>User ID:</b>{session?.user?.uuid}</span>
                          <span className="small text-muted flex-fill text-truncate">
                            <b>Last login time</b> 2021-09-29 10:56:22
                          </span>
                        </div>
                      </div>
                     
                   
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Row End */}
            <div className="row g-3 mb-3 row-cols-1 row-cols-md-2 row-cols-lg-4">
              <div className="col">
                <div className="card">
                  <div className="card-body d-flex align-items-center">
                    <div className="flex-fill text-truncate">
                      <span className="text-muted small text-uppercase">
                        BNB/BUSD
                      </span>
                      <div className="d-flex flex-column">
                        <div className="price-block">
                          <span className="fs-6 fw-bold color-price-up">418</span>
                          <span className="small text-muted px-2">$418</span>
                        </div>
                        <div className="price-report">
                          <span className="small text-danger">
                            - 1.28% <i className="fa fa-level-down" />
                          </span>
                          <span className="small text-muted px-2">
                            Volume:109,267,865.92 BUSD
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div id="apexspark1" />
                </div>
              </div>
              <div className="col">
                <div className="card">
                  <div className="card-body d-flex align-items-center">
                    <div className="flex-fill text-truncate">
                      <span className="text-muted small text-uppercase">
                        ETH/USDT
                      </span>
                      <div className="d-flex flex-column">
                        <div className="price-block">
                          <span className="fs-6 fw-bold color-price-down">
                            3499
                          </span>
                          <span className="small text-muted px-2">$3500</span>
                        </div>
                        <div className="price-report">
                          <span className="small text-danger">
                            - 1.79% <i className="fa fa-level-down" />
                          </span>
                          <span className="small text-muted px-2">
                            Volume:541,545,011.76 USDT
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div id="apexspark2" />
                </div>
              </div>
              <div className="col">
                <div className="card">
                  <div className="card-body d-flex align-items-center">
                    <div className="flex-fill text-truncate">
                      <span className="text-muted small text-uppercase">
                        DOT/BUSD
                      </span>
                      <div className="d-flex flex-column">
                        <div className="price-block">
                          <span className="fs-6 fw-bold">35.00</span>
                          <span className="small text-muted px-2">$35</span>
                        </div>
                        <div className="price-report">
                          <span className="small text-success">
                            + 3.78% <i className="fa fa-level-up" />
                          </span>
                          <span className="small text-muted px-2">
                            Volume:63,324,607.43 BUSD BUSD
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div id="apexspark3" />
                </div>
              </div>
              <div className="col">
                <div className="card">
                  <div className="card-body d-flex align-items-center">
                    <div className="flex-fill text-truncate">
                      <span className="text-muted small text-uppercase">
                        GRT/USDT
                      </span>
                      <div className="d-flex flex-column">
                        <div className="price-block">
                          <span className="fs-6 fw-bold color-price-up">
                            0.8413
                          </span>
                          <span className="small text-muted px-2">$1</span>
                        </div>
                        <div className="price-report">
                          <span className="small text-danger">
                            - 1.11% <i className="fa fa-level-down" />
                          </span>
                          <span className="small text-muted px-2">
                            Volume:28,538,521.44 USDT
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div id="apexspark4" />
                </div>
              </div>
            </div>
            {/* Row End */}
            <div className="row g-3 mb-3 row-deck">
              <div className="col-xl-12 col-xxl-7">
                <div className="card">
                  <div className="card-header py-3 d-flex justify-content-between bg-transparent border-bottom align-items-center flex-wrap">
                    <h6 className="mb-0 fw-bold">Balance Details</h6>
                    <ul
                      className="nav nav-tabs tab-body-header rounded d-inline-flex mt-2 mt-md-0"
                      role="tablist"
                    >
                      <li className="nav-item">
                        <a
                          className="nav-link active"
                          data-bs-toggle="tab"
                          href="#Spot"
                          role="tab"
                        >
                          BTC
                        </a>
                      </li>
                      <li className="nav-item">
                        <a
                          className="nav-link"
                          data-bs-toggle="tab"
                          href="#P2P"
                          role="tab"
                        >
                          BNB(BEP20)
                        </a>
                      </li>
                      <li className="nav-item">
                        <a
                          className="nav-link"
                          data-bs-toggle="tab"
                          href="#Margin"
                          role="tab"
                        >
                          USDT(BEP20)
                        </a>
                      </li>
                      <li className="nav-item">
                        <a
                          className="nav-link"
                          data-bs-toggle="tab"
                          href="#Future"
                          role="tab"
                        >
                          DRNH
                        </a>
                      </li>
                     
                    </ul>
                  </div>
                  <div className="card-body">
                    <div className="tab-content">
                      <div className="tab-pane fade show active" id="Spot">
                        <div className="row g-3">
                          <div className="col-lg-6">
                            <div>Account balance:</div>
                            <h3>0.18005388 BTC</h3>
                            <div className="mt-3 pt-3 text-uppercase text-muted pt-2 small">
                              Buy this month
                            </div>
                            <h5>3.0675432 BTC</h5>
                            <div className="mt-3 text-uppercase text-muted small">
                              Sell this month
                            </div>
                            <h5>2.0345618 BTC</h5>
                            <div className="mt-3 text-uppercase text-muted small">
                              Estimated Value:
                            </div>
                            <h5>$22000.29</h5>
                          </div>
                          <div className="col-lg-6">
                            <div id="apex-simple-donut" />
                          </div>
                        </div>
                      </div>
                      <div className="tab-pane fade" id="P2P">
                        <div className="row g-3">
                          <div className="col-lg-6">
                            <div>Account balance:</div>
                            <h3>0.00005388 BTC</h3>
                            <div className="mt-3 pt-3 text-uppercase text-muted pt-2 small">
                              Buy this month
                            </div>
                            <h5>0.00005388 BTC</h5>
                            <div className="mt-3 text-uppercase text-muted small">
                              Sell this month
                            </div>
                            <h5>2.0345618 BTC</h5>
                            <div className="mt-3 text-uppercase text-muted small">
                              Estimated Value:
                            </div>
                            <h5>$2000.29</h5>
                          </div>
                          <div className="col-lg-6">
                            <div id="apex-simple-donutp2p" />
                          </div>
                        </div>
                      </div>
                      <div className="tab-pane fade" id="Margin">
                        <div className="row g-3">
                          <div className="col-lg-6">
                            <div>Total balance:</div>
                            <h3>0.00095000 BTC≈$3570</h3>
                            <div className="mt-3 pt-3 text-uppercase text-muted pt-2 small">
                              Total Debt:
                            </div>
                            <h5>0.00005388 BTC</h5>
                            <div className="mt-3 text-uppercase text-muted small">
                              Account Equity:
                            </div>
                            <h5>2.0345618 BTC</h5>
                            <div className="mt-3 text-uppercase text-muted small">
                              Profit &amp; Loss:
                            </div>
                            <h5>0.95 BTC(1.6.00%) $25 (8.00%)</h5>
                          </div>
                          <div className="col-lg-6">
                            <div id="apex-circle-chart-multiplemargin" />
                          </div>
                        </div>
                      </div>
                      <div className="tab-pane fade" id="Future">
                        <div className="row g-3">
                          <div className="col-lg-6">
                            <div>Total Margin Balance:</div>
                            <h3>0.00095000 BTC≈$3570</h3>
                            <div className="mt-3 pt-3 text-uppercase text-muted pt-2 small">
                              Total Wallet Balance:
                            </div>
                            <h5>0.00005388 BTC</h5>
                            <div className="mt-3 text-uppercase text-muted small">
                              Total Unrealized PNL:
                            </div>
                            <h5>2.0345618 BTC</h5>
                          </div>
                          <div className="col-lg-6">
                            <div id="apex-circle-gradientfuture" />
                          </div>
                        </div>
                      </div>
                      <div className="tab-pane fade" id="Earn">
                        <div className="row g-3">
                          <div className="col-lg-6">
                            <div>Total Margin Balance:</div>
                            <h3>0.00095000 BTC≈$3570</h3>
                            <div className="mt-3 pt-3 text-uppercase text-muted pt-2 small">
                              Locked:
                            </div>
                            <h5>0.00000388 BTC</h5>
                            <div className="mt-3 text-uppercase text-muted small">
                              Flexible:
                            </div>
                            <h5>0.0000018 BTC</h5>
                          </div>
                          <div className="col-lg-6">
                            <div id="apex-circle-chartearn" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-12 col-xxl-5">
                <div className="card">
                  <div className="card-header py-3 d-flex justify-content-between bg-transparent align-items-center">
                    <h6 className="mb-0 fw-bold">Increase your account security</h6>
                    <a
                      href="security.html"
                      title="security"
                      className="d-inline-flex"
                    >
                      <i className="icofont-caret-right fs-5" />
                    </a>
                  </div>
                  <div className="card-body">
                    <div className="row row-cols-2 g-0">
                      <div className="col">
                        <div className="security border-bottom border-end">
                          <div className="d-flex align-items-start px-2 py-3">
                            <div className="dot-green mx-2 my-2" />
                            <div className="d-flex flex-column">
                              <span className="flex-fill text-truncate">
                                Enable 2FA
                              </span>
                              <span>Enabled</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col">
                        <div className="security border-bottom">
                          <div className="d-flex align-items-start px-2 py-3">
                            <div className="dot-green mx-2 my-2" />
                            <div className="d-flex flex-column">
                              <span className="flex-fill text-truncate">
                                Identity Verification
                              </span>
                              <span>Verified</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    
                      <div className="col">
                        <div className="security border-bottom">
                          <div className="d-flex align-items-start px-2 py-3">
                            <div className="dot-red mx-2 my-2" />
                            <div className="d-flex flex-column">
                              <span className="flex-fill text-truncate">
                                Withdrawal Whitelist
                              </span>
                              <a
                                href="security.html"
                                title="setup"
                                className="text-decoration-underline"
                              >
                                Turn on
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                     
                      <div className="col">
                        <div className="security border-bottom">
                          <div className="d-flex align-items-start px-2 py-3">
                            <div className="dot-red mx-2 my-2" />
                            <div className="d-flex flex-column">
                              <span className="flex-fill text-truncate">
                                Google Authenticator
                              </span>
                              <a
                                href="security.html"
                                title="setup"
                                className="text-decoration-underline"
                              >
                                Setup
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col">
                        <div className="security  border-end">
                          <div className="d-flex align-items-start px-2 py-3">
                            <div className="dot-green mx-2 my-2" />
                            <div className="d-flex flex-column">
                              <span className="flex-fill text-truncate">
                                Phone Number
                              </span>
                              <span>74****57</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col">
                        <div className="security ">
                          <div className="d-flex align-items-start px-2 py-3">
                            <div className="dot-green mx-2 my-2" />
                            <div className="d-flex flex-column">
                              <span className="flex-fill text-truncate">
                                Email Address{" "}
                              </span>
                              <span>ni***@gmail.com</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
           
           
            <div className="row g-3 mb-3 row-deck">
              <div className="col-xl-12">
                <div className="card">
                  <div className="card-header py-3 d-flex justify-content-between">
                    <h6 className="mb-0 fw-bold">Recent Transactions</h6>
                  </div>
                  <div className="card-body">
                    <table
                      id="ordertabthree"
                      className="priceTable table table-hover custom-table-2 table-bordered align-middle mb-0"
                      style={{ width: "100%" }}
                    >
                      <thead>
                        <tr>
                          <th>Date</th>
                          <th>Pair</th>
                          <th>Side</th>
                          <th>Price</th>
                          <th>Executed</th>
                          <th>Fee</th>
                          <th>Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>09-18 17:32:15</td>
                          <td>
                            <img
                              src="assets/images/coin/ETH.png"
                              alt=""
                              className="img-fluid avatar mx-1"
                            />
                            ETH/USDT
                          </td>
                          <td>
                            <span className="color-price-down">Sell</span>
                          </td>
                          <td>3,487.50</td>
                          <td>0.0110</td>
                          <td>0.03836250 USDT</td>
                          <td>38.36250000 USDT</td>
                        </tr>
                        <tr>
                          <td>09-18 17:31:11</td>
                          <td>
                            <img
                              src="assets/images/coin/SOL.png"
                              alt=""
                              className="img-fluid avatar mx-1"
                            />
                            SOL/USDT
                          </td>
                          <td>
                            <span className="color-price-down">Sell</span>
                          </td>
                          <td>160.33</td>
                          <td>0.75</td>
                          <td>0.12024750 USDT</td>
                          <td>120.24750000 USDT</td>
                        </tr>
                        <tr>
                          <td>09-18 08:52:04</td>
                          <td>
                            <img
                              src="assets/images/coin/ETH.png"
                              alt=""
                              className="img-fluid avatar mx-1"
                            />
                            ETH/USDT
                          </td>
                          <td>
                            <span className="color-price-up">Buy</span>
                          </td>
                          <td>3,439.20</td>
                          <td>0.0111</td>
                          <td>0.00001110 ETH</td>
                          <td>38.17512000 USDT</td>
                        </tr>
                        <tr>
                          <td>09-17 08:34:14</td>
                          <td>
                            <img
                              src="assets/images/coin/SOL.png"
                              alt=""
                              className="img-fluid avatar mx-1"
                            />
                            SOL/USDT
                          </td>
                          <td>
                            <span className="color-price-up">Buy</span>
                          </td>
                          <td>147.04</td>
                          <td>0.76</td>
                          <td>0.00076000 SOL</td>
                          <td>111.75040000 USDT</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
         
          </div>
        </div>
  )
}
