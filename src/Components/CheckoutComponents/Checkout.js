import React, { useState, useEffect } from "react";
import CheckoutAddressForm from "./CheckoutAddressForm";
import BillingForm from "./BillingInfoForm";
import CheckoutBillingAddressForm from "./CheckoutBillingAddressForm";
import { getPrimaryAddress } from "../../Firebase/firebaseAddress";
import { getPrimaryPayment } from "../../Firebase/firebasePayment";
import { saveUserOrder } from "../../Firebase/firebaseOrder";
import uniqid from 'uniqid';

const CheckoutPage = (props) => {

    const { user, cart } = props

    const initialOrderState = {
        cart: cart,
        payment: '',
        shipToAddress: '',
        billToAddress: '',
        total: 0,
        id: 0
    }

    const initialPaymentState = {
        name: "",
        number: "",
        month: "",
        year: "",
        cvv: "",
        zipcode: "",
        cardType:"",
        id: uniqid(),
        primary: false
    }
    const initialAddressState = {
        name: "",
        street: "",
        apt: "",
        city: "",
        state: "",
        zipcode: "",
        id: uniqid(),
        primary: false
    }

    const [paymentInfo, setPaymentInfo] = useState(initialPaymentState)
    const [shippingAddressInfo, setShippingAddressInfo] = useState(initialAddressState)
    const [billingAddressInfo, setBillingAddressInfo] = useState(initialAddressState)
    const [order, setOrder] = useState(initialOrderState)
    const [isOrdered, setOrderStatus] = useState(false)

    useEffect(() => {
        if(!user) return
        getUserInfo()
    }, [user])

    const getUserInfo = async () => {
        initializePaymentInfo()
        initializeAddressInfo()
    }

    const initializePaymentInfo = async () => {
        const primaryPayment = await getPrimaryPayment(user.uid)

        if (primaryPayment.length === 0){
            return
        } else {
            let newPayment = primaryPayment[0]
            setPaymentInfo(newPayment)
        }
    }

    const masterCardRegex = {
        name: "Master Card",
        regex: /^5[1-5][0-9]{14}$|^2(?:2(?:2[1-9]|[3-9][0-9])|[3-6][0-9][0-9]|7(?:[01][0-9]|20))[0-9]{12}$/
    }
    const amexRegex = {
        name: "AMEX",
        regex: /^3[47][0-9]{13}$/
    }
    const visaRegex = {
        name:"Visa",
        regex: /^4[0-9]{12}(?:[0-9]{3})?$/
    }
    const discoverRegex = {
        name:"Discover", 
        regex: /^65[4-9][0-9]{13}|64[4-9][0-9]{13}|6011[0-9]{12}|(622(?:12[6-9]|1[3-9][0-9]|[2-8][0-9][0-9]|9[01][0-9]|92[0-5])[0-9]{10})$/
    }
    const exampleRegex = {
        name: "example",
        regex: /^[0-9]{8,19}/
    } 
    const regexChecks = [masterCardRegex, amexRegex, visaRegex, discoverRegex, exampleRegex, exampleRegex]
    
    const validateCardNumber = () => {
        if (paymentInfo.number.length>7) {
            let cardObject = regexChecks.find( card => paymentInfo.number.match(card.regex))
            setPaymentInfo((prevState) => ({...prevState, cardType: cardObject.name}))
        }
        else{
            return
        }
    }
    const handlePaymentChange = (e) => {
        const {name, value} = e.target
        setPaymentInfo((prevState) => ({...prevState, [name]:value}))
        validateCardNumber(paymentInfo.number)
    }

    const initializeAddressInfo = async (e) => {
        const primaryAddress = await getPrimaryAddress(user.uid)
        if (primaryAddress.length === 0) {
            return
        } else {
            let newAddress = primaryAddress[0]
            setShippingAddressInfo(newAddress)
        }
    }

    const handleShippingAddressChange = (e) => {
        const {name, value} = e.target
        setShippingAddressInfo((prevState) => ({...prevState, [name]:value}))
    }

    const useShippingAddress = () => {
        setBillingAddressInfo(shippingAddressInfo)
    }

    const handleBillingAddressChange = (e) => {
        const {name, value} = e.target
        setBillingAddressInfo((prevState) => ({...prevState, [name]:value}))
    }

    const totalCart = () => {
        let total = 0

        cart.forEach(item => {
            total += item.total
        });

        return total.toFixed(2)
    }

    let total = totalCart()

    const onOrder = (e) => {
        e.preventDefault()
        setOrder({
            cart: cart,
            payment: paymentInfo,
            shipToAddress: shippingAddressInfo,
            billToAddress: billingAddressInfo,
            total: total,
            id: uniqid()
        })

        setOrderStatus(true)
        props.clearCart()
    }

    if (isOrdered === false) {
        return (
            <>
                <div className='checkout-display'>
                    <form>
                        <h3>Total: ${total}</h3>
                        <div className="checkout-address">
                            <h4 className='checkout-form-title'>Shipping Address</h4>
                            <CheckoutAddressForm address={shippingAddressInfo} handleAddressChange={handleShippingAddressChange} />
                        </div>
                        <div className="billing-info">
                            <h4 className='checkout-form-title'>Billing Information</h4>
                            <BillingForm paymentInfo={paymentInfo} handlePaymentChange={handlePaymentChange}/>
                        </div>
                        <div className='checkout-address'>
                            <h4 className='checkout-form-title'>Billing Address</h4>
                            <CheckoutBillingAddressForm address={shippingAddressInfo} useShipping={useShippingAddress} handleAddressChange={handleBillingAddressChange} />
                        </div>
                        <button className="checkout-button" onClick={onOrder} type='submit' >Checkout</button>
                    </form>
                </div>
            </>
        )
    } else {
        return (
            <>
                <div className="ordered-box">
                    <h3>Thank you for your Order!</h3>
                    <h3>Your order number is:</h3>
                    <h2>{order.id}</h2>
                </div>
            </>
        )
    }
}

export default CheckoutPage