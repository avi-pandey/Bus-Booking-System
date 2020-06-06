import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'


const Payment = (props) => {

    const [tranId, setTranId] = useState('')
    const [cardDet, setCardDet] = useState({
        cardType: '',
        cardName: '',
        cardNumber: '',
        cvv: '',
        expiryDate: ''

    })

    useEffect(() => {
         let transactionId = Math.floor(100000 + Math.random() * 900000)
         setTranId(transactionId)

    }, [])
    const totalFare = useSelector(state => state.seats.total)
    const [disab, setDisab] = useState(true)

    console.log(totalFare)

    console.log(cardDet, "cardssssss")

    const handleChangeEvent = (e, field) => {
        let fieldValue = e.target.value
        setCardDet({ ...cardDet, [field]: fieldValue })
        if (cardDet.cardType.length > 0 && cardDet.cardNumber.length > 0
            && cardDet.cardName.length > 0 && cardDet.cvv.length > 0 && cardDet.expiryDate.length > 0) {
            setDisab(false)
        } else {
            setDisab(true)
        }
    }


    const handleSubmitEvent = e => {
        e.preventDefault()
        props.tab(4)

    }

    return (
        <div className="row ">
            <div className="col-6 offset-md-3">
                <div className="card row col-9 offset-md-3 card-op mt-3">
                    <div className="card-body">
                        <table>
                            <tbody>
                                <tr>
                                    <td className="text-success font-weight-bold">
                                        Amount: <span class="WebRupee">&#x20B9;</span> {totalFare}
                                    </td>
                                    <td className="text-success font-weight-bold pl-5" >
                                        Transaction Id: {tranId}</td>
                                </tr>
                            </tbody>
                        </table>
                        <form >
                            <div className="form-group">
                                <label className="text-dark font-weight-bolder mr-2">Card Type</label>
                                <input type="radio" className="card-op mr-2" value="visa" name="cardType"
                                    onChange={e => handleChangeEvent(e, 'cardType')} /> visa
                                <input type="radio" className="card-op" value="MasterCard" name="cardType"
                                    onChange={e => handleChangeEvent(e, 'cardType')} /> MasterCard
                            </div>
                            <div className="form-group">
                                <label className="text-dark font-weight-bolder">Card Number:</label>
                                <input className="form-control card-op"
                                    onChange={e => handleChangeEvent(e, 'cardNumber')} />
                            </div>
                            <div className="form-group">
                                <label className="text-dark font-weight-bolder">CVV</label>
                                <input type="password" className="form-control card-op"
                                    onChange={e => handleChangeEvent(e, 'cardName')} />
                            </div>
                            <div className="form-group">
                                <label className="text-dark font-weight-bolder">Name on Card</label>
                                <input className="form-control card-op"
                                    onChange={e => handleChangeEvent(e, 'cvv')} />
                            </div>
                            <div className="form-group">
                                <label className="text-dark font-weight-bolder">Expiry Date</label>
                                <input className="form-control card-op"
                                    placeholder="MM/YY"
                                    onChange={e => handleChangeEvent(e, 'expiryDate')} />
                            </div>
                            <div className="text-center">
                                <button onClick={e => handleSubmitEvent(e)}
                                    disabled={disab}
                                    className="btn btn-dark mr-2">Pay Now</button>
                                <button className="btn btn-danger">Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Payment;