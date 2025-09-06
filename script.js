let drop1 = document.getElementById("digg");
let drop2 = document.getElementById("innerCont");
let fromCont1 = document.getElementById("cont1");
let toCont = document.getElementById("cont2");
let convertBtn = document.getElementById("icones");

// dropdowns
for (let code in CountryList) {
  let fromOption = document.createElement("option");
  fromOption.value = code;
  fromOption.textContent = CountryList[code];
  drop1.appendChild(fromOption);

  if (code === "en-GB") drop1.value = code;

  let toOption = document.createElement("option");
  toOption.value = code;
  toOption.textContent = CountryList[code];
  drop2.appendChild(toOption);

  if (code === "hi-IN") drop2.value = code;
}

// Translate button
convertBtn.addEventListener("click", function () {
  let text = fromCont1.value.trim();
  let sourceLang = drop1.value; // ex: "en"
  let targetLang = drop2.value; // ex: "hi"

  if (!text) {
    alert("Please enter some text");
    return;
  }

  let URL = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${sourceLang}|${targetLang}`;

  fetch(URL)
    .then(response => response.json())
    .then(data => {
      console.log("API Response:", data);
      if (data && data.responseData && data.responseData.translatedText) {
        toCont.value = data.responseData.translatedText;
      } else {
        toCont.value = "⚠️ Translation not available";
      }
    })
    .catch(err => {
      console.error("API Error:", err);
      toCont.value = "⚠️ API Error";
    });
});
