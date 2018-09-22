//init speechSynth API
const synth = window.speechSynthesis;

// DOM elements
const textForm = document.querySelector("form");
const textInput = document.querySelector("#text-input");
const voiceSelect = document.querySelector("#voice-select");
const rate = document.querySelector("#rate");
const rateValue = document.querySelector("#rate-value");
const pitch = document.querySelector("#pitch");
const pitchValue = document.querySelector("#pitch-value");

//Init Voice Array
let voices = [];

const getVoices = () => {
  voices = synth.getVoices();

  //loop through voices and create option for each
  voices.forEach(voice => {
    //create option element
    const option = document.createElement("option");
    //Fill the option with voice
    option.textContent = voice.name + "(" + voice.lang + ")";

    //set needed option attributes
    option.setAttribute("data-lang", voice.lang);
    option.setAttribute("data-name", voice.name);
    voiceSelect.appendChild(option);
  });
};

getVoices();
if (synth.onvoiceschanged !== undefined) {
  synth.onvoiceschanged = getVoices;
}

//speak
const speak = () => {
  //check
  if (synth.speaking) {
    console.error("Already speaking");
    return;
  }
  if (textInput.value !== "") {
    // Get speak text
    const speakText = new SpeechSynthesisUtterance(textInput.value);

    //speak end
    speakText.onend = e => {
      console.log("Done speaking");
    };

    //speak error
    speakText.onerror = e => {
      console.error("Something went wrong");
    };

    //selected voice
    const selectedVoice = voiceSelect.selectedOptions[0].getAttribute(
      "data-name"
    );

    //loop through voices
    voices.forEach(voice => {
      if (voice.name === selectedVoice) {
        speakText.voice = voice;
      }
    });

    //set pitch and rate
    speakText.rate = rate.value;
    speakText.pitch = pitch.value;

    //speak
    synth.speak(speakText);
  }
};
