import React from 'react';
import { useDispatch } from 'react-redux';
import { logoutAction } from '../../actions/userActions';

function LogoutPage(props) {

    const dispatch = useDispatch();
    
    const handleLogout = () => {
        setTimeout(() => {
            dispatch(logoutAction());
            props.history.push("/signin");
        }, 500);
    }

    return (
    <div className="container">
        <section className="section">
            <div className="columns is-centered">
                <div className="loader" style={{height:'5em',width:'5em'}}></div>
                {handleLogout()}
            </div>
            <h1 className="title has-text-centered">Logging Out</h1>
        </section>
    </div>
    );
}

export default LogoutPage;