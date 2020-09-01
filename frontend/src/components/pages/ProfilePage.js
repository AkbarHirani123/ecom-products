import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateAction } from '../../actions/userActions';
import { myOrdersAction } from '../../actions/orderActions';
import { Link } from 'react-router-dom';

function ProfilePage(props) {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [toggle, setToggle] = useState(false);

    const dispatch = useDispatch();

    const userSignin = useSelector(state => state.userSignin);
    const {userInfo} = userSignin;

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(updateAction({userId: userInfo._id, email,name,password}));
    }

    const userUpdate = useSelector(state => state.userUpdate);
    const {loading, success, error } = userUpdate;

    const myOrderList = useSelector(state => state.myOrderList);
    const {loading: loadingOrders, orders, error:errorOrders} = myOrderList;

    useEffect(() => {
        if(userInfo) {
            setEmail(userInfo.email);
            setName(userInfo.name);
            setPassword(userInfo.password);
        }
        dispatch(myOrdersAction());
        return () => {
            // cleanup
        }
    }, []);

    return (
        <div className="container review">
            <section className="section review-order-details">
                <div className="columns is-centered is-multiline is-mobile">
                    <div className="column is-full-mobile is-full-tablet is-one-third-desktop is-one-third-widescreen is-one-third-fullhd">
                        <div className="card">
                            <div className="card-content">
                                <section className="section Register-form">
                                    <h1 className="title">User Profile</h1>
                                    <form className="form-horizontal" onSubmit={handleSubmit}>
                                        <fieldset>
                                            <div className="field">
                                                <p className="control has-icons-left has-icons-right">
                                                    <input className="input" type="name" id="name" name="name" placeholder="Name" value={name} onChange={(e) => e.target.value!== "" ? (setName(e.target.value),setToggle(true)) : setToggle(false)}  disabled={loading} />
                                                    <span className="icon is-small is-left">
                                                        <i className="fas fa-user"></i>
                                                    </span>
                                                </p>
                                            </div>
                                            <div className="field">
                                                <p className="control has-icons-left has-icons-right">
                                                    <input className="input" type="email" id="email" name="email" placeholder="Email"  value={email} onChange={(e) => e.target.value!== "" ? (setEmail(e.target.value),setToggle(true)) : setToggle(false)}  disabled={loading} />
                                                    <span className="icon is-small is-left">
                                                        <i className="fas fa-envelope"></i>
                                                    </span>
                                                </p>
                                            </div>
                                            <div className="field">
                                                <p className="control has-icons-left">
                                                    <input className="input" type="password" id="password" name="password" placeholder="Password" value={password} onChange={(e) => e.target.value!== "" ? (setPassword(e.target.value),setToggle(true)) : setToggle(false)}  disabled={loading} />
                                                    <span className="icon is-small is-left">
                                                        <i className="fas fa-lock"></i>
                                                    </span>
                                                </p>
                                            </div>
                                            {error && 
                                                <div className="field">
                                                    <div className="control">
                                                        <div className="notification is-danger is-light">
                                                            {error}
                                                        </div>
                                                    </div>
                                                </div>
                                            }
                                            {success && 
                                                <div className="field">
                                                    <div className="control">
                                                        <div className="notification is-success is-light">
                                                            Profile saved successfully!
                                                        </div>
                                                    </div>
                                                </div>
                                            }
                                            <div className="field">
                                                <p className="control">
                                                    <button type="submit" className="button is-primary has-text-white is-fullwidth" disabled={loading || !toggle}>
                                                    Update Profile
                                                    </button>
                                                </p>
                                            </div>
                                            <div className="field">
                                                <p className="control">
                                                    <Link type="button" className="button is-outlined is-fullwidth" disabled={loading} to="/logout">
                                                    Logout
                                                    </Link>
                                                </p>
                                            </div>
                                        </fieldset>
                                    </form>
                                </section>
                            </div>
                        </div>
                    </div>
                    <div className="column is-full-mobile is-full-tablet is-two-thirds-desktop is-two-thirds-widescreen is-two-thirds-fullhd">
                        <section className="section">
                        {
                            loadingOrders ? <div className="columns is-centered"><div className="loader" style={{height:'5em',width:'5em'}}></div></div> : 
                            errorOrders ? <div>{"Error: " + errorOrders}</div> :
                            (
                                <table className="table is-fullwidth is-striped">
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Date</th>
                                            <th>Total</th>
                                            <th>Paid</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {orders.map(order => 
                                            (<tr key={order._id}>
                                                <td>{order._id}</td>
                                                <td>{new Date(order.createdAt).toLocaleDateString("en-US")}</td>
                                                <td>${order.totalPrice}</td>
                                                <td>{order.isPaid ? "Paid" : "Not paid"}</td>
                                                <td>
                                                    <Link to={"/order/"+order._id} className="button is-primary">DETAILS</Link>
                                                </td>
                                            </tr>)
                                        )}
                                    </tbody>
                                </table>
                            )
                        }
                        </section>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default ProfilePage;