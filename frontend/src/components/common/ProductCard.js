import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './ProductCard.css';

class ProductCard extends Component {
    render() {
        const {product} = this.props;

        return (
            <div className="column is-half-mobile is-one-third-tablet is-one-third-desktop is-one-quarter-widescreen is-one-quarter-fullhd">
                <Link  to={"/product/" + product._id} >
                    <div className="card">
                        <div className="card-image">
                            <figure className="image is-1by1">
                            <img src={product.img} alt="Placeholder" />
                            </figure>
                        </div>
                        <div className="card-content">
                            <div className="media">
                                <div className="media-content">
                                    <p className="title is-6">{product.name}</p>
                                    <p className="is-6">{product.category}</p>
                                </div>
                            </div>

                            <div className="content">
                                <p className="title is-4">${product.price}</p>
                                <p>{product.rating} Stars</p>
                            </div>
                        </div>
                    </div>
                </Link>
            </div>
        )
    }
}
export default ProductCard;