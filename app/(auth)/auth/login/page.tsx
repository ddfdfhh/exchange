/* eslint-disable*/
"use client";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { getCsrfToken, signIn, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams, useRouter, redirect } from "next/navigation";
import { ChangeEvent, useRef, useState } from "react";
const base_frontend_url=process.env.NODE_ENV=='development'?process.env.NEXT_PUBLIC_DEV_FRONTEND_URL:process.env.NEXT_PUBLIC_PROD_FRONTEND_URL
export default function Login() {
    const { data: session, status } = useSession()
    if (status === "authenticated") {
       
        return redirect(session?.user?.is_two_fa_enabled=='Yes'?'/auth/2fa':'/backend')
    }
   
    const router = useRouter();
    const passwordRef=useRef(null)
    const emailRef=useRef(null)
    const [loading, setLoading] = useState(false);
    const [formValues, setFormValues] = useState({
        email: "",
        password: "h",
    });
    const [error, setError] = useState("");

    const searchParams = useSearchParams();
  //  const callbackUrl = searchParams.get("callbackUrl") || "http://localhost:3000/profile";

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setLoading(true);
            setFormValues({ email: "", password: "" });

            const res = await signIn("credentials", {
                redirect: false,
                email: (emailRef.current as any).value,
                password: (passwordRef.current as any).value,
                callbackUrl: base_frontend_url+'backend'
            });

            setLoading(false);

            console.log('resp in login ',res);
            if (res?.error) {
              setError("invalid email or password");
            }
        } catch (error: any) {
            setLoading(false);
            setError(error);
        }
    };

    
    return (
        <div className="body d-flex p-0 p-xl-5">
            <div className="container-xxl">
                <div className="row g-3">
                    <div className="col-lg-6 d-flex justify-content-center align-items-center auth-h100">
                        <div className="d-flex flex-column ert">
                            <h2>Account Login</h2>
                            <span className="text-muted">
                                Welcome back! Log In with your Email
                            </span>



                            <div className="card">
                                <div className="card-body p-4">
                                    <form onSubmit={onSubmit}>
                                        {error && (
                                            <p className="text-center bg-red-300 py-4 mb-6 rounded">{error}</p>
                                        )}
                                        
                                        <div className="mb-3">
                                            <label className="form-label fs-6">Email address</label>
                                            <input ref={emailRef} defaultValue="" type="email" className="form-control" 
                                                />
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label fs-6">Password</label>
                                            <input  ref={passwordRef} type="password" defaultValue="" className="form-control" 
                                                />
                                        </div>
                                        <button
                                            type="submit"
                                            disabled={loading} 
                                            className="btn btn-primary text-uppercase py-2 fs-5 w-100 mt-2"
                                        >
                                            {loading ? "loading..." : "Sign In"}
                                        </button>
                                    </form>
                                </div>
                            </div>

                            <Link
                                href="forget"
                                title="#"
                                className="text-primary text-decoration-underline"
                            >
                                Forgot password?
                            </Link>
                            <Link
                                href="register"
                                title="#"
                                className="text-primary text-decoration-underline"
                            >
                                Register now
                            </Link>
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
