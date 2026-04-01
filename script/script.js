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

  words.forEach((word) => {
    console.log(word);
    const wordDiv = document.createElement("div");
    wordDiv.innerHTML = `
            <div class="bg-white p-8 md:p-14 rounded-xl">
              <div class="text-center space-y-6">
                <h2 class="font-bold text-2xl md:text-3xl">${word.word}</h2>
                <p class="font-medium text-lg md:text-xl">Meaning / Pronunciation</p>
                <h2 class="font-semibold text-2xl md:text-3xl text-[#18181B] opacity-80">
                  "${word.meaning} / ${word.pronunciation}"
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
