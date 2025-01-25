// https://api.freecurrencyapi.com/v1/latest?apikey=fca_live_pW8SUIuTEwISIQP0XOVUQxH0Yr12EQvtNLUq5HUw&currencies=EUR&base_currency=INR

const BASE_URL =
    "https://api.freecurrencyapi.com/v1/latest?apikey=fca_live_pW8SUIuTEwISIQP0XOVUQxH0Yr12EQvtNLUq5HUw";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");


for (let select of dropdowns) {
    for (currCode in countryList) {

        //Creating and Showing Multiple Options --
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;

        if (select.name === "from" && currCode === "USD") {
            newOption.selected = "selected"; //for default choice
        }
        else if (select.name === "to" && currCode === "INR") {
            newOption.selected = "selected"; //for default choice
        }
        select.append(newOption);
    }

    select.addEventListener("change", (evt) => {
        updateFlag(evt.target);
    });
}

//updating flages
const updateFlag = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
};


const updateExchangeRate = async () => {
    let amount = document.querySelector(".amount input");
    let amtVal = amount.value;

    if (amtVal === "" || amtVal < 1) {
        amtVal = 1;
        amount.value = "1";
    }

    const URL = `${BASE_URL}&currencies=${toCurr.toUpperCase()}&base_currency=${fromCurr.toUpperCase()}`;

    let response = await fetch(URL);
    let data = await response.json();

    // not getting rate from api fix it later
    let rate = data.data.rates[toCurr.value.toUpperCase()];

    let finalAmount = amtVal * rate;
    msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
};



btn.addEventListener("click", (evt) => {
    evt.preventDefault();
    updateExchangeRate();
});

// for having default conversion of USD to INR
window.addEventListener("load", () => {
    updateExchangeRate();
});