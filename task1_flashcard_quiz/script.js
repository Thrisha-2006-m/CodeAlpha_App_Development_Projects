const defaultCards = [
  { question: "What does HTML stand for?", answer: "HyperText Markup Language. It structures content on web pages." },
  { question: "What is CSS used for?", answer: "Cascading Style Sheets. CSS controls the appearance and layout of web pages." },
  { question: "What does JavaScript add to a website?", answer: "JavaScript adds behaviour and interactivity, such as buttons, forms and dynamic updates." }
];

let cards = loadCards();
let currentIndex = 0;
let showingAnswer = false;
let editingIndex = null;

const counter = document.getElementById("counter");
const progressLabel = document.getElementById("progress-label");
const progressFill = document.getElementById("progress-fill");
const cardSide = document.getElementById("card-side");
const cardContent = document.getElementById("card-content");
const showAnswerButton = document.getElementById("show-answer");
const previousButton = document.getElementById("previous");
const nextButton = document.getElementById("next");
const form = document.getElementById("card-form");
const questionInput = document.getElementById("question");
const answerInput = document.getElementById("answer");
const saveButton = document.getElementById("save-card");
const cancelEditButton = document.getElementById("cancel-edit");
const message = document.getElementById("message");

function loadCards() {
  try {
    const saved = JSON.parse(localStorage.getItem("codealpha-flashcards"));
    return Array.isArray(saved) && saved.length ? saved : [...defaultCards];
  } catch {
    return [...defaultCards];
  }
}
function saveCards() {
  localStorage.setItem("codealpha-flashcards", JSON.stringify(cards));
}
function renderCard() {
  if (!cards.length) {
    cardSide.textContent = "NO FLASHCARDS";
    cardContent.textContent = "Add a question and answer below to get started.";
    counter.textContent = "Card 0 of 0";
    progressLabel.textContent = "Your deck is empty";
    progressFill.style.width = "0%";
    showAnswerButton.disabled = true;
    previousButton.disabled = true;
    nextButton.disabled = true;
    document.getElementById("edit-card").disabled = true;
    document.getElementById("delete-card").disabled = true;
    return;
  }
  const card = cards[currentIndex];
  cardSide.textContent = showingAnswer ? "ANSWER" : "QUESTION";
  cardContent.textContent = showingAnswer ? card.answer : card.question;
  showAnswerButton.textContent = showingAnswer ? "Show Question" : "Show Answer";
  showAnswerButton.disabled = false;
  counter.textContent = `Card ${currentIndex + 1} of ${cards.length}`;
  progressLabel.textContent = `${Math.round(((currentIndex + 1) / cards.length) * 100)}% through deck`;
  progressFill.style.width = `${((currentIndex + 1) / cards.length) * 100}%`;
  previousButton.disabled = currentIndex === 0;
  nextButton.disabled = currentIndex === cards.length - 1;
  document.getElementById("edit-card").disabled = false;
  document.getElementById("delete-card").disabled = false;
}
showAnswerButton.addEventListener("click", () => { showingAnswer = !showingAnswer; renderCard(); });
previousButton.addEventListener("click", () => { if (currentIndex > 0) currentIndex--; showingAnswer = false; renderCard(); });
nextButton.addEventListener("click", () => { if (currentIndex < cards.length - 1) currentIndex++; showingAnswer = false; renderCard(); });

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const question = questionInput.value.trim();
  const answer = answerInput.value.trim();
  if (!question || !answer) return;
  if (editingIndex !== null) {
    cards[editingIndex] = { question, answer };
    currentIndex = editingIndex;
    message.textContent = "Flashcard updated successfully.";
  } else {
    cards.push({ question, answer });
    currentIndex = cards.length - 1;
    message.textContent = "New flashcard added.";
  }
  saveCards();
  form.reset();
  editingIndex = null;
  saveButton.textContent = "Add Flashcard";
  cancelEditButton.hidden = true;
  showingAnswer = false;
  renderCard();
});
document.getElementById("edit-card").addEventListener("click", () => {
  if (!cards.length) return;
  editingIndex = currentIndex;
  questionInput.value = cards[currentIndex].question;
  answerInput.value = cards[currentIndex].answer;
  saveButton.textContent = "Save Changes";
  cancelEditButton.hidden = false;
  questionInput.focus();
  message.textContent = "Edit the fields and select Save Changes.";
});
cancelEditButton.addEventListener("click", () => {
  editingIndex = null;
  form.reset();
  saveButton.textContent = "Add Flashcard";
  cancelEditButton.hidden = true;
  message.textContent = "Editing cancelled.";
});
document.getElementById("delete-card").addEventListener("click", () => {
  if (!cards.length) return;
  if (!confirm("Delete this flashcard?")) return;
  cards.splice(currentIndex, 1);
  currentIndex = Math.min(currentIndex, cards.length - 1);
  showingAnswer = false;
  saveCards();
  message.textContent = "Flashcard deleted.";
  renderCard();
});
renderCard();