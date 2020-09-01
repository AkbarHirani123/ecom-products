import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
// import data from './data';
import './ProductDetailPage.css';
import { useSelector, useDispatch } from 'react-redux';
import { detailsProductAction } from '../../actions/productActions';

// function largeImage(img) {
//     return img.slice(0, -3)+"560";
// }

function ProductDeailPage(props) {
    // const product = data.products.find(x => x._id === this.props.match.params.id);

    const [qty, setQty] = useState(1); // hook to grab quantity
    const productDetails = useSelector(state => state.productDetails);
    const { product, loading, error } = productDetails;
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(detailsProductAction(props.match.params.id));
        return () => {
            // cleanup
        };
    }, []);

    const handleAddToCart = () => {
        props.history.push("/cart/" +props.match.params.id + "?qty="+ qty)
    }

    return (
        <div className="container pdp">
            <div className="back">
                <Link to="/" className="is-primary">&#x2039; Back to results</Link>
            </div>
            {
                loading ? <div className="columns is-centered"><div className="loader" style={{height:'5em',width:'5em'}}></div></div> : 
                error ? <div>{"Error: " + error}</div> :
                (
                    <section className="section product-details">
                        <h1 className="title">{product.name}</h1>
                        <div className="columns is-multiline is-mobile">
                            <div className="column is-three-fifths has-text-centered">
                                <img src={product.img && product.img.slice(0, -3)+"560"} alt={product.name} />
                            </div>
                            <div className="column is-two-fifths">
                                <div className="container color-background">
                                    
                                    <ul>
                                        <li><h3 className="title is-6">{product.name}</h3></li>
                                        <li><p className="is-6"><b>Team: </b>{product.team}</p></li>
                                        <li><p className="is-6"><b>Description: </b>{product.category}</p></li>
                                        <li><p>{product.rating} Stars</p></li>
                                    </ul>
                                    <hr />
                                        <ul>
                                            <li><p className=" is-5">Price: <span className="title is-5">${product.price}</span></p></li>
                                            <li>Status: {product.quantityInStock > 0 ? "In Stock" : "Out Of Stock"}</li>
                                            { product.quantityInStock > 0 && <li> 
                                                <div className="field is-horizontal">
                                                    <div className="field-label is-normal has-text-left">
                                                        <label className="label">Qty:</label>
                                                    </div>
                                                    <div className="field-body">
                                                        <div className="control">
                                                            <div className="select is-primary">
                                                                <select value={qty} onChange={(e) =>{ setQty(e.target.value) }}>
                                                                    {[...Array(product.quantityInStock).keys()].map(x => 
                                                                        <option value={x + 1} key={x + 1}>{x + 1}</option>
                                                                    )}
                                                                    {/* Static quantity
                                                                    <option value="1">1</option>
                                                                    <option value="2">2</option>
                                                                    <option value="3">3</option>
                                                                    <option value="4">4</option> */}
                                                                </select>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li> }
                                            <li>
                                                {product.quantityInStock > 0 ?<button onClick={handleAddToCart} className="button is-fullwidth is-primary has-text-white">Add To Cart</button> 
                                                : <button className="button is-fullwidth is-primary has-text-white" disabled>Add To Cart</button> 
                                                }
                                            </li>
                                        </ul>
                                </div>
                            </div>
                        </div>
                    </section>
                )
            }
        </div>  
    );
}

export default ProductDeailPage;