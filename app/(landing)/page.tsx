
'use client';
export default function Home() { 
    return (<>
         
            <div className="mein-menu">
                <nav className="navbar navbar-expand-lg navbar-dark ">
                    <div className="container">
                        <a className="navbar-brand" href="#">
                            <img src="frontend/assets/img/logo.png" className="logo" alt="logo" />
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
                                    <a className="nav-link" aria-current="page" href="#buysell">
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
                                        Gooland is the easiest place to buy, sell your cryptocurrency
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
                                            <div className="selector">
                                                <p className="text">You have</p>
                                                <div className="coin">
                                                    <img src="frontend/assets/img/btc.png" alt="" />
                                                    <div className="language-select">
                                                        <select className="select-bar">
                                                            <option value="">BTC</option>
                                                            <option value="">USD</option>
                                                            <option value="">BTC</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                            <form action="#" id="faq-form">
                                                <div className="form-group">
                                                    <input
                                                        type="text"
                                                        name="number"
                                                        placeholder="1000"
                                                        className="form-control"
                                                    />
                                                </div>
                                            </form>
                                            <span className="rate">1 BTC = 11724.597423 USD</span>
                                        </div>
                                        <div className="exchange-box">
                                            <div className="selector">
                                                <p className="text">You Get</p>
                                                <div className="coin">
                                                    <img src="frontend/assets/img/usd.png" alt="" />
                                                    <div className="language-select">
                                                        <select className="select-bar">
                                                            <option value="">USD</option>
                                                            <option value="">USD</option>
                                                            <option value="">BTC</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                            <form action="#" id="faq-form-2">
                                                <div className="form-group">
                                                    <input
                                                        type="text"
                                                        name="number"
                                                        placeholder="11724597.42"
                                                        className="form-control"
                                                    />
                                                </div>
                                            </form>
                                            <span className="rate">1 USD = 0.00008544 BTC</span>
                                        </div>
                                        <div className="button-box">
                                            <a className="rotate" href="#">
                                                <img src="frontend/assets/img/exchange-img.png" alt="" />
                                            </a>
                                            <a href="#" className="button button-1">
                                                Sell bitcoin
                                            </a>
                                        </div>
                                    </div>
                                    <div className="review">
                                        <div className="stars">
                                            <i className="fas fa-star" />
                                            <i className="fas fa-star" />
                                            <i className="fas fa-star" />
                                            <i className="fas fa-star" />
                                            <i className="fas fa-star" />
                                        </div>
                                        <a href="#">Based on 10.000+reviews!</a>
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
                            <div
                                className="search wow fadeInUp"
                                data-wow-duration="0.5s"
                                data-wow-delay="0.3s"
                            >
                                <form action="#" id="form">
                                    <div className="form-group">
                                        <input
                                            type="text"
                                            name="number"
                                            placeholder="Search all available coins on Gooland"
                                            className="form-control"
                                        />
                                        <button type="submit" className="button-1">
                                            {" "}
                                            <i className="fas fa-search" />
                                            <span>Search</span>
                                        </button>
                                    </div>
                                </form>
                            </div>
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
                                                <th scope="col">
                                                    Chart <span className="head two">24h</span>
                                                </th>
                                                <th scope="col">Sell</th>
                                                <th scope="col">Buy</th>
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
                                                            className="coin"
                                                            src="frontend/assets/img/table/table-coin1.png"
                                                            alt=""
                                                        />
                                                        <span>Bitcoin (BTC)</span>
                                                    </div>
                                                </td>
                                                <td>10791.43$</td>
                                                <td>
                                                    <span className="persent"> +1.72%</span>
                                                </td>
                                                <td>$190B</td>
                                                <td>
                                                    <div className="chartimg">
                                                        <img
                                                            className="chart"
                                                            src="frontend/assets/img/table/table-chirt-1.png"
                                                            alt=""
                                                        />
                                                    </div>
                                                </td>
                                                <td>
                                                    <a href="#" className="button one">
                                                        Sell
                                                    </a>
                                                </td>
                                                <td>
                                                    <a href="#" className="button two">
                                                        Buy
                                                    </a>
                                                </td>
                                            </tr>
                                            <tr
                                                className="wow fadeInUp"
                                                data-wow-duration="0.3s"
                                                data-wow-delay="0.3s"
                                            >
                                                <td>
                                                    <div className="name">
                                                        <img
                                                            className="coin"
                                                            src="frontend/assets/img/table/table-coin2.png"
                                                            alt=""
                                                        />
                                                        <span>Ethereum (ETH)</span>
                                                    </div>
                                                </td>
                                                <td>399.42$</td>
                                                <td>
                                                    <span className="persent color">-0.37%</span>
                                                </td>
                                                <td>$43B</td>
                                                <td>
                                                    <div className="chartimg">
                                                        <img
                                                            className="chart"
                                                            src="frontend/assets/img/table/table-chirt-2.png"
                                                            alt=""
                                                        />
                                                    </div>
                                                </td>
                                                <td>
                                                    <a href="#" className="button one">
                                                        Sell
                                                    </a>
                                                </td>
                                                <td>
                                                    <a href="#" className="button two">
                                                        Buy
                                                    </a>
                                                </td>
                                            </tr>
                                            <tr
                                                className="wow fadeInUp"
                                                data-wow-duration="0.3s"
                                                data-wow-delay="0.3s"
                                            >
                                                <td>
                                                    <div className="name">
                                                        <img
                                                            className="coin"
                                                            src="frontend/assets/img/table/table-coin3.png"
                                                            alt=""
                                                        />
                                                        <span>Ripple (XRP)</span>
                                                    </div>
                                                </td>
                                                <td>0.270210$</td>
                                                <td>
                                                    <span className="persent">+1.78%</span>
                                                </td>
                                                <td>$25B</td>
                                                <td>
                                                    <div className="chartimg">
                                                        <img
                                                            className="chart"
                                                            src="frontend/assets/img/table/table-chirt-3.png"
                                                            alt=""
                                                        />
                                                    </div>
                                                </td>
                                                <td>
                                                    <a href="#" className="button one">
                                                        Sell
                                                    </a>
                                                </td>
                                                <td>
                                                    <a href="#" className="button two">
                                                        Buy
                                                    </a>
                                                </td>
                                            </tr>
                                            <tr
                                                className="wow fadeInUp"
                                                data-wow-duration="0.3s"
                                                data-wow-delay="0.3s"
                                            >
                                                <td>
                                                    <div className="name">
                                                        <img
                                                            className="coin"
                                                            src="frontend/assets/img/table/table-coin4.png"
                                                            alt=""
                                                        />
                                                        <span>Litecoin (LTC)</span>
                                                    </div>
                                                </td>
                                                <td>53.20$</td>
                                                <td>
                                                    <span className="persent">+2.80%</span>
                                                </td>
                                                <td>$3.3B</td>
                                                <td>
                                                    <div className="chartimg">
                                                        <img
                                                            className="chart"
                                                            src="frontend/assets/img/table/table-chirt-4.png"
                                                            alt=""
                                                        />
                                                    </div>
                                                </td>
                                                <td>
                                                    <a href="#" className="button one">
                                                        Sell
                                                    </a>
                                                </td>
                                                <td>
                                                    <a href="#" className="button two">
                                                        Buy
                                                    </a>
                                                </td>
                                            </tr>
                                            <tr
                                                className="wow fadeInUp"
                                                data-wow-duration="0.3s"
                                                data-wow-delay="0.3s"
                                            >
                                                <td>
                                                    <div className="name">
                                                        <img
                                                            className="coin"
                                                            src="frontend/assets/img/table/table-coin5.png"
                                                            alt=""
                                                        />
                                                        <span>TetherUS (USDT)</span>
                                                    </div>
                                                </td>
                                                <td>1.03$</td>
                                                <td>
                                                    <span className="persent">+0.10%</span>
                                                </td>
                                                <td>$8.9B</td>
                                                <td>
                                                    <div className="chartimg">
                                                        <img
                                                            className="chart"
                                                            src="frontend/assets/img/table/table-chirt-5.png"
                                                            alt=""
                                                        />
                                                    </div>
                                                </td>
                                                <td>
                                                    <a href="#" className="button one">
                                                        Sell
                                                    </a>
                                                </td>
                                                <td>
                                                    <a href="#" className="button two">
                                                        Buy
                                                    </a>
                                                </td>
                                            </tr>
                                            <tr
                                                className="wow fadeInUp"
                                                data-wow-duration="0.3s"
                                                data-wow-delay="0.3s"
                                            >
                                                <td>
                                                    <div className="name">
                                                        <img
                                                            className="coin"
                                                            src="frontend/assets/img/table/table-coin6.png"
                                                            alt=""
                                                        />
                                                        <span>OmiseGO (OMG)</span>
                                                    </div>
                                                </td>
                                                <td>4.45$</td>
                                                <td>
                                                    <span className="persent">+25.11%</span>
                                                </td>
                                                <td>$600M</td>
                                                <td>
                                                    <div className="chartimg">
                                                        <img
                                                            className="chart"
                                                            src="frontend/assets/img/table/table-chirt-6.png"
                                                            alt=""
                                                        />
                                                    </div>
                                                </td>
                                                <td>
                                                    <a href="#" className="button one">
                                                        Sell
                                                    </a>
                                                </td>
                                                <td>
                                                    <a href="#" className="button two">
                                                        Buy
                                                    </a>
                                                </td>
                                            </tr>
                                            <tr
                                                className="wow fadeInUp"
                                                data-wow-duration="0.3s"
                                                data-wow-delay="0.3s"
                                            >
                                                <td>
                                                    <div className="name">
                                                        <img
                                                            className="coin"
                                                            src="frontend/assets/img/table/table-coin7.png"
                                                            alt=""
                                                        />
                                                        <span>Neo (NEO)</span>
                                                    </div>
                                                </td>
                                                <td>17.570$</td>
                                                <td>
                                                    <span className="persent color">-7.15%</span>
                                                </td>
                                                <td>$1.87B</td>
                                                <td>
                                                    <div className="chartimg">
                                                        <img
                                                            className="chart"
                                                            src="frontend/assets/img/table/table-chirt-7.png"
                                                            alt=""
                                                        />
                                                    </div>
                                                </td>
                                                <td>
                                                    <a href="#" className="button one">
                                                        Sell
                                                    </a>
                                                </td>
                                                <td>
                                                    <a href="#" className="button two">
                                                        Buy
                                                    </a>
                                                </td>
                                            </tr>
                                            <tr
                                                className="wow fadeInUp"
                                                data-wow-duration="0.3s"
                                                data-wow-delay="0.3s"
                                            >
                                                <td>
                                                    <div className="name">
                                                        <img
                                                            className="coin"
                                                            src="frontend/assets/img/table/table-coin8.png"
                                                            alt=""
                                                        />
                                                        <span>Netko (Netko)</span>
                                                    </div>
                                                </td>
                                                <td>53.20$</td>
                                                <td>
                                                    <span className="persent color">-15.1%</span>
                                                </td>
                                                <td>$3.3B</td>
                                                <td>
                                                    <div className="chartimg">
                                                        <img
                                                            className="chart"
                                                            src="frontend/assets/img/table/table-chirt-8.png"
                                                            alt=""
                                                        />
                                                    </div>
                                                </td>
                                                <td>
                                                    <a href="#" className="button one">
                                                        Sell
                                                    </a>
                                                </td>
                                                <td>
                                                    <a href="#" className="button two">
                                                        Buy
                                                    </a>
                                                </td>
                                            </tr>
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
                                    Here are a few reasons why you should choose Gooland
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
            {/* Getway Start */}
            <div className="getway">
                <div className="container">
                    <div className="row justify-content-between align-items-center">
                        <div
                            className="col-lg-5 wow fadeInUp"
                            data-wow-duration="0.6s"
                            data-wow-delay="0.6s"
                        >
                            <div className="content">
                                <div className="tumb">
                                    <img src="frontend/assets/img/method-icon.png" alt="" />
                                </div>
                                <h3 className="subtitle">Our Payment Methods:</h3>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="card-box">
                                <a
                                    href="#"
                                    className="payment-card wow fadeInUp"
                                    data-wow-duration="0.3s"
                                    data-wow-delay="0.1s"
                                >
                                    <img src="frontend/assets/img/pament-1.png" alt="" />
                                </a>
                                <a
                                    href="#"
                                    className="payment-card wow fadeInUp"
                                    data-wow-duration="0.4s"
                                    data-wow-delay="0.2s"
                                >
                                    <img src="frontend/assets/img/pament-2.png" alt="" />
                                </a>
                                <a
                                    href="#"
                                    className="payment-card wow fadeInUp"
                                    data-wow-duration="0.5s"
                                    data-wow-delay="0.3s"
                                >
                                    <img src="frontend/assets/img/pament-3.png" alt="" />
                                </a>
                                <a
                                    href="#"
                                    className="payment-card wow fadeInUp"
                                    data-wow-duration="0.6s"
                                    data-wow-delay="0.4s"
                                >
                                    <img src="frontend/assets/img/pament-4.png" alt="" />
                                </a>
                                <a
                                    href="#"
                                    className="payment-card wow fadeInUp"
                                    data-wow-duration="0.7s"
                                    data-wow-delay="0.5s"
                                >
                                    <img src="frontend/assets/img/pament-5.png" alt="" />
                                </a>
                                <a
                                    href="#"
                                    className="payment-card wow fadeInUp"
                                    data-wow-duration="0.8s"
                                    data-wow-delay="0.6s"
                                >
                                    <img src="frontend/assets/img/pament-6.png" alt="" />
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
                                <h4 className="lasthead">Testimonials</h4>
                                <h2 className="title">
                                    Thousands of Happy Customers All Around the World
                                </h2>
                                <p className="text">
                                    Trusted by customers from more than 100 countries
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div
                            className="col-xl-4 col-md-6 wow fadeInUp"
                            data-wow-duration="0.1s"
                            data-wow-delay="0.1s"
                        >
                            <div className="testo-box">
                                <div className="review">
                                    <div className="stars">
                                        <i className="fas fa-star" />
                                        <i className="fas fa-star" />
                                        <i className="fas fa-star" />
                                        <i className="fas fa-star" />
                                        <i className="fas fa-star" />
                                    </div>
                                    <p className="text">
                                        “Great service, fast, helpful and efficient!”
                                    </p>
                                </div>
                                <div className="aurthor">
                                    <div className="thumb">
                                        <img src="frontend/assets/img/aurthor-1.png" alt="" />
                                    </div>
                                    <div className="content">
                                        <p className="text">
                                            Leo Joseph <span>August 25,2021</span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div
                            className="col-xl-4 col-md-6 wow fadeInUp"
                            data-wow-duration="0.2s"
                            data-wow-delay="0.2s"
                        >
                            <div className="testo-box">
                                <div className="review">
                                    <div className="stars">
                                        <i className="fas fa-star" />
                                        <i className="fas fa-star" />
                                        <i className="fas fa-star" />
                                        <i className="fas fa-star" />
                                        <i className="fas fa-star" />
                                    </div>
                                    <p className="text">
                                        “Received payment pretty fast, good exchange rates!”
                                    </p>
                                </div>
                                <div className="aurthor">
                                    <div className="thumb">
                                        <img src="frontend/assets/img/aurthor-2.png" alt="" />
                                    </div>
                                    <div className="content">
                                        <p className="text">
                                            Carroll Holt <span>August 25,2021</span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div
                            className="col-xl-4 col-md-6 wow fadeInUp"
                            data-wow-duration="0.3s"
                            data-wow-delay="0.2s"
                        >
                            <div className="testo-box">
                                <div className="review">
                                    <div className="stars">
                                        <i className="fas fa-star" />
                                        <i className="fas fa-star" />
                                        <i className="fas fa-star" />
                                        <i className="fas fa-star" />
                                        <i className="fas fa-star" />
                                    </div>
                                    <p className="text">
                                        “Very quicly and efficient thank you for all ”
                                    </p>
                                </div>
                                <div className="aurthor">
                                    <div className="thumb">
                                        <img src="frontend/assets/img/aurthor-3.png" alt="" />
                                    </div>
                                    <div className="content">
                                        <p className="text">
                                            Edgar Shaw <span>August 25,2021</span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div
                            className="col-xl-4 col-md-6 wow fadeInUp"
                            data-wow-duration="0.4s"
                            data-wow-delay="0.2s"
                        >
                            <div className="testo-box">
                                <div className="review">
                                    <div className="stars">
                                        <i className="fas fa-star" />
                                        <i className="fas fa-star" />
                                        <i className="fas fa-star" />
                                        <i className="fas fa-star" />
                                        <i className="fas fa-star" />
                                    </div>
                                    <p className="text">
                                        “Best website to buy &amp; sell CryptoCurrency”
                                    </p>
                                </div>
                                <div className="aurthor">
                                    <div className="thumb">
                                        <img src="frontend/assets/img/aurthor-4.png" alt="" />
                                    </div>
                                    <div className="content">
                                        <p className="text">
                                            Bert Jacobs <span>August 25,2021</span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div
                            className="col-xl-4 col-md-6 wow fadeInUp"
                            data-wow-duration="0.5s"
                            data-wow-delay="0.2s"
                        >
                            <div className="testo-box">
                                <div className="review">
                                    <div className="stars">
                                        <i className="fas fa-star" />
                                        <i className="fas fa-star" />
                                        <i className="fas fa-star" />
                                        <i className="fas fa-star" />
                                        <i className="fas fa-star" />
                                    </div>
                                    <p className="text">
                                        “Very very good, could be reale time transaction”
                                    </p>
                                </div>
                                <div className="aurthor">
                                    <div className="thumb">
                                        <img src="frontend/assets/img/aurthor-5.png" alt="" />
                                    </div>
                                    <div className="content">
                                        <p className="text">
                                            John Allen<span>August 25,2021</span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div
                            className="col-xl-4 col-md-6 wow fadeInUp"
                            data-wow-duration="0.6s"
                            data-wow-delay="0.2s"
                        >
                            <div className="testo-box">
                                <div className="review">
                                    <div className="stars">
                                        <i className="fas fa-star" />
                                        <i className="fas fa-star" />
                                        <i className="fas fa-star" />
                                        <i className="fas fa-star" />
                                        <i className="fas fa-star" />
                                    </div>
                                    <p className="text">
                                        “Never had a bad experience with this company ”
                                    </p>
                                </div>
                                <div className="aurthor">
                                    <div className="thumb">
                                        <img src="frontend/assets/img/aurthor-6.png" alt="" />
                                    </div>
                                    <div className="content">
                                        <p className="text">
                                            May Henry <span>August 25,2021</span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Counter Start */}
            <div className="counter">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div
                                className="counter-box"
                                style={{ backgroundImage: 'url("frontend/assets/img/counter-bg.png")' }}
                            >
                                <div
                                    className="page-counter wow fadeInUp"
                                    data-wow-duration="0.3s"
                                    data-wow-delay="0.2s"
                                >
                                    <div className="counter-item">
                                        <h2 className="title">
                                            $<span className="count-num">150</span>B+
                                        </h2>
                                        <p className="text">Cryptocurrency exchanged</p>
                                    </div>
                                </div>
                                <div
                                    className="page-counter wow fadeInUp"
                                    data-wow-duration="0.4s"
                                    data-wow-delay="0.3s"
                                >
                                    <div className="counter-item">
                                        <h2 className="title">
                                            <span className="count-num">102</span>
                                        </h2>
                                        <p className="text">Countries supported</p>
                                    </div>
                                </div>
                                <div
                                    className="page-counter wow fadeInUp"
                                    data-wow-duration="0.5s"
                                    data-wow-delay="0.4s"
                                >
                                    <div className="counter-item">
                                        <h2 className="title">
                                            <span className="count-num">30</span>M+
                                        </h2>
                                        <p className="text">Customers served</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Footer Start */}
            <div
                className="footer"
                style={{ backgroundImage: 'url("frontend/assets/img/footer-bg.png")' }}
            >
                <div className="container">
                    <div className="row justify-content-between align-items-center">
                        <div
                            className="col-12 wow fadeInUp"
                            data-wow-duration="0.3s"
                            data-wow-delay="0.3s"
                        >
                            <div className="top-footer">
                                <div className="logo">
                                    <img src="frontend/assets/img/footer-logo.png" alt="" />
                                </div>
                                <form action="#">
                                    <div className="form-group">
                                        <input type="email" placeholder="Enter email address" />
                                        <button type="submit" className="button-1">
                                            Join Now
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div
                            className="col-xl-2 col-lg-4 col-md-6 wow fadeInUp"
                            data-wow-duration="0.3s"
                            data-wow-delay="0.2s"
                        >
                            <div className="footer-box">
                                <h4 className="lasthead">Company</h4>
                                <ul className="footer-link">
                                    <li>
                                        <a href="#">About Us</a>
                                    </li>
                                    <li>
                                        <a href="#">Affiliate</a>
                                    </li>
                                    <li>
                                        <a href="#">Blog</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div
                            className="col-xl-2 col-lg-4 col-md-6 wow fadeInUp"
                            data-wow-duration="0.4s"
                            data-wow-delay="0.3s"
                        >
                            <div className="footer-box">
                                <h4 className="lasthead">Support</h4>
                                <ul className="footer-link">
                                    <li>
                                        <a href="#">FAQ</a>
                                    </li>
                                    <li>
                                        <a href="#">Contact</a>
                                    </li>
                                    <li>
                                        <a href="#">Knowledge Base</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div
                            className="col-xl-2 col-lg-4 col-md-6 wow fadeInUp"
                            data-wow-duration="0.5s"
                            data-wow-delay="0.4s"
                        >
                            <div className="footer-box">
                                <h4 className="lasthead">Policy</h4>
                                <ul className="footer-link">
                                    <li>
                                        <a href="#">Terms of use</a>
                                    </li>
                                    <li>
                                        <a href="#">Privacy Policy</a>
                                    </li>
                                    <li>
                                        <a href="#">Refund Policy</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div
                            className="col-xl-2 col-lg-4 col-md-6 wow fadeInUp"
                            data-wow-duration="0.6s"
                            data-wow-delay="0.5s"
                        >
                            <div className="footer-box">
                                <h4 className="lasthead">Services</h4>
                                <ul className="footer-link">
                                    <li>
                                        <a href="#">Buy</a>
                                    </li>
                                    <li>
                                        <a href="#">Sell</a>
                                    </li>
                                    <li>
                                        <a href="#">Buy Near You</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div
                            className="col-xl-2 col-lg-4 col-md-6 wow fadeInUp"
                            data-wow-duration="0.7s"
                            data-wow-delay="0.6s"
                        >
                            <div className="footer-box">
                                <h4 className="lasthead">Community</h4>
                                <ul className="footer-link">
                                    <li>
                                        <a href="#">Referral Program</a>
                                    </li>
                                    <li>
                                        <a href="#"> Affiliate Program</a>
                                    </li>
                                    <li>
                                        <a href="#">Gooland Blog</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div
                            className="col-xl-2 col-lg-4 col-md-6 wow fadeInUp"
                            data-wow-duration="0.8s"
                            data-wow-delay="0.7s"
                        >
                            <div className="footer-box">
                                <h4 className="lasthead">Contacts</h4>
                                <ul className="footer-link">
                                    <li>
                                        <a href="#">
                                            <span
                                                className="__cf_email__"
                                                data-cfemail="8bf8fefbfbe4f9ffcbece4e4e7eae5ef"
                                            >
                                                [email&nbsp;protected]
                                            </span>
                                        </a>
                                    </li>
                                    <li>+372 624 6211</li>
                                    <li>+372 624 600</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div
                            className="col-12 text-center wow fadeInUp"
                            data-wow-duration="0.3s"
                            data-wow-delay="0.3s"
                        >
                            <div className="footer-bottom">
                                <div className="content">
                                    <p className="text">
                                        Copyright © <a href="#">Gooland</a> | <a href="#">2021</a>{" "}
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