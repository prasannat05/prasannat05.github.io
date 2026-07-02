/* --- AETHERIS OS v1.0.4 CORE ENGINE --- */

document.addEventListener('DOMContentLoaded', () => {
  initNeuralNetwork();
  runBootSequence();
  initSystemTime();
  initNavigation();
  initLogTicker();
  initSkillTrigger();
});

/* =========================================================================
   1. DYNAMIC NEURAL BACKGROUND CANVAS (HIGH PERFORMANCE)
   ========================================================================= */
function initNeuralNetwork() {
  const canvas = document.getElementById('neural-net');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  
  let width = canvas.width = window.innerWidth;
  let height = canvas.height = window.innerHeight;
  
  const particles = [];
  const maxParticles = Math.min(80, Math.floor((width * height) / 15000)); // Adaptive density
  const connectionDistance = 120;
  const mouse = { x: null, y: null, radius: 150 };

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  window.addEventListener('mouseout', () => {
    mouse.x = null;
    mouse.y = null;
  });

  class Particle {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.6;
      this.vy = (Math.random() - 0.5) * 0.6;
      this.radius = Math.random() * 2 + 1;
      this.color = Math.random() > 0.3 ? 'rgba(0, 242, 254, 0.4)' : 'rgba(161, 85, 255, 0.4)';
    }

    update() {
      // Bounds check
      if (this.x < 0 || this.x > width) this.vx *= -1;
      if (this.y < 0 || this.y > height) this.vy *= -1;

      this.x += this.vx;
      this.y += this.vy;

      // Mouse attraction / deflection
      if (mouse.x !== null && mouse.y !== null) {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < mouse.radius) {
          const force = (mouse.radius - dist) / mouse.radius;
          // Subtly pull particles toward cursor
          this.x += (dx / dist) * force * 0.8;
          this.y += (dy / dist) * force * 0.8;
        }
      }
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.fill();
    }
  }

  // Populate particles array
  for (let i = 0; i < maxParticles; i++) {
    particles.push(new Particle());
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);

    // Draw grid nodes & connections
    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw();

      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < connectionDistance) {
          const alpha = (1 - (dist / connectionDistance)) * 0.15;
          ctx.strokeStyle = `rgba(0, 242, 254, ${alpha})`;
          ctx.lineWidth = 0.8;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(animate);
  }
  
  animate();
}

/* =========================================================================
   2. BOOT SEQUENCE SIMULATION
   ========================================================================= */
const bootLogs = [
  { text: "AETHERIS v1.0.4 initializing bootstrap protocol...", type: "info" },
  { text: "CORE_PROCESSORS: Dual-Threaded Neural Link active.", type: "info" },
  { text: "ALLOCATING VIRTUAL MEMORY... [OK] 8.5 GB Allocated.", type: "success" },
  { text: "MOUNTING DRIVES: C:\\PRASANNA_T\\...", type: "info" },
  { text: "RESOLVING ENDPOINTS: github.com/prasannat05... CONNECTED", type: "success" },
  { text: "RESOLVING ENDPOINTS: linkedin.com/in/prasannat05... CONNECTED", type: "success" },
  { text: "LOADING COGNITIVE NLP ENGINE... TRANSFORMERS STACK LOADED", type: "info" },
  { text: "SCANNING EDUCATION NODES: Thiagarajar College of Engg... FOUND", type: "info" },
  { text: "SCANNING SYSTEM INTERESTS: AI/ML & Full Stack Web... COMPILED", type: "success" },
  { text: "SYSTEM DIAGNOSTICS: Complete. No logical errors found.", type: "success" },
  { text: "AETHERIS OS ready for user terminal connection.", type: "success" }
];

