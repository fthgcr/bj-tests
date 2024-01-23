// Klavyeye Tıklama
document.addEventListener("keyup", (e) => {


    if (e.code == "F5") {
        return;
    }
    //showToast("YAGGAMI YE MUTY", "danger");

    if (document.activeElement === firstInput || document.activeElement === secondInput) {
        if (document.activeElement === firstInput) {
            firstCard = firstInput.value;
            if (isValidInput(firstCard)) {
                if ((secondCard != null || secondCard != undefined) && secondCard !== "") {
                    let firstNumber = isNaN(firstCard) ? 10 : firstCard;
                    let secondNumber = isNaN(secondCard) ? 10 : secondCard;
                    let maxNumber = 21 - (+firstNumber + +secondNumber);

                    if (maxNumber > 9) {
                        batmaOlasiligi = "%0";
                        document.getElementById("percentageOfBatmaOlasiligi").innerHTML = "%0";
                        setTimeout(batmaOlasiligiReset, 5000);
                        return;
                    }

                    let batmamaOlasiligi = 0;
                    for (let i = 0; i <= maxNumber - 1; i++) {
                        batmamaOlasiligi = batmamaOlasiligi + deste[i];
                    }

                    if (kartSayisi == null || kartSayisi == 0) { return; }

                    let batmaSayisi = (+kartSayisi) - (+batmamaOlasiligi);

                    // Calculate
                    batmaSayisi = ((100 * batmaSayisi) / kartSayisi).toFixed(2);;
                    document.getElementById("percentageOfBatmaOlasiligi").innerHTML = "%" + batmaSayisi;
                    setTimeout(batmaOlasiligiReset, 5000);
                }
            } else {
                if (firstCard == 'A' || firstCard === 'A'){
                    showWarningToast("Ace is Never Loses");
                } else {
                    showWarningToast("Please enter a valid card info.");
                }
                
                document.getElementById('name').value = '';
            }
        } else {
            secondCard = secondInput.value;
            if (isValidInput(secondCard)) {
                if ((firstCard != null || firstCard != undefined) && firstCard !== "") {
                    let firstNumber = isNaN(firstCard) ? 10 : firstCard;
                    let secondNumber = isNaN(secondCard) ? 10 : secondCard;
                    let maxNumber = 21 - (+firstNumber + +secondNumber);

                    if (maxNumber > 9) {
                        batmaOlasiligi = "%0";
                        document.getElementById("percentageOfBatmaOlasiligi").innerHTML = "%0";
                        setTimeout(batmaOlasiligiReset, 5000);
                        return;
                    }

                    let batmamaOlasiligi = 0;
                    for (let i = 0; i <= maxNumber - 1; i++) {
                        batmamaOlasiligi = batmamaOlasiligi + deste[i];
                    }

                    if (kartSayisi == null || kartSayisi == 0) { return; }

                    let batmaSayisi = (+kartSayisi) - (+batmamaOlasiligi);

                    // Calculate
                    batmaSayisi = ((100 * batmaSayisi) / kartSayisi).toFixed(2);;
                    document.getElementById("percentageOfBatmaOlasiligi").innerHTML = "%" + batmaSayisi;
                    setTimeout(batmaOlasiligiReset, 5000);
                }
            } else {
                showWarningToast("Ace is Never Loses");
                document.getElementById('email').value = '';
            }
        }

        return;
    }

    let keyMap = e.code.slice(-1);
    let input = -1;
    if (keyMap == 0 || keyMap == '0') {
        input = 10;
    } else if (keyMap == 'K') {
        input = 13;
    } else if (keyMap == 'Q') {
        input = 12;
    } else if (keyMap == 'J') {
        input = 11;
    } else if (keyMap == 'A') {
        input = 14;
    } else {
        input = keyMap;
    }

    if (input > -1 && input < 15 && input != 1) {
        cardClick(input);
    }
});

let desteSayisi = 8;
let kartSayisi;
let masaninDegeri = 0;
let cekilenKart = 0;

var deste = new Array(13);
const desteId = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];



var desteSayisiInput = document.getElementById("desteSayisiInput");
window.onload = function () {
    desteSayisiInput.addEventListener("input", function () {
        desteSayisi = desteSayisiInput.value;
        kartSayisi = 52 * desteSayisi;
        document.getElementById("kalanKartSayisi").innerHTML = "Remaining cards  : " + kartSayisi;
        reloadCards();
    });
}


resetDeste();

