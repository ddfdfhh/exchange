export default function Forget() {
    return (
     <div className="body d-flex p-0 p-xl-5">
  <div className="container-xxl">
    <div className="row g-3">
      <div className="col-lg-6 d-flex justify-content-center align-items-center auth-h100">
        <div className="d-flex flex-column">
          <h1>Reset Your Password</h1>
        <span className="text-muted">
            Password Rest link will be send to you email address
                                </span>
          <div className="tab-content mt-4 mb-3">
            <div className="tab-pane fade show active" id="Email">
              <div className="card">
                <div className="card-body p-4">
                  <form>
                    <div className="mb-3">
                      <label className="form-label fs-6">Email address</label>
                      <input type="email" className="form-control" />
                    </div>
                    <a
                      href="auth-two-step.html"
                      className="btn btn-primary text-uppercase py-2 fs-5 w-100 mt-2"
                    >
                      Next
                    </a>
                  </form>
                </div>
              </div>
            </div>
         
          </div>
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