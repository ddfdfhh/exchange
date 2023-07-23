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
                        <form><>
                            <div className="mb-3">
                                <label className="form-label">Set Your Code</label>
                                <input type="text" className="form-control" />
                                <div className="form-text">
                                    We'll never share your email with anyone else.
                                </div>
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Confirm Your Code</label>
                                <input type="text" className="form-control" />
                            </div>
                        </>



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