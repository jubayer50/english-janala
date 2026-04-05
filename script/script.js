const loadLevels = () => {
  const url = "https://openapi.programming-hero.com/api/levels/all";
  fetch(url)
    .then((res) => res.json())
    .then((loadData) => displayLevels(loadData));
};

loadLevels();

const displayLevels = (loadData) => {
  const levelsContainer = document.getElementById("levels-container");
  levelsContainer.innerHTML = "";

  const levels = loadData.data;

  for (let level of levels) {
    const btnDiv = document.createElement("div");
    btnDiv.innerHTML = `
                      <p id="lesson-btn-${level.level_no}" onclick="loadLevelWorld(${level.level_no})" class='font-semibold text-[#422AD5] px-4 py-1 rounded-md border-2 border-[#422AD5] w-fit flex cursor-pointer items-center gap-2 level'><i class="fa-solid fa-book-open"></i> Lesson - ${level.level_no}</P>
    `;

    levelsContainer.append(btnDiv);
  }
};

const manageSpinning = (status) => {
  if (status === true) {
    document.getElementById("spinning").classList.remove("hidden");
    document.getElementById("word-container").classList.add("hidden");
  } else {
    document.getElementById("spinning").classList.add("hidden");
    document.getElementById("word-container").classList.remove("hidden");
  }
};

const loadLevelWorld = (id) => {
  manageSpinning(true);

  const url = `https://openapi.programming-hero.com/api/level/${id}`;

  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      removeActive();

      const levelBtn = document.getElementById(`lesson-btn-${id}`);
      // console.log(levelBtn);
      levelBtn.classList.add("bg-[#422AD5]", "text-white");

      displayLevelWord(data.data);
    });
};

const removeActive = () => {
  const allLevels = document.querySelectorAll(".level");
  // console.log(allLevels);
  allLevels.forEach((levelBtn) =>
    levelBtn.classList.remove("bg-[#422AD5]", "text-white"),
  );
};

const displayLevelWord = (words) => {
  const wordContainer = document.getElementById("word-container");
  wordContainer.innerHTML = "";

  if (words.length === 0) {
    wordContainer.innerHTML = `
            <div class="text-center col-span-full py-5 space-y-4">
              <img class="mx-auto" src="./assets/alert-error.png" alt="" />
              <p class="text-[#79716B] font-ban">
                এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।
              </p>
              <h2 class="text-[#292524] font-bold text-3xl md:text-4xl">
                নেক্সট Lesson এ যান
              </h2>
            </div>
    `;

    manageSpinning(false);
    return;
  }

  words.forEach((word) => {
    // console.log(word);
    const wordDiv = document.createElement("div");
    wordDiv.innerHTML = `
            <div class="bg-white p-8 md:p-14 rounded-xl">
              <div class="text-center space-y-6">
                <h2 class="font-bold text-2xl md:text-3xl">${word.word}</h2>
                <p class="font-medium text-lg md:text-xl">Meaning / Pronunciation</p>
                <h2 class="font-semibold text-2xl md:text-3xl text-[#18181B] opacity-80 font-ban">
                  "${word.meaning ? word.meaning : "No Found"} / ${word.pronunciation ? word.pronunciation : "No Found"}"
                </h2>
              </div>

              <div class="mt-11 flex justify-between items-center">
                <button onclick="leadWordDetails(${word.id})" class="btn">
                  <i class="fa-solid fa-circle-info"></i>
                </button>
                <button onclick="pronounceWord('${word.word}')" class="btn">
                  <i class="fa-solid fa-volume-high"></i></i>
                </button>
              </div>
            </div>
    `;

    wordContainer.append(wordDiv);

    manageSpinning(false);
  });
  // console.log(words);
};

const leadWordDetails = async (id) => {
  // console.log(id);
  const url = `https://openapi.programming-hero.com/api/word/${id}`;

  const res = await fetch(url);
  const data = await res.json();
  displayWordDetail(data.data);
};

const displayWordDetail = (word) => {
  // console.log(word);

  const modalContainer = document.getElementById("modal-container");
  modalContainer.innerHTML = "";

  const div = document.createElement("div");
  div.innerHTML = `
              <h2 class="text-[28px] md:text-[32px] font-semibold">
                ${word.word} (<i class="fa-solid fa-microphone"></i>:${word.meaning})
              </h2>

              <div class="mt-4 md:mt-7">
                <p class="text-[28px] md:text-[30px] font-semibold">Meaning</p>
                <p
                  class="text-[19px] md:text-[22px] font-ban font-medium mt-1.5"
                >
                  ${word.meaning}
                </p>
              </div>

              <div class="mt-4 md:mt-7">
                <h3 class="text-[28px] md:text-3xl font-semibold">Example</h3>
                <p class="text-[16px] md:text-lg mt-1 font-medium">
                  ${word.sentence}
                </p>
              </div>

              <div class="mt-7">
                <h4 class="text-[16px] md:text-lg font-medium font-ban">
                  সমার্থক শব্দ গুলো
                </h4>
                <div class='mt-2 flex flex-wrap gap-2'>${createElement(word.synonyms)}</div>
              </div>

              <div class="mt-4 md:mt-5">
                <button
                  class="bg-[#422AD5] px-5 py-1.5 rounded-md text-white font-medium text-xl cursor-pointer"
                >
                  Complete Learning
                </button>
              </div>
  `;

  modalContainer.append(div);

  document.getElementById("Word_detail_modal").showModal();
};

const createElement = (array) => {
  const htmlElement = array.map((el) => ` <span class='btn'>${el}</span>`);
  return htmlElement.join(" ");
};

// search function
document.getElementById("btn-search").addEventListener("click", function () {
  removeActive();

  const valueElement = document.getElementById("search-input");
  const SearchValue = valueElement.value.trim().toLowerCase();

  console.log(SearchValue);

  fetch("https://openapi.programming-hero.com/api/words/all")
    .then((res) => res.json())
    .then((data) => {
      const allWords = data.data;
      const filterWord = allWords.filter((word) =>
        word.word.trim().toLowerCase().includes(SearchValue),
      );

      displayLevelWord(filterWord);
    });
});

function pronounceWord(word) {
  const utterance = new SpeechSynthesisUtterance(word);
  utterance.lang = "en-EN"; // English
  window.speechSynthesis.speak(utterance);
}
