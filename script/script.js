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
                      <p onclick="loadLevelWorld(${level.level_no})" class='font-semibold text-[#422AD5] px-4 py-1 rounded-md border-2 border-[#422AD5] w-fit flex cursor-pointer items-center gap-2'><i class="fa-solid fa-book-open"></i> Lesson - ${level.level_no}</P>
    `;

    levelsContainer.append(btnDiv);
  }
};

const loadLevelWorld = (id) => {
  const url = `https://openapi.programming-hero.com/api/level/${id}`;

  fetch(url)
    .then((res) => res.json())
    .then((data) => displayLevelWord(data.data));
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
              <h2 class="text-[#292524] font-bold text-4xl">
                নেক্সট Lesson এ যান
              </h2>
            </div>
    `;
    return;
  }

  words.forEach((word) => {
    console.log(word);
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
                <button class="btn">
                  <i class="fa-solid fa-circle-info"></i>
                </button>
                <button class="btn">
                  <i class="fa-solid fa-volume-high"></i></i>
                </button>
              </div>
            </div>
    `;

    wordContainer.append(wordDiv);
  });
  console.log(words);
};
