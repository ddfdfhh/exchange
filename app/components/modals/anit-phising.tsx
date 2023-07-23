import { useState } from "react";

export function AntiPhisingModal() {
    const [text, setText] = useState('Send Code');
    const [icon, setIcon] = useState('');
    function handleClick() { 
         
            setText('Code Sent')
            setIcon('icofont-key')

    }
    return (
        <div className="modal fade rounded-0" id="AntiPhisingModal" tabIndex={-1} aria-hidden="true">
            <div className="modal-dialog rounded-0">
                <div className="modal-content rounded-0">
                    <div className="modal-header">
                        <h5 className="modal-title">Email Verification</h5>
                        <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                        />
                    </div>
                    <div className="modal-body">
                        <form>
                            <div className="mb-3">
                                <label className="form-label">Verify Account</label>
                                <div className="col-auto">
                                    <label className="sr-only" htmlFor="inlineFormInputGroup">
                                        Enter Code sent to email
                                    </label>
                                    <div className="poisiton-relative mb-3">
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Enter code "
                                          
                                        />
                                        <span className="modal-code-sent inline-block position-absolute" >
                                            <span  style={{fontSize:'12px'}} onClick={e =>handleClick()  }>
                                                { text} 
                                            </span>
                                            <span className={`${icon.length>0?'text-success icofont-check':''}`} ></span>
                                        </span>
                                    </div>

                                </div>

                                <div className="form-text">
                                    We'll never share your email with anyone else.
                                </div>
                            </div>

                        </form>
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
    );
}