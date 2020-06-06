import React from 'react'
import { useSelector } from 'react-redux'


const Confirmation = (props) => {

    const bookedSummary = useSelector(state => state.seats.rsrvInfo)
    console.log(bookedSummary, "array came")

    const renderSummary = bookedSummary.map(item => {
        return (
            <table class="table table-primary card-op">
                <tbody>
                    <tr>
                        <td>{item.name.name}</td>
                        <td>{item.name.age}</td>
                        <td>{item.seats}</td>
                    </tr>
                </tbody>
            </table>
        )
    })

    return (
        <div>
            <div><h3 className="card-op p-2 text-red text-center">Have a Safe and Happy Journey</h3></div>
            {renderSummary}
        </div>
    )


}
export default Confirmation;