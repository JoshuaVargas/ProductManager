import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

const Main = () => {

    const [title, setTitle] = useState("")
    const [price, setPrice] = useState("")
    const [description, setDescription] = useState("")
    const [products, setProducts] = useState([])
    
    const newProduct = { title, price, description }

    useEffect(() => {
        axios.get("http://localhost:8000/api/products")
            .then(res => {
                console.log(res.data)
                setProducts(res.data)
            })
            .catch(err => console.log(err))
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post("http://localhost:8000/api/products", newProduct)
            .then( response => {
                console.log("We in it!")
                console.log(response.data)
                setTitle("")
                setPrice("")
                setDescription("")
                setProducts([...products, response.data])
            })
            .catch(error => {
                console.log("We ain't in it!")
                console.log(error)})
    }

    const handleDelete = (deleteId) => {
        axios.delete(`http://localhost:8000/api/products/${deleteId}`)
            .then(response => {
                console.log(response.data)
                const filteredProducts = products.filter((product)=>product._id !== deleteId)
                setProducts(filteredProducts)
            })
            .catch(error => {
                console.log(error)
            })
    }
    
    return (
        <div>
            <h1>Product Manager</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="title">
                    <div>Title</div>
                    <input type="text" value={title} onChange={e => setTitle(e.target.value)}/>
                </label>
                <label htmlFor="price">
                    <div>Price</div>
                    <input type="text" value={price} onChange={e => setPrice(e.target.value)}/>
                </label>
                <label htmlFor="description">
                    <div>Description</div>
                    <input type="text" value={description} onChange={e => setDescription(e.target.value)}/>
                </label>
                <div>
                    <button type="submit">Create</button>
                </div>
            </form>

            <hr />
            <h2>All Products</h2>
            <div>{products.map((product, idx) => (
                <li key={idx}>
                    <Link to={`/product/details/${product._id}`}>{product.title}</Link>
                    <span> | </span>
                    <Link to={`/product/update/${product._id}`}>Edit</Link>
                    <span> | </span>
                    <button onClick={()=>handleDelete(product._id)}>Delete</button>
                </li>
            ))}</div>

        </div>
    )
    }

export default Main