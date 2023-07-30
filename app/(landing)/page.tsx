
'use client';

import { useEffect, useState } from "react";
import { MakeGetRequestRemoteQuery } from "../util/make_post_request";
import Image from "next/image";
import { formatCurrency, formatNumber } from "../util/helpers";
const current_drnh_price = 0.40006696
export default function Home() {
    const [coinData, setCoinData] = useState<any>()
    const [btcData, setBtcData] = useState<any>()
    const [bnbData, setBnbData] = useState<any>()
    const [coin, setCoin] = useState<any>('BTC')
    const [value1, setValue1] = useState<any>(1)
    const [value2, setValue2] = useState<any>(0)

    useEffect(() => {

        console.log('fetching fda')
        const url = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false&locale=en';

        MakeGetRequestRemoteQuery({ per_page: 100 }, url).then((resp: any) => {
            setCoinData(resp.data)
        }).catch((err: any) => {
            console.log('error in fet fda', err)
        })
    }, [])
    useEffect(() => {
        console.log('coin data', coinData)
        if (coinData !== undefined) {
            const btcdata = coinData.filter((v: any) => {
                return v['symbol'] == 'btc'
            })
            const bnbdata = coinData.filter((v: any) => {
                return v['name'] == 'BNB'
            })
            setBtcData(btcdata[0])
            setBnbData(bnbdata[0])
        }
    }, [coinData])
    useEffect(() => {
        if (btcData !== undefined && bnbData !== undefined) {
            if (coin == 'BTC') {
                setValue2((btcData['current_price']).toFixed(4))
            }
            else if (coin == 'BNB') {
                setValue2((bnbData['current_price']).toFixed(4))
            }
            else if (coin == 'DRNH') {
                setValue2((current_drnh_price).toFixed(8))
            }
        }
    }, [coin,btcData,bnbData])
    const handleChange1 = (val: any) => {
        setValue1(val)
        if (btcData !== undefined && bnbData !== undefined) {
            if (coin == 'BTC') {
                setValue2((Number(val) * Number(btcData['current_price'])).toFixed(8))
            }
            else if (coin == 'BNB') {
                setValue2((Number(val) * Number(bnbData['current_price'])).toFixed(6))
            }
            else if (coin == 'DRNH') {
                setValue2((Number(val) * Number(current_drnh_price)))
            }
        }
    }
    function handleChange2(val: any) {
        setValue2(val)
        console.log('see',Number(val), (btcData['current_price']))
        if (btcData !== undefined && bnbData !== undefined) {
            if (coin == 'BTC') {
                setValue1((Number(val) / Number(btcData['current_price'])).toFixed(8))
            }
            else if (coin == 'BNB') {
                setValue1((Number(val) / Number(bnbData['current_price'])).toFixed(6))
            }
            else if (coin == 'DRNH') {
                setValue1((Number(val) / Number(current_drnh_price)))
            }
        }
    }
    return (<>

        <div className="mein-menu nav-fixed">
            <nav className="navbar navbar-expand-lg navbar-dark ">
                <div className="container">
                    <a className="navbar-brand" href="/">
                        <Image src="/g.png" className="logo" alt="logo" width={150} height={50} />
                    </a>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarNavDropdown"
                        aria-controls="navbarNavDropdown"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon" />
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavDropdown">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <a className="nav-link" aria-current="page" href="/exchange/BTCUSDT">
                                    Trade
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#buysell">
                                    Buy
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#buysell">
                                    Sell
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#cryptocurrencies">
                                    Cryptocurrencies
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#buysell">
                                    Support
                                </a>
                            </li>


                            <li className="nav-item">
                                <a className="nav-link button-1" href="/auth/login">
                                    Start Now !
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
        {/* Main-menu End */}
        {/* Banners Start */}
        <div
            className="banner"
            id="buysell"
            style={{ backgroundImage: 'url("frontend/assets/img/banner-bg.png")' }}
        >
            <div className="man">
                <img src="frontend/assets/img/hero-img.png" alt="" />
            </div>
            <div className="shape">
                <img
                    src="frontend/assets/img/bannershap-1.png"
                    alt=""
                    className="shapone"
                />
                <img
                    src="frontend/assets/img/bannercoin-1.png"
                    alt=""
                    className="coin-one"
                />
                <img
                    src="frontend/assets/img/bannercoin-2.png"
                    alt=""
                    className="coin-two"
                />
            </div>
            <div className="shape-right">
                <img
                    src="frontend/assets/img/bannercoin-3.png"
                    alt=""
                    className="right-coin"
                />
            </div>
            <div className="color color-1">
                <img src="frontend/assets/img/color-1.png" alt="" />
            </div>
            <div className="color color-2">
                <img src="frontend/assets/img/color-2.png" alt="" />
            </div>
            <div className="color color-3">
                <img src="frontend/assets/img/color-3.png" alt="" />
            </div>
            {/* hero-area Start */}
            <div className="hero-area">
                <div className="container">
                    <div className="row justify-content-between">
                        <div
                            className="col-xl-7 col-lg-6 wow fadeInUp"
                            data-wow-duration="0.3s"
                            data-wow-delay="0.3s"
                        >
                            <div className="banner-content">
                                <h3 className="subtitle">Easy, Fast and Secure!</h3>
                                <h1 className="head">Buy &amp; Sell Cryptocurrency</h1>
                                <p className="text">
                                    Wuatex is the easiest place to buy, sell your cryptocurrency
                                </p>
                            </div>
                        </div>
                        <div
                            className="col-xl-4 col-lg-6 wow fadeInRight"
                            data-wow-duration="0.3s"
                            data-wow-delay="0.3s"
                        >
                            <div className="right-box">
                                <div className="exchange">
                                    <div className="exchange-box">
                                        <h6>Calculator</h6>
                                        <div className="selector">
                                            <p className="text">if You have</p>
                                            <div className="coin">
                                                <img src="frontend/assets/img/btc.png" alt="" />
                                                <div className="language-select">
                                                    <select className="select-bar" value={coin} onChange={(e: any) => setCoin(e.currentTarget?.value)}>
                                                        <option value="BTC">BTC</option>
                                                        <option value="BNB">BNB</option>
                                                        <option value="DRNH">DRNH</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                        <form action="#" id="faq-form">
                                            <div className="form-group">
                                                <input
                                                    type="text"
                                                    name="number"
                                                    placeholder="1"
                                                    className="form-control"
                                                    value={value1}
                                                    onChange={(e: any) => handleChange1(e.currentTarget.value)}
                                                />
                                            </div>
                                        </form>
                                        <span className="rate">1 {coin} =
                                            {(btcData !== undefined && bnbData !== undefined) ? (
                                                coin == 'BTC' ? formatNumber(btcData['current_price']) + 'USD'
                                                    : (coin == 'BNB' ? formatNumber(bnbData['current_price']) + 'USD' : (coin == 'DRNH' ? current_drnh_price + 'USD' : null)))
                                                : null


                                            } </span>
                                    </div>
                                    <div className="exchange-box">
                                        <div className="selector">
                                            <p className="text">You Get</p>
                                            <div className="coin">
                                                <img src="frontend/assets/img/usd.png" alt="" />
                                                <div className="language-select">
                                                    <select className="select-bar">
                                                        <option value="USD">USD</option>

                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                        <form action="#" id="faq-form-2">
                                            <div className="form-group">
                                                <input
                                                    type="text"
                                                    value={value2}
                                                    onChange={(e: any) => handleChange2(e.currentTarget.value)}
                                                    name="number"
                                                    placeholder=""
                                                   className="form-control"
                                                />
                                            </div>
                                        </form>
                                        <span className="rate">1 USD =
                                            {(btcData !== undefined && bnbData !== undefined) ? (
                                                coin == 'BTC' ? (1 / btcData['current_price']).toFixed(7) + coin
                                                    : (coin == 'BNB' ? (1 / bnbData['current_price']).toFixed(5) + coin : (coin == 'DRNH' ? 1 / Number(current_drnh_price) + coin : null)))
                                                : null


                                            }
                                        </span>
                                    </div>
                                    <div className="button-box">
                                        <a className="rotate" href="#">
                                            <img src="frontend/assets/img/exchange-img.png" alt="" />
                                        </a>
                                        <a href={`/exchange/${coin}USDT`} className="button button-1">
                                            Sell { coin}
                                        </a>
                                    </div>
                                </div>
                               
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        {/* Transaction Start */}
        <div className="transaction" id="cryptocurrencies">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">

                        <div className="transaction-box">
                            <div className="responsive-table">
                                <table className="table">
                                    <thead
                                        className="wow fadeInUp"
                                        data-wow-duration="0.3s"
                                        data-wow-delay="0.3s"
                                    >
                                        <tr>
                                            <th scope="col">Name</th>
                                            <th scope="col">Price</th>
                                            <th scope="col">
                                                Change <span className="head">24h</span>
                                            </th>
                                            <th scope="col">Market cap</th>

                                            <th scope="col">Trade</th>

                                        </tr>
                                    </thead>
                                    <tbody>
<tr 
                                                className="wow fadeInUp"
                                                data-wow-duration="0.3s"
                                                data-wow-delay="0.3s"
                                            >
                                                <td>
                                                    <div className="name">
                                                        <img
                                                            className="coin mx-2"
                                                            src='/assets/images/coin/DRNH.png'
                                                            alt=""
                                                            style={{ background:'#0d1493',width: '50px', height: '50px', borderRadius: '50%', boxShadow: '1px 1px 5px 4px #cddc3987' }}
                                                        />
                                                        <span>Dornish (DRNH)</span>
                                                    </div>
                                                </td>
                                                <td>{current_drnh_price}$</td>
                                                <td>
                                                    <span className="persent">0.134%</span>
                                                </td>
                                                <td>$2.3K</td>

                                                <td >
                                                   <a style={{ margin: 'auto',fontSize:'14px!important' }} href="/exchange/DRNHUSDT" className="tra button btn-primary">
                                                    Buy/Sell
                                                    </a> 
                                                    
                                                </td>

                                            </tr>
                                        {coinData !== undefined ? coinData.map((v: any) => {
                                            return <tr key={v['symbol']}
                                                className="wow fadeInUp"
                                                data-wow-duration="0.3s"
                                                data-wow-delay="0.3s"
                                            >
                                                <td>
                                                    <div className="name">
                                                        <img
                                                            className="coin mx-2"
                                                            src={v['image']}
                                                            alt=""
                                                            style={{ width: '50px', height: '50px', borderRadius: '50%', boxShadow: '1px 1px 5px 4px #cddc3987' }}
                                                        />
                                                        <span>{v['id']} ({v['symbol'].toUpperCase()})</span>
                                                    </div>
                                                </td>
                                                <td>{formatNumber(v['current_price'])}$</td>
                                                <td>
                                                    <span className={`persent ${v['price_change_percentage_24h'] > 0 ? '' : 'color'}`}>{v['price_change_percentage_24h'].toFixed(2)}%</span>
                                                </td>
                                                <td>${formatCurrency(v['market_cap'])}</td>

                                                <td style={{ margin: 'auto' }}>
                                                    {(v['symbol'] == 'btc' || v['symbol'] == 'eth' || v['symbol'] == 'bnb') ?
                                                        <a href={`/exchange/${v['symbol'].toUpperCase()}USDT`} style={{ margin: 'auto',fontSize:'14px!important' }} className="tra button btn-primary">
                                                        Buy/Sell
                                                    </a> : null
                                                    }
                                                </td>

                                            </tr>
                                        }) : null}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        {/* Process Start */}
        <div className="process">
            <div className="container">
                <div className="row justify-content-center">
                    <div
                        className="col-12 text-center wow fadeInUp"
                        data-wow-duration="0.3s"
                        data-wow-delay="0.3s"
                    >
                        <div className="section-head">
                            <h4 className="lasthead">How to buy and sell cryptocurrency</h4>
                            <h2 className="title">It's really easy!</h2>
                            <p className="text">
                                It's easier than you think.Follow 3 simple easy steps
                            </p>
                        </div>
                    </div>
                </div>
                <div className="row justify-content-center">
                    <div
                        className="col-xl-4 col-md-6 text-center  wow fadeInUp"
                        data-wow-duration="0.3s"
                        data-wow-delay="0.3s"

                    >
                        <div className="process-box">
                            <div className="tumb">
                                <img src="frontend/assets/img/process-1.png" alt="" />
                            </div>
                            <p className="text">
                                Select the crypto you would <br /> like to Buy/Sell
                            </p>
                        </div>
                    </div>
                    <div
                        className="col-xl-4 col-md-6 text-center  wow fadeInUp"
                        data-wow-duration="0.4s"
                        data-wow-delay="0.4s"
                    >
                        <div className="process-box">
                            <div className="tumb">
                                <img src="frontend/assets/img/process-2.png" alt="" />
                            </div>
                            <p className="text">
                                Pass account <br />
                                verification
                            </p>
                        </div>
                    </div>
                    <div
                        className="col-xl-4 col-md-6 text-center  wow fadeInUp"
                        data-wow-duration="0.5s"
                        data-wow-delay="0.5s"
                    >
                        <div className="process-box">
                            <div className="tumb">
                                <img src="frontend/assets/img/process-3.png" alt="" />
                            </div>
                            <p className="text">
                                Buy &amp; sell <br />
                                cryptocurrency
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        {/* Feature Start */}
        <div className="feature">
            <div className="container">
                <div className="row">
                    <div className="col-xl-6">
                        <div className="row">
                            <div
                                className="col-lg-6  wow fadeInUp"
                                data-wow-duration="0.3s"
                                data-wow-delay="0.3s"
                            >
                                <div className="feature-box one">
                                    <div className="tumb">
                                        <img src="frontend/assets/img/feature-icon-1.png" alt="" />
                                    </div>
                                    <p className="text">
                                        The fast &amp; simple way to buy,sell crypto
                                    </p>
                                </div>
                            </div>
                            <div
                                className="col-lg-6  wow fadeInUp"
                                data-wow-duration="0.4s"
                                data-wow-delay="0.4s"
                            >
                                <div className="feature-box two">
                                    <div className="tumb">
                                        <img src="frontend/assets/img/feature-icon-2.png" alt="" />
                                    </div>
                                    <p className="text">Professional, Safe &amp; Secure</p>
                                </div>
                            </div>
                            <div
                                className="col-lg-6  wow fadeInUp"
                                data-wow-duration="0.5s"
                                data-wow-delay="0.5s"
                            >
                                <div className="feature-box three">
                                    <div className="tumb">
                                        <img src="frontend/assets/img/feature-icon-3.png" alt="" />
                                    </div>
                                    <p className="text">Multi-Currency Support</p>
                                </div>
                            </div>
                            <div
                                className="col-lg-6  wow fadeInUp"
                                data-wow-duration="0.6s"
                                data-wow-delay="0.6s"
                            >
                                <div className="feature-box four">
                                    <div className="tumb">
                                        <img src="frontend/assets/img/feature-icon-4.png" alt="" />
                                    </div>
                                    <p className="text">Our people are available for you 24/7</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div
                        className="col-xl-6 order-xl-last order-first  wow fadeInUp"
                        data-wow-duration="0.4s"
                        data-wow-delay="0.4s"
                    >
                        <div className="section-head">
                            <h4 className="lasthead">Access the future of money in minutes</h4>
                            <h2 className="title">The most trusted cryptocurrency platform</h2>
                            <p className="text">
                                Here are a few reasons why you should choose Wuatex
                            </p>
                            <a href="/auth/login" className="button ">
                                <span>Get Start Now !</span>{" "}
                                <i className="fas fa-long-arrow-alt-right" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
       
        {/* testomonial Start */}
        <div className="testomonial" id="testimonial">
            <div
                className="coin tcoin-1"
                data-paroller-factor="0.1"
                data-paroller-type="foreground"
                data-paroller-direction="horizontal"
            >
                <img src="frontend/assets/img/tcoin-1.png" alt="" />
            </div>
            <div
                className="coin tcoin-2"
                data-paroller-factor="0.2"
                data-paroller-type="foreground"
                data-paroller-direction="horizontal"
            >
                <img src="frontend/assets/img/tcoin-2.png" alt="" />
            </div>
            <div
                className="coin tcoin-3"
                data-paroller-factor="-0.1"
                data-paroller-type="foreground"
                data-paroller-direction="vertical"
            >
                <img src="frontend/assets/img/tcoin-3.png" alt="" />
            </div>
            <div
                className="coin tcoin-4"
                data-paroller-factor="-0.1"
                data-paroller-type="foreground"
                data-paroller-direction="horizontal"
            >
                <img src="frontend/assets/img/tcoin-4.png" alt="" />
            </div>
            <div
                className="coin tcoin-5"
                data-paroller-factor="-0.2"
                data-paroller-type="foreground"
                data-paroller-direction="horizontal"
            >
                <img src="frontend/assets/img/tcoin-5.png" alt="" />
            </div>
            <div className="container">
                <div className="row justify-content-center">
                    <div
                        className="col-lg-10 text-center wow fadeInUp"
                        data-wow-duration="0.2s"
                        data-wow-delay="0.2s"
                    >
                        <div className="section-head">
                            {/* <h4 className="lasthead">Testimonials</h4> */}
                            <h2 className="title">
                                Thousands of Happy Customers All Around the World
                            </h2>
                          
                        </div>
                    </div>
                </div>
             
            </div>
        </div>
       
        {/* Footer Start */}
        <div
            className="footer"
            style={{ backgroundImage: 'url("frontend/assets/img/footer-bg.png")',padding:'48px 0px 0px!important' }}
        >
            <div className="container">
            
               
                <div className="row">
                    <div
                        className="col-12 text-center wow fadeInUp"
                        data-wow-duration="0.3s"
                        data-wow-delay="0.3s"
                    >
                        <div className="footer-bottom mt-0">
                            <div className="content">
                                <p className="text">
                                    Copyright © <a href="#">Wuatex</a> | <a href="/">2023</a>{" "}
                                </p>
                            </div>
                            <div className="social-style">
                                <a href="#">
                                    <i className="fab fa-facebook-f" />
                                </a>
                                <a href="#">
                                    <i className="fab fa-twitter" />
                                </a>
                                <a href="#">
                                    <i className="fab fa-pinterest-p" />
                                </a>
                                <a href="#">
                                    <i className="fab fa-google-plus-g" />
                                </a>
                                <a href="#">
                                    <i className="fab fa-instagram" />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        {/*====== Scroll To Top Start ======*/}
        <div id="scrollUp" title="Scroll To Top">
            <i className="fas fa-arrow-up" />
        </div>
    </>)
}