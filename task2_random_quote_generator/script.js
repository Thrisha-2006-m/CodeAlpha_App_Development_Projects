const quotes = [
  { text: "The secret of getting ahead is getting started.", author: "Mark Twain" },
  { text: "It always seems impossible until it's done.", author: "Nelson Mandela" },
  { text: "Great things are done by a series of small things brought together.", author: "Vincent van Gogh" },
  { text: "Success is the sum of small efforts, repeated day in and day out.", author: "Robert Collier" },
  { text: "Believe you can and you're halfway there.", author: "Theodore Roosevelt" },
  { text: "The future depends on what you do today.", author: "Mahatma Gandhi" },
  { text: "Learning never exhausts the mind.", author: "Leonardo da Vinci" },
  { text: "Dream big and dare to fail.", author: "Norman Vaughan" },
  { text: "Well done is better than well said.", author: "Benjamin Franklin" },
  { text: "Your time is limited, so don't waste it living someone else's life.", author: "Steve Jobs" }
];

let previousIndex = -1;
function showRandomQuote() {
  let index;
  if (quotes.length === 1) index = 0;
  else {
    do { index = Math.floor(Math.random() * quotes.length); }
    while (index === previousIndex);
  }
  previousIndex = index;
  document.getElementById("quote").textContent = quotes[index].text;
  document.getElementById("author").textContent = `— ${quotes[index].author}`;
}
document.getElementById("new-quote").addEventListener("click", showRandomQuote);
showRandomQuote();