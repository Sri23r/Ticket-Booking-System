const cardObj={
    cardNumber:"",
    cardHolder:"",
    expMonth:"",
    expYear:"",
    cardCVV:""
}

document.querySelector('.card-number-input').oninput = () =>{
    document.querySelector('.card-number-box').innerText = document.querySelector('.card-number-input').value;
}

document.querySelector('.card-holder-input').oninput = () =>{
    document.querySelector('.card-holder-name').innerText = document.querySelector('.card-holder-input').value;
}

document.querySelector('.month-input').oninput = () =>{
    document.querySelector('.exp-month').innerText = document.querySelector('.month-input').value;
}

document.querySelector('.year-input').oninput = () =>{
    document.querySelector('.exp-year').innerText = document.querySelector('.year-input').value;
}

document.querySelector('.cvv-input').onmouseenter = () =>{
    document.querySelector('.front').style.transform = 'perspective(1000px) rotateY(-180deg)';
    document.querySelector('.back').style.transform = 'perspective(1000px) rotateY(0deg)';
}

document.querySelector('.cvv-input').onmouseleave = () =>{
    document.querySelector('.front').style.transform = 'perspective(1000px) rotateY(0deg)';
    document.querySelector('.back').style.transform = 'perspective(1000px) rotateY(180deg)';
}

document.querySelector('.cvv-input').oninput = () =>{
    document.querySelector('.cvv-box').innerText = document.querySelector('.cvv-input').value;
}

function handleCardNo(cardNoValue){
    if(/^\d+$/.test(cardNoValue) && (cardNoValue>1000000000000000) && (cardNoValue<9999999999999999)){
        cardObj.cardNumber=cardNoValue
    }else{
        alert("Enter the valid Account number...")
    }
}

function handleCardHolder(cardHolderValue){
    if(/^[a-zA-Z() ]+$/.test(cardHolderValue)){
        cardObj.cardHolder=cardHolderValue
    }else{
        alert("Enter the letters in Card holder field...")
    }
}

function handleExpMonth(expMonthValue){
    if(expMonthValue !== ''){
        cardObj.expMonth=expMonthValue
    }else{
        alert("Select expiry month...")
    }
}

function handleExpYear(expYearValue){
    if(expYearValue !== ''){
        cardObj.expYear=expYearValue
    }else{
        alert("Select expiry year...")
    }
}

function handleCardCVV(CVVValue){
    if(/^\d+$/.test(CVVValue) && (CVVValue>99) && (CVVValue<1000)){
        cardObj.cardCVV=CVVValue
    }else{
        alert("Enter the valid cvv....")
    }
}

async function validateAndSubmitInCard(){
    if(cardObj.cardNumber !== "" && cardObj.cardHolder !== "" && cardObj.expMonth !== "" && cardObj.expYear !== ""){
        localStorage.setItem('cardData',JSON.stringify(cardObj))
        try {
            const response = await fetch('/book', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(cardObj)
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            
            const data = await response.text();
            alert("Ticket Booked Successfully");
        } catch (err) {
            console.error("Error: ", err);
        }
        return true; // Prevent the   default form submission
        // return true ;
    }else{
        alert("Enter the mandatory fields");
        return false;
    }
}