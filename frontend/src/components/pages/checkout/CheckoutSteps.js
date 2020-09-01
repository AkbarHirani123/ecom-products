import React from 'react';

function CheckoutSteps(props) {

    return (
        <ul className="steps is-small has-content-centered has-gaps has-text-grey-light">
      <li className={"steps-segment " + (props.step===1 ? "is-active is-primary has-text-weight-bold" : "")}>
        <span className={"steps-marker " + (props.step===1 ? "is-hollow" : "")}></span>
        <div className="steps-content">
          <p className="heading is-size-7 mt-2">Sign-in</p>
        </div>
      </li>
      <li className={"steps-segment " + (props.step===2 ? "is-active is-primary has-text-weight-bold" : "")}>
        <span className={"steps-marker " + (props.step===2 ? "is-hollow" : "")}></span>
        <div className="steps-content">
          <p className="heading is-size-7 mt-2">Shipping</p>
        </div>
      </li>
      <li className={"steps-segment " + (props.step===3 ? "is-active is-primary has-text-weight-bold" : "")}> 
        <span className={"steps-marker " + (props.step===3 ? "is-hollow" : "")}></span>
        <div className="steps-content">
          <p className="heading is-size-7 mt-2">Payment</p>
        </div>
      </li>
      <li className={"steps-segment " + (props.step===4 ? "is-active is-primary has-text-weight-bold" : "")}>
        <span className={"steps-marker " + (props.step===4 ? "is-hollow" : "")}></span>
        <div className="steps-content">
          <p className="heading is-size-7 mt-2">Review</p>
        </div>
      </li>
    </ul>
        // <div className="steps">
        //     <div className={"step-item "+ props.step===1 ? "is-active is-primary has-text-weight-bold" : (props.step>1 ? "is-completed is-success")} >
        //         <div className="step-marker"></div>
        //         <div className="step-details">
        //         <p className="step-title">Sign-in</p>
        //         </div>
        //     </div>
        //     <div className={"step-item "+ (props.step===2) ? "is-active is-primary has-text-weight-bold" : (props.step>2 ? "is-completed is-success")} >
        //         <div className="step-marker"></div>
        //         <div className="step-details">
        //         <p className="step-title">Shipping</p>
        //         </div>
        //     </div>
        //     <div className={"step-item "+ (props.step===3) ? "is-active is-primary has-text-weight-bold" : (props.step>3 ? "is-completed is-success")} >
        //         <div className="step-marker">3</div>
        //         <div className="step-details">
        //         <p className="step-title">Payment</p>
        //         </div>
        //     </div>
        //     <div className={"step-item "+ (props.step===4) ? "is-active is-primary has-text-weight-bold"} >
        //         <div className="step-marker"></div>
        //         <div className="step-details">
        //         <p className="step-title">Review</p>
        //         </div>
        //     </div>
        // </div>
    );
}

export default CheckoutSteps;