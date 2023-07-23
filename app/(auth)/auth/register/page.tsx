/*eslint-disable*/
'use client';
import ErrorAlert from "@/app/components/error_alert";
import SuccessAlert from "@/app/components/success_alert";

import { MakePostRequest } from "@/app/util/make_post_request";
import { constants } from "fs";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
// import { redirect} from 'next/navigation'
import { useRouter } from "next/navigation";
export default function Register() {
   const router=useRouter()
    const nameRef = useRef(null);
    const emailRef = useRef(null);
    const phoneRef = useRef(null);
    const passwordRef = useRef(null);
    const confirmRef = useRef(null);
    const referral_id = useRef(null);
    const [loading,setLoading]=useState(false)
    const [errorAlert, setErrorAlert] = useState<{ show: boolean; message:string}>({
        show:false,message:''
    })
    const [successAlert, setSuccessAlert] = useState<{ show: boolean; message:string}>({
        show:false,message:''
    })
    useEffect(() => {
        
        const html = (document.getElementById('popover-content') as any).innerHTML;

        const { Popover } = require("bootstrap");
        const popover = new Popover(document.querySelector('#pop'), {
            html: true, content: html
        })
    }, [])
    useEffect(() => {
        if(successAlert.show)
            setSuccessAlert({ show: false, message: '' })
        if(errorAlert.show)
         setErrorAlert({show:false,message:''})
       
       
    }, [errorAlert.show,successAlert.show])
    const handleSubmit = (e:any) => {
        e.preventDefault()
       
        const emailv = (emailRef?.current as any).value;
        const namev = (nameRef.current as any).value
        const passwordv = (passwordRef.current as any).value
        const phonev = (phoneRef.current as any).value
        const confirmv = (confirmRef.current as any).value
        const referralv = (referral_id.current as any).value
        
        if (namev == null || emailv == null || passwordv == null || confirmv == null) {
            setErrorAlert({ show: true, message: 'Fields marked as *  are required' })
        }
        const email =
            /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        if (emailv && !email.test(emailv)) {
          
            setErrorAlert({ show: true, message: 'Please enter valid email address' })
        }
        // const pwd =
        //     /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[a-zA-Z!#$%&? "])[a-zA-Z0-9!#$%&?]{8,20}$/;
        // if (passwordv && !pwd.test(passwordv)) {
         
        //       setErrorAlert({ show: true, message: 'Please enter strong password as per requirement' })
        // }
        if (confirmv && passwordv != confirmv) {
            setErrorAlert({ show: true, message: 'Password did not match' });
        }
        const post = {
            name: namev,
            email: emailv,
            phone_number: phonev,
            password: passwordv,
            referral_id: referralv
           
        }
        setLoading(true)
        MakePostRequest(post, 'auth/register',undefined).then(async(resp) => { 
            const res = await resp.json();
            console.log('res',res)
            if (res.success) { 
            setSuccessAlert({show:true,message:res.message})
            }
            else
                setErrorAlert({ show: true, message: res.message })
            router.push('/auth/login')
            setLoading(false)
           
        }).catch(err => { 
            setLoading(false)
 setErrorAlert({show:true,message:err})
        })
    }
    return (
        <div className="body d-flex p-0 p-xl-5">
            {successAlert.show && <SuccessAlert message={ successAlert.message}  />}
            {errorAlert.show && <ErrorAlert message={ errorAlert.message}  />}
            
            <div className="container-xxl">
                <div className="row g-3">
                    <div className="col-lg-6 d-flex justify-content-center align-items-center auth-h100">
                        <div className="d-flex flex-column ert">
                            
                            <h2>Create Your Account</h2>
                            <span className="text-muted">
                                Register  with your Email And Phone Number
                            </span>



                            <div className="card">
                                <div className="card-body p-4">
                                    <form>
                                        <div className="mb-3">
                                            <label className="form-label fs-6">Name</label>
                                            <input type="text" className="form-control" name="name" defaultValue=""  ref={ nameRef} />
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label fs-6">Email address</label>
                                            <input type="email" className="form-control" name="email" defaultValue=""  ref={ emailRef}/>
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label fs-6">Phone Number</label>
                                            <input type="number" name="phone_number" defaultValue=""  ref={ phoneRef} className="form-control" />
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label fs-6">Password</label>
                                            <a data-trigger="focus"  role="button" type="button" className="" id="pop"
                                                data-bs-toggle="popover" title="Password Format" >
                                               <small>&nbsp;&nbsp;Hint</small> <i className="icofont-question-circle"></i></a>
                                            <input type="password" className="form-control" defaultValue=""  ref={ passwordRef} />
                                            
                                            <div id="popover-content" className="d-none">
                                                <ol>
                                                    <li>Minimum 8 characters </li>
                                                    <li>Maximum 20 characters </li>
                                                    <li> At least one uppercase character</li>

                                                    <li> At least one lowercase character </li>
                                                    <li> At least one digit</li>
                                                    <li> At least one special character </li>
                                                </ol>

                                            </div>
                                        </div>
                                         <div className="mb-3">
                                            <label className="form-label fs-6">Confirm Password</label>
                                         
                                            <input type="password" defaultValue=""  ref={ confirmRef} className="form-control" />
                                        </div>
                                            <button
                                            type="button" onClick={(e) => { e.preventDefault(); handleSubmit(e) }}
                                                className="btn btn-primary text-uppercase py-2 fs-5 w-100 mt-2"
                                            >
                                                {loading ? "loading..." : "Submit"}
                                            </button>
                                    </form>
                                </div>
                            </div>


                            <Link
                                href="login"
                                title="#"
                                className="text-primary text-decoration-underline"
                            >
                                Already have account
                            </Link>
                        </div>
                    </div>
                    <div className="col-lg-6 d-none d-lg-flex justify-content-center align-items-center auth-h100">
                        <div className="qr-block text-center">
                            <img
                                src="../assets/images/qr-code.png"
                                alt="#"
                                className="img-fluid my-4"
                            />
                            <h4>Log in with QR code</h4>
                            <p>
                                Scan this code with the{" "}
                                <span className="text-primary">Cryptoon mobile app</span>
                                <br /> to log in instantly.
                            </p>
                        </div>
                    </div>
                </div>{" "}
                {/* End Row */}
            </div>
        </div>


    );
}