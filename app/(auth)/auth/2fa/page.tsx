'use client';
import ErrorAlert from "@/app/components/error_alert";
import SuccessAlert from "@/app/components/success_alert";
import { MakePostRequest } from "@/app/util/make_post_request";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { redirect, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
let authToken: any;
export default function TwoFA() {
    const [otp, setOtp] = useState()
     const router = useRouter();
    const [errorAlert, setErrorAlert] = useState<{ show: boolean; message: string }>({
    show: false, message: ''
  })
  const [successAlert, setSuccessAlert] = useState<{ show: boolean; message: string }>({
    show: false, message: ''
  })
    const { status, data: session } = useSession()
      useEffect(() => {

    if (status == 'authenticated') {
      authToken = session?.user?.accessToken
      
      
    }
    else if (status == 'unauthenticated') {
      return redirect('/auth/login')

    }

  }, [status])
    const submitForm = () => { 
       MakePostRequest({ otp}, 'auth/2fa/verify', authToken)
        .then(resp => {
            console.log(resp.data.data)
            if (resp.data.success) {
                router.push('/backend')
                setSuccessAlert({ show: true, message: resp.data.message })
              
            }
            else setErrorAlert({ show:true,message:resp.data.message} )
         

        }).catch(err => {
          
         
        })
    }
    return (
        <div className="body d-flex p-0 p-xl-5">
            {successAlert.show && <SuccessAlert message={successAlert.message} />}
        {errorAlert.show && <ErrorAlert message={errorAlert.message} />}
                <div className="container-xxl">
                    <div className="row g-3">
                        <div className="col-lg-6 d-flex justify-content-center align-items-center auth-h100">
                        <div className="d-flex flex-column ert">
                            <h2>Two Factor Login</h2>
                            <div className="card">
                                            <div className="card-body p-4">
                                                <form>
                                                    <div className="mb-3">
                                                        <label className="form-label fs-6">Enter 2 FA Login Otp</label>
                                            <input type="number" className="form-control" name="otp" value={otp} onChange={ (e:any)=>setOtp(e.currentTarget.value)} />
                                                    </div>
                                                   
                                                    <button
                                            type="button" onClick={ e=>submitForm()}
                                                        className="btn btn-primary text-uppercase py-2 fs-5 w-100 mt-2"
                                                    >
                                                        log in
                                                    </button>
                                                </form>
                                            </div>
                                        </div>
                                   
                                
                                
                            </div>
                        </div>
                        <div className="col-lg-6 d-none d-lg-flex justify-content-center align-items-center auth-h100">
                            <div className="qr-block text-center">
                                 <img src="/pl.png" className="img-fluid my-4" alt="login"  />

                            </div>
                        </div>
                    </div>{" "}
                    {/* End Row */}
                </div>
            </div>
       

    );
}