function runBootSequence() {
  const logContainer = document.getElementById('boot-log');
  const progressBar = document.getElementById('boot-progress');
  const percentText = document.getElementById('boot-percent');
  const startBtn = document.getElementById('boot-start-btn');
  const bootScreen = document.getElementById('boot-screen');
  
  if (!logContainer || !progressBar || !startBtn || !bootScreen) return;

  let currentLogIdx = 0;
  let currentPercent = 0;
  
  function addLogLine() {
    if (currentLogIdx >= bootLogs.length) return;
    
    const log = bootLogs[currentLogIdx];
    const line = document.createElement('div');
    line.className = `terminal-line ${log.type}`;
    
    const timeSpan = document.createElement('span');
    timeSpan.style.color = '#475569';
    const now = new Date();
    timeSpan.textContent = `[${now.toTimeString().split(' ')[0]}]`;
    
    const textSpan = document.createElement('span');
    textSpan.textContent = log.text;
    
    line.appendChild(timeSpan);
    line.appendChild(textSpan);
    logContainer.appendChild(line);
    
    logContainer.scrollTop = logContainer.scrollHeight;
    currentLogIdx++;
    
    // Progress increment step
    const randomDelay = Math.random() * 200 + 100;
    setTimeout(addLogLine, randomDelay);
  }

  // Animate progress bar linked to logs
  const progressInterval = setInterval(() => {
    currentPercent += Math.floor(Math.random() * 4) + 1;
    if (currentPercent >= 100) {
      currentPercent = 100;
      clearInterval(progressInterval);
      
      // Reveal Start Button
      startBtn.classList.add('visible');
    }
    progressBar.style.width = `${currentPercent}%`;
    percentText.textContent = `${currentPercent.toString().padStart(2, '0')}%`;
  }, 100);

  // Initial call
  setTimeout(addLogLine, 200);

  // Start OS action
  startBtn.addEventListener('click', () => {
    bootScreen.classList.add('fade-out');
    // Set latency ping simulation
    setInterval(updatePing, 3000);
    // Print initial dynamic logs
    triggerInitialAnimation();
  });
}

function triggerInitialAnimation() {
  // Animate initial skills since the first screen loads immediately
  animateSkillBars('system-overview');
}

/* =========================================================================
   3. HEADER METRICS (TIME, PING)
   ========================================================================= */
function initSystemTime() {
  const timeEl = document.getElementById('system-time');
  if (!timeEl) return;

  function updateClock() {
    const now = new Date();
    timeEl.textContent = now.toTimeString().split(' ')[0];
  }
  
  setInterval(updateClock, 1000);
  updateClock();
}

function updatePing() {
  const pingEl = document.getElementById('ping-val');
  if (!pingEl) return;
  // Simulates standard variations in internet latency
  const simulatedPing = Math.floor(Math.random() * 18) + 8;
  pingEl.textContent = simulatedPing;
}

/* =========================================================================
   4. NAVIGATION & VIEW ROUTER
   ========================================================================= */
function initNavigation() {
  const navItems = document.querySelectorAll('.nav-item');
  const panels = document.querySelectorAll('.system-panel');
  const windowTitle = document.getElementById('window-title');
  const contentWindow = document.getElementById('content-window');
  
  navItems.forEach(item => {
    item.addEventListener('click', () => {
      const panelId = item.getAttribute('data-panel');
      if (!panelId) return;

      // Update active tabs
      navItems.forEach(n => n.classList.remove('active'));
      item.classList.add('active');

      // Update panels display
      panels.forEach(p => p.classList.remove('active'));
      
      const activePanel = document.getElementById(panelId);
      if (activePanel) {
        activePanel.classList.add('active');
      }

      // Update Chrome Title Name
      const execName = item.querySelector('span').textContent;
      if (windowTitle) {
        windowTitle.textContent = `C:\\AETHERIS\\${execName}`;
      }

      // Comm Link Special styling glow
      if (panelId === 'comm-link') {
        contentWindow.classList.add('purple-mode');
      } else {
        contentWindow.classList.remove('purple-mode');
      }

      // Trigger Skill Progress Animation when entering skills matrix
      animateSkillBars(panelId);

      // Log action to footer terminal stream
      pushToLogTicker(`[USER] Loaded program node: ${execName}`);
    });
  });
}

/* =========================================================================
   5. PROGRESS BARS LOADING TRIGGER
   ========================================================================= */
function animateSkillBars(panelId) {
  if (panelId !== 'skills-matrix') return;
  
  const progressFills = document.querySelectorAll('.progress-fill');
  progressFills.forEach(fill => {
    const targetWidth = fill.getAttribute('data-width');
    // Small delay to let the animation panel trigger display block first
    setTimeout(() => {
      fill.style.width = targetWidth;
    }, 100);
  });
}

