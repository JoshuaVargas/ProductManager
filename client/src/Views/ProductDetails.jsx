import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { Link, useParams } from 'react-router-dom'

const ProductDetails = () => {

    const [product, setProduct] = useState("")
    const {id} = useParams()

    useEffect(() => {
        axios.get(`http://localhost:8000/api/products/${id}`)
            .then(res => {
                console.log(res.data)
                setProduct(res.data)
            })
            .catch(err => console.log(err))
    }, [])


    return (
        <div>
            <h2>Product Details</h2>
            <p>Title: {product.title}</p>
            <p>Price: ${product.price}</p>
            <p>Description: {product.description}</p>
            <Link to="/">Go Home</Link>
        </div>
    )
}

export default ProductDetails