/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/speak-tts/lib/speak-tts.js":
/*!*************************************************!*\
  !*** ./node_modules/speak-tts/lib/speak-tts.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;

var _utils = __webpack_require__(/*! ./utils */ "./node_modules/speak-tts/lib/utils.js");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var SpeakTTS =
/*#__PURE__*/
function () {
  function SpeakTTS() {
    _classCallCheck(this, SpeakTTS);

    this.browserSupport = 'speechSynthesis' in window && 'SpeechSynthesisUtterance' in window;
    this.synthesisVoice = null;
  }

  _createClass(SpeakTTS, [{
    key: "init",
    value: function init() {
      var _this = this;

      var conf = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      return new Promise(function (resolve, reject) {
        if (!_this.browserSupport) {
          reject('Your browser does not support Speech Synthesis');
        }

        var listeners = (0, _utils.isNil)(conf.listeners) ? {} : conf.listeners;
        var splitSentences = (0, _utils.isNil)(conf.splitSentences) ? true : conf.splitSentences;
        var lang = (0, _utils.isNil)(conf.lang) ? undefined : conf.lang;
        var volume = (0, _utils.isNil)(conf.volume) ? 1 : conf.volume;
        var rate = (0, _utils.isNil)(conf.rate) ? 1 : conf.rate;
        var pitch = (0, _utils.isNil)(conf.pitch) ? 1 : conf.pitch;
        var voice = (0, _utils.isNil)(conf.voice) ? undefined : conf.voice; // Attach event listeners

        Object.keys(listeners).forEach(function (listener) {
          var fn = listeners[listener];

          var newListener = function newListener(data) {
            fn && fn(data);
          };

          if (listener !== 'onvoiceschanged') {
            speechSynthesis[listener] = newListener;
          }
        });

        _this._loadVoices().then(function (voices) {
          // Handle callback onvoiceschanged by hand
          listeners['onvoiceschanged'] && listeners['onvoiceschanged'](voices); // Initialize values if necessary

          !(0, _utils.isNil)(lang) && _this.setLanguage(lang);
          !(0, _utils.isNil)(voice) && _this.setVoice(voice);
          !(0, _utils.isNil)(volume) && _this.setVolume(volume);
          !(0, _utils.isNil)(rate) && _this.setRate(rate);
          !(0, _utils.isNil)(pitch) && _this.setPitch(pitch);
          !(0, _utils.isNil)(splitSentences) && _this.setSplitSentences(splitSentences);
          resolve({
            voices: voices,
            lang: _this.lang,
            voice: _this.voice,
            volume: _this.volume,
            rate: _this.rate,
            pitch: _this.pitch,
            splitSentences: _this.splitSentences,
            browserSupport: _this.browserSupport
          });
        }).catch(function (e) {
          reject(e);
        });
      });
    }
  }, {
    key: "_fetchVoices",
    value: function _fetchVoices() {
      return new Promise(function (resolve, reject) {
        setTimeout(function () {
          var voices = speechSynthesis.getVoices();

          if ((0, _utils.size)(voices) > 0) {
            return resolve(voices);
          } else {
            return reject("Could not fetch voices");
          }
        }, 100);
      });
    }
  }, {
    key: "_loadVoices",
    value: function _loadVoices() {
      var _this2 = this;

      var remainingAttempts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 10;
      return this._fetchVoices().catch(function (error) {
        if (remainingAttempts === 0) throw error;
        return _this2._loadVoices(remainingAttempts - 1);
      });
    }
  }, {
    key: "hasBrowserSupport",
    value: function hasBrowserSupport() {
      return this.browserSupport;
    }
  }, {
    key: "setVoice",
    value: function setVoice(voice) {
      var synthesisVoice;
      var voices = speechSynthesis.getVoices(); // set voice by name

      if ((0, _utils.isString)(voice)) {
        synthesisVoice = voices.find(function (v) {
          return v.name === voice;
        });
      } // Set the voice in conf if found


      if ((0, _utils.isObject)(voice)) {
        synthesisVoice = voice;
      }

      if (synthesisVoice) {
        this.synthesisVoice = synthesisVoice;
      } else {
        throw 'Error setting voice. The voice you passed is not valid or the voices have not been loaded yet.';
      }
    }
  }, {
    key: "setLanguage",
    value: function setLanguage(lang) {
      lang = lang.replace('_', '-'); // some Android versions seem to ignore BCP 47 and use an underscore character in language tag

      if ((0, _utils.validateLocale)(lang)) {
        this.lang = lang;
      } else {
        throw 'Error setting language. Please verify your locale is BCP47 format (http://schneegans.de/lv/?tags=es-FR&format=text)';
      }
    }
  }, {
    key: "setVolume",
    value: function setVolume(volume) {
      volume = parseFloat(volume);

      if (!(0, _utils.isNan)(volume) && volume >= 0 && volume <= 1) {
        this.volume = volume;
      } else {
        throw 'Error setting volume. Please verify your volume value is a number between 0 and 1.';
      }
    }
  }, {
    key: "setRate",
    value: function setRate(rate) {
      rate = parseFloat(rate);

      if (!(0, _utils.isNan)(rate) && rate >= 0 && rate <= 10) {
        this.rate = rate;
      } else {
        throw 'Error setting rate. Please verify your volume value is a number between 0 and 10.';
      }
    }
  }, {
    key: "setPitch",
    value: function setPitch(pitch) {
      pitch = parseFloat(pitch);

      if (!(0, _utils.isNan)(pitch) && pitch >= 0 && pitch <= 2) {
        this.pitch = pitch;
      } else {
        throw 'Error setting pitch. Please verify your pitch value is a number between 0 and 2.';
      }
    }
  }, {
    key: "setSplitSentences",
    value: function setSplitSentences(splitSentences) {
      this.splitSentences = splitSentences;
    }
  }, {
    key: "speak",
    value: function speak(data) {
      var _this3 = this;

      return new Promise(function (resolve, reject) {
        var text = data.text,
            _data$listeners = data.listeners,
            listeners = _data$listeners === void 0 ? {} : _data$listeners,
            _data$queue = data.queue,
            queue = _data$queue === void 0 ? true : _data$queue;
        var msg = (0, _utils.trim)(text);
        if ((0, _utils.isNil)(msg)) resolve(); // Stop current speech

        !queue && _this3.cancel(); // Split into sentences (for better result and bug with some versions of chrome)

        var utterances = [];
        var sentences = _this3.splitSentences ? (0, _utils.splitSentences)(msg) : [msg];
        sentences.forEach(function (sentence, index) {
          var isLast = index === (0, _utils.size)(sentences) - 1;
          var utterance = new SpeechSynthesisUtterance();
          if (_this3.synthesisVoice) utterance.voice = _this3.synthesisVoice;
          if (_this3.lang) utterance.lang = _this3.lang;
          if (_this3.volume) utterance.volume = _this3.volume; // 0 to 1

          if (_this3.rate) utterance.rate = _this3.rate; // 0.1 to 10

          if (_this3.pitch) utterance.pitch = _this3.pitch; //0 to 2

          utterance.text = sentence; // Attach event listeners

          Object.keys(listeners).forEach(function (listener) {
            var fn = listeners[listener];

            var newListener = function newListener(data) {
              fn && fn(data);

              if (listener === 'onerror') {
                reject({
                  utterances: utterances,
                  lastUtterance: utterance,
                  error: data
                });
              }

              if (listener === 'onend') {
                if (isLast) resolve({
                  utterances: utterances,
                  lastUtterance: utterance
                });
              }
            };

            utterance[listener] = newListener;
          });
          utterances.push(utterance);
          speechSynthesis.speak(utterance);
        });
      });
    }
  }, {
    key: "pending",
    value: function pending() {
      return speechSynthesis.pending;
    }
  }, {
    key: "paused",
    value: function paused() {
      return speechSynthesis.paused;
    }
  }, {
    key: "speaking",
    value: function speaking() {
      return speechSynthesis.speaking;
    }
  }, {
    key: "pause",
    value: function pause() {
      speechSynthesis.pause();
    }
  }, {
    key: "resume",
    value: function resume() {
      speechSynthesis.resume();
    }
  }, {
    key: "cancel",
    value: function cancel() {
      speechSynthesis.cancel();
    }
  }]);

  return SpeakTTS;
}();

