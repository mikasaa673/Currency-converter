const BaseURL="https://v6.exchangerate-api.com/v6/0c7bb367fc7b4b39e947dd4f/latest/USD"

const dropdowns=document.querySelectorAll(".dropdown select")

const btn=document.querySelector("button")

const msg=document.querySelector('.msg');


for(let select of dropdowns){
    for(let currcode in countryList){
        let newoption=document.createElement("option");
         newoption.innerText=currcode;
         newoption.value=currcode;
         if(select.name==="from" && currcode==="USD"){
            newoption.selected="selected"
         }
         else if(select.name==="to" && currcode==="INR"){
            newoption.selected="selected"
         }
         select.append(newoption);
    }
    select.addEventListener("change",(evt)=>{
        updateFlag(evt.target);
    }
    )
}


const updateFlag=(element)=>{
    let currcode=element.value;
    let countrycode=countryList[currcode]
    console.log(countrycode)
    let newsrc=`https://flagsapi.com/${countrycode}/flat/64.png`
    let img=element.parentElement.querySelector("img");    
    img.src=newsrc;
}

btn.addEventListener("click", (evt) => {
    evt.preventDefault();
    
    let amount = document.querySelector(".amount input");
    let amtval = amount.value;
    if (amtval === "" || amtval <= 0) {
        amtval = 1;
        amount.value = "1";
    }

    const fromCurr = document.querySelector(".from select").value;
    const toCurr = document.querySelector(".to select").value;

    const apiUrl = `https://v6.exchangerate-api.com/v6/0c7bb367fc7b4b39e947dd4f/latest/${fromCurr}`;

    fetch(apiUrl)
        .then(res => res.json())
        .then(data => {
            const rate = data.conversion_rates[toCurr];
            const convertedAmount = (amtval * rate).toFixed(2);
            const exchangeRateText = `${amtval} ${fromCurr} = ${convertedAmount} ${toCurr}`;
            msg.innerText = exchangeRateText;
        })
        .catch(() => {
           msg.innerText = "Something went wrong!";
        });
});