
// Chat Application VI — frontend-only demo
const sendBtn = document.getElementById('sendBtn');
const clearBtn = document.getElementById('clearBtn');
const messageInput = document.getElementById('messageInput');
const chatBox = document.getElementById('chatBox');
const usernameInput = document.getElementById('usernameInput');
const usernameDisplay = document.getElementById('usernameDisplay');

let username = 'User';

usernameInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    const val = usernameInput.value.trim();
    if (val) {
      username = val.slice(0,20);
      usernameDisplay.textContent = username;
      usernameInput.value = '';
    }
  }
});


// send on click or Enter
sendBtn.addEventListener('click', sendMessage);
messageInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') sendMessage();
});

clearBtn.addEventListener('click', () => {
  chatBox.innerHTML = '';
  messageInput.focus();
});

function sendMessage() {
  const text = messageInput.value.trim();
  if (!text) return;
  appendMessage(text, 'sent', username);
  messageInput.value = '';
  // simulate typing delay & bot reply
  setTimeout(() => {
    appendMessage(getBotReply(text), 'recv', 'Bot');
  }, 700 + Math.random() * 700);
  // ensure scroll
  chatBox.scrollTop = chatBox.scrollHeight;
}

// helper to append message DOM
function appendMessage(text, type='recv', who='Bot') {
  const el = document.createElement('div');
  el.className = 'msg ' + (type === 'sent' ? 'sent' : 'recv');
  const time = new Date();
  const hh = String(time.getHours()).padStart(2,'0');
  const mm = String(time.getMinutes()).padStart(2,'0');
  el.innerHTML = `<strong>${escapeHtml(who)}</strong><div>${escapeHtml(text)}</div><span class="meta">${hh}:${mm}</span>`;
  chatBox.appendChild(el);
  // keep chat scrolled to bottom smoothly
  el.scrollIntoView({behavior: 'smooth', block: 'end'});
}

// naive bot reply function
function getBotReply(input) {
  const lower = input.toLowerCase();
  if (lower.includes('hi') || lower.includes('hello')) return 'Hello! How can I help?';
  if (lower.includes('how are')) return "I'm a demo bot — I'm fine, thanks!";
  if (lower.includes('time')) return 'Current time is ' + new Date().toLocaleTimeString();
  if (lower.includes('demo') || lower.includes('project')) return 'This is Chat Application VI — frontend demo.';
  if (lower.includes('thanks') || lower.includes('thank')) return "You're welcome!";
  if (lower.includes('bye')) return 'Goodbye — have a nice day!';
  // fallback reply
  const replies = [
    "Can you show me more details?",
    "Interesting — tell me more.",
    "I don't fully understand, try another message.",
    "Nice! 😊"
  ];
  return replies[Math.floor(Math.random()*replies.length)];
}

// small XSS-safe escape
function escapeHtml(unsafe) {
  return unsafe.replace(/[&<>"']/g, function(m){ return ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'})[m]; });
}

// focus input on load
messageInput.focus();
