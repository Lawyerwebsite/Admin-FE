import react, { useState } from 'react';
import StripeCheckout from 'react-stripe-checkout';



const Payment = ()=>{
    const [product ,setproduct] = useState
    ({
        name: "Lawyer Appointment",
        price: 1000 *100,
        productBy: "LawLink",
    })


    const makePayment = (token)=>{
        const body = {
            token,
            product
            }
            const headers = {
                'Content-Type': 'application/json'
                }
                return fetch('http://localhost:7000/admin/payment', {
                    method: 'POST',
                    headers,
                    body: JSON.stringify(body)
                    }).then((response) =>{
                        console.log(response);
                    }).catch ((err)=>
                        {
                            console.log(err);
                        });
                    }
    
 
    



    return(
        <div>
            <StripeCheckout 
             name="Lawyer Appointment"
             amount ={product.price}
              currency= "INR" 
              token={makePayment} 
              stripeKey="pk_test_51QZskZGDQULys6h3pJhrzrPqAtKmh4oAN7lfr4Zw46yzOz2yCLtvnxTZ7HNbCSJ5hdFSC03BnvLCpDN8EVuV7qqA00LrMOae2B"
              >
                <button>Pay Now {product.price/100}</button>
                
            </StripeCheckout>
        </div>
    )

}
    
export default Payment;
