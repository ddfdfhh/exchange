'use client';
import { useSession } from "next-auth/react";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/lib/auth";
import { redirect } from 'next/navigation';
import { MakeGetRequestNoQuery, MakeGetRequestRemoteQuery } from "@/app/util/make_post_request";
import { useEffect, useState } from "react";
import { formatDate } from "@/app/util/helpers";
import Sidebar from "@/app/components/partials/sidebar";
import Header from "@/app/components/partials/header";
export default function Home() {
  const [sidebar,setSidebar]=useState<boolean>(false)
  const { status, data: session } = useSession()
  const [coinData, setCoinData] = useState<any>()
  const [orders, setOrders] = useState<any>()

  const [tab, setTab] = useState<any>('BTC')
  const [profileData, setProfileData] = useState<any>()
  let authToken: string | undefined
  useEffect(() => {

    if (status == 'authenticated') {
      authToken = session?.user?.accessToken
      MakeGetRequestNoQuery('auth/profile', session?.user?.accessToken).then(res => {

        setProfileData(res.data.data)
      })
      const url = 'orderbooks/fetchAllCoinOrders'

      MakeGetRequestNoQuery(url, authToken).then((resp: any) => {
        console.log('all orerss', resp.data.data)
        setOrders(resp.data.data)
      }).catch((err: any) => {
        console.log('error in fet fda', err)
      })

    }
    else if (status == 'unauthenticated') {
      return redirect('auth/login')

    }



  }, [status])


  useEffect(() => {
window.innerWidth>600?setSidebar(true):setSidebar(false)
    console.log('fetching fda')
    const url = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false&locale=en';

    MakeGetRequestRemoteQuery({ per_page: 100 }, url).then((resp: any) => {
      const newd = resp.data.filter((f: any) => f.symbol === 'eth' || f.symbol === 'bnb' || f.symbol === 'btc');
      console.log('newd', newd)
      setCoinData(newd)
    }).catch((err: any) => {
      console.log('error in fet fda', err)
    })
  }, [])

  const g = () => { 
setSidebar(!sidebar)
  }
  return (
    <div id="cryptoon-layout" className="theme-blue">


      <Sidebar show={ sidebar} />
      {/* main body area */}
      <div className="main px-lg-4 px-md-4">


        <Header session={session} onPlay={ (e:any)=>g()} />
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
                            <b>Last login time</b> {profileData !== undefined ? profileData?.logged_in_at : ''}
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
              {
                coinData !== undefined ? coinData.map((v: any) => {
                  return <div className="col">
                    <div className="card">
                      <div className="card-body d-flex align-items-center">
                        <div className="flex-fill text-truncate">
                          <span className="text-muted small text-uppercase">
                            {v['symbol'].toUpperCase()}/USDT
                          </span>
                          <div className="d-flex flex-column">
                            <div className="price-block">
                              <span className="fs-6 fw-bold color-price-down">
                                {v['current_price']}
                              </span>
                              <span className="small text-muted px-2">$ {v['current_price']}</span>
                            </div>
                            <div className="price-report">
                              <span className="small text-danger">
                                {v['ath_change_percentage']}% <i className={`fa ${v['ath_change_percentage'] < 0 ? 'fa-level-down' : 'fa-level-up'}`} />
                              </span>
                              <span className="small text-muted px-2">
                                Volume:{v['total_volume']} USDT
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div id="apexspark2" />
                    </div>
                  </div>

                })
                  : null
              }

            </div>
            {/* Row End */}
            <div className="row g-3 mb-3 row-deck">
              <div className="col-xl-12 col-xxl-7">
                <div className="card">
                  <div className="card-header py-3 d-flex justify-content-between bg-transparent border-bottom align-items-center flex-wrap">
                    <h6 className="mb-0 fw-bold">Balance Details</h6>
                    <ul
                      className="nav nav-tabs tab-body-header rounded  mt-2 mt-md-0"
                      role="tablist"
                    >
                      <li className="nav-item">
                        <a
                          className={`nav-link ${tab == 'BTC' ? 'active' : null}`}
                          data-bs-toggle="tab"
                          onClick={e => setTab('BTC')}
                          role="tab"
                        >
                          BTC
                        </a>
                      </li>
                      <li className="nav-item">
                        <a
                          className={`nav-link ${tab == 'BNB' ? 'active' : null}`}
                          data-bs-toggle="tab"
                          onClick={e => setTab('BNB')}
                          role="tab"
                        >
                          BNB(BEP20)
                        </a>
                      </li>
                      <li className="nav-item">
                        <a
                          className={`nav-link ${tab == 'USDT' ? 'active' : null}`}
                          data-bs-toggle="tab"
                          onClick={e => setTab('USDT')}
                          role="tab"
                        >
                          USDT(BEP20)
                        </a>
                      </li>
                      <li className="nav-item">
                        <a
                          className={`nav-link ${tab == 'DRNH' ? 'active' : null}`}
                          data-bs-toggle="tab"
                          onClick={e => setTab('DRNH')}
                          role="tab"
                        >
                          DRNH
                        </a>
                      </li>

                    </ul>
                  </div>
                  <div className="card-body">
                    <div className="tab-content">
                      <div className={`tab-pane fade ${tab == 'BTC' ? 'show active' : null}`} id="BTC">
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
                      <div className={`tab-pane fade ${tab == 'BNB' ? 'show active' : null}`} id="BNB">
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
                      <div className={`tab-pane fade ${tab == 'USDT' ? 'show active' : null}`} id="USDT">
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
                      <div className={`tab-pane fade ${tab == 'DRNH' ? 'show active' : null}`} id="DRNH">
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
                    <div className="d-flex flex-wrap">
                      <div className="col">
                        <div className="security border-bottom border-end">
                          <div className="d-flex align-items-start px-2 py-3">
                            <div className={`${session?.user?.is_two_fa_enabled ? 'dot-green' : 'dot-red'} mx-2 my-2`} />
                            <div className="d-flex flex-column">
                              <span className="flex-fill text-truncate">
                                2FA Status
                              </span>
                              <span>{session?.user?.is_two_fa_enabled ? 'Enabled' : 'Not Enabled'}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col">
                        <div className="security border-bottom">
                          <div className="d-flex align-items-start px-2 py-3">
                            <div className={`${session?.user?.id_verified == 'Yes' ? 'dot-green' : 'dot-red'} mx-2 my-2`} />
                            <div className="d-flex flex-column">
                              <span className="flex-fill text-truncate">
                                Identity Verification
                              </span>
                              <span>{session?.user?.id_verified == 'Yes' ? 'Verified' : 'Not Verified'}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="col">
                        <div className="security border-bottom">
                          <div className="d-flex align-items-start px-2 py-3">
                            <div className={`${session?.user?.email_verified == 'Yes' ? 'dot-green' : 'dot-red'} mx-2 my-2`} />
                            <div className="d-flex flex-column">
                              <span className="flex-fill text-truncate">
                                Email Verification
                              </span>
                              <span>{session?.user?.email_verified == 'Yes' ? 'Verified' : 'Not Verified'}</span>
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
                                Phone Verification
                              </span>

                              Not Required

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
                          <th>Size</th>
                          <th>Executed</th>

                          <th>Total</th>
                        </tr>
                      </thead>
                      <tbody>

                        {
                          orders !== undefined ? orders.map((v: any) => {
                            return <tr>
                              <td>{formatDate(v['created_at'])}</td>
                              <td>
                                <img
                                  src={`assets/images/coin/${v['symbol'].substr(0, v['symbol'].indexOf('USDT'))}.png`}
                                  alt=""
                                  className="img-fluid avatar mx-1"
                                />
                                {v['symbol'].substr(0, v['symbol'].indexOf('USDT'))}/USDT
                              </td>
                              <td>
                                <span className={`color-price-${v['side'] == 'SELL' ? 'down' : 'up'}`}>{v['side']}</span>
                              </td>
                              <td>{v['price']}</td>
                              <td>{v['size']}</td>
                              <td>{v['fills'] ? JSON.parse(v['fills']).map((item: any) => item.price * item.size).reduce((prev: number, next: number) => prev + next) : 0} USDT</td>
                              <td>{v['volume']} USDT</td>
                            </tr>
                          }) : null

                        }

                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}
