import React, { useEffect, useState } from 'react'
import axios from 'axios'

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
            <h1>All Products</h1>
            <div>{products.map((product, idx) => (
                <li key={idx}>
                    {product.title}
                </li>
            ))}</div>

        </div>
    )
    }

export default Main