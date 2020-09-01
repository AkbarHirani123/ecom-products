import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
// import data from './data';
import './ProductDetailPage.css';
import { useSelector, useDispatch } from 'react-redux';
import { signin } from '../../actions/userActions'

// function largeImage(img) {
//     return img.slice(0, -3)+"560";
// }

function SigninPage(props) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const userSignin = useSelector(state => state.userSignin);
    const { loading, userInfo, error } = userSignin;

    const dispatch = useDispatch();

    const redirect = props.location.search ? props.location.search.split("=")[1] : "/";

    useEffect(() => {
        if(userInfo) {
            props.history.push(redirect);
        }
        return () => {
            // cleanup
        };
    }, [userInfo]);

    const handleSubmit = (e)  => {
        e.preventDefault();
        dispatch(signin(email,password));
    }

    return (
        <div className="container signin">
            <div className="columns is-mobile is-centered">
                <div className="column is-four-fifths-mobile is-half-tablet is-half-desktop is-one-third-widescreen is-one-third-fullhd">
                    <div className="card">
                        <div className="card-content">
                            <section className="section signin-form">
                                <h1 className="title">Sign In</h1>
                                <form className="form-horizontal" onSubmit={handleSubmit}>
                                    <fieldset>
                                        <div className="field">
                                            <p className="control has-icons-left has-icons-right">
                                                <input className="input" type="email" name="email" placeholder="Email" id="email" onChange={(e) => setEmail(e.target.value)}  disabled={loading} />
                                                <span className="icon is-small is-left">
                                                    <i className="fas fa-envelope"></i>
                                                </span>
                                            </p>
                                        </div>
                                        <div className="field">
                                            <p className="control has-icons-left">
                                                <input className="input" type="password" name="password" id="passowrd" placeholder="Password" onChange={(e) =>setPassword(e.target.value)}  disabled={loading} />
                                                <span className="icon is-small is-left">
                                                    <i className="fas fa-lock"></i>
                                                </span>
                                            </p>
                                        </div>
                                        {error && 
                                            <div className="field">
                                                <p className="control">
                                                    <div className="notification is-danger is-light">
                                                        {error}
                                                    </div>
                                                </p>
                                            </div>
                                        }
                                        <div className="field">
                                            <div className="control">
                                                <button type="submit" className="button is-primary has-text-white is-fullwidth" disabled={loading}>
                                                Login 
                                                {loading && (<div className="loader" style={{marginLeft:10}}></div>)}
                                                </button>
                                            </div>
                                        </div>
                                    </fieldset>
                                </form>
                            </section>
                            <section className="section">
                                <div className="container">
                                    <span>New To MyCompany? </span>
                                    <Link to={redirect === "/" ? "register" : "register?redirect=" + redirect} className="">Create an Account</Link>
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
            </div>
        </div>  
    );
}

export default SigninPage;