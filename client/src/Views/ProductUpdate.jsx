import React, {useEffect, useState} from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'

const ProductUpdate = () => {

    const [product, setProduct] = useState("")
    const [title, setTitle] = useState(product.title)
    const [price, setPrice] = useState(product.price)
    const [description, setDescription] = useState(product.description)

    const updatedProduct = {title, price, description}

    const {id} = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        axios.get(`http://localhost:8000/api/products/${id}`)
            .then(res => {
                console.log(res.data)
                setProduct(res.data)
            })
            .catch(err => console.log(err))
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.put(`http://localhost:8000/api/products/${id}`, updatedProduct)
            .then(response => {
                console.log(response.data)
                navigate("/")
            })
            .catch(error => {
                console.log(error)
            })
    }


    return (
        <div>
            <h1>Update Product</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="title">
                    <div>Title</div>
                    <input type="text" defaultValue={product.title} onChange={e => setTitle(e.target.value)}/>
                </label>
                <label htmlFor="price">
                    <div>Price</div>
                    <input type="text" defaultValue={product.price} onChange={e => setPrice(e.target.value)}/>
                </label>
                <label htmlFor="description">
                    <div>Description</div>
                    <input type="text" defaultValue={product.description} onChange={e => setDescription(e.target.value)}/>
                </label>
                <div>
                    <button type="submit">Update</button>
                </div>
            </form>
        </div>
    )
}

export default ProductUpdate