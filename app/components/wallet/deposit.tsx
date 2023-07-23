'use client';

import QRGenerator from "@/app/components/QRGenerator";
import { MakePostRequest } from "@/app/util/make_post_request";
import { useEffect, useState } from "react";
import SuccessAlert from "../success_alert";
import ErrorAlert from "../error_alert";

let adress = "0xded56Cc56381b6192DeD15c35B0043fa15D2E4B8";
const network_options = {
    BTC: [
        { value: "Bitcoin", label: "Bitcoin" }

    ],
    BNB: [
        { value: "BEP20", label: "Binance Smart Chain BEP20" },
    ],
    ETH: [
        { value: "Ethereum", label: "Ethereum" },
    ],

    USDT: [

        { value: "BEP20", label: "BEP20" },
    ],
    DRNH: [
        { value: "BEP20", label: "Binance Smart Chain" },
    ]
} as any;

export default function Deposit(props: any) {
    const [copyText, setCopyText] = useState("Copy");
    const [networks, setNetworks] = useState([]);
    const [network, setNetwork] = useState();
    const [coin, setCoin] = useState();
    const [address, setAddress] = useState(adress);
    const [memo, setMemo] = useState();
    const [errorAlert, setErrorAlert] = useState({ show: false, message: '' });
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [btnText, setBtnText] = useState('Confirm');
    const [successAlert, setSuccessAlert] = useState({ show: false, message: '' });
    useEffect(() => {
        if (coin !== undefined) {
            console.log('after coin chan', coin)

        }


    }, [coin]);
    useEffect(() => {


        if (coin !== undefined && network !== undefined) {
            fetchDepositAddress(coin, network).then(async (resp) => {
                let res = await resp.json();
                setAddress(res['address'])
                if (res['memo'].length > 0) {
                    setMemo(res['memo'])
                }
            }).catch(err => {
                console.log('err', err)
            })
        }
    }, [network]);
    const fetchDepositAddress = (coin: string, network: any) => {
        return fetch('http://localhost:4000/wallet/getAddress', {
            method: 'POST',
            headers: {
                'Accept': 'application.json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ user_id: 1, coin: coin, network: network }),
            cache: 'default'
        })
    }


    const handleCoinChange = (e: any) => {
        let v = e.target

        setCoin(v.getAttribute('value'));
        setNetworks(network_options[v.getAttribute('value')])

    };
    const genrateAddress = () => {

        return <QRGenerator value={address} width="50" height="50" />;
    };
    const generateMemo = () => {

        return <QRGenerator value={memo} width="50" height="50" />;
    };
    const handleCopy = () => {

        navigator.clipboard.writeText(address);
        setCopyText("Copied");
    };

    const handleNetworkChange = (e: any) => {

        setNetwork(e.currentTarget.value)
    }
    const submitDeposit = () => {
        setLoading(true)
        MakePostRequest({ user_id: 1, address, coin, network }, 'wallet/deposit',props.token)
            .then(async (resp: any) => {
                let res = await resp.json()
                console.log('wtih scc', res)
                if (res['success']) {
                    setBtnText('OK');
                    setLoading(false)
                }
                else {
                    setErrorAlert({ show: true, message: res['message'] })
                    setLoading(false)
                }
            })
            .catch((err: any) => {
                setLoading(false)
                console.log('here i', err)

            })
    }
    return (
        <div className="card-body">
            {successAlert.show && <SuccessAlert message={successAlert.message} />}
            {errorAlert.show && <ErrorAlert message={errorAlert.message} />}
            <div className="tab-content">
                <div className="tab-pane fade show active" id="crypto">
                    <form>
                        <div className="mb-3">
                            <label className="form-label">Choose Coin</label>
                            <div className="row row-cols-3 row-cols-md-3 row-cols-lg-6 row-cols-xl-6">
                                <div className="col">
                                    <div className="form-check">
                                        <input
                                            onChange={(val) => handleCoinChange(val)}
                                            className="form-check-input"
                                            type="radio"
                                            value='BTC'
                                            name="flexRadioDefault"
                                            id="flexRadioDefaultbtc"
                                            defaultChecked={true}
                                        />
                                        <label
                                            className="form-check-label"
                                            htmlFor="flexRadioDefaultbtc"
                                        >
                                            BTC
                                        </label>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="form-check">
                                        <input
                                            onChange={(val) => handleCoinChange(val)}
                                            className="form-check-input"
                                            type="radio"
                                            value='ETH'
                                            name="flexRadioDefault"
                                            id="flexRadioDefaulteth"
                                        />
                                        <label
                                            className="form-check-label"
                                            htmlFor="flexRadioDefaulteth"
                                        >
                                            ETH
                                        </label>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="form-check">
                                        <input
                                            onChange={(val) => handleCoinChange(val)}
                                            className="form-check-input"
                                            type="radio"
                                            name="flexRadioDefault"
                                            value='USDT'
                                            id="flexRadioDefaultusdt"
                                        />
                                        <label
                                            className="form-check-label"
                                            htmlFor="flexRadioDefaultusdt"
                                        >
                                            USDT
                                        </label>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="form-check">
                                        <input
                                            onChange={(val) => handleCoinChange(val)}
                                            className="form-check-input"
                                            type="radio"
                                            name="flexRadioDefault"
                                            id="flexRadioDefaultbnb"
                                            value='BNB'
                                        />
                                        <label
                                            className="form-check-label"
                                            htmlFor="flexRadioDefaultbnb"
                                        >
                                            BNB
                                        </label>
                                    </div>
                                </div>


                            </div>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Choose Network</label>
                            <div className="row">
                                <div className="col-sm-12">
                                    <label className="form-label">Select Withdraw Network</label>
                                    <select
                                        className="form-select"
                                        aria-label="Default select example" onChange={val => handleNetworkChange(val)}
                                    >
                                        {networks !== undefined && networks.length > 0 ?
                                            networks.map((val: { value: string, label: string }, i: number) => {
                                                return <option key={i} value={val['value']}> {val['label']}  </option>;
                                            }) : <option value="" className="bg-transparent hover:bg-transparent">
                                                Select Network{" "}
                                            </option>
                                        }
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="mb-3">
                            <label className="form-label"> Deposit Address</label>
                            <div className="row">
                                <div className="col-md-2">
                                    {genrateAddress()}
                                </div>
                                <div className="col-md-8">

                                    {address}
                                </div>
                                <div className="col-md-2 ">
                                    <button type="button" className="btn btn-sm  btn-outline-primary" onClick={handleCopy}>
                                        {copyText == "Copied" ? (
                                            <div className="inline-flex flex-start" >
                                                <i
                                                    className="icofont-ui-copy"

                                                ></i>
                                                <small>Copied</small>
                                            </div>
                                        ) : (
                                            <div className="d-inline-flex flex-start" >
                                                <i

                                                    className="icofont-ui-copy"

                                                ></i>
                                                <small>Copy</small>
                                            </div>
                                        )}
                                    </button>
                                </div>
                            </div>

                        </div>
                        <div className="mb-3">

                            <div className="row">
                                <div className="col-md-6">
                                    <div className="truncated">Minimum Deposit</div>
                                    <div className="text-muted truncated mb-1">
                                        {" "}
                                        0.0005086 USDT{" "}
                                    </div>

                                </div>
                                <div className="col-md-6">
                                    <div className="truncated">Expected Arrival</div>
                                    <div className="text-muted truncated mb-1">
                                        {" "}
                                        1 network confirm
                                    </div>

                                </div>
                                <div className="col-md-6">
                                    <div className="truncated">Expected Unlock</div>
                                    <div className="text-muted truncated">
                                        {" "}
                                        1 network confirm
                                    </div>

                                </div>






                            </div>
                        </div>
                        <div className="mb-3">
                            <button
                                type="submit"
                                className="btn flex-fill btn-light-warning py-2 fs-5 text-uppercase px-5"
                            >
                                Confirm
                            </button>
                        </div>
                    </form>
                </div>

            </div >
        </div >

    )
}