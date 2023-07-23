import { formatDecimal } from "../util/helpers"

export function Ticker(props: any) {
    const ticker = props.ticker

    return (
        <div className="d-flex">

           <div className="d-flex flex-column mx-4 flex-fill">

               
                        <>
                            <p className="text-danger font-bold">{formatDecimal(ticker.lastPrice)}&nbsp;<i className="icofont-arrow-down"></i></p>
                            <p className="text-danger font-bold">${formatDecimal(ticker.lastPrice)} &nbsp;<i className="icofont-arrow-down"></i></p>
                        </>
                 

            </div>

            <div className="d-flex flex-column mx-4 flex-fill">
                <b>24h Change</b>
                {parseFloat(ticker.priceChangePercent) < 0 ?
                    <>
                        <span className="text-danger mr-2">{formatDecimal(ticker.lastPrice)} &nbsp;<i className="icofont-long-arrow-down"></i></span>
                        <span className="text-danger">{ticker.priceChangePercent}% &nbsp;<i className="icofont-long-arrow-down"></i></span>
                    </>
                    :
                    <>
                        <span className="text-success mr-2">{formatDecimal(ticker.lastPrice)} &nbsp;<i className="icofont-long-arrow-up"></i></span>
                        <span className="text-success">{(ticker.priceChangePercent)}% &nbsp;<i className="icofont-long-arrow-up"></i></span>
                    </>
                }

            </div>


             <div className="d-flex flex-column mx-4 flex-fill">
                <b>24h High</b>
                <span className="">{formatDecimal(ticker.highPrice)}</span>

            </div>
          <div className="d-flex flex-column mx-4 flex-fill">
                <b>24h Low</b>
                <span className="">{formatDecimal(ticker.lowPrice)}</span>

            </div>
            <div className="d-flex flex-column mx-4 flex-fill">
                <b>24h Volume({props.mainCurrency})</b>
                <span className="">{formatDecimal(ticker.volume)}</span>

            </div>
            <div className="d-flex flex-column mx-4 flex-fill">
                <b>24h Volume(USDT)</b>
                <span className="">{formatDecimal(ticker.quoteVolume)}</span>

            </div>


        </div>
    )
}