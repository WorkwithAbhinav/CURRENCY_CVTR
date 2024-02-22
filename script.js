const URL = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/";

const dropdown = document.querySelectorAll(".third select");
const btn = document.querySelector(".cvt-btn");

const img = document.querySelectorAll(".third img")

const from_curr = document.querySelector(".from select");
const to_curr = document.querySelector(".to select");

const msg = document.querySelector(".message");


for(let select of dropdown){
    for (currcode in countryList ){
        let newoption = document.createElement("option")
        newoption.innerText = currcode;
        newoption.value = currcode ;
        if(select.name === "From" && currcode === "USD"){
            newoption.selected = "selected";
        }

        if(select.name === "to" && currcode === "INR"){
            newoption.selected = "selected";
        }
        select.append(newoption);
    }

    select.addEventListener("change" , (evt) =>{
        changeflag(evt.target);
    })
}

const changeflag = (element) => {
    let currcode = element.value;
    let country = countryList[currcode];
    let newimg = `https://flagsapi.com/${country}/flat/64.png`;
    let img = element.parentElement.querySelector("img"); 

    img.src = newimg; 
};

btn.addEventListener("click", async (event) => {
    event.preventDefault();
    let ipt = document.querySelector(".second input");
    let amount = ipt.value ;
    if(amount < 1){
        amount = '1';
    }
    console.log(amount);
    console.log(from_curr.value , to_curr.value);


    let URL_main = `${URL}/${from_curr.value.toLowerCase()}/${to_curr.value.toLowerCase()}.json`;
    let response = await fetch(URL_main);
    let data = await response.json();
    let rate = data[to_curr.value.toLowerCase()];
    console.log(rate);

    let final =  Math.round(rate * amount); ;



    msg.innerText = `${amount} ${from_curr.value} = ${final} ${to_curr.value}`
});