function initSkillTrigger() {
  // Ensure bars reset when not in viewport to allow re-animation (satisfying UI loop)
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) {
        const progressFills = entry.target.querySelectorAll('.progress-fill');
        progressFills.forEach(fill => fill.style.width = '0%');
      }
    });
  });
  
  const skillsPanel = document.getElementById('skills-matrix');
  if (skillsPanel) observer.observe(skillsPanel);
}

/* =========================================================================
   6. CONSOLE FOOTER STATUS LOG STREAM
   ========================================================================= */
const tickerLogs = [
  "AETHERIS Core operational. Boot sequence completed successfully.",
  "[SYS] Connection integrity SECURE. Monitoring neural pathways.",
  "[DB] Syncing database clusters: prasannat.it@gmail.com...",
  "[OK] Node neural connection density: 0.984",
  "[SYS] Syncing academic credentials... CGPA Core: 8.5/10.0 verified.",
  "[INFO] Smart India Hackathon national team modules cached.",
  "[SYS] HuggingFace Transformers model pipeline online: SMART_GRIEVANCE v1.0",
  "[NET] Syncing MapMoments firebase core geolocation coordinates...",
  "[SYS] Querying Infosys Springboard accreditation APIs...",
  "[OK] Google Cloud Agentic AI Day presentation deck loaded."
];

let tickerInterval = null;

function initLogTicker() {
  const tickerEl = document.getElementById('log-ticker');
  if (!tickerEl) return;

  let currentIdx = 0;

  function rotateLogs() {
    currentIdx = (currentIdx + 1) % tickerLogs.length;
    pushToLogTicker(tickerLogs[currentIdx]);
  }

  tickerInterval = setInterval(rotateLogs, 6000);
}

function pushToLogTicker(text) {
  const tickerEl = document.getElementById('log-ticker');
  if (!tickerEl) return;

  // Clear interval if user acts, then restart
  if (tickerInterval) {
    clearInterval(tickerInterval);
  }

  // Simulated Typing effect for new text logs
  let currentText = "";
  let idx = 0;
  
  function type() {
    if (idx < text.length) {
      currentText += text[idx];
      tickerEl.textContent = currentText;
      idx++;
      setTimeout(type, 15);
    } else {
      // Re-setup periodic loop after typing finishes
      tickerInterval = setInterval(() => {
        const nextIdx = (tickerLogs.indexOf(text) + 1) % tickerLogs.length;
        pushToLogTicker(tickerLogs[nextIdx]);
      }, 6000);
    }
  }

  type();
}

/* =========================================================================
   7. FORM HANDLING & TRANSMISSION SIMULATOR
   ========================================================================= */
function sendSystemMessage() {
  const name = document.getElementById('sender-name').value;
  const email = document.getElementById('sender-contact').value;
  const message = document.getElementById('sender-msg').value;
  const responseMsg = document.getElementById('form-ok-msg');
  const submitBtn = document.querySelector('.form-submit-btn');

  if (!name || !email || !message) return;

  // Visual transmission loading
  submitBtn.disabled = true;
  submitBtn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> TRANSMITTING...`;

  pushToLogTicker(`[SYS] Encrypting message block (AES-256) for sender: ${name}...`);

  setTimeout(() => {
    pushToLogTicker(`[SYS] Routing packet to prasannat.it@gmail.com...`);
    
    setTimeout(() => {
      // Complete mock sending process
      submitBtn.innerHTML = `<i class="fa-solid fa-check"></i> TRANSMITTED`;
      responseMsg.style.display = 'block';
      pushToLogTicker(`[OK] Message block received from host: ${email}. Packet transmission completed.`);
      
      // Reset form
      setTimeout(() => {
        document.getElementById('contact-form').reset();
        submitBtn.disabled = false;
        submitBtn.innerHTML = `<i class="fa-solid fa-paper-plane"></i> TRANSMIT_PACKET`;
        responseMsg.style.display = 'none';
      }, 5000);

    }, 1500);
  }, 1200);
}
window.sendSystemMessage = sendSystemMessage;
