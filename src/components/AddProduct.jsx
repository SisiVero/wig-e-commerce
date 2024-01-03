import React, {useState} from "react"

const productDetails ={
    productName: "",
    price: 0,
    description: "",
    quantity: ""
}

export default function AddProduct(){
    const [state, setState] = useState(productDetails)
    const {productName, price, description, quantity} = state
    
    function handleChange(e){
        setState({...state, [e.target.name]: e.target.value})
    }
    console.log(productName, price, description, quantity)
    return(
        <div>
            <form>
                    <label>Product Name</label>
                        <input 
                            type="text"
                            name="productName"
                            value ={productName}
                            onChange={handleChange}
                            required
                        />
                    
                
                    <label>Price</label>
                    <input 
                            type="number"
                            name="price"
                            value={price}
                            onChange={handleChange}
                            required
                        />
                        
                    <label>Description</label>
                    <br/>
                    <textarea 
                            type="text"
                            name="description"
                            value={description}
                            onChange={handleChange}
                            required
                        />
                    <br/>
                         
                        <label>Quantity</label>
                    <input 
                            type="number"
                            name="quantity"
                            value={quantity}
                            onChange={handleChange}
                            required
                        />
                     <button>Add product</button>
            </form>
        </div>
    )
}