function cardClick(cardNumber) {

    if (deste[cardNumber - 2] < 1) { return; }

    if (cardNumber < 7) {
        masaninDegeri++;
    } else if (cardNumber > 9) {
        masaninDegeri--;
    }

    kartSayisi--;
    cekilenKart++;

    document.getElementById("masaDegeri").innerHTML = masaninDegeri;
    document.getElementById("kalanKartSayisi").innerHTML = "Remaining cards  : " + kartSayisi;
    document.getElementById("harcananKartSayisi").innerHTML = "Cards used : " + cekilenKart;


    let cardIndex = cardNumber - 2;

    deste[cardNumber - 2] = deste[cardNumber - 2] - 1;
    let ihtimal = ((deste[cardNumber - 2] * 100) / (kartSayisi)).toFixed(2);
    document.getElementById(cardNumber).innerHTML = "" + deste[cardNumber - 2] + " - " + "%" + ihtimal;
    changeIcon(cardNumber, ihtimal);
    for (let i = 0; i < deste.length; i++) {
        if (i !== cardIndex) {
            let pos = ((deste[i] * 100) / kartSayisi).toFixed(2);
            document.getElementById(desteId[i]).innerHTML = "" + deste[i] + " - " + "%" + pos;
            changeIcon(desteId[i], pos);
        }
    }

    onOlasiligi();
}

function reloadCards() {
    if (!kartSayisi) {
        kartSayisi = 52 * 8;
        document.getElementById("masaDegeri").innerHTML = "0";
        document.getElementById("kalanKartSayisi").innerHTML = "Remaining cards  : " + kartSayisi;
        document.getElementById("harcananKartSayisi").innerHTML = "Cards used : 0";
    }


    if (desteSayisi && desteSayisi > 0) {
        for (let i = 0; i < deste.length; i++) {
            deste[i] = 4 * desteSayisi;
        }
        for (let i = 0; i < desteId.length; i++) {
            let ihtimal = ((deste[i] * 100) / (kartSayisi)).toFixed(2);
            document.getElementById(desteId[i]).innerHTML = "" + deste[i] + " - " + "%" + ihtimal;
            changeIcon(desteId[i], ihtimal);
        }
        onOlasiligi();
    }

}

// Kart Çerçeve
function changeIcon(cardNumber, pos) {
    const element = document.getElementById('image' + cardNumber);
    element.className = '';
    if (pos > 10) {
        element.classList.add('lightsaber-blue');
        element.style.borderColor = 'turquoise';
    } else if (pos < 5) {
        element.style.borderColor = 'black';
    } else if (pos > 8) {
        element.classList.add('lightsaber');
        element.style.borderColor = 'lightgreen';
    } else if (pos < 7) {
        element.classList.add('lightsaber-red');
        element.style.borderColor = 'lightcoral';
    } else {
        element.style.borderColor = 'lightgrey';
    }
}



function resetDeste() {
    desteSayisi = 8;
    masaninDegeri = 0;
    cekilenKart = 0;
    kartSayisi = null;
    reloadCards();
}




// const clickableDiv = document.getElementById("clickable");
// const hiddenDiv = document.getElementById("hidden");

// let isOpen = false;

// clickableDiv.addEventListener("click", () => {
//   if (isOpen) {
//     // If #hidden div is open, close it
//     hiddenDiv.style.height = 0;
//     isOpen = false;
//   } else {
//     // If #hidden div is closed, open it
//     hiddenDiv.style.height = hiddenDiv.scrollHeight + "px";
//     isOpen = true;
//   }
// });



function showToast() {
    var toast = document.getElementById("toast");
    toast.style.display = "block";
    setTimeout(function () {
        toast.style.display = "none";
    }, 3000);
}

// CARD 3 - Yerden 10 gelme olasılığını hesaplar
function onOlasiligi() {
    let onlar = deste[8] + deste[9] + deste[10] + deste[11];
    let onGelmeOlasiligi = ((onlar * 100) / kartSayisi).toFixed(2);
    document.getElementById("onOlasilik").innerHTML = "%" + onGelmeOlasiligi;
}

// CARD 4 - Kullanının Batma Olaslığı
var batmaOlasiligi;
function batmaOlasiligi() {

    let firstNumber = isNaN(firstCard) ? 10 : firstCard;
    let secondNumber = isNaN(secondCard) ? 10 : secondCard;
    let maxNumber = 21 - (+firstNumber + +secondNumber);

    if (maxNumber > 9) {
        batmaOlasiligi = "%0";
        document.getElementById("percentageOfBatmaOlasiligi").innerHTML = "%0";
        addAnimationToBatma();
        setTimeout(batmaOlasiligiReset, 5000);
        return;
    }

    let batmamaOlasiligi = 0;
    for (let i = 0; i <= maxNumber - 1; i++) {
        batmamaOlasiligi = batmamaOlasiligi + deste[i];
    }

    if (kartSayisi == null || kartSayisi == 0) { return; }

    let batmaSayisi = (+kartSayisi) - (+batmamaOlasiligi);

    // Calculate
    batmaSayisi = ((100 * batmaSayisi) / kartSayisi).toFixed(2);;
    document.getElementById("percentageOfBatmaOlasiligi").innerHTML = "%" + batmaSayisi;
    addAnimationToBatma();
    setTimeout(batmaOlasiligiReset, 5000);

}

