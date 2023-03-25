import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { Link, useParams, useNavigate } from 'react-router-dom'

const ProductDetails = () => {

    const [product, setProduct] = useState("")
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

    const handleDelete = (e) => {
        e.preventDefault()
        axios.delete(`http://localhost:8000/api/products/${id}`)
            .then(response => {
                console.log(response.data)
                navigate("/")
            })
            .catch(error => {
                console.log(error)
            })
    }

    const goHome = (e) => {
        e.preventDefault()
        navigate("/")
    }

    return (
        <div>
            <h2>Product Details</h2>
            <p>Title: {product.title}</p>
            <p>Price: ${product.price}</p>
            <p>Description: {product.description}</p>
            <button onClick={goHome}>Home</button>
            <span>  </span>
            <button onClick={handleDelete}>Delete</button>
        </div>
    )
}

export default ProductDetails