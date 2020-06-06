const mongoose = require('mongoose');
const Bus = require('../model/Bus');
const moment = require('moment')
mongoose.connect('mongodb+srv://ticket_booking_db:Busticket@12@busticketbookingsystem-hh4kf.mongodb.net/test?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Now connected to mongoDb'))
    .catch(err => console.error('Something went wrong', err));


async function insertNewBus(busNumber, busType, totalSeats) {
    const bus = new Bus({
        busNumber,
        busType,
        totalSeats
    })
    const result = await bus.save()
    console.log(result)
}

// insertNewBus('UP44 A1079', 'VOLVO Multi Axle', 40)

async function insertNewService(busNumber, from, to, trvDate, dep, arr, fare ) {
    const bus = await Bus.findOne({ busNumber})
    bus.service = {
        from,
        to,
        trvDate,
        dep,
        arr,
        fare
    }
    const result = await bus.save(bus.service)
    console.log(result)
}

// insertNewService('UP44 A1079', 'BARABANKI', 'LUCKNOW', moment('22/6/2020', 'DD MM YYYY'), moment('5:20','HH:mm'), moment('8:30','HH:mm'), 680)
// insertNewService('UP44 G1313', 'DELHI', 'LUCKNOW', moment('05/6/2020', 'DD MM YYYY'), new Date(), new Date(), 680)
// insertNewService('UP44 G1313', 'CHENNAI', 'LUCKNOW', moment('09/6/2020', 'DD MM YYYY'), new Date(), new Date(), 680)
// insertNewService('UP44 G1313', 'KANPUR', 'LUCKNOW', moment('21/6/2020', 'DD MM YYYY'), new Date(), new Date(), 680)


async function searchServices(from, to, travelDate) {
    let result = await Bus.find({ 'service.from': from, 'service.to': to, 'service.trvDate': new Date() })
    console.log(result)
}

// searchServices('BENGALORE', 'LUCKNOW', new Date())