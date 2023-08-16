// @ts-ignore
import Speech from "speak-tts";

function main(): void {
  // TTS form
  const ttsForm = document.getElementById(
    "ttsForm"
  ) as HTMLFormElement;
  if (!ttsForm) throw new Error("no forms");

  // attach event listener
  ttsForm.addEventListener("submit", tts, true);
}

// Text-to-speech function
const tts = function (event: Event) {
  event.preventDefault();

  const inputTextElement = document.getElementById(
    "inputText"
  ) as HTMLInputElement;
  if (!inputTextElement) return;

  const text = inputTextElement.value;
  const lang = "en";

  const speech = initSpeech({ lang });

  speech
    .speak({
      text
    })
    .then(() => {
      console.log("Success !");
    })
    .catch((err: string) => {
      console.error("An error occurred :", err);
    });
};

const initSpeech = function ({ lang }: { lang: string }): Speech {
  const speech = new Speech();
  if (speech.hasBrowserSupport()) {
    // returns a boolean
    console.log("speech synthesis supported");
  } else {
    throw new Error("speech synthesis not supported in your browser");
  }

  speech
    .init({ lang })
    .then((data: any) => {
      // The "data" object contains the list of available voices and the voice synthesis params
      console.log("Speech is ready, voices are available", data);
    })
    .catch((err: string) => {
      console.error("An error occured while initializing: ", err);
    });

  return speech;
};

main();
