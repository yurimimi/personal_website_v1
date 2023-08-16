// Set switch value to the client's locale
const switcher = document.getElementById("language-select")
switcher.value = g_lang

// Set site language based on client's locale
if (g_lang !== "en-US") changeLanguage(g_lang)