var _default = SpeakTTS;
exports["default"] = _default;

/***/ }),

/***/ "./node_modules/speak-tts/lib/utils.js":
/*!*********************************************!*\
  !*** ./node_modules/speak-tts/lib/utils.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, exports) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.trim = exports.isObject = exports.isNil = exports.isNan = exports.size = exports.isString = exports.validateLocale = exports.splitSentences = void 0;

var splitSentences = function splitSentences() {
  var text = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  return text.replace(/\.+/g, '.|').replace(/\?/g, '?|').replace(/\!/g, '!|').split("|").map(function (sentence) {
    return trim(sentence);
  }).filter(Boolean);
};

exports.splitSentences = splitSentences;
var bcp47LocalePattern = /^(?:(en-GB-oed|i-ami|i-bnn|i-default|i-enochian|i-hak|i-klingon|i-lux|i-mingo|i-navajo|i-pwn|i-tao|i-tay|i-tsu|sgn-BE-FR|sgn-BE-NL|sgn-CH-DE)|(art-lojban|cel-gaulish|no-bok|no-nyn|zh-guoyu|zh-hakka|zh-min|zh-min-nan|zh-xiang))$|^((?:[a-z]{2,3}(?:(?:-[a-z]{3}){1,3})?)|[a-z]{4}|[a-z]{5,8})(?:-([a-z]{4}))?(?:-([a-z]{2}|\d{3}))?((?:-(?:[\da-z]{5,8}|\d[\da-z]{3}))*)?((?:-[\da-wy-z](?:-[\da-z]{2,8})+)*)?(-x(?:-[\da-z]{1,8})+)?$|^(x(?:-[\da-z]{1,8})+)$/i; // eslint-disable-line max-len

/**
 * Validate a locale string to test if it is bcp47 compliant
 * @param {String} locale The tag locale to parse
 * @return {Boolean} True if tag is bcp47 compliant false otherwise
 */

var validateLocale = function validateLocale(locale) {
  return typeof locale !== 'string' ? false : bcp47LocalePattern.test(locale);
};

exports.validateLocale = validateLocale;

var isString = function isString(value) {
  return typeof value === 'string' || value instanceof String;
};

exports.isString = isString;

var size = function size(value) {
  return value && Array.isArray(value) && value.length ? value.length : 0;
};

exports.size = size;

var isNan = function isNan(value) {
  return typeof value === "number" && isNaN(value);
};

exports.isNan = isNan;

var isNil = function isNil(value) {
  return value === null || value === undefined;
};

exports.isNil = isNil;

var isObject = function isObject(value) {
  return Object.prototype.toString.call(value) === '[object Object]';
};

exports.isObject = isObject;

var trim = function trim(value) {
  return isString(value) ? value.trim() : '';
};

exports.trim = trim;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!****************************!*\
  !*** ./src/gtts-client.ts ***!
  \****************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var speak_tts__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! speak-tts */ "./node_modules/speak-tts/lib/speak-tts.js");
// @ts-ignore

