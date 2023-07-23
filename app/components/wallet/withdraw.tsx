"use client";

import QRGenerator from "@/app/components/QRGenerator";
import { useEffect, useState } from "react";
import { validate, getAddressInfo } from 'bitcoin-address-validation';
import { MakePostRequest, MakeGetRequestNoQuery, MakePostRequestUrl} from "@/app/util/make_post_request";
import QRScanner from "../QRScanner";
import SuccessAlert from "../success_alert";
import ErrorAlert from "../error_alert";

const adress = '0xded56Cc56381b6192DeD15c35B0043fa15D2E4B8'
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
export default function Withdraw(props: any) {
      const [coin, setCoin] = useState();
 
  const [copyText, setCopyText] = useState("Copy");
  const [networks, setNetworks] = useState<Array<any>>([]);
  const [address, setAddress] = useState();
  const [loading, setLoading] = useState(true);
  const [network, setNetwork] = useState();
  const [message, setMessage] = useState('');
  const [isValid, setValid] = useState(true);
  const [showScannerInModal, setshowScannerInModal] = useState(false);
  const [balance, setBalance] = useState<number>(0);
  const [withAmount, setWithAmount] = useState(0);
  const [withAmountError, setWithAmountError] = useState('');
  const [success, setSuccess] = useState();
  const [successAlert, setSuccessAlert] =  useState({show:false,message:''});
  const [errorAlert, setErrorAlert] = useState({show:false,message:''});
  const [error, setError] = useState<any>();
  const [fees, setFees] = useState(0);
 
  const [shouldOpenScanDialog, setShouldOpenScanDialog] = useState(false);
  const [todayWithdrawn, setTodayWithdrawn] = useState(0);
  const [withLimit, setWithLimit] = useState(0);
  const [txHash, setTxHash] = useState();
    const [transactions, setTransactions] = useState([]);
     const showScanModal = () => {
         setshowScannerInModal(true)
        const { Modal } = require("bootstrap");
        const myModal = new Modal("#scanModal");
        
      
        myModal.show();
    };
  const fetchBalance = () => { 
    MakePostRequest({ user_id: 1, coin, network }, 'wallet/getBalance',props.token)
        .then(async (resp: any) => {
          let res =  resp.data;
          console.log('response rec', res)
          setBalance(res['balance'])
          setFees(res['fees'])
          setWithLimit(res['totalLimit'])
        
          setTodayWithdrawn(res['todayWithdrawn'])
          })
        .catch((error: any) => { 
           alert(error)
         })
  }
  useEffect(() => {
    if (coin !== undefined) {
      const g = network_options[coin];
      setNetwork(g[0].value)
        setNetworks(g)
        
      }
       if (coin !== undefined && network !== undefined && address!=undefined && isValid) { 
      fetchBalance()
    }
  }, [coin]);
  useEffect(() => {
    if (coin !== undefined && network !== undefined && address!=undefined && isValid) { 
      fetchBalance()
    }
         
  }, [network]);
  useEffect(() => {
    if (coin !== undefined && network !== undefined && address!=undefined && isValid) { 
      fetchBalance()
    }
    //  var ws = new WebSocket("wss://socket.blockcypher.com/v1/btc/test3?token=9956d480d3be413dbca12492589a3da5");
    // var count = 0;
    // ws.onmessage = function (event) {
   
    //   var tx = JSON.parse(event.data);
       
    //   var total = tx.total / 100000000;
    //   var addrsese = tx.addresses;
    //   console.log('event', {hash:tx.hash, val:total,address: addrsese})
    //   // count++;
    //   // if (count > 10) ws.close();
    // }
    // ws.onopen = function (event) {
    //  // ws.send(JSON.stringify({event: "ping"}))
    //   ws.send(JSON.stringify({event: "confirmed-tx"}));
    // } 
    
  }, [address]);
  const validateAddress = (address1: any) => {
    if (coin !== undefined) {
      console.log('validting coin',coin)
      switch (coin) {
        case 'BTC':
          if(network=='Bitcoin')
            return validate(address1);
          else
             return /^(0x)?[0-9a-fA-F]{40}$/.test(address1);
        case 'BNB':
          return /^(bnb1)[0-9a-z]{38}$/.test(address1) || /^(0x)?[0-9a-fA-F]{40}$/.test(address1) || /^(tbnb1)[0-9a-z]{38}$/.test(address1);
        case 'BEP20':
          return /^(0x)?[0-9a-fA-F]{40}$/.test(address1);
        case 'BUSD':
           return /^(0x)?[0-9a-fA-F]{40}$/.test(address1);
        case 'ETH':
           return /^(0x)?[0-9a-fA-F]{40}$/.test(address1);
        case 'ERC20':
            return /^(0x)?[0-9a-fA-F]{40}$/.test(address1);
        case 'TRX':
          return /^(T)[A-HJ-NP-Za-km-z1-9]{33}$/.test(address1);
        case 'USDT':
          return  /^(T)[A-HJ-NP-Za-km-z1-9]{33}$/.test(address1) ||  /^(0x)?[0-9a-fA-F]{40}$/.test(address1);
            
      }
    }
    }
 

  const detectNetwork = (val: any) => {
      let message1 = '';
    //  alert()
    console.log('detecting network',val)
    if (val.length > 0)
    {
        if (coin == 'BTC') {
          if (!validateAddress(val)) {
            message1 = 'invalid Bitcoin Address entered'
          }
              
        }
        else if (coin == 'BNB') {
          if (!validateAddress(val)) {
            message1 = 'Invalid BNB Address entered'
          }
              
        }
        else if (coin == 'BUSD') {
          if (!validateAddress(val)) {
            message1 = 'Invalid BUSD  Address entered'
          }
              
        }
        else if (coin == 'ETH') {
          if (!validateAddress(val)) {
            message1= 'Invalid Ethereum Address entered'
          }
              
        }
        else if (coin == 'TRX') {
          if (!validateAddress(val)) {
            message1 = 'Invalid Tron Address entered'
          }
              
        }
        else if (coin == 'USDT') {
          if (!validateAddress(val)) {
            message1 = 'Invalid USDT Address entered'
          }
              
        }
      if (message1.length>0) {
           setAddress(undefined)
          setMessage(message1)
          setValid(false)
         
        }
      else {
        setValid(true)
        setMessage('')
          if (coin !== undefined) {
            setAddress(val)
            let g=network_options[coin]
            setNetworks(g);
            setNetwork(g[0].value)
          }
        }
    }
  };
  const genrateAddress = () => {
   
    return <QRGenerator value={ adress} width="100" height="100" />
  }
  const handleCopy = () => { 
        navigator.clipboard.writeText(adress)
        setCopyText('Copied');
  }
  const handleWithAmountInput = (val: any) => { 
    
    let g = parseFloat(val) + parseFloat(fees as unknown as string)
    console.log('andling', g)
    if (g > balance)
      setWithAmountError('Insufficent balance including network fees');
    else {
      setWithAmountError('');
      setWithAmount(val)
    }
  }
  const loadTransactions = () => { 
   // setTransactions(TABLE_ROWS as any);
  }
  const setMaxInput = () => { 
   console.log('max clicked')
  }
    const renderTransactions = (transactions: Array<any>) => { }
   const addWebhookIdToDB = (hook_id: string,hash:string) => {
    console.log('adding webok  to hoo')
      let data = {
                "hook_id": hook_id,
                "hash": hash,
                "to": address,
                coin,network
    }
   
     MakePostRequest(data,'addWebhookId',props?.token)
      .then(async (resp: any) => { 
        let res =  resp.data
       
        
      
      })
      .catch((err:any) => { 
        console.log('adding hook error', err)
       
      })

  }
  const createWebhook = (hash: any) => {
    console.log('posting to hoo')
      var webhook = {
                "event": "confirmed-tx",
                "address": address,
                "url": "https://c5dc-2409-4063-4e87-55ed-4903-999d-dfa3-49d0.ngrok-free.app/webhook"
    }
    const url='https://api.blockcypher.com/v1/btc/test3/hooks?token=9956d480d3be413dbca12492589a3da5';
     MakePostRequestUrl(webhook,url,props.token)
      .then(async (resp: any) => { 
        let res = resp.data
        console.log('hook', res)
        addWebhookIdToDB(res['id'], hash);
      
      })
      .catch((err:any) => { 
        console.log('hook error', err)
       
      })

  }
  const submitWithdrawal = (e:any) => {
      e.preventDefault();
   setLoading(true)
    MakePostRequest({user_id:1,amount:withAmount,coin,network,fees:fees,balance,to_address:address},'wallet/withdrawal',props.token)
      .then(async (resp: any) => { 
        let res =  resp.data
        console.log('wtih scc', res)
        setLoading(false)
        if (res['hash'] !== undefined) {
          if (coin == 'BTC' && network=='Bitcoin') {
            createWebhook(res['hash'])
          }
       //   setTxHash(res['hash']);
           
          
        }
          res['success'] ? setSuccessAlert({ show: true, message: res['message'] })
              :  setErrorAlert({ show: true, message: res['message'] })
      })
      .catch((err:any) => { 
        console.log('here i', err)
         setLoading(false)
         setError('Some error ocurred')
      })
  }
  const checkTransactionStatus = (coin:any, network:any) => {
    /*https://docs.blocknative.com/mempool-tools/transaction-simulation/pre-flight-simulation#how-to-websocket-endpoint*/
    if (coin == 'BTC' && network == 'Bitcoin')
    {
      if (txHash === undefined)
        setErrorAlert({ show: true, message: 'No Hash Found' })
      else {
        let url = 'https://api.blockcypher.com/v1/btc/test3'
        MakeGetRequestNoQuery(url + '/txs/' + txHash,props.token)
          .then(async (resp: any) => {
            console.log('status', await resp.status);
            let res = resp.data
              if (res['block_hash'] === undefined || res['block_height'] < 0) {
                setErrorAlert({ show: true, message: 'Transaction is not confirmed' });
              } else { 
                setSuccessAlert({ show: true, message: 'Transaction is  confirmed' });
              }
           })
          .catch((err: any) => {
            setErrorAlert({ show: true, message: 'Transaction is not confirmed' });
            console.log('has erro', err);
          })
      }
  }
    else if (coin == 'BNB' && network == 'BEP2')
    {
      if (txHash === undefined)
        setErrorAlert({ show: true, message: 'No Hash Found' })
      else {
        const testnetapiurl = 'https://testnet-dex-asiapacific.binance.org';
        const mainnetapiurl = 'https://dex-asiapacific.binance.org';
        const apiurl = testnetapiurl;
        let url = `${apiurl}/api/v1/tx/${txHash}`
        MakeGetRequestNoQuery(url,props.token)
          .then(async (resp: any) => {
            console.log('status', await resp.status);
            let res = resp.data
            console.log('ssf',res)
              if (res['height'] === undefined || res['height'] < 0) {
                setErrorAlert({ show: true, message: 'Transaction is not confirmed' });
              } else { 
                setSuccessAlert({ show: true, message: 'Transaction is  confirmed' });
              }
           })
          .catch((err: any) => {
            setErrorAlert({ show: true, message: 'Transaction is not confirmed' });
            console.log('has erro', err);
          })
      }
  }
  }
  const handleNetworkChange = (e:any) => { 
  
    setNetwork(e.currentTarget.value)
  }
  const handleScan = (v:any) => { 
    console.log('scan', v)
    if (shouldOpenScanDialog) { 
      setAddress(v)
    }
    setShouldOpenScanDialog(false)
    
   // setNetwork(v)
  }
  const handleScanDialogOpen = (v:any) => { 
   setShouldOpenScanDialog(!shouldOpenScanDialog)
   // setNetwork(v)
  }

    return (<div className="card-body">
         {successAlert.show && <SuccessAlert message={successAlert.message} />}
        {errorAlert.show && <ErrorAlert message={errorAlert.message} />}
        <form>
             {
              message.length > 0 && !isValid ? <span className="text-danger">{message}</span> : <span></span>
            }
            <div className="row g-3 mb-3">
                <div className="col-sm-12">
                    <label className="form-label">Select coin</label>
                     <select
                        value={coin}
                        className="form-control form-select"
                        onChange={(e:any) => setCoin(e.currentTarget.value)}
                        >
                        <option value="">Select Coin</option>
                        <option value="BTC">BTC</option>
                        <option value="BNB">BNB</option>
                        
                        <option value="USDT">USDT</option>
                        <option value="ETH">ETH</option>
                        
                        <option value="DRNH">DRNH</option>
                        </select>
                </div>
                <div className="col-sm-12">
                    <label className="form-label">Withdraw Address</label>
                    <div className="row">
                        <div className="col-md-8">
                    <input type="text" className="form-control" value={address} onChange={ (e:any)=>detectNetwork(e.target.value)} />

                        </div>
                        <div className="col-md-4">
                              <i onClick={(e: any) => showScanModal()} className="icofont-qr-code"></i>
                {/* <ScannerDialog shouldOpenScanDialog={shouldOpenScanDialog} handleScan={ handleScan} handleScanDialogOpen={ handleScanDialogOpen} /> */}
             
                        </div>
                    </div>
                </div>
                <div className="col-sm-12">
                    <label className="form-label">Select Withdraw Network</label>
                    <select
                        className="form-select"
                        aria-label="Default select example" onChange={ e=>handleNetworkChange(e)}
                    >
                       {networks.length > 0 ?
                        networks.map((val: {value:string,label:string}, i: number) => {
                        return <option key={i} value={val['value']}> { val['label']}  </option>;
                        }):<option value="" className="bg-transparent hover:bg-transparent">
                        Select Network{" "}
                        </option>
                    }
                    </select>
                </div>
                <div className="col-sm-12">
                      <label className="form-label">Amount</label>
                    <input type="text" className="form-control" value={withAmount} onChange={(e: any) => handleWithAmountInput(e.target.value)} /> 
                              {
              withAmountError.length > 0  ? <span className="text-danger">{withAmountError}</span> : null
            }
                 </div>
                <div className="col-sm-12">
                      <label className="form-label">Receive Amount</label><br/>
                    
                            {
                                (coin != undefined && network != undefined && address != undefined && withAmount>0)
                                    ? <span>{parseFloat(withAmount  as unknown as string)-parseFloat(fees  as unknown as string)} {coin}</span>
                                :
                            <span> Not Available</span>
                            
                }
                <hr/>
                 </div>
                <div className="col-sm-12">
                    <div className="d-flex justify-content-between flex-wrap">
                        <div>
                            <div className="truncated">{ coin} spot balance</div>
                            <div className="text-muted truncated">
                                 {coin !== undefined && network !== undefined ? (<><span >{balance} {coin}</span></>) :<span></span>
      }

                            </div>
                        </div>
                        <div>
                            <div className="truncated">Minimum withdrawal</div>
                            <div className="text-muted  truncated"> 0.0000086 BTC </div>
                        </div>
                    </div>
                </div>
                <div className="col-sm-12">
                    <div className="d-flex justify-content-between flex-wrap">
                        <div>
                            <div className="truncated">Network fee</div>
                            <div className="text-muted truncated">
                                {" "}
                              {fees?fees:'Not Available'} { coin}
                            </div>
                        </div>
                        <div>
                            <div className="truncated">24h remaining limit</div>
                            <div className="text-muted  truncated">
                                {" "}
                                {todayWithdrawn} {coin}/{withLimit} {coin}
                                {" "}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mb-3">
                            <button disabled={loading} onClick={e=>submitWithdrawal(e)}
                                type="submit"
                                className="btn flex-fill btn-light-primary py-2 fs-5 text-uppercase px-5"
                            >
                                Submit {loading && <span className="spinner-border spinner-border-sm"></span>}
                            </button>
                        </div>
            </div>
        </form>
        <div className="modal fade rounded-0"  id="scanModal" tabIndex={-1} aria-hidden="true">
            <div className="modal-dialog rounded-0">
                <div className="modal-content rounded-0">
                    <div className="modal-header">
                        <h5 className="modal-title">Scan Modal</h5>
                        <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                        />
                    </div>
                    <div className="modal-body">
                     
      
                        {showScannerInModal ? <QRScanner onResult1={(data: any) => handleScan(data)} />
     
                            : null
                        }
                    </div>
                    <div className="modal-footer">
                        <button
                            type="button"
                            className="btn btn-secondary"
                            data-bs-dismiss="modal"
                        >
                            Close
                        </button>
                        <button type="button" className="btn btn-primary">
                            Verify
                        </button>
                    </div>
                </div>
            </div>
        </div>
        
    </div>)
}