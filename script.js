const request = new XMLHttpRequest();

var accSliderValue = document.getElementById("acc-id");
var prtSliderValue = document.getElementById("prt-id");
var prcSliderValue = document.getElementById("prc-id");


var accSliderOut = document.getElementById("acc-out-id");
var prtSliderOut = document.getElementById("prt-out-id");
var prcSliderOut = document.getElementById("prc-out-id");

const activityItems = ['education', 'recreational', 'social', 'diy', 'charity', 'cooking', 'relaxation', 'music', 'busywork'];

accSliderOut.innerHTML = accSliderValue.value;
prtSliderOut.innerHTML = prtSliderValue.value;
prcSliderOut.innerHTML = prcSliderValue.value;

accSliderValue.oninput = function() {
    accSliderOut.innerHTML = this.value;
}

prtSliderValue.oninput = function() {
    prtSliderOut.innerHTML = this.value;
}

prcSliderValue.oninput = function() {
    prcSliderOut.innerHTML = this.value;
}

function getRadioValue(){
    var radios = document.getElementsByName('button');
    var buttonName;
    for (var i = 0; i < radios.length; i++){
        if (radios[i].checked){
            var activityName = activityItems[i];
            return activityName;
        }
    } 
}

function buttonClicked(){
    var accessiblity = accSliderValue.value / 100;
    var participantCount = prtSliderValue.value;
    var maxPrice = prcSliderValue.value / 100;
    var activity = getRadioValue();

    request.open("GET", `http://www.boredapi.com/api/activity?type=${activity}&minprice=0.0&maxprice=${maxPrice}&minaccessiblity=0.0&maxaccesiblity=${accessiblity}&participants=${participantCount}`);
    request.send();

    request.onload = function(){
        if (request.status = 200){
            data = JSON.parse(request.responseText);
            if (data !== "undefined"){
                alert(data.activity);
            }
        }else{
            alert("No activity with these measures..");
        }
    }
}

function randomButtonClicked(){
    request.open("GET", "http://www.boredapi.com/api/activity/");
    request.send();

    request.onload = function(){
        if (request.status === 200){
            data = JSON.parse(request.responseText);
            alert(data.activity);
        }
    }
}

document.querySelector("#open-popup-random").addEventListener("click", function(){
    request.open("GET", "http://www.boredapi.com/api/activity/");
    request.send();

    request.onload = function(){
        if (request.status === 200){
            data = JSON.parse(request.responseText);
            var title = document.getElementById("popup-title");
            var text = document.getElementById("popup-text");
            title.innerHTML = data.activity;
            text.innerHTML = `Here is an activity with the type of ${data.type} can be done by ${data.participants} people. ENJOY!!!`;
        }
    }

    document.querySelector(".popup").classList.add("active");
});

document.querySelector("#open-popup").addEventListener("click",function(){
    var accessiblity = accSliderValue.value / 100;
    var participantCount = prtSliderValue.value;
    var maxPrice = prcSliderValue.value / 100;
    var activity = getRadioValue();

    request.open("GET", `http://www.boredapi.com/api/activity?type=${activity}&minprice=0.0&maxprice=${maxPrice}&minaccessiblity=0.0&maxaccesiblity=${accessiblity}&participants=${participantCount}`);
    request.send();

    request.onload = function(){
        if (request.status = 200){
            data = JSON.parse(request.responseText);
            var title = document.getElementById("popup-title");
            var text = document.getElementById("popup-text");
            title.innerHTML = data.activity;
            text.innerHTML = `Here is an activity with the type of ${data.type} can be done by ${data.participants} people. ENJOY!!!`;
        }else{
            var title = document.getElementById("popup-title");
            var text = document.getElementById("popup-text");
            title.innerHTML = "Error 404";
            text.innerHTML = "Unfortunately no activity with these measures.."
        }
    }
    document.querySelector(".popup").classList.add("active");
});
  
document.querySelector(".popup .popup-body .close-btn").addEventListener("click",function(){
    document.querySelector(".popup").classList.remove("active");
});