import { forwardRef, useEffect, useImperativeHandle } from "react";
import './alert.css'
const ErrorAlert = ({ message }: { message: String|[] }) => {
    useEffect(() => {
        const { Modal } = require("bootstrap");
        const myModal = new Modal("#error_alert");
        myModal.show();
    }, []);
   
  
 
    return (<div id="error_alert" className="modal fade">
  <div className="modal-dialog modal-confirm modal-dialog-centered">
    <div className="modal-content">
      <div className="modal-header">
        <div className="icon-box">
          <i className="icofont-error"></i>
        </div>
        <h4 className="modal-title w-100">Sorry!</h4>
      </div>
      <div className="modal-body">
                    <p className="text-center">
                       
                        {
                                Array.isArray(message)
                                    ?  (<ol>
                                            {
                                                message.map((v,index) => {
                                                    return (<li key={ index}>{(v as any).toUpperCase()}</li>)
                                            })
                                            }
                                        </ol>)
                                    :message
                                 
                               
                            
                            
                        }
                      
        </p>
      </div>
      <div className="modal-footer">
                    <button className="btn btn-danger btn-block" onClick={() => { }} data-bs-dismiss="modal">
          OK
        </button>
      </div>
    </div>
  </div>
</div>

    );
}

export default ErrorAlert;