import React, { useEffect, useState } from 'react';
// import data from './data';
import './ProductAdminPage.css';
import { useSelector, useDispatch } from 'react-redux';
import { saveProductsAction, listProductsAction, deleteProductAction } from '../../actions/productActions';

// function largeImage(img) {
//     return img.slice(0, -3)+"560";
// }

function ProductsAdminPage(props) {

    const [toggle, setToggle] = useState(false);
    const [complete, setComplete] = useState(false);
    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [img, setImg] = useState('');
    const [team, setTeam] = useState('');
    const [category, setCategory] = useState('');
    const [quantityInStock, setQuantityInStock] = useState('');

    const productList = useSelector(state => state.productList);
    const { loading, products, error } = productList;

    const productSave = useSelector(state => state.productSave);
    const { loading: loadingSave, success: successSave, error: errorSave } = productSave;

    const productDelete = useSelector(state => state.productDelete);
    const { loading: loadingDelete, success: successDelete, error: errorDelete } = productDelete;

    const dispatch = useDispatch();

    useEffect(() => {
        if(successSave) {
            setToggle(false);
            showSuccessAnimation();
        }
        if(successDelete) {
            showSuccessAnimation();
        }
        dispatch(listProductsAction());
        return () => {
            // cleanup
        };
    }, [successSave, successDelete]);

    const handleSubmit = (e)  => {
        e.preventDefault();
        dispatch(saveProductsAction({_id:id,name,price,img,team,category,quantityInStock}));
    }
    
    const handleDelete = (product)  => {
        dispatch(deleteProductAction(product._id));
    }

    const openModal = (product) => {
        setToggle(true);
        setId(product._id);
        setName(product.name);
        setPrice(product.price);
        setImg(product.img);
        setTeam(product.team);
        setCategory(product.category);
        setQuantityInStock(product.quantityInStock);
    }

    const showSuccessAnimation = () => {
        setComplete(true);
        setId('');
        setName('');
        setPrice('');
        setImg('');
        setTeam('');
        setCategory('');
        setQuantityInStock('');
        setTimeout(() => setComplete(false), 1300);
    }

    return (
        <div className="container product-admin">
            <div className="is-mobile is-centered">
                <div className="">
                    <h1 className="title is-2 is-pulled-left">Products Admin Home</h1>
                    <button className="button is-primary is-pulled-right is-medium" onClick={(e) => (setToggle(!toggle))}>Create Product</button>
                    <section className="section">
                    {
                        loading ? <div className="columns is-centered"><div className="loader" style={{height:'5em',width:'5em'}}></div></div> : 
                        error ? <div>{"Error: " + error}</div> :
                        (
                        <table className="table is-fullwidth is-striped ">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Price</th>
                                    <th>Category</th>
                                    <th>Team</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map(product => (
                                    <tr key={product._id}>
                                        <td>{product._id}</td>
                                        <td>{product.name}</td>
                                        <td>{product.price}</td>
                                        <td>{product.category}</td>
                                        <td>{product.team}</td>
                                        <td>
                                        {/* Action */}
                                            <div className="buttons">
                                                <button className="button is-primary" onClick={(e) => (openModal(product))}>Edit</button>
                                                <button className="button is-primary is-outlined" onClick={(e) => (handleDelete(product))}>Delete</button>
                                            </div>
                                        </td>
                                    </tr> 
                                ))}
                            </tbody>
                        </table>
                        )
                    }
                    </section>
                </div>
            </div>
            <div className={toggle ? "modal is-active" : "modal"} >
                <div className="modal-background"></div>
                <div className="modal-card">
                    <div className="card">
                        <div className="modal-card-head">
                            <p className="modal-card-title has-icons-right">Create Product</p>
                            <button className="delete" aria-label="close" onClick={(e) => {setToggle(!toggle)}}></button>
                        </div>
                        <div className="modal-card-body">
                            <section className="content signin-form">
                                <form className="form-horizontal" onSubmit={handleSubmit}>
                                    <fieldset>
                                        <p>{id ? "Edit" : "Enter"} the Information below:</p>
                                        <p>{id && "Product ID: "+id}</p>
                                        <div className="field">
                                            <p className="control has-icons-left has-icons-right">
                                                <input className="input" type="text" name="name" placeholder="Product Name" id="name" value={name} onChange={(e) => setName(e.target.value)}  disabled={loadingSave} />
                                                <span className="icon is-small is-left">
                                                    <i className="fas fa-camera"></i>
                                                </span>
                                            </p>
                                        </div>
                                        <div className="field">
                                            <p className="control has-icons-left">
                                                <input className="input" type="text" name="price" id="price" value={price} placeholder="Price" onChange={(e) =>setPrice(e.target.value)}  disabled={loadingSave} />
                                                <span className="icon is-small is-left">
                                                    <i className="fas fa-dollar-sign"></i>
                                                </span>
                                            </p>
                                        </div>
                                        <div className="field">
                                            <p className="control has-icons-left">
                                                <input className="input" type="text" name="img" id="img" value={img} placeholder="Image URL" onChange={(e) =>setImg(e.target.value)}  disabled={loadingSave} />
                                                <span className="icon is-small is-left">
                                                    <i className="fas fa-image"></i>
                                                </span>
                                            </p>
                                        </div>
                                        <div className="field">
                                            <p className="control has-icons-left">
                                                <input className="input" type="text" name="team" id="team" value={team} placeholder="Team" onChange={(e) =>setTeam(e.target.value)}  disabled={loadingSave} />
                                                <span className="icon is-small is-left">
                                                    <i className="fas fa-football-ball"></i>
                                                </span>
                                            </p>
                                        </div>
                                        <div className="field">
                                            <p className="control has-icons-left">
                                                <input className="input" type="text" name="category" id="category" value={category} placeholder="Category" onChange={(e) =>setCategory(e.target.value)}  disabled={loadingSave} />
                                                <span className="icon is-small is-left">
                                                    <i className="fas fa-tshirt"></i>
                                                </span>
                                            </p>
                                        </div>
                                        <div className="field">
                                            <p className="control has-icons-left">
                                                <input className="input" type="text" name="quantityInStock" id="quantityInStock" value={quantityInStock} placeholder="Quantity In Stock" onChange={(e) =>setQuantityInStock(e.target.value)}  disabled={loadingSave} />
                                                <span className="icon is-small is-left">
                                                    <i className="fas fa-hashtag"></i>
                                                </span>
                                            </p>
                                        </div>
                                        {errorSave && 
                                            <div className="field">
                                                <p className="control">
                                                    <div className="notification is-danger is-light">
                                                        {errorSave}
                                                    </div>
                                                </p>
                                            </div>
                                        }
                                        <div className="field">
                                            <div className="control">
                                                <button type="submit" className="button is-primary has-text-white is-fullwidth" disabled={loadingSave}>
                                                {id ? "Update" : "Create" }
                                                {loadingSave && (<div className="loader" style={{marginLeft:10}}></div>)}
                                                </button>
                                            </div>
                                        </div>
                                    </fieldset>
                                </form>
                            </section>
                        </div>
                    </div>
                </div>
            </div>
            <div id="successAnimation" className={complete ? "modal is-active" : "modal"}>
                <div className="modal-background"></div>
                <div className="modal-content">
                    <div className="box">
                        <section className="content">
                            <span className="icon is-large has-text-success">
                                <i className="fas fa-3x fa-check-circle"></i>
                            </span>
                            <p className="title is-4 mt-3">Complete!</p>
                        </section>
                    </div>
                </div>
            </div>
        </div>  
    );
}

export default ProductsAdminPage;