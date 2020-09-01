import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import Axios from 'axios';


function PaypalButton(props) {

    const [sdkReady, setSdkReady] = useState(false);
    console.log("Entered1;");

    const addPaypalSdk = async () => {
        const result = await Axios.get("/api/config/paypal");
        const clientID = result.data;
        const script = document.createElement('script');
        script.type = "text/javascript";
        script.src = "https://www.paypal.com/sdk/js?client-id=" + clientID;
        script.async = true;
        script.addEventListener('load', () => {
            setSdkReady(true);
        });
        document.body.appendChild(script);
    }

    const createOrder = (data, actions) => actions.order.create({
        purchase_units: [
            {
                amount: { 
                    currency_code: 'USD',
                    value: props.amount
                }
            }
        ]
    });

    const onApprove = (data,actions) => actions.order
    .capture()
    .then(details => props.onSuccess(data, details))
    .catch(err => console.log(err));

    useEffect(() => {
        console.log("Entered2");
        console.log(window.paypal);
        if(!window.paypal) {
            addPaypalSdk();
            console.log("Entered3");
        }
        return () => {
            //cleanup
        }
    }, []);

    if(!sdkReady) {
        return <div className="columns is-centered"><div className="loader" style={{height:'5em',width:'5em'}}></div></div>;
    }

    const Button = window.paypal.Buttons.driver('react', { React, ReactDOM });

    return (
    <Button {...props} 
    createOrder={(data, actions) => createOrder(data, actions)} 
    onApprove={(data, actions) => onApprove(data, actions)}
    className="button is-primary has-text-white is-fullwidth mb-6 is-medium"  />
    )
}

export default PaypalButton;