import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
// import data from './data';
import './ProductDetailPage.css';
import { useSelector, useDispatch } from 'react-redux';
import { register } from '../../actions/userActions'

// function largeImage(img) {
//     return img.slice(0, -3)+"560";
// }

function RegisterPage(props) {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rePassword, setRePassword] = useState('');
    const userRegister = useSelector(state => state.userRegister);
    const { loading, userInfo, error } = userRegister;
    const [uiError, setUiError ] = useState('');

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
        password === rePassword ?dispatch(register(name,email,password)) : setUiError("Passwords do not match.");
    }

    return (
        <div className="container Register">
            <div className="columns is-mobile is-centered">
                <div className="column is-four-fifths-mobile is-half-tablet is-half-desktop is-one-third-widescreen is-one-third-fullhd">
                    <div className="card">
                        <div className="card-content">
                            <section className="section Register-form">
                                <h1 className="title">Create Account</h1>
                                <form className="form-horizontal" onSubmit={handleSubmit}>
                                    <fieldset>
                                        <div className="field">
                                            <p className="control has-icons-left has-icons-right">
                                                <input className="input" type="name" id="name" name="name" placeholder="Name" onChange={(e) => setName(e.target.value)}  disabled={loading} />
                                                <span className="icon is-small is-left">
                                                    <i className="fas fa-user"></i>
                                                </span>
                                            </p>
                                        </div>
                                        <div className="field">
                                            <p className="control has-icons-left has-icons-right">
                                                <input className="input" type="email" id="email" name="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)}  disabled={loading} />
                                                <span className="icon is-small is-left">
                                                    <i className="fas fa-envelope"></i>
                                                </span>
                                            </p>
                                        </div>
                                        <div className="field">
                                            <p className="control has-icons-left">
                                                <input className="input" type="password" id="password" name="password" placeholder="Password" onChange={(e) =>setPassword(e.target.value)}  disabled={loading} />
                                                <span className="icon is-small is-left">
                                                    <i className="fas fa-lock"></i>
                                                </span>
                                            </p>
                                        </div>
                                        <div className="field">
                                            <p className="control has-icons-left">
                                                <input className="input" type="password" id="rePassword" name="rePassword" placeholder="Re-Enter Password" onChange={(e) =>setRePassword(e.target.value)}  disabled={loading} />
                                                <span className="icon is-small is-left">
                                                    <i className="fas fa-lock"></i>
                                                </span>
                                            </p>
                                        </div>
                                        {error || uiError && 
                                            <div className="field">
                                                <div className="control">
                                                    <div className="notification is-danger is-light">
                                                        {error}{uiError}
                                                    </div>
                                                </div>
                                            </div>
                                        }
                                        <div className="field">
                                            <p className="control">
                                                <button type="submit" className="button is-primary has-text-white is-fullwidth" disabled={loading}>
                                                Create my Account 
                                                {loading && (<div className="loader" style={{marginLeft:10}}></div>)}
                                                </button>
                                            </p>
                                        </div>
                                    </fieldset>
                                </form>
                            </section>
                            <section className="section">
                                <div className="container">
                                    <span>Already Have an Account? </span>
                                    <Link to={redirect === "/" ? "signin" : "signin?redirect=" + redirect} className="">Sign In</Link>
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
            </div>
        </div>  
    );
}

export default RegisterPage;