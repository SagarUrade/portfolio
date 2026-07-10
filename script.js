// Active Tab Tracker Engine Switching Layout
function switchSection(sectionId) {
  // Clear out any old tab markers
  const sectionElements = document.querySelectorAll('.portfolio-section');
  const tabButtons = document.querySelectorAll('.tab-btn');
  
  sectionElements.forEach(sec => sec.classList.remove('active'));
  tabButtons.forEach(btn => btn.classList.remove('active'));
  
  // Set target view active
  const targetSec = document.getElementById(`sec-${sectionId}`);
  if(targetSec) {
    targetSec.classList.add('active');
  }
  
  // Highlighting active tabs menu text dynamically
  tabButtons.forEach(btn => {
    if(btn.innerText.includes(sectionId)) {
      btn.classList.add('active');
    }
  });

  // Keep bottom Status Bar updated layout
  document.getElementById('footerActiveTab').innerText = sectionId;
}

// Handling Dynamic Shell input processes
const cliInput = document.getElementById('cliPromptInput');
const cliHistoryBuffer = document.getElementById('cliHistoryBuffer');
const scrollContainer = document.getElementById('terminalScrollArea');

cliInput.addEventListener('keydown', function(e) {
  if (e.key === 'Enter') {
    const commandText = this.value.trim();
    if(commandText) {
      processShellCommand(commandText);
    }
    this.value = '';
  }
});

function processShellCommand(rawCmd) {
  // Echo user string entry log back into dashboard history stack
  appendLogLine(`$ ${rawCmd}`, 'cli-output-ok');
  
  const parsed = rawCmd.toLowerCase().trim();
  
  switch(parsed) {
    case 'help':
      appendLogLine(`Available Portfolio Commands:
  about    - Displays full bio information registry.
  skills   - Lists core architecture technologies.
  projects - Displays portfolio code systems.
  contact  - Shows communications gateway.
  clear    - Flushes console log lines out cleanly.`, 'text');
      break;
      
    case 'about':
      switchSection('about');
      appendLogLine("Switched viewport panel to session layer ~about", 'text');
      break;
      
    case 'skills':
      switchSection('skills');
      appendLogLine("Switched viewport panel to session layer ~skills", 'text');
      break;
      
    case 'projects':
      switchSection('projects');
      appendLogLine("Switched viewport panel to session layer ~projects", 'text');
      break;
    case 'academic':
      switchSection('academic');
      appendLogLine("Switched viewport panel to session layer ~academic", 'text');
      break;  
    case 'contact':
      switchSection('contact');
      appendLogLine("Switched viewport panel to session layer ~contact", 'text');
      break;
      
    case 'clear':
      cliHistoryBuffer.innerHTML = '';
      break;
      
    default:
      appendLogLine(`shell status code 127: command not recognized: "${rawCmd}". Type "help" for context guidelines.`, 'cli-output-err');
  }
  
  // Maintain viewport scroll updates
  scrollContainer.scrollTop = scrollContainer.scrollHeight;
}

function appendLogLine(text, styleClass) {
  const line = document.createElement('div');
  line.className = `cli-line ${styleClass}`;
  line.innerText = text;
  cliHistoryBuffer.appendChild(line);
}