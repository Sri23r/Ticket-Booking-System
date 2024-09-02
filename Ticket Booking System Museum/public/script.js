const detailObj={
    museum:"",
    names:"",
    email:"",
    phoneNo:"",
    gender:"",
    adults:"1",
    children:"0",
    total:"50"
    // cardNumber:"",
    // cardHolder:"",
    // expMonth:"",
    // expYear:"",
    // cardCVV:""
}

var adultFare=50;
var childrenFare=25;
var totalAdultFare=50;
var totalChildrenFare=0;
var total=0;
document.getElementById('totalFare').innerHTML = '₹50'

function handleMuseum(museumValue){
    if(museumValue !== ''){
        detailObj.museum=museumValue
        console.log(detailObj.museum)
    }else{
        alert("Select museum...")
    }
}

function handleNames(namesValue){
    if(/^[a-zA-Z() ]+$/.test(namesValue)){
        detailObj.names=namesValue
        console.log(detailObj.names);
    }else{
        alert("Enter the letters in name field...")
    }
}

function handleEmail(emailValue){
    if(String(emailValue).toLowerCase().match(/\S+@\S+\.\S+/)){
        detailObj.email=emailValue
        console.log(detailObj.email);
    }else{
        alert("Enter the valid email format...")
    }
}

function handlePhoneNo(phoneNoValue){
    if(/^\d+$/.test(phoneNoValue) && (phoneNoValue>9999)){
        detailObj.phoneNo=phoneNoValue
    }else{
        alert("Enter the phone no. with minimum of 5 digit...")
    }
}

function handleGenders(genderValue){
    detailObj.gender=genderValue.value
}

function handleAdults(adultsValue){
    if(adultsValue !== ''){
        detailObj.adults=adultsValue
        totalAdultFare=(adultsValue*adultFare)
        total=totalAdultFare+totalChildrenFare
        document.getElementById('totalFare').innerHTML='₹'+total
        detailObj.total=total
    }else{
        alert("Select Adults count...")
    }
}

function handleChildren(childrenValue){
        detailObj.children=childrenValue
        totalChildrenFare=(childrenValue*childrenFare)
        total=totalChildrenFare+totalAdultFare
        document.getElementById('totalFare').innerHTML='₹'+total
        detailObj.total=total
}
async function validateAndSubmit() {
    if (detailObj.names !== "" && detailObj.email !== "" && detailObj.phoneNo !== "" && detailObj.gender !== "") {
        localStorage.setItem('personData',JSON.stringify(detailObj));
        try {
            const response = await fetch('/book', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(detailObj)
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.text();
            alert("Ticket Booked Successfully");
        } catch (err) {
            console.error("Error: ", err);
        }
        return true; // Prevent the default form submission
    } else {
        alert("Enter the mandatory fields");
        return false; // Prevent the default form submission
    }
}

console.log(detailObj);
