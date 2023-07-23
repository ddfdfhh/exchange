import { MakePostRequest } from "@/app/util/make_post_request";
import Image from "next/image";
import { useEffect, useState } from "react";
const { authenticator } = require('otplib')
const QRCode = require('qrcode')
export function TwoFactorModal(props:any) {
    const [otp, setOtp] = useState('');
    const [secret, setSecret] = useState('');
    const [btnText, setBtnText] = useState('Verify');
    const [icon, setIcon] = useState('');
    const [base64, setBase] = useState();
    useEffect(() => {
        const secret1 = authenticator.generateSecret();
        setSecret(secret1)
        QRCode.toDataURL(authenticator.keyuri('shashi@gmail.com', '2FA Node App', secret1))
            .then((p: any) => {
                setBase(p)
                console.log('resp', p)
            })
            .catch((pe: any) => {
                console.log('error', pe)
            })
     }, [])

    async function handleOtpChange(e:any) {

        setOtp(e.currentTarget.value)
        

    }
    async function verify() {
      setBtnText('Verifying....')
   const resp =await MakePostRequest({ otp, secret }, '2fa/verify', props.authToken)
        if (resp.data.success) { 
            alert(resp.data.message)
            props.onEnabled(true)
        }
        else{
             alert(resp.data.message)
        }
     }
    return (
        <div className="modal fade rounded-0" id="TwoFactorModal" tabIndex={-1} aria-hidden="true">
            <div className="modal-dialog rounded-0">
                <div className="modal-content rounded-0">
                    <div className="modal-header">
                        <h5 className="modal-title">Two Factor Verification</h5>
                        <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                        />
                    </div>
                    <div className="modal-body ">
                        <div className="text-center mx-auto">
                        {
                            base64 !== undefined && <Image src={base64} alt="d" width={200} height={200} />
                        }
                        </div>
                         <div className="form-text">
                                    Scan the QR Code using Google Authenticator App on android 
                        </div>
                         <div className="mb-3">
                                <label className="form-label">Enter OTP</label>
                            <input type="text" className="form-control" value={otp} onChange={ e=>handleOtpChange(e)} />
                               
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button
                            type="button"
                            className="btn btn-secondary"
                            data-bs-dismiss="modal"
                        >
                            Close
                        </button>
                        <button type="button" className="btn btn-primary" onClick={ e=>verify()}>
                            { btnText}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}