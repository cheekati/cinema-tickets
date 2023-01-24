const container = document.querySelector('.container')
const seats = document.querySelectorAll('.row .seat:not(.occupied')
const count = document.getElementById('count')
const total = document.getElementById('total')
const ticketSelect = document.getElementById('ticket')
const childadulticket = document.getElementById('ticket1')
const adult = JSON.parse(localStorage.getItem("totalNumberOfAdults")) ?? 0;

const children = JSON.parse(localStorage.getItem("totalNumberOfChildren")) ?? 0;
const qty = JSON.parse(localStorage.getItem("Qty")) ?? 0;
const Tickettotal = (children * 10) + (adult*20);
localStorage.setItem("total", Tickettotal);

// let ticketPrice = +ticketSelect.value;
let ticketPrice = 0;


// Save selected ticket index and price
function setticketData(ticketIndex, ticketPrice) {
    localStorage.setItem('selectedticketIndex', ticketIndex);
    localStorage.setItem('selectedticketPrice', ticketPrice);
}
function purchaseClicked() {
    alert('Thank you for your purchase')
    var cartItems = document.getElementsByClassName('ticket')[0]
    while (cartItems.hasChildNodes()) {
        cartItems.removeChild(cartItems.firstChild)
    }
}

function PurchaseTickets(child, adult) {
    const adultRequest = TicketTypeRequest('ADULT', adult);
    const childRequest = TicketTypeRequest('CHILD', child);
    TicketService.PurchaseTickets(1, [childRequest, adultRequest]);
}
// update total and count
function updateSelectedCount() {
    const selectedSeats = document.querySelectorAll('.row .seat.selected');
    const seatsIndex = [...selectedSeats].map((seat) => [...seats].indexOf(seat));
    // get data from localstorage and populate ui
    localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));
    //copy selected seats into arr
    // map through array
    //return new array of indexes
    const selectedSeatsCount = selectedSeats.length;
    const remainingCount = qty - selectedSeatsCount;
    count.innerText = selectedSeatsCount;
    total.innerText = selectedSeatsCount * ticketPrice;
    document.getElementById('remainingCount').innerHTML = `Please Select ${remainingCount} more seats before making the payment.`;

}

let childadulticketPrice = 0;
function populateUI() {
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
    if (selectedSeats !== null && selectedSeats.length > 0) {
        seats.forEach((seat, index) => {
            if (selectedSeats.indexOf(index) > -1) {
                seat.classList.add('selected');
               
            }
        });
       
    }
    const selectedticketIndex = localStorage.getItem('selectedticketIndex');
    if (selectedticketIndex !== null) {
        ticketSelect.selectedIndex = selectedticketIndex;
    }
}
function getRemainingSeets(){
    const selectedSeats = document.querySelectorAll('.row .seat.selected');
    const seatsIndex = [...selectedSeats].map((seat) => [...seats].indexOf(seat));
    const selectedSeatsCount = selectedSeats.length;

    const remainingCount = qty - selectedSeatsCount;
    return remainingCount;
}
function payment() {
    const remainingCount = getRemainingSeets();
    if (remainingCount === 0) {
      window.location.href = 'Payment.html';
    } else {
      alert(`You need to book ${remainingCount} seets more`);
    }
  }
function reset() {
    window.location.reload()
}
container.addEventListener('click', (e) => {
        const remainingCount = getRemainingSeets();
        if(remainingCount > 0){
        var isToggled = e.target.classList.toggle('selected');      
        updateSelectedCount();
        }else {

            window.alert(`You have already selected ${qty} seats`)
        }
    
});

updateSelectedCount();
