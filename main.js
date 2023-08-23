const amountInput = document.querySelector("#amount");
const firstOption = document.querySelector("#firstCurrencyOption");
const secondOption = document.querySelector("#secondCurrencyOption");
const resultInput = document.querySelector("#result");

const currency = new Currency();

runEventListeners();

async function runEventListeners() {
    const currencies = await currency.getCurrencies();
    generateOptions(firstOption, currencies, "TRY"); 
    generateOptions(secondOption, currencies, "USD"); 
  
    amountInput.addEventListener("input", exchange);
    firstOption.addEventListener("change", exchange);
    secondOption.addEventListener("change", exchange);
    swapButton.addEventListener("click", swapCurrencies);
  }
  

function exchange() {
  const amount = Number(amountInput.value.trim());
  const firstOptionValue = firstOption.options[firstOption.selectedIndex].textContent;
  const secondOptionValue = secondOption.options[secondOption.selectedIndex].textContent;

  currency.exchange(amount, firstOptionValue, secondOptionValue)
    .then((result) => {
      resultInput.value = result !== null ? result.toFixed(3) : "Invalid currency selection";
    });
}

function generateOptions(optionsElement, currencies, defaultCurrency) {
    const optionsHTML = currencies.map((currency) => {
      return `<option value="${currency}" ${currency === defaultCurrency ? "selected" : ""}>${currency}</option>`;
    });
    optionsElement.innerHTML = optionsHTML.join("");
  }
  

const swapButton = document.querySelector("#swapButton");


function swapCurrencies() {
  const firstSelectedIndex = firstOption.selectedIndex;
  const secondSelectedIndex = secondOption.selectedIndex;

  [firstOption.options[firstSelectedIndex], secondOption.options[secondSelectedIndex]] = [
    secondOption.options[secondSelectedIndex],
    firstOption.options[firstSelectedIndex],
  ];

  firstOption.dispatchEvent(new Event("change"));
}

const backgroundVideo = document.getElementById("background-video");
const container = document.getElementById("container");
let isVideoPlaying = true;

container.addEventListener("click", () => {
  if (isVideoPlaying) {
    backgroundVideo.pause();
  } else {
    backgroundVideo.play();
  }
  isVideoPlaying = !isVideoPlaying;
});

backgroundVideo.addEventListener("ended", () => {
  backgroundVideo.currentTime = 0;
  backgroundVideo.play();
});


const video = document.getElementById("background-video");
const muteButton = document.getElementById("muteButton");

let isMuted = false;

function toggleVideo() {
    if (video.paused) {
      video.play();
    } else {
      video.pause();
    }
  }
  

function toggleMute() {
    if (video.muted) {
      video.muted = false; 
      muteButton.innerText = "Sesi Durdur";
    } else {
      video.muted = true; // Ses kapalı
      muteButton.innerText = "Sesi Aç";
    }
  }



// Hover
const mainTitle = document.getElementById("mainTitle");



mainTitle.addEventListener("mouseover", function() {
    mainTitle.textContent = "Döviz Kurusu Çevirici";
    mainTitle.style.width = "300px";
});

mainTitle.addEventListener("mouseout", function() {
    mainTitle.textContent = "Döviz Kuru Çevirici";
});


// VIDEOS

const main = document.getElementById("main");
const replayButton = document.getElementById("replayButton");

const videoContainer = document.getElementById("video-container");

let isFullScreen = false;

backgroundVideo.addEventListener("play", () => {
    // 68 saniye sonra videoyu tam ekran yap
    setTimeout(() => {
        videoContainer.requestFullscreen();
        isFullScreen = true;
        main.style.display = "none";
        replayButton.style.display = "block";
        muteButton.style.display = "block";
        
    }, 68000);
});

// video durdur

let stopButton = document.getElementById("stopButton");

stopButton.addEventListener("click", () => {
    backgroundVideo.pause();
    backgroundVideo.currentTime = 68000;
    main.style.display = "block";
    replayButton.style.display = "none";
    muteButton.style.display = "none";
});


document.addEventListener("fullscreenchange", () => {
    if (isFullScreen) {
        // Kullanıcının tam ekrandan çıkmasını engelle
        if (!document.fullscreenElement) {
            videoContainer.requestFullscreen();
        }
    }
});

// Videonun tüm ekranı kaplamasını engelle
videoContainer.addEventListener("click", () => {
    if (isFullScreen) {
        videoContainer.requestFullscreen();
    }
});

;






