
const TicketService  = require('./TicketService.js')
const TicketTypeRequest  = require('./TicketTypeRequest.js')


function payment(){

    var cvv = document.getElementById("cvv").value;
    if(!(cvv== "")){
    alert("Payment succesuful");
    }
    else{
        alert("Some thing you missed");
    }
    const adult = JSON.parse(localStorage.getItem("totalNumberOfAdults")) ?? 0;

const children = JSON.parse(localStorage.getItem("totalNumberOfChildren")) ?? 0;
const total = adult + children;
    const childTickets = new TicketTypeRequest('CHILD',children);
    const adultTickets = new TicketTypeRequest('ADULT',children);
    const requests = [childTickets,adultTickets];
    var service = new TicketService();
    service.purchaseTickets(1,requests);
    window.alert("Payment Successful");
    new SeatReservationService().reserveSeat(1,total);
    window.alert(`${total} seats have been resereved`)
    
}