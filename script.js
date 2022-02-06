// Get DOM ELEMENTS 
const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat');
const count = document.getElementById('count');
const total = document.getElementById('total');
const selectMovie = document.getElementById('movie');

//GET THE TICKET PRICE FROM THE selectMovie dropdown
let ticketPrice = +selectMovie.value;

//CALL UPDATE UI FUNCTION = GET DATA FROM LOCAL STORAGE AND UPDATE UI
updateUI();



//FUNCTION TO UPDATE COUNTS
function updateCount(){
    //CALCULATE HOW MANY SEATS ARE SELECTED
    const selectedSeats = document.querySelectorAll('.row .seat.selected');
    //CREATE AN ARRAY USING THE NODE LIST
    const seatIndex = [...selectedSeats].map(seat=>[...seats].indexOf(seat));
    //GET THE NUMBER OF SEATS FROM THE NODE LIST
    const selectedSeatsCount = selectedSeats.length;
    //UPDATE DOM WITH THE COUNT
    count.innerText = selectedSeatsCount;
    //UPDATE DOM WITH TOTAL PRICE
    total.innerText = selectedSeatsCount * ticketPrice;
    //SAVE DATA TO LOCAL STORAGE
    localStorage.setItem('selectedSeats',JSON.stringify(seatIndex));
}
//FUNCTION TO SAVE MOVIE DATA IN LOCAL STORAGE
function saveMovieData(movieIndex,moviePrice){
    localStorage.setItem('movieIndex',movieIndex);
    localStorage.setItem('moviePrice',moviePrice);
}
//FUNCTION UPDATE UI FUNCTION =GET DATA FROM LOCAL STORAGE AND UPDATE UI
function updateUI(){
    //GET THE SELECTED SEATS DATA FROM THE LOCAL STORAGE IN NUMBER FORM
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
    //CHECK IF THERE ARE ANY SELECTED SEATS
    if( (selectedSeats !== null) && (selectedSeats.length > 0)){
        //LOOP OVER ALL THE SEATS IN THE THEATER
        seats.forEach((seat,index) => {
            //IF THE INDEX OF SEAT IS CONTAINING INSIDE THE SELECTED SEAT ARRAY
            if (selectedSeats.indexOf(index)> -1){
                //ADD THE SELECTED CLASS TO THE SEAT
                seat.classList.add('selected');

            }
        })
    }
    //GET THE SELECTED MOVIE FROM LOACAL STORAGE
    const movieIndex = localStorage.getItem('movieIndex');
    //CHECK IF THERE IS A MOVIE INDEX
    if (movieIndex !== null){
        //USE THE MOVIEINDEX FROM THE LOCAL STORAGE TO UPDATE THE MOVIE FROM DROPDOWN
        selectMovie.selectedIndex = movieIndex;
    }
    let ticketPrice = JSON.parse(localStorage.getItem('moviePrice'));
    //UPDATE THE COUNT
    updateCount();
};

//EVENT LISTENERS
//1.LISTEN FOR LIST ON CONTAINER
container.addEventListener('click',e =>{
    //CHECK IF TARGET HAS A CLASS OF SEAT AND ALSO IS NOT OCCUPIED
    if(e.target.classList.contains('seat') && !(e.target.classList.contains('occupied'))){
        //ADD OR REMOVE THE SELECTED CLASS ON CLICK
        e.target.classList.toggle('selected');
        //UPDATE THE COUNT OF SELECTED SEATS
        updateCount();
    }
})

//2.LISTEN FOR CHANGE IN MOVIE SELECTOR
selectMovie.addEventListener('change', e=>{
    //UPDATE TICKET PRICE TO THE SELECTED MOVIE
    ticketPrice = +e.target.value;
    //UPDATE THE COUNTS IN THE DOM
    updateCount();
    //SAVE MOVIE DATA TO LOCAL STORAGE
    saveMovieData(e.target.selectedIndex,e.target.value);
})