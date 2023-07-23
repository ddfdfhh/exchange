import { useState } from "react";

export function ScanModal() {
     
    return (
        <div className="modal fade rounded-0" id="ScanModal" tabIndex={-1} aria-hidden="true">
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