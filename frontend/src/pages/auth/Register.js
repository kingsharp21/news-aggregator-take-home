import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import * as Yup from "yup";
import { useFormik } from 'formik';

import chatting from "../../assets/news-chatting.svg"


import authService from '../../services/authService';


function Register() {

    const[apiErrorMsg, setApiErrorMsg] = useState('')
    const[sucessMsg, setSucessMsg] = useState('')

    const formik = useFormik({
        initialValues: {
            fullname: "",
            email: "",
            password: "",
            confirm_password: ""
        },
        validationSchema: Yup.object({
            fullname: Yup.string()
                .required("Full Name is required")
                .label("Full Name"),
            email: Yup.string()
                .email("Email address must be valid")
                .required("Email address is required")
                .label("Email address"),
            password: Yup.string()
                .min(8, "Password should be a minimum of 8 characters")
                .required("Password is required")
                .label("Password"),
            confirm_password: Yup.string()
                .oneOf([Yup.ref('password'), null], 'Passwords must match')
                .required('Confirm Password is required')
        }),
        onSubmit: (values, { resetForm })=> {
            handleSubmit(values)
            resetForm();
        },
    });


    const handleSubmit = async(body) => {
        setSucessMsg('')
        setApiErrorMsg('')
        try {
          const res = await authService.register({
                "name":body.fullname,
                "email":body.email,
                "password":body.password,
                "password_confirmation":body.confirm_password
            })
          if (res.status === "success") {
            setSucessMsg('User registration was succesfull')
          }
         
        }catch (err){
            console.log(err);
            setApiErrorMsg(err.response.data.message)
        }
    }

    return (
        <>
            <main id="content" role="main" className="main pt-0">
                {/* Content */}
                <div className="container-fluid px-3">
                    <div className="row">
                        <div className="col-lg-6 d-none d-lg-flex justify-content-center align-items-center min-vh-lg-100 position-relative bg-light px-0">
                        <div className="position-absolute top-0 start-0 end-0 mt-3 mx-3">
                                <div className="d-none d-lg-flex justify-content-between">
                                    <h1>Logo</h1>
                                   
                                </div>
                            </div>
                            <div style={{ maxWidth: '23rem' }}>
                                <div className="text-center mb-5">
                                    <img className="img-fluid" src={chatting} alt="news" style={{ width: '12rem' }} data-hs-theme-appearance="default" />
                                </div>
                                <div className="mb-5">
                                    <h2 className="display-5">Get up to date news</h2>
                                </div>
                                <ul className="list-checked list-checked-lg list-checked-primary list-py-2">
                                    <li className="list-checked-item">
                                        <span className="d-block fw-semibold mb-1">Articles from different sources</span>
                                        sources like Yahoo Entertainment, CNET, The Guardian, The New York Times etc.
                                    </li>
                                    <li className="list-checked-item">
                                        <span className="d-block fw-semibold mb-1">Personalized news feed</span>
                                        Customize your news feed by selecting their preferred sources, categories, and authors.
                                    </li>
                                </ul>
                              
                            </div>
                        </div>
                        {/* End Col */}
                        <div className="col-lg-6 d-flex justify-content-center align-items-center min-vh-lg-100">
                            <div className="w-100 content-space-t-3 content-space-t-lg-2 content-space-b-1" style={{ maxWidth: '25rem' }}>

                                <form onSubmit={formik.handleSubmit} className="js-validate needs-validation">
                                    <div className="text-center">
                                        <div className="mb-5">
                                            <h1 className="display-5">Create your account</h1>
                                            <p>
                                                Already have an account?  <Link
                                                to="/"
                                                className="link"
                                            >
                                                Sign in here
                                            </Link>
                                            </p>
                                        </div>
                                        <span className="divider-center text-muted mb-4">OR</span>
                                    </div>

                                    <span className="api-error-msg">{apiErrorMsg &&`${apiErrorMsg}.`}</span>
                                    <span className="api-valid-msg">{sucessMsg &&`${sucessMsg}.`}</span>

                                    <div className="mb-4">
                                        <label className="form-label" htmlFor="fullname">Full name</label>
                                        <input
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.fullname}
                                            type="text"
                                            className={`form-control form-control-lg ${formik.touched.fullname && formik.errors.fullname ? 'is-invalid' : ''}`}
                                            name="fullname"
                                            id="fullname"
                                            tabIndex={1}
                                            placeholder="Kingsharp Nkansah"
                                        />
                                        {formik.touched.fullname && formik.errors.fullname ? (
                                            <span className="invalid-feedback">{formik.errors.fullname}</span>
                                        ) : null}
                                    </div>
                                    <div className="mb-4">
                                        <label className="form-label" htmlFor="signinSrEmail">Your email</label>
                                        <input
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.email}
                                            type="email"
                                            className={`form-control form-control-lg ${formik.touched.email && formik.errors.email ? 'is-invalid' : ''}`}
                                            name="email"
                                            id="email"
                                            tabIndex={1}
                                            placeholder="email@address.com"
                                            aria-label="email@address.com"
                                        />
                                        {formik.touched.email && formik.errors.email ? (
                                            <span className="invalid-feedback">{formik.errors.email}</span>
                                        ) : null}
                                    </div>
                                    <div className="mb-4">
                                        <label className="form-label" htmlFor="signinSrEmail">Password?</label>
                                        <input
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.password}
                                            type="password"
                                            className={`form-control form-control-lg ${formik.touched.password && formik.errors.password ? 'is-invalid' : ''}`}
                                            name="password"
                                            id="password"
                                            tabIndex={1}
                                            placeholder="8+ characters required"
                                        />
                                        {formik.touched.password && formik.errors.password ? (
                                            <span className="invalid-feedback">{formik.errors.password}</span>
                                        ) : null}
                                    </div>
                                    <div className="mb-4">
                                        <label className="form-label" htmlFor="signinSrEmail">Confirm password</label>
                                        <input
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.confirm_password}
                                            type="password"
                                            className={`form-control form-control-lg ${formik.touched.confirm_password && formik.errors.confirm_password ? 'is-invalid' : ''}`}
                                            name="confirm_password"
                                            id="confirm_password"
                                            tabIndex={1}
                                            placeholder="8+ characters required"
                                        />
                                        {formik.touched.confirm_password && formik.errors.confirm_password ? (
                                            <span className="invalid-feedback">{formik.errors.confirm_password}</span>
                                        ) : null}
                                    </div>

                                    <div className="form-check mb-4">
                                        <input className="form-check-input" type="checkbox" id="termsCheckbox" />
                                        <label className="form-check-label" htmlFor="termsCheckbox">
                                            Remember me
                                        </label>
                                    </div>

                                    <div className="d-grid">
                                        <button type="submit" className="btn btn-primary btn-lg">Sign in</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                        {/* End Col */}
                    </div>
                    {/* End Row */}
                </div>
                {/* End Content */}
            </main>

        </>
    );
}

export default Register;