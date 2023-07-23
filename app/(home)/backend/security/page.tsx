'use client';

import { useEffect, useState } from "react";
import { AntiPhisingModal } from "../../../components/modals/anit-phising";
import { TwoFactorModal } from "../../../components/modals/two-factor";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import SuccessAlert from "@/app/components/success_alert";
import ErrorAlert from "@/app/components/error_alert";
 let authToken: string | undefined

export default function Security() {
    const [two, setTwo] = useState('')
     const { status, data: session } = useSession()
    const [successAlert, setSuccessAlert] =  useState({show:false,message:''});
  const [errorAlert, setErrorAlert] = useState({show:false,message:''});
     useEffect(() => { 
       
       if (status == 'authenticated') {
         authToken = session?.user?.accessToken
          
       
      
       }
       else if (status == 'unauthenticated') {
         return redirect('/auth/login')
      
       }
          
        
      
    },[status])
    const showModal = (id: string) => {
        setTwo('ok')
        const { Modal } = require("bootstrap");
        const myModal = new Modal("#"+id);
        myModal.show();
        
    }
   const onEnabled2Fa=(data:boolean)=>{ 
        setSuccessAlert({show:true,message:'2FA Enabled Successfully'})
    }
    return (<div className="body d-flex py-3">
         {successAlert.show && <SuccessAlert message={successAlert.message} />}
            {errorAlert.show && <ErrorAlert message={errorAlert.message} />}
        <div className="container-xxl">
            <div className="row align-item-center mb-3">
                <div className="col-xl-12">
                    <div className="card">
                        <div className="card-header py-3 d-flex justify-content-between bg-transparent align-items-center ">
                            <h6 className="mb-0 fw-bold">Authentication (2FA)</h6>
                        </div>
                        <div className="card-body">
                            <div className="border-bottom py-2 mb-2">
                                <div className="row justify-content-between">
                                    <div className="col-lg-4 col-xl-4">
                                        <div className="d-flex">
                                            <i className="icofont-key fs-5 text-primary" />
                                            <div className="d-flex flex-column px-2">
                                                <span className="fw-bold">Security Key</span>
                                                <span className="text-muted small">
                                                    Protect your account with a security key.
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-4 col-xl-4">
                                        <div className="d-flex align-items-center">
                                            <i className="icofont-close-circled fs-5 text-danger" />
                                            <span className="px-2">Unset</span>
                                        </div>
                                    </div>
                                    <div className="col-lg-4 col-xl-4">
                                        <button
                                            type="button"
                                            className="btn flex-fill btn-light-warning py-2 fs-6 text-uppercase px-3 mt-2 mt-lg-0 float-lg-end"
                                            onClick={e => showModal('EnableModal')}

                                        >
                                            Enable
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="border-bottom py-2 mb-2">
                                <div className="row justify-content-between">
                                    <div className="col-lg-4 col-xl-4">
                                        <div className="d-flex">
                                            <i className="icofont-network fs-5 text-primary" />
                                            <div className="d-flex flex-column px-2">
                                                <span className="fw-bold">
                                                    Google Authenticator (Recommended)
                                                </span>
                                                <span className="text-muted small">
                                                    Protect your account and transactions.
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-4 col-xl-4">
                                        <div className="d-flex align-items-center">
                                            <i className="icofont-close-circled fs-5 text-danger" />
                                            <span className="px-2">Unset</span>
                                        </div>
                                    </div>
                                    <div className="col-lg-4 col-xl-4">
                                        <button
                                            type="button"
                                            className="btn flex-fill btn-light-warning py-2 fs-6 text-uppercase px-3 mt-2 mt-lg-0 float-lg-end"
                                            data-bs-toggle="modal"
                                           onClick={e => showModal('TwoFactorModal')}
                                
                                        >
                                            Enable
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="border-bottom py-2 mb-2">
                                <div className="row justify-content-between">
                                    <div className="col-lg-4 col-xl-4">
                                        <div className="d-flex">
                                            <i className="icofont-smart-phone fs-5 text-primary" />
                                            <div className="d-flex flex-column px-2">
                                                <span className="fw-bold">Phone Number Verification</span>
                                                <span className="text-muted small">
                                                    Protect your account and transactions.
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-4 col-xl-4">
                                        <div className="d-flex align-items-center">
                                            <i className="icofont-check-circled fs-5 text-success" />
                                            <span className="px-2">98****478</span>
                                        </div>
                                    </div>
                                    <div className="col-lg-4 col-xl-4">
                                        <button
                                            type="button"
                                            className="btn flex-fill btn-light-danger py-2 fs-6 text-uppercase px-3 mt-2 mt-lg-0 float-lg-end"
                                            data-bs-toggle="modal"
                                            data-bs-target="#RemoveModal"
                                        >
                                            Remove
                                        </button>
                                        <button
                                            type="button"
                                            className="btn flex-fill btn-light-success py-2 fs-6 text-uppercase px-3 mt-2 mt-lg-0 float-lg-end mx-2"
                                            data-bs-toggle="modal"
                                            data-bs-target="#ChangeModal"
                                        >
                                            Change
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="py-2">
                                <div className="row justify-content-between">
                                    <div className="col-lg-4 col-xl-4">
                                        <div className="d-flex">
                                            <i className="icofont-email fs-5 text-primary" />
                                            <div className="d-flex flex-column px-2">
                                                <span className="fw-bold">
                                                    Email Address Verification
                                                </span>
                                                <span className="text-muted small">
                                                    Protect your account and transactions.
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-4 col-xl-4">
                                        <div className="d-flex align-items-center">
                                            <i className="icofont-check-circled fs-5 text-success" />
                                            <span className="px-2">Joh*****@gmail.com</span>
                                        </div>
                                    </div>
                                    <div className="col-lg-4 col-xl-4">
                                        <button
                                            type="button"
                                            className="btn flex-fill btn-light-danger py-2 fs-6 text-uppercase px-3 mt-2 mt-lg-0 float-lg-end"
                                            data-bs-toggle="modal"
                                            data-bs-target="#RemoveModal"
                                        >
                                            Remove
                                        </button>
                                        <button
                                            type="button"
                                            className="btn flex-fill btn-light-success py-2 fs-6 text-uppercase px-3 mt-2 mt-lg-0 float-lg-end mx-2"
                                            data-bs-toggle="modal"
                                            data-bs-target="#ChangeModal"
                                        >
                                            Change
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>{" "}
            {/* Row end  */}
            <div className="row align-item-center mb-3">
                <div className="col-xl-12">
                    <div className="card">
                        <div className="card-header py-3 d-flex justify-content-between bg-transparent align-items-center ">
                            <h6 className="mb-0 fw-bold">Advanced Security</h6>
                        </div>
                        <div className="card-body">
                            <div className="border-bottom py-2 mb-2">
                                <div className="row justify-content-between">
                                    <div className="col-lg-4 col-xl-4">
                                        <div className="d-flex">
                                            <i className="icofont-ui-lock fs-5 text-primary" />
                                            <div className="d-flex flex-column px-2">
                                                <span className="fw-bold">Login Password</span>
                                                <span className="text-muted small">
                                                    Login password is used to log in to your account.
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-4 col-xl-4">
                                        <button
                                            type="button"
                                            className="btn flex-fill btn-light-success py-2 fs-6 text-uppercase px-3 mt-2 mt-lg-0 float-lg-end"
                                            data-bs-toggle="modal"
                                            data-bs-target="#ChangeModal"
                                        >
                                            Change
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="border-bottom py-2 mb-2">
                                <div className="row justify-content-between">
                                    <div className="col-lg-4 col-xl-4">
                                        <div className="d-flex">
                                            <i className="icofont-tasks fs-5 text-primary" />
                                            <div className="d-flex flex-column px-2">
                                                <span className="fw-bold">Withdrawal Whitelist</span>
                                                <span className="text-muted small">
                                                    whitelisted withdrawal addresses.
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-4 col-xl-4">
                                        <div className="d-flex align-items-center">
                                            <i className="icofont-close-circled fs-5 text-danger" />
                                            <span className="px-2">OFF</span>
                                        </div>
                                    </div>
                                    <div className="col-lg-4 col-xl-4">
                                        <button
                                            type="button"
                                            className="btn flex-fill btn-light-warning py-2 fs-6 text-uppercase px-3 mt-2 mt-lg-0 float-lg-end"
                                            data-bs-toggle="modal"
                                            data-bs-target="#EnableModal"
                                        >
                                            Enable
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="py-2">
                                <div className="row justify-content-between">
                                    <div className="col-lg-4 col-xl-4">
                                        <div className="d-flex">
                                            <i className="icofont-anchor fs-5 text-primary" />
                                            <div className="d-flex flex-column px-2">
                                                <span className="fw-bold">Anti-Phishing Code</span>
                                                <span className="text-muted small">
                                                    Protect your account from phishing attempts{" "}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-4 col-xl-4">
                                        <div className="d-flex align-items-center">
                                            <i className="icofont-close-circled fs-5 text-danger" />
                                            <span className="px-2">OFF</span>
                                        </div>
                                    </div>
                                    <div className="col-lg-4 col-xl-4">
                                        <button
                                            type="button"
                                            className="btn flex-fill btn-light-warning py-2 fs-6 text-uppercase px-3 mt-2 mt-lg-0 float-lg-end"
                                            data-bs-toggle="modal"
                                            data-bs-target="#EnableModal"
                                        >
                                            Enable
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>{" "}
            {/* Row end  */}
        </div>
        {two !== undefined && authToken !== undefined && <TwoFactorModal authToken={authToken} onEnabled={ (data:any)=>onEnabled2Fa(data)} />}  

    </div>
    )
}