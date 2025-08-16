// Motivation Quotes
const quotes = [
  "Every day is a fresh start.",
  "Believe in yourself and all that you are.",
  "Your mind is a powerful thing. Fill it with positive thoughts.",
  "Peace begins with a smile.",
  "Small steps every day lead to big results.",
  "You are stronger than you think.",
  "Mental wellness is a journey, not a destination.",
  "Breathe, relax, and refocus.",
  "Happiness is not out there; it's in you.",
  "The present moment is a place of power.",
  "Let your mind rest and recover.",
  "You are enough.",
  "Slow down and appreciate the small things.",
  "Growth is a process.",
  "Stay positive, work hard, make it happen.",
  "Believe you can and you're halfway there.",
    "Push yourself, because no one else is going to do it for you.",
    "Success is not final, failure is not fatal: It is the courage to continue that counts.",
    "Great things never come from comfort zones.",
    "Dream it. Wish it. Do it.",
    "Don't watch the clock; do what it does. Keep going.",
    "Your limitation—it's only your imagination.",
    "Do something today that your future self will thank you for.",
    "Hard work beats talent when talent doesn’t work hard.",
    "The harder you work for something, the greater you’ll feel when you achieve it.",
    "Don’t stop when you’re tired. Stop when you’re done.",
    "Wake up with determination. Go to bed with satisfaction.",
    "Do what you can with all you have, wherever you are.",
    "You are never too old to set another goal or to dream a new dream.",
    "Little things make big days.",
    "It always seems impossible until it’s done.",
    "Don’t wait for opportunity. Create it.",
    "Sometimes we’re tested not to show our weaknesses, but to discover our strengths.",
    "The key to success is to focus on goals, not obstacles.",
    "Dream bigger. Do bigger.",
    "Difficulties in life don’t come to destroy you, but to help you realize your hidden potential.",
    "Start where you are. Use what you have. Do what you can.",
    "Don’t let yesterday take up too much of today.",
    "Act as if what you do makes a difference. It does.",
    "Failure will never overtake me if my determination to succeed is strong enough.",
    "Perseverance is not a long race; it is many short races one after the other.",
    "The man who moves a mountain begins by carrying away small stones.",
    "With the new day comes new strength and new thoughts.",
    "Opportunities don't happen, you create them.",
    "Your only limit is your mind."
];

function getDailyQuote() {
  const today = new Date();
  const index = today.getDate() % quotes.length;
  return quotes[index];
}

let currentQuoteIndex = null;
// Display quote
const quoteElem = document.getElementById('motivation-quote');
function showQuote(index) {
  quoteElem.textContent = quotes[index];
}
function loadDefaultQuote() {
  const index = new Date().getDate() % quotes.length;
  currentQuoteIndex = index;
  showQuote(index);
}
loadDefaultQuote();

// Responsive New Motivation button
document.getElementById('new-quote-btn').onclick = function() {
  let newIndex;
  do {
    newIndex = Math.floor(Math.random() * quotes.length);
  } while (newIndex === currentQuoteIndex);
  currentQuoteIndex = newIndex;
  showQuote(newIndex);
};

// Theme toggler
const themeBtn = document.getElementById('toggle-theme');
themeBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
});

// Pomodoro Timer logic with Progress Circle
let timerInterval;
let timeLeft = 25 * 60; // seconds
let running = false;
let pomodoroDuration = 25 * 60;
let sessionsCount = 0;

const timerElem = document.getElementById('timer');
const startBtn = document.getElementById('start');
const pauseBtn = document.getElementById('pause');
const resetBtn = document.getElementById('reset');
const pomodoroLengthInput = document.getElementById('pomodoroLength');
const sessionsElem = document.getElementById('sessionsCount');

// Progress ring setup
const ring = document.querySelector('.progress-ring__circle');
const radius = ring.r.baseVal.value;
const circumference = 2 * Math.PI * radius;
ring.style.strokeDasharray = `${circumference} ${circumference}`;
ring.style.strokeDashoffset = circumference;

function setProgress() {
  const percent = 1 - timeLeft / pomodoroDuration;
  ring.style.strokeDashoffset = circumference - percent * circumference;
}

// Timer Display
function updateTimerDisplay() {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  timerElem.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  setProgress();
}

startBtn.addEventListener('click', () => {
  if (running || timeLeft === 0) return;
  running = true;
  timerInterval = setInterval(() => {
    if (timeLeft > 0) {
      timeLeft--;
      updateTimerDisplay();
    } else {
      clearInterval(timerInterval);
      running = false;
      sessionsCount++;
      sessionsElem.textContent = sessionsCount;
      timerElem.textContent = "Done!";
      ring.style.strokeDashoffset = circumference;
      setTimeout(() => resetTimer(), 2000);
      alert('Pomodoro session complete! Take a break.');
    }
  }, 1000);
});

pauseBtn.addEventListener('click', () => {
  clearInterval(timerInterval);
  running = false;
});

function resetTimer() {
  clearInterval(timerInterval);
  running = false;
  timeLeft = pomodoroDuration;
  updateTimerDisplay();
}
resetBtn.addEventListener('click', resetTimer);

// Custom Pomodoro length
pomodoroLengthInput.addEventListener('change', function() {
  let value = parseInt(this.value);
  if (isNaN(value) || value < 10) value = 10;
  if (value > 60) value = 60;
  pomodoroDuration = value * 60;
  timeLeft = pomodoroDuration;
  updateTimerDisplay();
  this.value = value;
});

// Initialize timer and sessions
updateTimerDisplay();
sessionsElem.textContent = sessionsCount;

// Responsive pop-up for authentication
const modalOverlay = document.getElementById('modal-overlay');
const loginBtn = document.getElementById('loginBtn');
const signupBtn = document.getElementById('signupBtn');
const closeModalBtn = document.getElementById('closeModal');
const modalTitle = document.getElementById('modalTitle');
const authForm = document.getElementById('authForm');

function openModal(title) {
  modalTitle.textContent = title;
  modalOverlay.classList.remove('hidden');
  authForm.reset();
}

loginBtn.onclick = () => openModal('Login');
signupBtn.onclick = () => openModal('Sign Up');
closeModalBtn.onclick = () => modalOverlay.classList.add('hidden');

authForm.onsubmit = function(e) {
  e.preventDefault();
  alert(modalTitle.textContent + ' successful for ' + authForm.email.value);
  modalOverlay.classList.add('hidden');
};

// Random Wellness Tips
const tips = [
    "Take a mindful walk and notice your surroundings.",
    "Try a guided breathing exercise!",
    "Write down three things you're grateful for.",
    "Disconnect from screens for 10 minutes.",
    "Listen to calming music or nature sounds.",
    "Stretch your body gently and relax.",
    "Visualize a peaceful place.",
    "Stand and take five slow, deep breaths.",
    "Drink a glass of water.",
    "Recall a happy memory.",
];

function showTip(index) {
  document.getElementById('randomTip').textContent = tips[index];
}

let currentTipIndex = 0;
function loadDefaultTip() {
  currentTipIndex = 0;
  showTip(currentTipIndex);
}
loadDefaultTip();

document.getElementById('newTipBtn').onclick = function() {
  let newIndex;
  do {
    newIndex = Math.floor(Math.random() * tips.length);
  } while (newIndex === currentTipIndex);
  currentTipIndex = newIndex;
  showTip(newIndex);
};