// CARD 4.1 - 10 GELME OLASILIĞI INPUT
const firstInput = document.getElementById('name');
const secondInput = document.getElementById('email');
var firstCard;
var secondCard;

/*
firstInput.addEventListener("input", function() {
    firstCard = firstInput.value;
    if(isValidInput(firstCard)) {
        if ((secondCard != null || secondCard != undefined)  && secondCard !== ""){
            batmaOlasiligi();
        }
    } else {
        document.getElementById('name').value = '';
    }
});

secondInput.addEventListener("input", function() {
    secondCard = secondInput.value;
    if(isValidInput(secondCard)) {
        if ((firstCard != null || firstCard != undefined ) && firstCard !== ""){
            batmaOlasiligi();
        }
    } else {
        document.getElementById('email').value = '';
    }
    
});

*/

function isValidInput(input) {
    if (input == "" || input == '') { return false; }
    if ((typeof input === 'string' || input instanceof String) && isNaN(input)) {
        if (input === 'K' || input === 'Q' || input === 'J') {
            return true;
        } else {
            return false;
        }
    } else {
        if (((input > 1 && input < 10) || input == 0) && !isNaN(input)) {
            return true;
        } else {
            return false;
        }
    }

}

function batmaOlasiligiReset() {
    document.getElementById("percentageOfBatmaOlasiligi").innerHTML = "";

    firstCard = "";
    secondCard = "";
    document.getElementById('name').value = '';
    document.getElementById('email').value = '';
}




// Toast function **********
function toast({ title = "", message = "", type = "info", duration = 3000 }) {
    const main = document.getElementById("toast")

    if (main) {
        const toast = document.createElement("div")
        // Auto remove toast
        const autoRemoveToast = setTimeout(function () {
            main.removeChild(toast)
        }, duration + 1000)

        // Remove toast when clicked
        toast.onclick = function (e) {
            if (e.target.closest(".toast__close")) {
                main.removeChild(toast)
                clearTimeout(autoRemoveToast)
            }
        }

        const icons = {
            success: "fa-solid fa-circle-check",
            info: "fa-solid fa-circle-info",
            warning: "fa-solid fa-triangle-exclamation",
            error: "fa-solid fa-xmark"
        }
        const icon = icons[type]

        const delay = durationInSecond = (duration / 1000).toFixed(2)

        toast.classList.add('toast', `toast--${type}`)
        toast.style.animation = `slideInLeft ease 0.3s, fadeOut ease .5s ${delay}s forwards`;

        toast.innerHTML = `
        <div class="toast__icon">
        <i class="fas fa-exclamation-triangle"></i>
        </div>
  
        <div class="toast__body">
          <h3 class="toast__title">${title}</h3>
          <p class="toast__msg">${message}</p>
        </div>
  
        <div class="toast__close">
          <i class="fa-solid fa-xmark"></i>
        </div>
        <div class="progress-track"></div>
        <div class="progress-running progress--${type}"></div>
      `

        const progressRunning = toast.querySelector(".progress-running")
        progressRunning.style.animation = `progress linear ${durationInSecond}s forwards`;

        main.appendChild(toast)
    }
}

function showSuccessToast() {
    toast({
        title: "Success!",
        message: "Congratulation! You just clicked the success button",
        type: "success",
        duration: 3000
    })
}

function showInfoToast() {
    toast({
        title: "Information!",
        message: "Hey, this is message of information button!",
        type: "info",
        duration: 3000
    })
}

function showWarningToast(message) {
    toast({
        title: "Warning!",
        message: message,
        type: "warning",
        duration: 3000
    })
}

function showErrorToast(message) {
    toast({
        title: "Highly Recommended",
        message: message,
        type: "error",
        duration: 8000
    })
}

showErrorToast("Never Split 10's");
showErrorToast("Always Split 8's & Aces");


//POPUP CONTENT

let popup = document.querySelector(".popup"),
    button = document.querySelector(".button");



function openPop(){
  popup.style.display = "Block";
}

window.addEventListener("click", closePop);

function closePop(e){
  if(e.target == popup) {
  popup.style.display = "none";
}
}

//openPop();