const pages = document.querySelectorAll(".page");
const nextBtn = document.getElementById("next-btn");
const prevBtn = document.getElementById("prev-btn");
const submitBtn = document.getElementById("submit-btn");
const restartBtn = document.getElementById("restart-btn");
const progressBar = document.getElementById("progress-bar");
const progressText = document.getElementById("progress-text");

let currentPage = 0;

let answers = JSON.parse(localStorage.getItem("creativeTechAnswers")) || {};
let userInfo = JSON.parse(localStorage.getItem("creativeTechUser")) || {};

const resultData = {
  visual: {
    title: "Visual Storyteller",
    description: "You prefer showing ideas through visuals and story."
  },
  technical: {
    title: "System Builder",
    description: "You prefer structure, problem-solving, and building systems."
  },
  physical: {
    title: "Experimental Maker",
    description: "You prefer learning by making, testing, and doing."
  },
  conceptual: {
    title: "Concept Thinker",
    description: "You prefer ideas, meaning, and creative direction."
  }
};

function showPage(index) {
  pages.forEach((page) => page.classList.remove("active"));
  pages[index].classList.add("active");

  prevBtn.style.display = index === 0 ? "none" : "inline-block";

  if (index === pages.length - 1) {
    nextBtn.style.display = "none";
    submitBtn.style.display = "none";
    prevBtn.style.display = "none";
  } else if (index === pages.length - 2) {
    nextBtn.style.display = "none";
    submitBtn.style.display = "inline-block";
    prevBtn.style.display = "inline-block";
  } else {
    nextBtn.style.display = "inline-block";
    submitBtn.style.display = "none";
  }

  let progressPercent = ((index + 1) / pages.length) * 100;
  progressBar.style.width = `${progressPercent}%`;
  progressText.textContent = `Page ${index + 1} of ${pages.length}`;
}

function saveUserInfo() {
  const name = document.getElementById("name").value.trim();
  const university = document.getElementById("university").value.trim();
  const major = document.getElementById("major").value.trim();

  userInfo = { name, university, major };
  localStorage.setItem("creativeTechUser", JSON.stringify(userInfo));
}

function handleOptionClick(e) {
  if (!e.target.classList.contains("option")) return;

  const question = e.target.dataset.question;
  const value = e.target.dataset.value;

  answers[question] = value;
  localStorage.setItem("creativeTechAnswers", JSON.stringify(answers));

  const pageOptions = e.target.parentElement.querySelectorAll(".option");
  pageOptions.forEach((btn) => btn.classList.remove("selected"));
  e.target.classList.add("selected");
}

document.querySelectorAll(".options").forEach((group) => {
  group.addEventListener("click", handleOptionClick);
});

function restoreSelections() {
  document.querySelectorAll(".option").forEach((btn) => {
    const question = btn.dataset.question;
    const value = btn.dataset.value;

    if (answers[question] === value) {
      btn.classList.add("selected");
    }
  });

  if (userInfo.name) document.getElementById("name").value = userInfo.name;
  if (userInfo.university) document.getElementById("university").value = userInfo.university;
  if (userInfo.major) document.getElementById("major").value = userInfo.major;
}

function calculateResult() {
  const scores = {
    visual: 0,
    technical: 0,
    physical: 0,
    conceptual: 0
  };

  Object.values(answers).forEach((value) => {
    if (scores[value] !== undefined) {
      scores[value]++;
    }
  });

  let topCategory = "visual";
  let highest = 0;

  for (let category in scores) {
    if (scores[category] > highest) {
      highest = scores[category];
      topCategory = category;
    }
  }

  localStorage.setItem("creativeTechResult", topCategory);
  return topCategory;
}

function displayResult() {
  const result = calculateResult();

  const resultTitle = document.getElementById("result-title");
  const resultDescription = document.getElementById("result-description");
  const userSummary = document.getElementById("user-summary");

  resultTitle.textContent = resultData[result].title;
  resultDescription.textContent = resultData[result].description;

  userSummary.innerHTML = `
    <strong>Name:</strong> ${userInfo.name || "Not entered"}<br>
    <strong>University:</strong> ${userInfo.university || "Not entered"}<br>
    <strong>Major:</strong> ${userInfo.major || "Not entered"}
  `;
}

nextBtn.addEventListener("click", () => {
  saveUserInfo();
  if (currentPage < pages.length - 1) {
    currentPage++;
    showPage(currentPage);
  }
});

prevBtn.addEventListener("click", () => {
  saveUserInfo();
  if (currentPage > 0) {
    currentPage--;
    showPage(currentPage);
  }
});

submitBtn.addEventListener("click", () => {
  saveUserInfo();
  displayResult();
  currentPage = pages.length - 1;
  showPage(currentPage);
});

restartBtn.addEventListener("click", () => {
  localStorage.removeItem("creativeTechAnswers");
  localStorage.removeItem("creativeTechUser");
  localStorage.removeItem("creativeTechResult");
  location.reload();
});

restoreSelections();
showPage(currentPage);