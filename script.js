const terminal = document.getElementById('terminal');

const header = "sudodudu";

const lines = [
  'chmod +x sudodudu.sh',
  './sudodudu.sh',
  '',
  'Loading...',
  '',
  'Eduardo Candido Gonçalves',
  'I am a Platform Engineering Tech Lead at @Metadados',
  '',
  'Follow me: linked.in/eduardocandido | github.com/ecandido ',
  ''
];

let currentLine = 0;
let currentChar = 0;
let cursor;

function getPromptPrefix() {
  return window.innerWidth <= 600
    ? 'sudo@dudu-$: '
    : 'guest@sudodudu:-/home$: ';
}

function typeLine() {
  if (currentLine >= lines.length) {
    const lastLine = terminal.lastChild;
    if (!lastLine.querySelector('.blink')) {
      lastLine.appendChild(cursor);
    }
    return;
  }

  if (currentChar === 0) {
    const line = document.createElement('div');
    line.className = 'line';
    terminal.appendChild(line);

    line.textContent = getPromptPrefix();

    if (!cursor) {
      cursor = document.createElement('span');
      cursor.className = 'blink';
    }
    line.appendChild(cursor);
  }

  const line = terminal.children[currentLine];
  cursor.remove();
  line.textContent += lines[currentLine][currentChar] || '';
  line.appendChild(cursor);
  currentChar++;

  if (currentChar < lines[currentLine].length) {
    setTimeout(typeLine, 50);
  } else {
    cursor.remove();
    currentLine++;
    currentChar = 0;
    setTimeout(typeLine, 300);
  }
}

typeLine();