function main() {
    // TTS form
    var ttsForm = document.getElementById("ttsForm");
    if (!ttsForm)
        throw new Error("no forms");
    // attach event listener
    ttsForm.addEventListener("submit", tts, true);
}
// Text-to-speech function
var tts = function (event) {
    event.preventDefault();
    var inputTextElement = document.getElementById("inputText");
    if (!inputTextElement)
        return;
    var text = inputTextElement.value;
    var lang = "en";
    var speech = initSpeech({ lang: lang });
    speech
        .speak({
        text: text
    })
        .then(function () {
        console.log("Success !");
    })
        .catch(function (err) {
        console.error("An error occurred :", err);
    });
};
var initSpeech = function (_a) {
    var lang = _a.lang;
    var speech = new speak_tts__WEBPACK_IMPORTED_MODULE_0__["default"]();
    if (speech.hasBrowserSupport()) {
        // returns a boolean
        console.log("speech synthesis supported");
    }
    else {
        throw new Error("speech synthesis not supported in your browser");
    }
    speech
        .init({ lang: lang })
        .then(function (data) {
        // The "data" object contains the list of available voices and the voice synthesis params
        console.log("Speech is ready, voices are available", data);
    })
        .catch(function (err) {
        console.error("An error occured while initializing: ", err);
    });
    return speech;
};
main();

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3V0LmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBYTs7QUFFYiw4Q0FBNkM7QUFDN0M7QUFDQSxDQUFDLEVBQUM7QUFDRixrQkFBZTs7QUFFZixhQUFhLG1CQUFPLENBQUMsc0RBQVM7O0FBRTlCLGtEQUFrRCwwQ0FBMEM7O0FBRTVGLDRDQUE0QyxnQkFBZ0Isa0JBQWtCLE9BQU8sMkJBQTJCLHdEQUF3RCxnQ0FBZ0MsdURBQXVEOztBQUUvUCw4REFBOEQsc0VBQXNFLDhEQUE4RDs7QUFFbE07QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSwrREFBK0Q7QUFDL0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRFQUE0RTs7QUFFNUU7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBO0FBQ0EsZ0ZBQWdGOztBQUVoRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1gsU0FBUztBQUNUO0FBQ0EsU0FBUztBQUNULE9BQU87QUFDUDtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxZQUFZO0FBQ1o7QUFDQTtBQUNBLFNBQVM7QUFDVCxPQUFPO0FBQ1A7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLGdEQUFnRDs7QUFFaEQ7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULFFBQVE7OztBQUdSO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0EscUNBQXFDOztBQUVyQztBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esd0RBQXdEO0FBQ3hEO0FBQ0E7QUFDQTtBQUNBLCtDQUErQzs7QUFFL0MsbUNBQW1DOztBQUVuQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtEQUErRDs7QUFFL0QseURBQXlEOztBQUV6RCw0REFBNEQ7O0FBRTVELHFDQUFxQzs7QUFFckM7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTs7QUFFQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0EsU0FBUztBQUNULE9BQU87QUFDUDtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQSxDQUFDOztBQUVEO0FBQ0Esa0JBQWU7Ozs7Ozs7Ozs7QUN4UkY7O0FBRWIsOENBQTZDO0FBQzdDO0FBQ0EsQ0FBQyxFQUFDO0FBQ0YsWUFBWSxHQUFHLGdCQUFnQixHQUFHLGFBQWEsR0FBRyxhQUFhLEdBQUcsWUFBWSxHQUFHLGdCQUFnQixHQUFHLHNCQUFzQixHQUFHLHNCQUFzQjs7QUFFbko7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUEsc0JBQXNCO0FBQ3RCLHlRQUF5USxJQUFJLGFBQWEsRUFBRSxFQUFFLElBQUksVUFBVSxFQUFFLE9BQU8sSUFBSSxZQUFZLEVBQUUsY0FBYyxFQUFFLElBQUksRUFBRSxtQkFBbUIsSUFBSSxXQUFXLEVBQUUsZ0NBQWdDLElBQUkscUJBQXFCLElBQUkscUJBQXFCLElBQUksUUFBUTs7QUFFL2Q7QUFDQTtBQUNBLFdBQVcsUUFBUTtBQUNuQixZQUFZLFNBQVM7QUFDckI7O0FBRUE7QUFDQTtBQUNBOztBQUVBLHNCQUFzQjs7QUFFdEI7QUFDQTtBQUNBOztBQUVBLGdCQUFnQjs7QUFFaEI7QUFDQTtBQUNBOztBQUVBLFlBQVk7O0FBRVo7QUFDQTtBQUNBOztBQUVBLGFBQWE7O0FBRWI7QUFDQTtBQUNBOztBQUVBLGFBQWE7O0FBRWI7QUFDQTtBQUNBOztBQUVBLGdCQUFnQjs7QUFFaEI7QUFDQTtBQUNBOztBQUVBLFlBQVk7Ozs7OztVQy9EWjtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7OztBQ05BO0FBQytCO0FBQy9CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsOEJBQThCLFlBQVk7QUFDMUM7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIsaURBQU07QUFDM0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQixZQUFZO0FBQzVCO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL3R0cy8uL25vZGVfbW9kdWxlcy9zcGVhay10dHMvbGliL3NwZWFrLXR0cy5qcyIsIndlYnBhY2s6Ly90dHMvLi9ub2RlX21vZHVsZXMvc3BlYWstdHRzL2xpYi91dGlscy5qcyIsIndlYnBhY2s6Ly90dHMvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vdHRzL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vdHRzLy4vc3JjL2d0dHMtY2xpZW50LnRzIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5kZWZhdWx0ID0gdm9pZCAwO1xuXG52YXIgX3V0aWxzID0gcmVxdWlyZShcIi4vdXRpbHNcIik7XG5cbmZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTsgfSB9XG5cbmZ1bmN0aW9uIF9kZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgcHJvcHMpIHsgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkrKykgeyB2YXIgZGVzY3JpcHRvciA9IHByb3BzW2ldOyBkZXNjcmlwdG9yLmVudW1lcmFibGUgPSBkZXNjcmlwdG9yLmVudW1lcmFibGUgfHwgZmFsc2U7IGRlc2NyaXB0b3IuY29uZmlndXJhYmxlID0gdHJ1ZTsgaWYgKFwidmFsdWVcIiBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTsgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgZGVzY3JpcHRvci5rZXksIGRlc2NyaXB0b3IpOyB9IH1cblxuZnVuY3Rpb24gX2NyZWF0ZUNsYXNzKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykgeyBpZiAocHJvdG9Qcm9wcykgX2RlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTsgaWYgKHN0YXRpY1Byb3BzKSBfZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpOyByZXR1cm4gQ29uc3RydWN0b3I7IH1cblxudmFyIFNwZWFrVFRTID1cbi8qI19fUFVSRV9fKi9cbmZ1bmN0aW9uICgpIHtcbiAgZnVuY3Rpb24gU3BlYWtUVFMoKSB7XG4gICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIFNwZWFrVFRTKTtcblxuICAgIHRoaXMuYnJvd3NlclN1cHBvcnQgPSAnc3BlZWNoU3ludGhlc2lzJyBpbiB3aW5kb3cgJiYgJ1NwZWVjaFN5bnRoZXNpc1V0dGVyYW5jZScgaW4gd2luZG93O1xuICAgIHRoaXMuc3ludGhlc2lzVm9pY2UgPSBudWxsO1xuICB9XG5cbiAgX2NyZWF0ZUNsYXNzKFNwZWFrVFRTLCBbe1xuICAgIGtleTogXCJpbml0XCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGluaXQoKSB7XG4gICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuXG4gICAgICB2YXIgY29uZiA9IGFyZ3VtZW50cy5sZW5ndGggPiAwICYmIGFyZ3VtZW50c1swXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzBdIDoge307XG4gICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBpZiAoIV90aGlzLmJyb3dzZXJTdXBwb3J0KSB7XG4gICAgICAgICAgcmVqZWN0KCdZb3VyIGJyb3dzZXIgZG9lcyBub3Qgc3VwcG9ydCBTcGVlY2ggU3ludGhlc2lzJyk7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgbGlzdGVuZXJzID0gKDAsIF91dGlscy5pc05pbCkoY29uZi5saXN0ZW5lcnMpID8ge30gOiBjb25mLmxpc3RlbmVycztcbiAgICAgICAgdmFyIHNwbGl0U2VudGVuY2VzID0gKDAsIF91dGlscy5pc05pbCkoY29uZi5zcGxpdFNlbnRlbmNlcykgPyB0cnVlIDogY29uZi5zcGxpdFNlbnRlbmNlcztcbiAgICAgICAgdmFyIGxhbmcgPSAoMCwgX3V0aWxzLmlzTmlsKShjb25mLmxhbmcpID8gdW5kZWZpbmVkIDogY29uZi5sYW5nO1xuICAgICAgICB2YXIgdm9sdW1lID0gKDAsIF91dGlscy5pc05pbCkoY29uZi52b2x1bWUpID8gMSA6IGNvbmYudm9sdW1lO1xuICAgICAgICB2YXIgcmF0ZSA9ICgwLCBfdXRpbHMuaXNOaWwpKGNvbmYucmF0ZSkgPyAxIDogY29uZi5yYXRlO1xuICAgICAgICB2YXIgcGl0Y2ggPSAoMCwgX3V0aWxzLmlzTmlsKShjb25mLnBpdGNoKSA/IDEgOiBjb25mLnBpdGNoO1xuICAgICAgICB2YXIgdm9pY2UgPSAoMCwgX3V0aWxzLmlzTmlsKShjb25mLnZvaWNlKSA/IHVuZGVmaW5lZCA6IGNvbmYudm9pY2U7IC8vIEF0dGFjaCBldmVudCBsaXN0ZW5lcnNcblxuICAgICAgICBPYmplY3Qua2V5cyhsaXN0ZW5lcnMpLmZvckVhY2goZnVuY3Rpb24gKGxpc3RlbmVyKSB7XG4gICAgICAgICAgdmFyIGZuID0gbGlzdGVuZXJzW2xpc3RlbmVyXTtcblxuICAgICAgICAgIHZhciBuZXdMaXN0ZW5lciA9IGZ1bmN0aW9uIG5ld0xpc3RlbmVyKGRhdGEpIHtcbiAgICAgICAgICAgIGZuICYmIGZuKGRhdGEpO1xuICAgICAgICAgIH07XG5cbiAgICAgICAgICBpZiAobGlzdGVuZXIgIT09ICdvbnZvaWNlc2NoYW5nZWQnKSB7XG4gICAgICAgICAgICBzcGVlY2hTeW50aGVzaXNbbGlzdGVuZXJdID0gbmV3TGlzdGVuZXI7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBfdGhpcy5fbG9hZFZvaWNlcygpLnRoZW4oZnVuY3Rpb24gKHZvaWNlcykge1xuICAgICAgICAgIC8vIEhhbmRsZSBjYWxsYmFjayBvbnZvaWNlc2NoYW5nZWQgYnkgaGFuZFxuICAgICAgICAgIGxpc3RlbmVyc1snb252b2ljZXNjaGFuZ2VkJ10gJiYgbGlzdGVuZXJzWydvbnZvaWNlc2NoYW5nZWQnXSh2b2ljZXMpOyAvLyBJbml0aWFsaXplIHZhbHVlcyBpZiBuZWNlc3NhcnlcblxuICAgICAgICAgICEoMCwgX3V0aWxzLmlzTmlsKShsYW5nKSAmJiBfdGhpcy5zZXRMYW5ndWFnZShsYW5nKTtcbiAgICAgICAgICAhKDAsIF91dGlscy5pc05pbCkodm9pY2UpICYmIF90aGlzLnNldFZvaWNlKHZvaWNlKTtcbiAgICAgICAgICAhKDAsIF91dGlscy5pc05pbCkodm9sdW1lKSAmJiBfdGhpcy5zZXRWb2x1bWUodm9sdW1lKTtcbiAgICAgICAgICAhKDAsIF91dGlscy5pc05pbCkocmF0ZSkgJiYgX3RoaXMuc2V0UmF0ZShyYXRlKTtcbiAgICAgICAgICAhKDAsIF91dGlscy5pc05pbCkocGl0Y2gpICYmIF90aGlzLnNldFBpdGNoKHBpdGNoKTtcbiAgICAgICAgICAhKDAsIF91dGlscy5pc05pbCkoc3BsaXRTZW50ZW5jZXMpICYmIF90aGlzLnNldFNwbGl0U2VudGVuY2VzKHNwbGl0U2VudGVuY2VzKTtcbiAgICAgICAgICByZXNvbHZlKHtcbiAgICAgICAgICAgIHZvaWNlczogdm9pY2VzLFxuICAgICAgICAgICAgbGFuZzogX3RoaXMubGFuZyxcbiAgICAgICAgICAgIHZvaWNlOiBfdGhpcy52b2ljZSxcbiAgICAgICAgICAgIHZvbHVtZTogX3RoaXMudm9sdW1lLFxuICAgICAgICAgICAgcmF0ZTogX3RoaXMucmF0ZSxcbiAgICAgICAgICAgIHBpdGNoOiBfdGhpcy5waXRjaCxcbiAgICAgICAgICAgIHNwbGl0U2VudGVuY2VzOiBfdGhpcy5zcGxpdFNlbnRlbmNlcyxcbiAgICAgICAgICAgIGJyb3dzZXJTdXBwb3J0OiBfdGhpcy5icm93c2VyU3VwcG9ydFxuICAgICAgICAgIH0pO1xuICAgICAgICB9KS5jYXRjaChmdW5jdGlvbiAoZSkge1xuICAgICAgICAgIHJlamVjdChlKTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwiX2ZldGNoVm9pY2VzXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIF9mZXRjaFZvaWNlcygpIHtcbiAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHZhciB2b2ljZXMgPSBzcGVlY2hTeW50aGVzaXMuZ2V0Vm9pY2VzKCk7XG5cbiAgICAgICAgICBpZiAoKDAsIF91dGlscy5zaXplKSh2b2ljZXMpID4gMCkge1xuICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUodm9pY2VzKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHJlamVjdChcIkNvdWxkIG5vdCBmZXRjaCB2b2ljZXNcIik7XG4gICAgICAgICAgfVxuICAgICAgICB9LCAxMDApO1xuICAgICAgfSk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcIl9sb2FkVm9pY2VzXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIF9sb2FkVm9pY2VzKCkge1xuICAgICAgdmFyIF90aGlzMiA9IHRoaXM7XG5cbiAgICAgIHZhciByZW1haW5pbmdBdHRlbXB0cyA9IGFyZ3VtZW50cy5sZW5ndGggPiAwICYmIGFyZ3VtZW50c1swXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzBdIDogMTA7XG4gICAgICByZXR1cm4gdGhpcy5fZmV0Y2hWb2ljZXMoKS5jYXRjaChmdW5jdGlvbiAoZXJyb3IpIHtcbiAgICAgICAgaWYgKHJlbWFpbmluZ0F0dGVtcHRzID09PSAwKSB0aHJvdyBlcnJvcjtcbiAgICAgICAgcmV0dXJuIF90aGlzMi5fbG9hZFZvaWNlcyhyZW1haW5pbmdBdHRlbXB0cyAtIDEpO1xuICAgICAgfSk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcImhhc0Jyb3dzZXJTdXBwb3J0XCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGhhc0Jyb3dzZXJTdXBwb3J0KCkge1xuICAgICAgcmV0dXJuIHRoaXMuYnJvd3NlclN1cHBvcnQ7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcInNldFZvaWNlXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHNldFZvaWNlKHZvaWNlKSB7XG4gICAgICB2YXIgc3ludGhlc2lzVm9pY2U7XG4gICAgICB2YXIgdm9pY2VzID0gc3BlZWNoU3ludGhlc2lzLmdldFZvaWNlcygpOyAvLyBzZXQgdm9pY2UgYnkgbmFtZVxuXG4gICAgICBpZiAoKDAsIF91dGlscy5pc1N0cmluZykodm9pY2UpKSB7XG4gICAgICAgIHN5bnRoZXNpc1ZvaWNlID0gdm9pY2VzLmZpbmQoZnVuY3Rpb24gKHYpIHtcbiAgICAgICAgICByZXR1cm4gdi5uYW1lID09PSB2b2ljZTtcbiAgICAgICAgfSk7XG4gICAgICB9IC8vIFNldCB0aGUgdm9pY2UgaW4gY29uZiBpZiBmb3VuZFxuXG5cbiAgICAgIGlmICgoMCwgX3V0aWxzLmlzT2JqZWN0KSh2b2ljZSkpIHtcbiAgICAgICAgc3ludGhlc2lzVm9pY2UgPSB2b2ljZTtcbiAgICAgIH1cblxuICAgICAgaWYgKHN5bnRoZXNpc1ZvaWNlKSB7XG4gICAgICAgIHRoaXMuc3ludGhlc2lzVm9pY2UgPSBzeW50aGVzaXNWb2ljZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRocm93ICdFcnJvciBzZXR0aW5nIHZvaWNlLiBUaGUgdm9pY2UgeW91IHBhc3NlZCBpcyBub3QgdmFsaWQgb3IgdGhlIHZvaWNlcyBoYXZlIG5vdCBiZWVuIGxvYWRlZCB5ZXQuJztcbiAgICAgIH1cbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwic2V0TGFuZ3VhZ2VcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gc2V0TGFuZ3VhZ2UobGFuZykge1xuICAgICAgbGFuZyA9IGxhbmcucmVwbGFjZSgnXycsICctJyk7IC8vIHNvbWUgQW5kcm9pZCB2ZXJzaW9ucyBzZWVtIHRvIGlnbm9yZSBCQ1AgNDcgYW5kIHVzZSBhbiB1bmRlcnNjb3JlIGNoYXJhY3RlciBpbiBsYW5ndWFnZSB0YWdcblxuICAgICAgaWYgKCgwLCBfdXRpbHMudmFsaWRhdGVMb2NhbGUpKGxhbmcpKSB7XG4gICAgICAgIHRoaXMubGFuZyA9IGxhbmc7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aHJvdyAnRXJyb3Igc2V0dGluZyBsYW5ndWFnZS4gUGxlYXNlIHZlcmlmeSB5b3VyIGxvY2FsZSBpcyBCQ1A0NyBmb3JtYXQgKGh0dHA6Ly9zY2huZWVnYW5zLmRlL2x2Lz90YWdzPWVzLUZSJmZvcm1hdD10ZXh0KSc7XG4gICAgICB9XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcInNldFZvbHVtZVwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBzZXRWb2x1bWUodm9sdW1lKSB7XG4gICAgICB2b2x1bWUgPSBwYXJzZUZsb2F0KHZvbHVtZSk7XG5cbiAgICAgIGlmICghKDAsIF91dGlscy5pc05hbikodm9sdW1lKSAmJiB2b2x1bWUgPj0gMCAmJiB2b2x1bWUgPD0gMSkge1xuICAgICAgICB0aGlzLnZvbHVtZSA9IHZvbHVtZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRocm93ICdFcnJvciBzZXR0aW5nIHZvbHVtZS4gUGxlYXNlIHZlcmlmeSB5b3VyIHZvbHVtZSB2YWx1ZSBpcyBhIG51bWJlciBiZXR3ZWVuIDAgYW5kIDEuJztcbiAgICAgIH1cbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwic2V0UmF0ZVwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBzZXRSYXRlKHJhdGUpIHtcbiAgICAgIHJhdGUgPSBwYXJzZUZsb2F0KHJhdGUpO1xuXG4gICAgICBpZiAoISgwLCBfdXRpbHMuaXNOYW4pKHJhdGUpICYmIHJhdGUgPj0gMCAmJiByYXRlIDw9IDEwKSB7XG4gICAgICAgIHRoaXMucmF0ZSA9IHJhdGU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aHJvdyAnRXJyb3Igc2V0dGluZyByYXRlLiBQbGVhc2UgdmVyaWZ5IHlvdXIgdm9sdW1lIHZhbHVlIGlzIGEgbnVtYmVyIGJldHdlZW4gMCBhbmQgMTAuJztcbiAgICAgIH1cbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwic2V0UGl0Y2hcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gc2V0UGl0Y2gocGl0Y2gpIHtcbiAgICAgIHBpdGNoID0gcGFyc2VGbG9hdChwaXRjaCk7XG5cbiAgICAgIGlmICghKDAsIF91dGlscy5pc05hbikocGl0Y2gpICYmIHBpdGNoID49IDAgJiYgcGl0Y2ggPD0gMikge1xuICAgICAgICB0aGlzLnBpdGNoID0gcGl0Y2g7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aHJvdyAnRXJyb3Igc2V0dGluZyBwaXRjaC4gUGxlYXNlIHZlcmlmeSB5b3VyIHBpdGNoIHZhbHVlIGlzIGEgbnVtYmVyIGJldHdlZW4gMCBhbmQgMi4nO1xuICAgICAgfVxuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJzZXRTcGxpdFNlbnRlbmNlc1wiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBzZXRTcGxpdFNlbnRlbmNlcyhzcGxpdFNlbnRlbmNlcykge1xuICAgICAgdGhpcy5zcGxpdFNlbnRlbmNlcyA9IHNwbGl0U2VudGVuY2VzO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJzcGVha1wiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBzcGVhayhkYXRhKSB7XG4gICAgICB2YXIgX3RoaXMzID0gdGhpcztcblxuICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgdmFyIHRleHQgPSBkYXRhLnRleHQsXG4gICAgICAgICAgICBfZGF0YSRsaXN0ZW5lcnMgPSBkYXRhLmxpc3RlbmVycyxcbiAgICAgICAgICAgIGxpc3RlbmVycyA9IF9kYXRhJGxpc3RlbmVycyA9PT0gdm9pZCAwID8ge30gOiBfZGF0YSRsaXN0ZW5lcnMsXG4gICAgICAgICAgICBfZGF0YSRxdWV1ZSA9IGRhdGEucXVldWUsXG4gICAgICAgICAgICBxdWV1ZSA9IF9kYXRhJHF1ZXVlID09PSB2b2lkIDAgPyB0cnVlIDogX2RhdGEkcXVldWU7XG4gICAgICAgIHZhciBtc2cgPSAoMCwgX3V0aWxzLnRyaW0pKHRleHQpO1xuICAgICAgICBpZiAoKDAsIF91dGlscy5pc05pbCkobXNnKSkgcmVzb2x2ZSgpOyAvLyBTdG9wIGN1cnJlbnQgc3BlZWNoXG5cbiAgICAgICAgIXF1ZXVlICYmIF90aGlzMy5jYW5jZWwoKTsgLy8gU3BsaXQgaW50byBzZW50ZW5jZXMgKGZvciBiZXR0ZXIgcmVzdWx0IGFuZCBidWcgd2l0aCBzb21lIHZlcnNpb25zIG9mIGNocm9tZSlcblxuICAgICAgICB2YXIgdXR0ZXJhbmNlcyA9IFtdO1xuICAgICAgICB2YXIgc2VudGVuY2VzID0gX3RoaXMzLnNwbGl0U2VudGVuY2VzID8gKDAsIF91dGlscy5zcGxpdFNlbnRlbmNlcykobXNnKSA6IFttc2ddO1xuICAgICAgICBzZW50ZW5jZXMuZm9yRWFjaChmdW5jdGlvbiAoc2VudGVuY2UsIGluZGV4KSB7XG4gICAgICAgICAgdmFyIGlzTGFzdCA9IGluZGV4ID09PSAoMCwgX3V0aWxzLnNpemUpKHNlbnRlbmNlcykgLSAxO1xuICAgICAgICAgIHZhciB1dHRlcmFuY2UgPSBuZXcgU3BlZWNoU3ludGhlc2lzVXR0ZXJhbmNlKCk7XG4gICAgICAgICAgaWYgKF90aGlzMy5zeW50aGVzaXNWb2ljZSkgdXR0ZXJhbmNlLnZvaWNlID0gX3RoaXMzLnN5bnRoZXNpc1ZvaWNlO1xuICAgICAgICAgIGlmIChfdGhpczMubGFuZykgdXR0ZXJhbmNlLmxhbmcgPSBfdGhpczMubGFuZztcbiAgICAgICAgICBpZiAoX3RoaXMzLnZvbHVtZSkgdXR0ZXJhbmNlLnZvbHVtZSA9IF90aGlzMy52b2x1bWU7IC8vIDAgdG8gMVxuXG4gICAgICAgICAgaWYgKF90aGlzMy5yYXRlKSB1dHRlcmFuY2UucmF0ZSA9IF90aGlzMy5yYXRlOyAvLyAwLjEgdG8gMTBcblxuICAgICAgICAgIGlmIChfdGhpczMucGl0Y2gpIHV0dGVyYW5jZS5waXRjaCA9IF90aGlzMy5waXRjaDsgLy8wIHRvIDJcblxuICAgICAgICAgIHV0dGVyYW5jZS50ZXh0ID0gc2VudGVuY2U7IC8vIEF0dGFjaCBldmVudCBsaXN0ZW5lcnNcblxuICAgICAgICAgIE9iamVjdC5rZXlzKGxpc3RlbmVycykuZm9yRWFjaChmdW5jdGlvbiAobGlzdGVuZXIpIHtcbiAgICAgICAgICAgIHZhciBmbiA9IGxpc3RlbmVyc1tsaXN0ZW5lcl07XG5cbiAgICAgICAgICAgIHZhciBuZXdMaXN0ZW5lciA9IGZ1bmN0aW9uIG5ld0xpc3RlbmVyKGRhdGEpIHtcbiAgICAgICAgICAgICAgZm4gJiYgZm4oZGF0YSk7XG5cbiAgICAgICAgICAgICAgaWYgKGxpc3RlbmVyID09PSAnb25lcnJvcicpIHtcbiAgICAgICAgICAgICAgICByZWplY3Qoe1xuICAgICAgICAgICAgICAgICAgdXR0ZXJhbmNlczogdXR0ZXJhbmNlcyxcbiAgICAgICAgICAgICAgICAgIGxhc3RVdHRlcmFuY2U6IHV0dGVyYW5jZSxcbiAgICAgICAgICAgICAgICAgIGVycm9yOiBkYXRhXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICBpZiAobGlzdGVuZXIgPT09ICdvbmVuZCcpIHtcbiAgICAgICAgICAgICAgICBpZiAoaXNMYXN0KSByZXNvbHZlKHtcbiAgICAgICAgICAgICAgICAgIHV0dGVyYW5jZXM6IHV0dGVyYW5jZXMsXG4gICAgICAgICAgICAgICAgICBsYXN0VXR0ZXJhbmNlOiB1dHRlcmFuY2VcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgdXR0ZXJhbmNlW2xpc3RlbmVyXSA9IG5ld0xpc3RlbmVyO1xuICAgICAgICAgIH0pO1xuICAgICAgICAgIHV0dGVyYW5jZXMucHVzaCh1dHRlcmFuY2UpO1xuICAgICAgICAgIHNwZWVjaFN5bnRoZXNpcy5zcGVhayh1dHRlcmFuY2UpO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJwZW5kaW5nXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHBlbmRpbmcoKSB7XG4gICAgICByZXR1cm4gc3BlZWNoU3ludGhlc2lzLnBlbmRpbmc7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcInBhdXNlZFwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBwYXVzZWQoKSB7XG4gICAgICByZXR1cm4gc3BlZWNoU3ludGhlc2lzLnBhdXNlZDtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwic3BlYWtpbmdcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gc3BlYWtpbmcoKSB7XG4gICAgICByZXR1cm4gc3BlZWNoU3ludGhlc2lzLnNwZWFraW5nO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJwYXVzZVwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBwYXVzZSgpIHtcbiAgICAgIHNwZWVjaFN5bnRoZXNpcy5wYXVzZSgpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJyZXN1bWVcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gcmVzdW1lKCkge1xuICAgICAgc3BlZWNoU3ludGhlc2lzLnJlc3VtZSgpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJjYW5jZWxcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gY2FuY2VsKCkge1xuICAgICAgc3BlZWNoU3ludGhlc2lzLmNhbmNlbCgpO1xuICAgIH1cbiAgfV0pO1xuXG4gIHJldHVybiBTcGVha1RUUztcbn0oKTtcblxudmFyIF9kZWZhdWx0ID0gU3BlYWtUVFM7XG5leHBvcnRzLmRlZmF1bHQgPSBfZGVmYXVsdDsiLCJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMudHJpbSA9IGV4cG9ydHMuaXNPYmplY3QgPSBleHBvcnRzLmlzTmlsID0gZXhwb3J0cy5pc05hbiA9IGV4cG9ydHMuc2l6ZSA9IGV4cG9ydHMuaXNTdHJpbmcgPSBleHBvcnRzLnZhbGlkYXRlTG9jYWxlID0gZXhwb3J0cy5zcGxpdFNlbnRlbmNlcyA9IHZvaWQgMDtcblxudmFyIHNwbGl0U2VudGVuY2VzID0gZnVuY3Rpb24gc3BsaXRTZW50ZW5jZXMoKSB7XG4gIHZhciB0ZXh0ID0gYXJndW1lbnRzLmxlbmd0aCA+IDAgJiYgYXJndW1lbnRzWzBdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMF0gOiAnJztcbiAgcmV0dXJuIHRleHQucmVwbGFjZSgvXFwuKy9nLCAnLnwnKS5yZXBsYWNlKC9cXD8vZywgJz98JykucmVwbGFjZSgvXFwhL2csICchfCcpLnNwbGl0KFwifFwiKS5tYXAoZnVuY3Rpb24gKHNlbnRlbmNlKSB7XG4gICAgcmV0dXJuIHRyaW0oc2VudGVuY2UpO1xuICB9KS5maWx0ZXIoQm9vbGVhbik7XG59O1xuXG5leHBvcnRzLnNwbGl0U2VudGVuY2VzID0gc3BsaXRTZW50ZW5jZXM7XG52YXIgYmNwNDdMb2NhbGVQYXR0ZXJuID0gL14oPzooZW4tR0Itb2VkfGktYW1pfGktYm5ufGktZGVmYXVsdHxpLWVub2NoaWFufGktaGFrfGkta2xpbmdvbnxpLWx1eHxpLW1pbmdvfGktbmF2YWpvfGktcHdufGktdGFvfGktdGF5fGktdHN1fHNnbi1CRS1GUnxzZ24tQkUtTkx8c2duLUNILURFKXwoYXJ0LWxvamJhbnxjZWwtZ2F1bGlzaHxuby1ib2t8bm8tbnlufHpoLWd1b3l1fHpoLWhha2thfHpoLW1pbnx6aC1taW4tbmFufHpoLXhpYW5nKSkkfF4oKD86W2Etel17MiwzfSg/Oig/Oi1bYS16XXszfSl7MSwzfSk/KXxbYS16XXs0fXxbYS16XXs1LDh9KSg/Oi0oW2Etel17NH0pKT8oPzotKFthLXpdezJ9fFxcZHszfSkpPygoPzotKD86W1xcZGEtel17NSw4fXxcXGRbXFxkYS16XXszfSkpKik/KCg/Oi1bXFxkYS13eS16XSg/Oi1bXFxkYS16XXsyLDh9KSspKik/KC14KD86LVtcXGRhLXpdezEsOH0pKyk/JHxeKHgoPzotW1xcZGEtel17MSw4fSkrKSQvaTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBtYXgtbGVuXG5cbi8qKlxuICogVmFsaWRhdGUgYSBsb2NhbGUgc3RyaW5nIHRvIHRlc3QgaWYgaXQgaXMgYmNwNDcgY29tcGxpYW50XG4gKiBAcGFyYW0ge1N0cmluZ30gbG9jYWxlIFRoZSB0YWcgbG9jYWxlIHRvIHBhcnNlXG4gKiBAcmV0dXJuIHtCb29sZWFufSBUcnVlIGlmIHRhZyBpcyBiY3A0NyBjb21wbGlhbnQgZmFsc2Ugb3RoZXJ3aXNlXG4gKi9cblxudmFyIHZhbGlkYXRlTG9jYWxlID0gZnVuY3Rpb24gdmFsaWRhdGVMb2NhbGUobG9jYWxlKSB7XG4gIHJldHVybiB0eXBlb2YgbG9jYWxlICE9PSAnc3RyaW5nJyA/IGZhbHNlIDogYmNwNDdMb2NhbGVQYXR0ZXJuLnRlc3QobG9jYWxlKTtcbn07XG5cbmV4cG9ydHMudmFsaWRhdGVMb2NhbGUgPSB2YWxpZGF0ZUxvY2FsZTtcblxudmFyIGlzU3RyaW5nID0gZnVuY3Rpb24gaXNTdHJpbmcodmFsdWUpIHtcbiAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycgfHwgdmFsdWUgaW5zdGFuY2VvZiBTdHJpbmc7XG59O1xuXG5leHBvcnRzLmlzU3RyaW5nID0gaXNTdHJpbmc7XG5cbnZhciBzaXplID0gZnVuY3Rpb24gc2l6ZSh2YWx1ZSkge1xuICByZXR1cm4gdmFsdWUgJiYgQXJyYXkuaXNBcnJheSh2YWx1ZSkgJiYgdmFsdWUubGVuZ3RoID8gdmFsdWUubGVuZ3RoIDogMDtcbn07XG5cbmV4cG9ydHMuc2l6ZSA9IHNpemU7XG5cbnZhciBpc05hbiA9IGZ1bmN0aW9uIGlzTmFuKHZhbHVlKSB7XG4gIHJldHVybiB0eXBlb2YgdmFsdWUgPT09IFwibnVtYmVyXCIgJiYgaXNOYU4odmFsdWUpO1xufTtcblxuZXhwb3J0cy5pc05hbiA9IGlzTmFuO1xuXG52YXIgaXNOaWwgPSBmdW5jdGlvbiBpc05pbCh2YWx1ZSkge1xuICByZXR1cm4gdmFsdWUgPT09IG51bGwgfHwgdmFsdWUgPT09IHVuZGVmaW5lZDtcbn07XG5cbmV4cG9ydHMuaXNOaWwgPSBpc05pbDtcblxudmFyIGlzT2JqZWN0ID0gZnVuY3Rpb24gaXNPYmplY3QodmFsdWUpIHtcbiAgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh2YWx1ZSkgPT09ICdbb2JqZWN0IE9iamVjdF0nO1xufTtcblxuZXhwb3J0cy5pc09iamVjdCA9IGlzT2JqZWN0O1xuXG52YXIgdHJpbSA9IGZ1bmN0aW9uIHRyaW0odmFsdWUpIHtcbiAgcmV0dXJuIGlzU3RyaW5nKHZhbHVlKSA/IHZhbHVlLnRyaW0oKSA6ICcnO1xufTtcblxuZXhwb3J0cy50cmltID0gdHJpbTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiLy8gQHRzLWlnbm9yZVxuaW1wb3J0IFNwZWVjaCBmcm9tIFwic3BlYWstdHRzXCI7XG5mdW5jdGlvbiBtYWluKCkge1xuICAgIC8vIFRUUyBmb3JtXG4gICAgdmFyIHR0c0Zvcm0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInR0c0Zvcm1cIik7XG4gICAgaWYgKCF0dHNGb3JtKVxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJubyBmb3Jtc1wiKTtcbiAgICAvLyBhdHRhY2ggZXZlbnQgbGlzdGVuZXJcbiAgICB0dHNGb3JtLmFkZEV2ZW50TGlzdGVuZXIoXCJzdWJtaXRcIiwgdHRzLCB0cnVlKTtcbn1cbi8vIFRleHQtdG8tc3BlZWNoIGZ1bmN0aW9uXG52YXIgdHRzID0gZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB2YXIgaW5wdXRUZXh0RWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiaW5wdXRUZXh0XCIpO1xuICAgIGlmICghaW5wdXRUZXh0RWxlbWVudClcbiAgICAgICAgcmV0dXJuO1xuICAgIHZhciB0ZXh0ID0gaW5wdXRUZXh0RWxlbWVudC52YWx1ZTtcbiAgICB2YXIgbGFuZyA9IFwiZW5cIjtcbiAgICB2YXIgc3BlZWNoID0gaW5pdFNwZWVjaCh7IGxhbmc6IGxhbmcgfSk7XG4gICAgc3BlZWNoXG4gICAgICAgIC5zcGVhayh7XG4gICAgICAgIHRleHQ6IHRleHRcbiAgICB9KVxuICAgICAgICAudGhlbihmdW5jdGlvbiAoKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiU3VjY2VzcyAhXCIpO1xuICAgIH0pXG4gICAgICAgIC5jYXRjaChmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCJBbiBlcnJvciBvY2N1cnJlZCA6XCIsIGVycik7XG4gICAgfSk7XG59O1xudmFyIGluaXRTcGVlY2ggPSBmdW5jdGlvbiAoX2EpIHtcbiAgICB2YXIgbGFuZyA9IF9hLmxhbmc7XG4gICAgdmFyIHNwZWVjaCA9IG5ldyBTcGVlY2goKTtcbiAgICBpZiAoc3BlZWNoLmhhc0Jyb3dzZXJTdXBwb3J0KCkpIHtcbiAgICAgICAgLy8gcmV0dXJucyBhIGJvb2xlYW5cbiAgICAgICAgY29uc29sZS5sb2coXCJzcGVlY2ggc3ludGhlc2lzIHN1cHBvcnRlZFwiKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcInNwZWVjaCBzeW50aGVzaXMgbm90IHN1cHBvcnRlZCBpbiB5b3VyIGJyb3dzZXJcIik7XG4gICAgfVxuICAgIHNwZWVjaFxuICAgICAgICAuaW5pdCh7IGxhbmc6IGxhbmcgfSlcbiAgICAgICAgLnRoZW4oZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgLy8gVGhlIFwiZGF0YVwiIG9iamVjdCBjb250YWlucyB0aGUgbGlzdCBvZiBhdmFpbGFibGUgdm9pY2VzIGFuZCB0aGUgdm9pY2Ugc3ludGhlc2lzIHBhcmFtc1xuICAgICAgICBjb25zb2xlLmxvZyhcIlNwZWVjaCBpcyByZWFkeSwgdm9pY2VzIGFyZSBhdmFpbGFibGVcIiwgZGF0YSk7XG4gICAgfSlcbiAgICAgICAgLmNhdGNoKGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihcIkFuIGVycm9yIG9jY3VyZWQgd2hpbGUgaW5pdGlhbGl6aW5nOiBcIiwgZXJyKTtcbiAgICB9KTtcbiAgICByZXR1cm4gc3BlZWNoO1xufTtcbm1haW4oKTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==