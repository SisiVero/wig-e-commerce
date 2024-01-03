import React, { useState, useEffect } from 'react'
import AdminNav from './AdminNav'
import { db, storage } from './firebase'
import { addDoc, collection, doc, setDoc } from 'firebase/firestore'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { useNavigate, Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { v4 } from 'uuid'

const productDetails = {
  image: '',
  name: '',
  price: '',
  description: '',
}

export default function Products() {
  const [selectedFile, setSelectedFile] = useState(null)
  const [newProduct, setNewProduct] = useState(productDetails)
  const [imgUrl, setImgUrl] = useState('')
  const { image, name, price, description } = newProduct
  const navigate = useNavigate()

  const labelStyle = {
    backgroundColor: '#3498db',
    color: '#fff',
    padding: '8px 12px',
    borderRadius: '5px',
    cursor: 'pointer',
    display: 'inline-block',
    marginBottom: '10px',
  }

  //Function for storing image in firebase//

  const handleFileChange = (event) => {
    const file = event.target.files[0]

    if (file) {
      const reader = new FileReader()

      reader.onloadend = () => {
        setSelectedFile(reader.result)
      }

      reader.readAsDataURL(file)

      // Update the state with the file information
      setNewProduct({ ...newProduct, [event.target.name]: event.target.value })

      // Call handleImageStorage to upload the file to Firebase Cloud Storage
      handleImageStorage(file)
    } else {
      setSelectedFile(null)
    }
  }

  const handleImageStorage = (file) => {
    const imgPath = `image/${v4()}`
    const imgs = ref(storage, imgPath)

    uploadBytes(imgs, file).then((data) => {
      getDownloadURL(data.ref).then((val) => {
        setImgUrl(val)
      })
    })
  }

  function handleInput(e) {
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value })
  }

  async function handlePublish(e) {
    e.preventDefault()

    const productData = {
      image: selectedFile,
      name: name,
      price: price,
      description: description,
    }

    const productsData = doc(collection(db, 'products'))
    await setDoc(productsData, productData)

    toast.success('Product added successfully!')
    setNewProduct(productDetails)
    setSelectedFile(null)
  }

  return (
    <div className="products-page-main-cont">
      <AdminNav />
      <div className="products-form-cont">
        <p className="product-top-text">Add new product</p>
        <p className="product-bottom-text">Base information</p>
        <form onSubmit={handlePublish} className="products-form">
          <div className="image-input">
            <label htmlFor="fileInput" style={labelStyle}>
              Choose Image
            </label>
            <input
              type="file"
              id="fileInput"
              accept="image/*"
              value={image}
              style={{ display: 'none' }}
              onChange={handleFileChange}
            />

            {selectedFile && (
              <div>
                <img
                  src={selectedFile}
                  alt="File Preview"
                  style={{ maxWidth: '100%', maxHeight: '200px' }}
                />
              </div>
            )}
          </div>

          <label for="name">Wig name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={handleInput}
            placeholder="Enter wig name"
            required
          />

          <label for="price">Price</label>
          <input
            type="number"
            name="price"
            id="price"
            value={price}
            onChange={handleInput}
            required
          />
          <div className="textarea-cont">
            <label for="description">Description:</label>
            <textarea
              id="description"
              name="description"
              value={description}
              onChange={handleInput}
              placeholder="Enter wig description here"
              rows="4"
              cols="50"
              className="textarea"
              required
            ></textarea>
          </div>
          <button className="publish-btn">Publish</button>
        </form>
      </div>
    </div>
  )
}
