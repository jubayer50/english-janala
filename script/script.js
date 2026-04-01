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
                      <p class='font-semibold text-[#422AD5] px-4 py-1 rounded-md border-2 border-[#422AD5] w-fit flex cursor-pointer items-center gap-2'><i class="fa-solid fa-book-open"></i> Lesson - ${level.level_no}</P>
    `;

    levelsContainer.append(btnDiv);
  }
};
