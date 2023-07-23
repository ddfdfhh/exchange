'use client';
export default function Profile() {
    return (
        <div className="body d-flex py-3">
            <div className="container-xxl">
                <div className="row align-items-center">
                    <div className="border-0 mb-4">
                        <div className="card-header py-3 no-bg bg-transparent d-flex align-items-center px-0 justify-content-between border-bottom flex-wrap">
                            <h3 className="fw-bold mb-0"> Profile</h3>
                        </div>
                    </div>
                </div>
                <div className="row g-3">
                    <div className="col-xl-6 col-lg-5 col-md-12">
                        <div className="card profile-card flex-column mb-3">
                            <div className="card-header py-3 d-flex justify-content-between bg-transparent border-bottom-0">
                                <h6 className="mb-0 fw-bold ">Profile</h6>
                            </div>
                            <div className="card-body d-flex profile-fulldeatil flex-column">
                                <div className="profile-user text-center w220 mx-auto">
                                    <a href="#">
                                        <img
                                            src="assets/images/lg/avatar4.svg"
                                            alt=""
                                            className="avatar xl rounded img-thumbnail shadow-sm"
                                        />
                                    </a>
                                    <button
                                        className="btn btn-primary"
                                        style={{ position: "absolute", top: 15, right: 15 }}
                                        data-bs-toggle="modal"
                                        data-bs-target="#editprofile"
                                    >
                                        <i className="icofont-edit" />
                                    </button>
                                    <div className="about-info d-flex align-items-center mt-3 justify-content-center flex-column">
                                        <span className="text-muted small">Admin ID : PXL-0001</span>
                                    </div>
                                </div>
                                <div className="profile-info w-100">
                                    <h6 className="mb-0 mt-2  fw-bold d-block fs-6 text-center">
                                        Adrian Allan
                                    </h6>
                                    <span className="py-1 fw-bold small-11 mb-0 mt-1 text-muted text-center mx-auto d-block">
                                        24 years, California
                                    </span>
                                    <p className="mt-2">
                                        Duis felis ligula, pharetra at nisl sit amet, ullamcorper
                                        fringilla mi. Cras luctus metus non enim porttitor sagittis. Sed
                                        tristique scelerisque arcu id dignissim.
                                    </p>
                                    <div className="row g-2 pt-2">
                                        <div className="col-xl-12">
                                            <div className="d-flex align-items-center">
                                                <i className="icofont-ui-touch-phone" />
                                                <span className="ms-2">202-555-0174 </span>
                                            </div>
                                        </div>
                                        <div className="col-xl-12">
                                            <div className="d-flex align-items-center">
                                                <i className="icofont-email" />
                                                <span className="ms-2">adrianallan@gmail.com</span>
                                            </div>
                                        </div>
                                        <div className="col-xl-12">
                                            <div className="d-flex align-items-center">
                                                <i className="icofont-birthday-cake" />
                                                <span className="ms-2">19/03/1980</span>
                                            </div>
                                        </div>
                                        <div className="col-xl-12">
                                            <div className="d-flex align-items-center">
                                                <i className="icofont-address-book" />
                                                <span className="ms-2">
                                                    2734 West Fork Street,EASTON 02334.
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-6 col-lg-5 col-md-12">
                        <div className="card auth-detailblock">
                            <div className="card-header py-3 d-flex justify-content-between bg-transparent border-bottom-0">
                                <h6 className="mb-0 fw-bold ">Authentication Details</h6>
                                <button
                                    className="btn btn-primary"
                                    data-bs-toggle="modal"
                                    data-bs-target="#authchange"
                                >
                                    <i className="icofont-edit" />
                                </button>
                            </div>
                            <div className="card-body">
                                <div className="row g-3">
                                    <div className="col-12">
                                        <label className="form-label col-6 col-sm-5">User Name :</label>
                                        <span>
                                            <strong>Adrian007</strong>
                                        </span>
                                    </div>
                                    <div className="col-12">
                                        <label className="form-label col-6 col-sm-5">Login Password :</label>
                                        <span>
                                            <strong>Abc*******</strong>
                                        </span>
                                    </div>
                                    <div className="col-12">
                                        <label className="form-label col-6 col-sm-5">Last Login:</label>
                                        <span>
                                            <strong>128.456.89 (Apple) safari</strong>
                                        </span>
                                    </div>
                                    <div className="col-12">
                                        <label className="form-label col-6 col-sm-5">
                                            Last Password change:
                                        </label>
                                        <span>
                                            <strong>3 Month Ago</strong>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>

    )
}