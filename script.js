const terminal = document.getElementById('terminal');
const lines = [
  'chmod +x sudodudu.sh',
  './sudodudu.sh',
  '',
  'Loading...',
  '',
  'Eduardo Candido Gonçalves',
  'Platform Engineering Tech Lead at @Metadados',
  '',
  'Follow me: <a href="https://linkedin.com/in/eduardocandido" target="_blank">linked.in/eduardocandido</a> | <a href="https://github.com/ecandido" target="_blank">github.com/ecandido</a>',
  '',
  'type "help" for more information.',
];

let currentLine = 0, currentChar = 0;
const cursor = document.createElement('span');

function getPromptPrefix() {
  return window.innerWidth <= 600 ? 'sudo@dudu-$: ' : 'guest@sudodudu:-$: ';
}

function typeLine() {
  if (currentLine >= lines.length) return makeLastLineWritable();

  const line = terminal.children[currentLine] || createLine();
  line.innerHTML = `<span class="prefix">${getPromptPrefix()}</span>${lines[currentLine].slice(0, ++currentChar)}`;

  currentChar < lines[currentLine].length
    ? setTimeout(typeLine, 10)
    : (currentLine++, currentChar = 0, setTimeout(() => typeLine(), 10));
}

function createLine() {
  const line = document.createElement('div');
  line.className = 'line';
  terminal.appendChild(line);
  line.appendChild(cursor);
  return line;
}

function makeLastLineWritable() {
  const inputContainer = document.createElement('div');
  inputContainer.className = 'line';
  inputContainer.innerHTML = `<span class="prefix">${getPromptPrefix()}</span><input type="text" class="terminal-input" style="display: inline-block;">`;
  terminal.appendChild(inputContainer);

  const input = inputContainer.querySelector('input');
  input.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      const userInput = input.value;
      inputContainer.innerHTML = `<span class="prefix">${getPromptPrefix()}</span>${userInput}`;
      const response = handleCommand(userInput);
      terminal.innerHTML += `<div class="line"><span class="prefix">${getPromptPrefix()}</span>${response}</div>`;
      makeLastLineWritable();
      scrollToBottom();
    }
  });

  input.focus();
  scrollToBottom();
}

function scrollToBottom() {
  terminal.scrollTop = terminal.scrollHeight;
}

const commands = {
  help: () => `
Available commands:
- help: Show this help message
- ls: List files
- exit: Exit the terminal
`,
  ls: () => `
- sudodudu.sh
`,
  exit: () => `
Exiting terminal...
`,
};

function handleCommand(input) {
  const command = input.trim();
  if (command === 'exit') {
    setTimeout(() => window.close(), 1000);
    return commands[command]();
  }
  return commands[command] ? commands[command]() : `Sorry, my cat dropped this command. Try "help".`;
}

document.getElementById('close-button').addEventListener('click', () => {
  window.close();
});

document.getElementById('minimize-button').addEventListener('click', () => {
  const terminal = document.getElementById('terminal');
  terminal.innerHTML = `
       /\\     /\\
      {  \`---'  }
      {  O   O  }
      ~~>  V  <~~
       \\  \\|/  /
        \`-----'____
        /     \\    \\_
       {       }\\  )_\\_   _
       |  \\_/  |/ /  \\_\\_/ )
        \\__/  /(_/     \\__/
         (___/

       You found Azazela!
`;

});

typeLine();