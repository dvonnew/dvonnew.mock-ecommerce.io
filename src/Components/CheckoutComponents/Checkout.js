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

    const totalCart = () => {
        let total = 0

        cart.forEach(item => {
            total += item.total
        });

        return total.toFixed(2)
    }

    let total = totalCart()

    const initialOrderState = {
        cart: cart,
        payment: '',
        shipToAddress: '',
        billToAddress: '',
        email: '',
        total: total,
        id: uniqid()
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
    const [email, setEmail] = useState('')
    const [confirmationEmail, setConfirmationEmail] = useState('')
    const [isFormValid, setFormValidity] = useState({
        shipping: false,
        billing: false,
        payment: false,
        email: false
    })
    const [isDisabled, setDisabled] = useState(true)

    useEffect(() => {
        if(!user) return
        getUserInfo()
    }, [user])


    useEffect(() => {
        if(isOrdered===true){
            if(!user){
                saveUserOrder(order.id, order)
            } else {
            saveUserOrder(user.uid, order)
            }
        }
    })

    useEffect(()=> {
        if (Object.values(isFormValid).every(value => value === true)){
            setDisabled(false)
        }
    }, [isFormValid])


    const getUserInfo = async () => {
        initializePaymentInfo()
        initializeAddressInfo()
        initializeEmail()
    }

    const checkFormValidation = () => {
        validateEmail()
        validateCardNumber()
        validateShippingAddressForm(shippingAddressInfo)
        validateBillingAddressForm(billingAddressInfo)
    }

    const allowSubmit = () => {
        Object.values(isFormValid).every(value => value === true)
    }

    // Email related

    const initializeEmail = () => {
        if (!user) {
            return
        } else {
            setEmail(user.email)
        }
    }

    const handleEmailChange = (e) => {
        const {name, value} = e.target
        if (name === 'email') {
            setEmail(value)
        } else {
            setConfirmationEmail(value)
        }
    }

    const validateEmail = () => {
        let emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        if (email.length < 8 || confirmationEmail.length < 8) {
            console.log('--too short--')
            return
        }
        if (!email || !confirmationEmail || email.toLowerCase() !== confirmationEmail.toLowerCase()) {
            console.log('--dont match--')
            return 
        } 
        if (emailRegex.test(email) && email === confirmationEmail) {
            setFormValidity((prevState) => ({...prevState, email: true}))
            console.log('--valid--')
        }
    }

    //Payment related

    const initializePaymentInfo = async () => {
        const primaryPayment = await getPrimaryPayment(user.uid)

        if (primaryPayment.length === 0){
            return
        } else {
            let newPayment = primaryPayment[0]
            setPaymentInfo(newPayment)
            setOrder((prevState) => ({...prevState, payment: newPayment}))
            setFormValidity((prevState) => ({...prevState, payment: true}))
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
        if (paymentInfo.number.length < 7) {
            return
        } if (paymentInfo.name.length < 5) {
            return
        } if (paymentInfo.zipcode.length <5) {
            return
        } if (paymentInfo.cvv.length <3 ) {
            return
        } if (paymentInfo.year.length < 2) {
            return
        }
        else { 
            let cardObject = regexChecks.find( card => paymentInfo.number.match(card.regex))
            setPaymentInfo((prevState) => ({...prevState, cardType: cardObject.name})) 
            setFormValidity((prevState) => ({...prevState, payment: true}))
        }
    }

    const handlePaymentChange = (e) => {
        const {name, value} = e.target
        setPaymentInfo((prevState) => ({...prevState, [name]:value}))
        validateCardNumber()
        checkFormValidation()
    }


    //Address related

    const initializeAddressInfo = async (e) => {
        const primaryAddress = await getPrimaryAddress(user.uid)
        if (primaryAddress.length === 0) {
            return
        } else {
            let newAddress = primaryAddress[0]
            setShippingAddressInfo(newAddress)
            setFormValidity((prevState) => ({...prevState, shipping: true}))
        }
    }

    const handleShippingAddressChange = (e) => {
        const {name, value} = e.target
        setShippingAddressInfo((prevState) => ({...prevState, [name]:value}))
        validateShippingAddressForm(shippingAddressInfo)
    }

    const useShippingAddress = (e) => {
        setBillingAddressInfo(shippingAddressInfo)
        setFormValidity((prevState) => ({...prevState, billing: true}))
    }

    const handleBillingAddressChange = (e) => {
        const {name, value} = e.target
        setBillingAddressInfo((prevState) => ({...prevState, [name]:value}))
        validateBillingAddressForm(billingAddressInfo)
    }

    const validateShippingAddressForm = (addressForm) => {
        let responseKeys = Object.keys(addressForm)
        responseKeys.filter(key => key !== 'apt' && key !== 'id' && key !== 'primary').forEach(key => {
            if(addressForm[key].length < 2) {
                return 
            } else {
                setFormValidity((prevState) => ({...prevState, shipping: true}))
            }
        })
    }

    const validateBillingAddressForm = (addressForm) => {
        let responseKeys = Object.keys(addressForm)
        responseKeys.filter(key => key !== 'apt' && key !== 'id' && key !== 'primary').forEach(key => {
            if(addressForm[key].length < 2) {
                return 
            } else {
                setFormValidity((prevState) => ({...prevState, billing: true}))
            }
        })
    }
    
    // Order submition related

    const onOrder = (e) => {
        e.preventDefault()
        setOrder((prevState) => ({
            ...prevState,
            payment: paymentInfo,
            email: email,
            shipToAddress: shippingAddressInfo,
            billToAddress: billingAddressInfo,
        }))
        setOrderStatus(true)
        props.clearCart()
        
    }

    if (isOrdered === false) {
        return (
            <>
                <div className='checkout-display'>
                    <form className='checkout-form'>
                        <h3>Order Total: ${total}</h3>
                        <div className="email-box">
                            <label>Email:</label>
                            <input type='email' defaultValue={email} name='email' required onChange={handleEmailChange} onBlur={checkFormValidation} />
                            <label>Confirm Email:</label>
                            <input type='email' name='confirmation-email' required onChange={handleEmailChange} onBlur={checkFormValidation}/>
                        </div>
                        <div className="checkout-address">
                            <h4 className='checkout-form-title'>Shipping Address</h4>
                            <CheckoutAddressForm address={shippingAddressInfo} handleAddressChange={handleShippingAddressChange} check={checkFormValidation}/>
                        </div>
                        <div className="billing-info">
                            <h4 className='checkout-form-title'>Billing Information</h4>
                            <BillingForm paymentInfo={paymentInfo} handlePaymentChange={handlePaymentChange} check={checkFormValidation}/>
                        </div>
                        <div className='checkout-address'>
                            <h4 className='checkout-form-title'>Billing Address</h4>
                            <CheckoutBillingAddressForm address={billingAddressInfo} useShipping={useShippingAddress} handleAddressChange={handleBillingAddressChange} check={checkFormValidation}/>
                        </div>
                        <div className='complete-checkout'>
                            <button className="checkout-button" onClick={onOrder} type='submit' disabled={isDisabled} >Checkout</button>
                        </div>
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