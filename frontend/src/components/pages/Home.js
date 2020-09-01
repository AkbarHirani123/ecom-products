import React, { useEffect, useState } from 'react';
import ProductCard from '../common/ProductCard';
// import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { listProductsAction } from '../../actions/productActions';

function Home(props) {

    // const [products, setProduct] = useState([]);
    //////// This was needed with useState where we were fetching data directly from the API.
    //////// Your store should be fetching the data and you catch it with a dispatcher

    const category = props.match.params.id ? props.match.params.id : "";
    const [searchKeyword, setSearchKeyword] = useState('');
    const [sortOrder, setSortOrder] = useState('');
    const productList = useSelector(state => state.productList);
    const { products, loading, error } = productList;
    const dispatch = useDispatch();

    useEffect(() => {
        if(sortOrder !== '') {
            dispatch(listProductsAction(category, searchKeyword, sortOrder));
        }
        else 
            dispatch(listProductsAction(category));
        // const fetchData = async () => {
        //     const {data} = await axios.get("/api/products");
        //     setProduct(data);
        // }
        // fetchData();
        //////// This was needed with useState where we were fetching data directly from the API.
        //////// Your store should be fetching the data and you catch it with a dispatcher

        return () => {
            // cleanup
        };
    }, [category, sortOrder]);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(listProductsAction(category, searchKeyword, sortOrder));
    }

    return (
        <div className="container">
            {category && 
                <h1 className="title is-2 is-capitalized has-text-centered">{category}</h1>
            }
            <div className="columns is-centered">
                <div className="column is-half">
                    <form onSubmit={handleSubmit}>
                        <div className="field is-grouped">
                            <div className="control is-expanded">
                                <input className="input is-primary is-medium" type="text" placeholder="Product name" name="searchKeyword" onChange={(e) => setSearchKeyword(e.target.value)} />
                            </div>
                            <div className="control">
                                <button type="submit" className="button is-medium is-link">
                                    Search
                                </button>
                            </div>
                            <div className="control has-icons-left">
                                <div className="select is-medium is-primary">
                                    <select name="sortOrder" onChange={(e) => setSortOrder(e.target.value)}>
                                        <option value="">Newest</option>
                                        <option value="lowest">Lowest</option>
                                        <option value="highest">Highest</option>
                                    </select>
                                </div>
                                <span className="icon is-medium is-left">
                                    <i className="fas fa-sort-amount-down"></i>
                                </span>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            {
                loading ? <div className="columns is-centered is-vcentered" style={{height:'40vh'}}><div className="loader" style={{height:'5em',width:'5em'}}></div></div> : 
                error ? <div>{"Error: " + error}</div> :
                <div>
                    <div className="container home">
                        <div className="columns is-multiline is-mobile">
                            {
                                products.map(product =>
                                    <ProductCard key={product._id} product={product} />
                                )
                            }
                        </div>
                    </div>
                </div>
            }
        </div>
        );
}

export default Home;