import { formatDecimal } from "../../util/helpers"

export function DrnhTicker(props: any) {
    const response = props.ticker

    return (
        <div className="d-flex flex-wrap">

            <div className="d-flex flex-column mx-4 flex-fill">
                    <>
                            <h5 className="fw-bold">{formatDecimal(response?.last_trade?.price,8)}&nbsp;</h5>
                            <h6>${formatDecimal(response?.last_trade?.price,8)} &nbsp;</h6>
                        </>

                


            </div>

            <div className="d-flex flex-column mx-4 flex-fill">
                <b>24h Change</b>
                {parseFloat(response?.change_in_price) < 0 ?
                    <>
                        <span className="text-danger mr-2">{formatDecimal(response?.change_in_price)} &nbsp;<i className="icofont-long-arrow-down"></i></span>
                        <span className="text-danger">{(response?.precentage_change)}% &nbsp;<i className="icofont-long-arrow-down"></i></span>
                    </>
                    :
                    <>
                        <span className="text-success mr-2">{formatDecimal(response?.change_in_price)} &nbsp;<i className="icofont-long-arrow-up"></i></span>
                        <span className="text-success">{(response?.precentage_change)}% &nbsp;<i className="icofont-long-arrow-up"></i></span>
                    </>
                }

            </div>


             <div className="d-flex flex-column mx-4 flex-fill">
                <b>24h High</b>
                <span className="">{response?.last_24_hour_data?.high?formatDecimal(response?.last_24_hour_data?.high):0.0}</span>

            </div>
          <div className="d-flex flex-column mx-4 flex-fill">
                <b>24h Low</b>
                <span className="">{response?.last_24_hour_data?.low?formatDecimal(response?.last_24_hour_data?.low):0.0}</span>

            </div>
            <div className="d-flex flex-column mx-4 flex-fill">
                <b>24h Volume({props.mainCurrency})</b>
                <span className="">{response?.last_24_hour_data?.coin1_volume?formatDecimal(response?.last_24_hour_data?.coin1_volume):0.0}</span>

            </div>
            <div className="d-flex flex-column mx-4 flex-fill">
                <b>24h Volume(USDT)</b>
                <span className="">{response?.last_24_hour_data?.coin2_volume?formatDecimal(response?.last_24_hour_data?.coin2_volume):0.0}</span>

            </div>


        </div>
    )
}