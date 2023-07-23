/*eslint-disable*/
'use client';

import ErrorAlert from "@/app/components/error_alert";
import SuccessAlert from "@/app/components/success_alert";
import { useEffect, useRef, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import TakePhoto from "@/app/components/take_photo";
import Image from "next/image";
import axios from 'axios'
import { MakePostRequestFormData } from "@/app/util/make_post_request";
import { useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
type FormValues={
        fullname: string,
        email: string,
        address: string,
        country: string,
        type: string,
        govIdNumber: string,
        panNumber:string,
        govIdFront: File|undefined,
        govIdBack: File|undefined,
        panImage: File|undefined,
         
        
}
     let authToken: string|undefined
export default function Identity() {
    const { status, data: session } = useSession()
   
     useEffect(() => { 
       
       if (status == 'authenticated') {
           authToken = session?.user?.accessToken
           console.log('token',authToken)
         
       }
       else if (status == 'unauthenticated') {
         return redirect('auth/login')
      
       }
          
       },[status])
    const [current, setCurrent] = useState(1)
    const [loading, setLoading] = useState(false)
    const [govIdFront, setGovIdFront] = useState<File|undefined>()
    const [govIdBack, setGovIdBack] = useState<File|undefined>()
    const [panImage, setPanImage] = useState<File|undefined>()
    const [select, setSelect] = useState()
    const [selfieData, setSelfieData] = useState()
    const [label, setLabel] = useState<string>('Government Id Number')
    const [form, setForm] = useState<FormValues|undefined>()
   
    const [errorAlert, setErrorAlert] = useState<{ show: boolean; message: string }>({
        show: false, message: ''
    })
    const [successAlert, setSuccessAlert] = useState<{ show: boolean; message: string }>({
        show: false, message: ''
    })
    useEffect(() => {
        if (successAlert.show)
            setSuccessAlert({ show: false, message: '' })
        if (errorAlert.show)
            setErrorAlert({ show: false, message: '' })


    }, [errorAlert.show, successAlert.show])
    const showPreviewModal = () => {

        const { Modal } = require("bootstrap");
        const myModal = new Modal("#previewModal");
        myModal.show();
    };
    function handleSelectType(val:any) { 
        setSelect(val)
        if (val == 'Government Approved Id')
             setLabel('Approved Id Number')
        else if (val == 'Passport')
             setLabel('Passport Number')
        else if (val == 'Driving License')
             setLabel('Driving License Number')
    }
    console.log('datauri',selfieData)
    function handleSelfieClick(datauri:any) { 
    setSelfieData(datauri)
    }
    function submitDataToServer() { 
        const formData = new FormData();
        if (form !== undefined) {
            Object.entries(form).forEach(([key, value]) => {
                if (key == 'govIdFront') key = 'adhar_front'
                if (key == 'govIdBack') key = 'adhar_back'
                if (key == 'panImage') key = 'pan'
               if(value!==undefined)
                formData.append(key, value);
            });
            if (selfieData !== undefined) {
               // const blob=dataURItoBlob(selfieData)
             
                formData.append('selfie', selfieData);
            }
         
            if (authToken !== undefined) {
                 console.log('tokken', authToken)
                MakePostRequestFormData(formData, 'auth/upload', authToken).then((re: any) => {
                    const resp = re.data;
                  
                    if (resp.success) {
                        setSuccessAlert({ show: true, message: resp.message });
                     //   redirect('/backend');
                    }
                    else
                        setErrorAlert({ show: true, message: resp.message });
                }).catch((err: any) => {
            
                    setErrorAlert({ show: true, message: err.message });
                })
            }
            else
                setErrorAlert({ show: true, message:'Invalid session' });
        }

    }
    function dataURItoBlob(dataURI:any) {
    var binary = atob(dataURI.split(',')[1]);
    var array = [];
    for(var i = 0; i < binary.length; i++) {
        array.push(binary.charCodeAt(i));
    }
    return new Blob([new Uint8Array(array)], {type: 'image/jpeg'});
}
    function getUriFromFile(file: File|undefined) { 
        if (file !== undefined) {
            if (typeof window !== undefined) {
                const objectUrl = URL.createObjectURL(file);
                return (<img alt="d" src={objectUrl} style={{ width: '100px', height: '50px' }} />)
            }
        }
        else
           return  <img alt="d" src="" style={{width:'100px',height:'50px'}}/>
    }
    return (<div className="body d-flex py-3">
        {successAlert.show && <SuccessAlert message={successAlert.message} />}
        {errorAlert.show && <ErrorAlert message={errorAlert.message} />}

        <div className="container-xxl">
            <div className="row align-item-center mb-3">{ status}
                <div className="col-xl-12">
                    <div className="card mb-3">
                        <div className="card-header py-3 d-flex bg-transparent">
                            <h6 className="mb-0 fw-bold">Form Wizard Vertical</h6>
                        </div>
                        <div className="card-body">
                            <div className="wizard-main" id="w-vertical">
                                <div className="step-app">
                                    <ul className="step-steps">
                                        <li data-step-target="step1" className={current === 1 ? 'active' : ''}>
                                            <span>1</span> Account Information
                                        </li>
                                        <li data-step-target="step2" className={current === 2 ? 'active' : ''}>
                                            <span>2</span> User Information
                                        </li>
                                        <li data-step-target="step3" className={`${current === 3 ? 'active' : ''}`}>
                                            <span>3</span> Social ID
                                        </li>
                                    </ul>
                                    <div className="step-content">
                                        <div className={`step-tab-panel ${current === 1 ? 'active' : ''}`} data-step="step1">
                                            <Formik onSubmit={(values, { setSubmitting }) => {
                                               
                                                setForm(values as FormValues)
                                                
                                                if (current < 3)
                                                    setCurrent(current + 1)
                                            }}
                                                initialValues={{ fullname: "", email: "", address: "",country:'India' }}
                                                validate={(values) => {
                                                    const errors = {} as any;
                                                    if (!values.fullname) {
                                                        errors.fullname = "Required";
                                                    }

                                                    if (!values.email) {
                                                        errors.email = "Required";
                                                    } else if (
                                                        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                                                    ) {
                                                        errors.email = "Invalid email address";
                                                    }
                                                    if (!values.address) {
                                                        errors.address = "Required";
                                                    }
                                                    return errors;
                                                }}>
                                                {({ isSubmitting, submitForm }) => (
                                                    <form>
                                                        <div className="row">
                                                            <div className="col-md-6 col-12 mb-3">
                                                                <label className="col-form-label">Full Name</label>
                                                               <Field type="text" name="fullname">
                                                                        { ({ 
                                                                            field, 
                                                                            meta: { touched, error } 
                                                                    }:any) =>
                                                                        <input className={`form-control ${touched && error ? "is-invalid" : ""} `} {...field} />
                                                                        }
                                                                        </Field>
                                                                <ErrorMessage name="fullname" >
                                                                    {(msg: string) => <div className="text-danger">{msg}</div>}
                                                                </ErrorMessage>
                                                            </div>
                                                            <div className="col-md-6 col-12 mb-3">
                                                                <label className="col-form-label">Email</label>
                                                                <Field type="email" name="email" placeholder="Enter email">
                                                                        { ({ 
                                                                            field, 
                                                                            meta: { touched, error } 
                                                                    }:any) =>
                                                                        <input className={`form-control ${touched && error ? "is-invalid" : ""} `} {...field} />
                                                                        }
                                                                        </Field>
                                                                <ErrorMessage name="email" >
                                                                    {(msg: string) => <div className="text-danger">{msg}</div>}
                                                                </ErrorMessage>
                                                            </div>
                                                            <div className="col-md-6 col-12 mb-3">
                                                                <label className="col-form-label">Address</label>
                                                                <Field as="textarea" name="address" placeholder="Enter address">
                                                                        { ({ 
                                                                            field, 
                                                                            meta: { touched, error } 
                                                                    }:any) =>
                                                                        <textarea className={`form-control ${touched && error ? "is-invalid" : ""} `} {...field} />
                                                                        }
                                                                        </Field>
                                                                <ErrorMessage name="address" >
                                                                    {(msg: string) => <div className="text-danger">{msg}</div>}
                                                                </ErrorMessage>
                                                            </div>

                                                            <div className="col-md-6 col-12 mb-3">
                                                                <label className="col-form-label">Country</label>

                                                                <fieldset>
                                                                    <Field as="select" name="country"


                                                                        className="country form-control form-select"
                                                                        aria-label="example"
                                                                    >
                                                                        <option >Select Country</option>
                                                                        <option value="Argentina">Argentina</option>
                                                                        <option value="Australia">Australia</option>
                                                                        <option value="Belgium">Belgium</option>
                                                                        <option value="Brazil">Brazil</option>
                                                                        <option value="Canada">Canada</option>
                                                                        <option value="Costa Rica">Costa Rica</option>
                                                                        <option value="Egypt">Egypt</option>
                                                                        <option value="France">France</option>
                                                                        <option value="Germany">Germany</option>
                                                                        <option selected={true} value="India">India</option>
                                                                        <option value="Japan">Japan</option>
                                                                    </Field>
                                                                </fieldset>
                                                                <ErrorMessage name="country" >
                                                                    {(msg: string) => <div style={{ color: "red", textAlign: "left" }}>{msg}</div>}
                                                                </ErrorMessage>
                                                            </div>
                                                        </div>
                                                            <div className="d-flex justify-content-end">
                                                          
                                                                <button
                                                                    data-step-action="next" type="button" onClick={e => submitForm()}
                                                                    className="btn btn-primary step-btn mx-2 my-2"
                                                                >
                                                                    Next
                                                                </button>

                                                            </div>
                                                    </form>
                                                )}

                                            </Formik>
                                        </div>
                                         <div className={`step-tab-panel ${current === 2 ? 'active' : ''}`} data-step="step1">
                                            <Formik onSubmit={(values, { setSubmitting }) => {
                                                const data = {
                                                      fullname: form?.fullname,
                                                        email:  form?.email,
                                                        address:form?.address,
                                                        country: form?.country,
                                                        type: values.type,
                                                        govIdNumber: values.govIdNumber,
                                                        panNumber:values.panNumber,
                                                        govIdFront: govIdFront,
                                                        govIdBack: govIdBack,
                                                        panImage: panImage,
                                                }
                                                setForm(data as FormValues)
                                                
                                                if (current < 3)
                                                    setCurrent(current + 1)
                                            }}
                                                initialValues={{ type: "", govIdNumber: "", panNumber: "",govIdFront:"" ,govIdBack:"" ,panImage:"" }}
                                                validate={(values) => {
                                                 
                                                    const errors = {} as any;
                                                    if (govIdFront !== undefined) {
                                                        const govIdSize = govIdFront?.size
                                                       
                                                        const govIdType = govIdFront?.type
                                                    
                                                        if (!['image/jpeg', 'image/jpg', 'image/gif', 'image/png'].includes(govIdType!)) {
                                                            errors.govIdFront = "File type not supported for upload"
                                                        }
                                                        if ((govIdSize as number / 1024/1024) > 4) {
                                                            errors.govIdFront = "File size can not be more than 4MB"
                                                        }
                                                    }
                                                    if (govIdBack !== undefined) {
                                                        const govIdSize1 = govIdBack?.size
                                                       
                                                        const govIdType1 = govIdBack?.type
                                                    
                                                        if (!['image/jpeg', 'image/jpg', 'image/gif', 'image/png'].includes(govIdType1!)) {
                                                            errors.govIdBack = "File type not supported for upload"
                                                        }
                                                        if ((govIdSize1 as number / 1024/1024) > 4) {
                                                            errors.govIdBack = "File size can not be more than 4MB"
                                                        }
                                                    }
                                                    if (panImage !== undefined) {
                                                        const govIdSize2 = panImage?.size
                                                       
                                                        const govIdType2 = panImage?.type
                                                    
                                                        if (!['image/jpeg', 'image/jpg', 'image/gif', 'image/png'].includes(govIdType2!)) {
                                                            errors.panImage = "File type not supported for upload"
                                                        }
                                                        if ((govIdSize2 as number / 1024/1024) > 4) {
                                                            errors.panImage = "File size can not be more than 4MB"
                                                        }
                                                    }
                                                    if (!values.type) { 
                                                        errors.type="Required"
                                                    }
                                                    if (!values.panNumber) { 
                                                        errors.panNumber="Required"
                                                    }
                                                    if (!values.govIdNumber) { 
                                                        errors.govIdNumber="Required"
                                                    }
                                                 
                                                  
                                                    return errors;
                                                }}>
                                                {({ isSubmitting, setFieldValue,submitForm }) => (
                                                    <form>
                                                        <div className="row">
                                                             <div className="col-md-6 col-12 mb-3">
                                                                <label className="col-form-label">Document Type</label>

                                                                <fieldset>
                                                                    <Field
                                                                        as="select" name="type"
                                                                        aria-label="example"
                                                                        
                                                                    >
                                                                          { ({ 
                                                                            field, 
                                                                            meta: { touched, error } 
                                                                        }:any) =>
                                                                            <select name="type" onChange={e => {
                                                                           
                                                                            setFieldValue('type', e.target.value)
                                                                            handleSelectType(e.target.value)
                                                                        }}
                                                                             value={select} className={`form-control form-select ${touched && error ? "is-invalid" : ""} `}>
                                                                        <option >Select </option>
                                                                        <option value="Government Approved Id" selected={select=='Government Approved Id'}>Any Government Approved Id</option>
                                                                        <option value="Passport" selected={select=='Government Approved Id'}>Passport</option>
                                                                        <option value="Driving License" selected={select=='Government Approved Id'}>Driving License</option>
                                                                       </select>
                                                                        }                  
                                                                    </Field>
                                                                </fieldset>
                                                                <ErrorMessage name="type" >
                                                                    {(msg: string) => <div className="text-error">{msg}</div>}
                                                                </ErrorMessage>
                                                            </div>
                                                            <div className="col-md-6 col-12 mb-3">
                                                                <label className="col-form-label">{ label}</label>
                                                                <Field type="text" name="govIdNumber" placeholder="Enter  Number">
                                                                        { ({ 
                                                                            field, 
                                                                            meta: { touched, error } 
                                                                    }:any) =>
                                                                        <input className={`form-control ${touched && error ? "is-invalid" : ""} `} {...field} />
                                                                        }
                                                                        </Field>
                                                                <ErrorMessage name="govIdNumber" >
                                                                    {(msg: string) => <div className="text-danger">{msg}</div>}
                                                                </ErrorMessage>
                                                            </div>
                                                            <div className="col-md-6 col-12 mb-3">
                                                                <label className="col-form-label">PAN No</label>
                                                                <Field type="text" name="panNumber" placeholder="Enter PAN Number">
                                                                        { ({ 
                                                                            field, 
                                                                            meta: { touched, error } 
                                                                    }:any) =>
                                                                        <input className={`form-control ${touched && error ? "is-invalid" : ""} `} {...field} />
                                                                        }
                                                                        </Field>
                                                                <ErrorMessage name="panNumber" >
                                                                    {(msg: string) => <div className="text-danger">{msg}</div>}
                                                                </ErrorMessage>
                                                            </div>
                                                            <div className="col-md-6 col-12 mb-3">
                                                                <label className="col-form-label">Front</label>
                                                                 <Field type="file" name="govIdFront" placeholder="Enter PAN Number">
                                                                    {({
                                                                        field,
                                                                        meta: { touched, error }
                                                                    }:any) =>
                                                                        <input className={`form-control ${touched && error ? "is-invalid" : ""} `} onChange={(event) => {
                                                                           if (event?.currentTarget?.files) setGovIdFront(event?.currentTarget?.files[0]);
                                                                        }} type="file"  />
                                                                    }
                                                                    </Field>
                                                                      
                                                                <ErrorMessage name="govIdFront" >
                                                                    {(msg: string) => <div className="text-danger">{msg}</div>}
                                                                </ErrorMessage>
                                                            </div>
                                                            <div className="col-md-6 col-12 mb-3">
                                                                <label className="col-form-label">Back Side</label>
                                                                 <Field type="file" name="govIdback" placeholder="Enter PAN Number">
                                                                    {({
                                                                        field,
                                                                        meta: { touched, error }
                                                                    }:any) =>
                                                                        <input className={`form-control ${touched && error ? "is-invalid" : ""} `} onChange={(event) => {
                                                                            if (event?.currentTarget?.files)
                                                                                setGovIdBack(event?.currentTarget?.files[0]);
                                                                        }} type="file"  />
                                                                    }
                                                                    </Field>
                                                                      
                                                                <ErrorMessage name="govIdBack" >
                                                                    {(msg: string) => <div className="text-danger">{msg}</div>}
                                                                </ErrorMessage>
                                                            </div>
                                                            <div className="col-md-6 col-12 mb-3">
                                                                <label className="col-form-label">Pan Card Image</label>
                                                                 <Field type="file" name="panImage" placeholder="Enter PAN Number">
                                                                    {({
                                                                        field,
                                                                        meta: { touched, error }
                                                                    }:any) =>
                                                                        <input className={`form-control ${touched && error ? "is-invalid" : ""} `} onChange={(event) => {
                                                                            if (event?.currentTarget?.files)
                                                                                setPanImage(event?.currentTarget?.files[0]);
                                                                        }} type="file"  />
                                                                    }
                                                                    </Field>
                                                                      
                                                                <ErrorMessage name="panImage" >
                                                                    {(msg: string) => <div className="text-danger">{msg}</div>}
                                                                </ErrorMessage>
                                                            </div>

                                                          
                                                        </div>
                                                            <div className="d-flex justify-content-end">
                                                                <button type="button"
                                                                    data-step-action="prev" 
                                                                    className="btn btn-primary step-btn mx-2 my-2"
                                                                >
                                                                    Prev
                                                                </button>
                                                                <button
                                                                    data-step-action="next" type="button" onClick={e => submitForm()}
                                                                    className="btn btn-primary step-btn mx-2 my-2"
                                                                >
                                                                    Next
                                                                </button>

                                                            </div>
                                                    </form>
                                                )}

                                            </Formik>
                                        </div>
                                        <div className={`step-tab-panel ${current === 3 ? 'active' : ''}`} data-step="step1">
                                            <TakePhoto sendDataUri={(data: any) => handleSelfieClick(data)} />
                                             <div className="d-flex justify-content-end">
                                                <button type="button"
                                                                    data-step-action="prev" onClick={() => setCurrent(current-1)}
                                                                    className="btn btn-primary step-btn mx-2 my-2"
                                                                >
                                                                    Prev
                                                                </button>
                                                                <button
                                                                    type="button" onClick={e => showPreviewModal()}
                                                                    className="btn btn-primary step-btn mx-2 my-2"
                                                                >
                                                                    Save
                                                                </button>

                                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>

                </div>
            </div>{" "}

        </div>
{/*
modal start*/}
          <div className="modal fade rounded-0" id="previewModal" tabIndex={-1} aria-hidden="true">
            <div className="modal-dialog rounded-0">
                <div className="modal-content rounded-0">
                    <div className="modal-header">
                        <h5 className="modal-title">Details Preview</h5>
                        <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                        />
                    </div>
                    <div className="modal-body">
                        <table className="table">
                            <tr>
                                <th>Full Name</th>
                                <td>{ form?.fullname}</td>
                            </tr>
                            <tr>
                                <th>Email</th>
                                <td>{ form?.email}</td>
                            </tr>
                            <tr>
                                <th>Address</th>
                                <td>{ form?.address}</td>
                            </tr>
                            <tr>
                                <th>Country</th>
                                <td>{ form?.country}</td>
                            </tr>
                            <tr>
                                <th>Id Proof Type</th>
                                <td>{ form?.type}</td>
                            </tr>
                            <tr>
                                <th>{ label}</th>
                                <td>{ form?.govIdNumber}</td>
                            </tr>
                             <tr>
                                <th>Pan Number</th>
                                <td>{ form?.panNumber}</td>
                            </tr>
                             <tr>
                                <th>Front Image</th>
                                <td>{ getUriFromFile(form?.govIdFront)}</td>
                            </tr>
                             <tr>
                                <th>Back Image</th>
                                <td>{ getUriFromFile(form?.govIdBack)}</td>
                            </tr>
                             <tr>
                                <th>Pan Image</th>
                                <td>{ getUriFromFile(form?.panImage)}</td>
                            </tr>
                             <tr>
                                <th>Selfie Image</th>
                                <td><img alt="d" src={selfieData} width={50} height={ 50} /></td>
                            </tr>
                        </table>
                    </div>
                    <div className="modal-footer">
                        <button
                            type="button"
                            className="btn btn-secondary"
                            data-bs-dismiss="modal"
                        >
                            Close
                        </button>
                        <button type="button" onClick={ e=>submitDataToServer()} className="btn btn-primary">
                             Submit For Review
                        </button>
                    </div>
                </div>
            </div>
        </div>
        { /**modal end */}

    </div>
    )
}