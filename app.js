// Tai Chi Week Planner - app.js

// ==================== DATA ====================

const WEEK_PLAN = [
  {
    day: "Monday",
    focus: "Foundation & Breathing",
    exercises: ["commencing-form", "parting-wild-horses-mane", "cloud-hands"]
  },
  {
    day: "Tuesday",
    focus: "Balance & Leg Strength",
    exercises: ["golden-rooster", "brush-knee", "kick-heel"]
  },
  {
    day: "Wednesday",
    focus: "Flow & Coordination",
    exercises: ["cloud-hands", "grasp-sparrows-tail", "wave-hands-clouds"]
  },
  {
    day: "Thursday",
    focus: "Core & Stability",
    exercises: ["single-whip", "parting-wild-horses-mane", "commencing-form"]
  },
  {
    day: "Friday",
    focus: "Flexibility & Stretch",
    exercises: ["brush-knee", "golden-rooster", "cloud-hands"]
  },
  {
    day: "Saturday",
    focus: "Full Form Practice",
    exercises: ["commencing-form", "grasp-sparrows-tail", "single-whip", "wave-hands-clouds"]
  },
  {
    day: "Sunday",
    focus: "Rest & Gentle Flow",
    exercises: ["cloud-hands", "commencing-form"]
  }
];

const EXERCISES = {
  "commencing-form": {
    name: "Commencing Form (起势)",
    benefit: "Calms the mind, centers breathing, prepares body for practice",
    steps: [
      "Stand with feet shoulder-width apart, arms relaxed at your sides.",
      "Inhale slowly as you raise arms forward to shoulder height, palms facing down.",
      "Exhale as you bend elbows and press palms downward, as if pushing water.",
      "Lower arms slowly back to sides, sinking into your legs slightly.",
      "Hold the lowered position for 3 deep breaths, feeling grounded.",
      "Repeat the rising and lowering motion 3 times with steady breathing."
    ]
  },
  "parting-wild-horses-mane": {
    name: "Parting the Wild Horse's Mane (野马分鬃)",
    benefit: "Improves balance, strengthens legs, opens chest and shoulders",
    steps: [
      "Start in bow stance: left foot forward, knees bent, weight 70% on front foot.",
      "Raise left arm to chest height, palm facing inward like holding a shield.",
      "Right hand extends forward at waist height, palm down as if petting a horse.",
      "Shift weight to back foot while turning waist to the left.",
      "Left arm sweeps upward and outward, parting the 'mane'.",
      "Right hand presses down beside right hip, completing the movement.",
      "Return to center and repeat on the opposite side.",
      "Alternate sides 6 times, moving slowly and continuously."
    ]
  },
  "cloud-hands": {
    name: "Cloud Hands (云手)",
    benefit: "Develops waist rotation, improves coordination, relaxes shoulders",
    steps: [
      "Stand with feet wider than shoulders, knees slightly bent.",
      "Raise right hand to face height, palm facing inward like a cloud.",
      "Left hand rests at waist level, palm facing up.",
      "Turn waist to the right while right hand sweeps across face.",
      "As waist turns left, both hands switch positions smoothly.",
      "Shift weight from right foot to left foot with each turn.",
      "Hands move in continuous circular patterns like clouds drifting.",
      "Keep movements fluid and connected, never pausing.",
      "Repeat 8-10 times, maintaining steady breathing throughout."
    ]
  },
  "golden-rooster": {
    name: "Golden Rooster Stands on One Leg (金鸡独立)",
    benefit: "Builds single-leg balance, strengthens core, improves focus",
    steps: [
      "Stand tall with feet together, arms relaxed at sides.",
      "Shift weight entirely onto left foot, rooting down through the foot.",
      "Slowly raise right knee to hip height, keeping shin vertical.",
      "Simultaneously raise right palm upward to shoulder height.",
      "Left hand presses down beside left hip for counterbalance.",
      "Hold the position for 5 slow breaths, gazing at a fixed point.",
      "Lower leg and arms slowly with control.",
      "Repeat on the opposite side, raising left knee and left palm.",
      "Alternate 3 times per side, increasing hold time gradually."
    ]
  },
  "brush-knee": {
    name: "Brush Knee and Push (搂膝拗步)",
    benefit: "Develops leg power, coordinates upper and lower body",
    steps: [
      "Begin in bow stance with right foot forward, hands at waist.",
      "Right hand circles down and brushes past the right knee.",
      "Left hand pushes forward at chest height, palm facing out.",
      "Turn waist slightly to the left as the push completes.",
      "Shift weight forward into the push, sinking into front leg.",
      "Return to center, bringing both hands back to waist.",
      "Step forward with left foot and repeat on opposite side.",
      "Continue alternating, moving forward across the room.",
      "Keep the brushing hand soft and the pushing hand firm."
    ]
  },
  "kick-heel": {
    name: "Kick with Heel (蹬脚)",
    benefit: "Strengthens legs, improves flexibility, develops power",
    steps: [
      "Stand on left foot, right foot lifted with knee bent.",
      "Cross wrists in front of chest, left wrist on top.",
      "Extend right leg forward, pushing with the heel, toes pulled up.",
      "Simultaneously separate hands, pushing outward to sides.",
      "The kick and hand separation happen together explosively.",
      "Immediately retract leg and return wrists to crossed position.",
      "Lower foot to ground with control.",
      "Repeat 3 times on right side, then switch to left.",
      "Keep upper body upright throughout, don't lean back."
    ]
  },
  "grasp-sparrows-tail": {
    name: "Grasp the Sparrow's Tail (揽雀尾)",
    benefit: "Teaches the four fundamental energies: ward-off, roll-back, press, push",
    steps: [
      "Step left foot forward into bow stance, raise left arm forward (Ward-Off).",
      "Left arm curves upward like a bird's chest, palm facing inward.",
      "Shift weight back, turning waist left while both hands lower (Roll-Back).",
      "Right hand comes up under left elbow, left hand extends forward (Press).",
      "Press forward with both hands, palms facing each other.",
      "Shift weight back, then push forward with both palms (Push).",
      "Sink into front leg as push completes, arms extended at chest height.",
      "Return to starting position and repeat the sequence 3 times.",
      "Each movement flows into the next without interruption."
    ]
  },
  "single-whip": {
    name: "Single Whip (单鞭)",
    benefit: "Opens the chest, stretches the spine, develops spiral energy",
    steps: [
      "From Grasp the Sparrow's Tail, shift weight to back foot.",
      "Turn waist to the left, extending left arm outward at shoulder height.",
      "Form a hook with right hand: fingers pointing down, wrist bent.",
      "Step right foot forward into bow stance, turning waist right.",
      "Left hand pushes forward at face height, palm facing out.",
      "Right hook hand extends to the right at shoulder height.",
      "Weight settles 70% on front leg, back leg straight but not locked.",
      "Hold for 3 breaths, feeling the stretch across the chest.",
      "Return to center and repeat on the opposite side."
    ]
  },
  "wave-hands-clouds": {
    name: "Wave Hands Like Clouds (云手)",
    benefit: "Smooth waist rotation, relaxed shoulders, continuous flow",
    steps: [
      "Stand with feet parallel, wider than shoulders, knees bent.",
      "Right hand rises to face height, palm facing you like a cloud.",
      "Left hand rests at navel height, palm facing up.",
      "Turn waist to the right; right hand sweeps across to the right.",
      "As waist turns left, hands switch: left rises, right lowers.",
      "Shift weight smoothly from right to left with each turn.",
      "Hands trace continuous horizontal figure-eight patterns.",
      "Keep elbows relaxed and shoulders dropped throughout.",
      "Breathe naturally; movement is slow, even, and unbroken.",
      "Repeat 10 times, then reverse direction for 10 more."
    ]
  }
};

// ==================== STATE ====================

let state = {
  currentTab: "plan",
  selectedExercise: null,
  demoRunning: false,
  demoInterval: null,
  currentStep: 0,
  stepDuration: 4000,
  completedDays: [],
  completedExercises: [],
  lastActiveDate: null
};

// Load from localStorage
function loadState() {
  try {
    const saved = localStorage.getItem("taiChiState");
    if (saved) {
      const parsed = JSON.parse(saved);
      state.completedDays = parsed.completedDays || [];
      state.completedExercises = parsed.completedExercises || [];
      state.lastActiveDate = parsed.lastActiveDate || null;
      state.stepDuration = parsed.stepDuration || 4000;
    }
  } catch (e) {
    console.warn("Could not load state:", e);
  }
}

function saveState() {
  try {
    localStorage.setItem("taiChiState", JSON.stringify({
      completedDays: state.completedDays,
      completedExercises: state.completedExercises,
      lastActiveDate: state.lastActiveDate,
      stepDuration: state.stepDuration
    }));
  } catch (e) {
    console.warn("Could not save state:", e);
  }
}

// ==================== RENDERING ====================

function renderWeekGrid() {
  const grid = document.getElementById("week-grid");
  const today = new Date().toLocaleDateString("en-US", { weekday: "long" });

  grid.innerHTML = WEEK_PLAN.map((day, i) => {
    const isCompleted = state.completedDays.includes(day.day);
    const isToday = day.day === today;
    return `
      <div class="day-card ${isCompleted ? "completed" : ""} ${isToday ? "today" : ""}" data-day="${day.day}">
        <div class="day-name">${day.day}</div>
        <div class="day-focus">${day.focus}</div>
        <div class="day-check"></div>
      </div>
    `;
  }).join("");

  // Add click handlers
  grid.querySelectorAll(".day-card").forEach(card => {
    card.addEventListener("click", () => {
      const dayName = card.dataset.day;
      showDayDetail(dayName);
    });
  });
}

function showDayDetail(dayName) {
  const day = WEEK_PLAN.find(d => d.day === dayName);
  if (!day) return;

  const demoArea = document.getElementById("demo-area");
  demoArea.innerHTML = `
    <div class="demo-exercise-name">${day.day} — ${day.focus}</div>
    <div class="demo-exercise-benefit">Today's focus: ${day.focus}</div>
    <div class="step-list">
      ${day.exercises.map((exId, i) => {
        const ex = EXERCISES[exId];
        return `
          <div class="step-list-item" data-exercise="${exId}">
            <div class="step-num">${i + 1}</div>
            <div>
              <div class="step-list-text" style="font-weight:700">${ex.name}</div>
              <div class="step-list-text" style="color:var(--text-light);font-size:0.72rem">${ex.benefit}</div>
            </div>
          </div>
        `;
      }).join("")}
    </div>
    <div class="demo-controls">
      <button class="demo-btn primary" id="start-day-btn">Start Today's Practice</button>
    </div>
  `;

  // Add click handlers for exercises
  demoArea.querySelectorAll(".step-list-item").forEach(item => {
    item.addEventListener("click", () => {
      const exId = item.dataset.exercise;
      selectExercise(exId);
    });
  });

  // Start day button
  const startBtn = document.getElementById("start-day-btn");
  if (startBtn) {
    startBtn.addEventListener("click", () => {
      if (day.exercises.length > 0) {
        selectExercise(day.exercises[0]);
      }
    });
  }

  // Switch to exercise tab
  switchTab("exercise");
}

function renderExerciseSelector() {
  const selector = document.getElementById("exercise-selector");
  const allExercises = Object.keys(EXERCISES);

  selector.innerHTML = allExercises.map(id => {
    const ex = EXERCISES[id];
    const isActive = state.selectedExercise === id;
    return `
      <div class="exercise-chip ${isActive ? "active" : ""}" data-exercise="${id}">
        ${ex.name.split("(")[0].trim()}
      </div>
    `;
  }).join("");

  selector.querySelectorAll(".exercise-chip").forEach(chip => {
    chip.addEventListener("click", () => {
      const exId = chip.dataset.exercise;
      selectExercise(exId);
    });
  });
}

function selectExercise(exId) {
  state.selectedExercise = exId;
  state.currentStep = 0;
  stopDemo();
  renderExerciseSelector();
  renderDemoArea();
}

function renderDemoArea() {
  const demoArea = document.getElementById("demo-area");

  if (!state.selectedExercise) {
    demoArea.innerHTML = '<p class="placeholder-text">Select an exercise above to begin the demonstration.</p>';
    return;
  }

  const ex = EXERCISES[state.selectedExercise];
  if (!ex) return;

  demoArea.innerHTML = `
    <div class="demo-exercise-name">${ex.name}</div>
    <div class="demo-exercise-benefit">${ex.benefit}</div>
    <div class="step-display">
      <div class="step-animation" id="step-emoji">🧘</div>
      <div class="step-text" id="step-text">Press Start to begin</div>
      <div class="step-counter" id="step-counter">Step 0 of ${ex.steps.length}</div>
    </div>
    <div class="progress-bar-wrap">
      <div class="progress-bar-fill" id="demo-progress" style="width:0%"></div>
    </div>
    <div class="demo-controls">
      <button class="demo-btn secondary" id="demo-prev" disabled>⏮ Prev</button>
      <button class="demo-btn primary" id="demo-start">▶ Start</button>
      <button class="demo-btn secondary" id="demo-next" disabled>Next ⏭</button>
    </div>
    <div class="step-list">
      ${ex.steps.map((step, i) => `
        <div class="step-list-item" data-step="${i}">
          <div class="step-num">${i + 1}</div>
          <div class="step-list-text">${step}</div>
        </div>
      `).join("")}
    </div>
  `;

  // Event listeners
  document.getElementById("demo-start").addEventListener("click", toggleDemo);
  document.getElementById("demo-prev").addEventListener("click", prevStep);
  document.getElementById("demo-next").addEventListener("click", nextStep);

  // Click on step list items
  demoArea.querySelectorAll(".step-list-item").forEach(item => {
    item.addEventListener("click", () => {
      const step = parseInt(item.dataset.step);
      goToStep(step);
    });
  });
}

function updateDemoDisplay() {
  const ex = EXERCISES[state.selectedExercise];
  if (!ex) return;

  const stepText = document.getElementById("step-text");
  const stepCounter = document.getElementById("step-counter");
  const stepEmoji = document.getElementById("step-emoji");
  const progressFill = document.getElementById("demo-progress");
  const startBtn = document.getElementById("demo-start");
  const prevBtn = document.getElementById("demo-prev");
  const nextBtn = document.getElementById("demo-next");

  if (state.currentStep === 0 && !state.demoRunning) {
    stepText.textContent = "Press Start to begin";
    stepCounter.textContent = `Step 0 of ${ex.steps.length}`;
    stepEmoji.textContent = "🧘";
    progressFill.style.width = "0%";
    startBtn.textContent = "▶ Start";
    prevBtn.disabled = true;
    nextBtn.disabled = true;
    return;
  }

  const stepIndex = Math.min(state.currentStep, ex.steps.length - 1);
  stepText.textContent = ex.steps[stepIndex];
  stepCounter.textContent = `Step ${stepIndex + 1} of ${ex.steps.length}`;
  stepEmoji.textContent = getStepEmoji(stepIndex, ex.steps.length);
  progressFill.style.width = `${((stepIndex + 1) / ex.steps.length) * 100}%`;

  startBtn.textContent = state.demoRunning ? "⏸ Pause" : "▶ Resume";
  prevBtn.disabled = state.currentStep <= 0;
  nextBtn.disabled = state.currentStep >= ex.steps.length - 1;

  // Highlight current step in list
  document.querySelectorAll(".step-list-item").forEach((item, i) => {
    item.style.background = i === stepIndex ? "var(--accent-light)" : "";
    item.style.borderRadius = i === stepIndex ? "8px" : "";
  });

  // Mark exercise as completed when reaching the end
  if (state.currentStep >= ex.steps.length - 1) {
    markExerciseCompleted(state.selectedExercise);
  }
}

function getStepEmoji(step, total) {
  const emojis = ["🧘", "🌬️", "⬆️", "⬇️", "🔄", "👐", "🦶", "💪", "✨", "🎯"];
  return emojis[step % emojis.length];
}

// ==================== DEMO CONTROL ====================

function toggleDemo() {
  if (state.demoRunning) {
    stopDemo();
  } else {
    startDemo();
  }
}

function startDemo() {
  const ex = EXERCISES[state.selectedExercise];
  if (!ex) return;

  if (state.currentStep >= ex.steps.length - 1) {
    state.currentStep = 0;
  }

  state.demoRunning = true;
  updateDemoDisplay();

  state.demoInterval = setInterval(() => {
    state.currentStep++;
    const ex = EXERCISES[state.selectedExercise];
    if (state.currentStep >= ex.steps.length) {
      state.currentStep = ex.steps.length - 1;
      stopDemo();
    }
    updateDemoDisplay();
  }, state.stepDuration);
}

function stopDemo() {
  state.demoRunning = false;
  if (state.demoInterval) {
    clearInterval(state.demoInterval);
    state.demoInterval = null;
  }
  updateDemoDisplay();
}

function nextStep() {
  const ex = EXERCISES[state.selectedExercise];
  if (!ex) return;
  if (state.currentStep < ex.steps.length - 1) {
    state.currentStep++;
    updateDemoDisplay();
  }
}

function prevStep() {
  if (state.currentStep > 0) {
    state.currentStep--;
    updateDemoDisplay();
  }
}

function goToStep(step) {
  const ex = EXERCISES[state.selectedExercise];
  if (!ex) return;
  state.currentStep = Math.max(0, Math.min(step, ex.steps.length - 1));
  updateDemoDisplay();
}

// ==================== PROGRESS ====================

function markExerciseCompleted(exId) {
  if (!state.completedExercises.includes(exId)) {
    state.completedExercises.push(exId);
    saveState();
    renderProgress();
  }

  // Check if all exercises for today are done
  const today = new Date().toLocaleDateString("en-US", { weekday: "long" });
  const todayPlan = WEEK_PLAN.find(d => d.day === today);
  if (todayPlan) {
    const allDone = todayPlan.exercises.every(ex => state.completedExercises.includes(ex));
    if (allDone && !state.completedDays.includes(today)) {
      state.completedDays.push(today);
      state.lastActiveDate = new Date().toDateString();
      saveState();
      renderWeekGrid();
      renderProgress();
    }
  }
}

function renderProgress() {
  // Stats
  document.getElementById("stat-days").textContent = state.completedDays.length;
  document.getElementById("stat-exercises").textContent = state.completedExercises.length;

  // Calculate streak
  let streak = 0;
  const now = new Date();
  for (let i = 0; i < 30; i++) {
    const checkDate = new Date(now);
    checkDate.setDate(checkDate.getDate() - i);
    const dayName = checkDate.toLocaleDateString("en-US", { weekday: "long" });
    if (state.completedDays.includes(dayName)) {
      streak++;
    } else if (i > 0) {
      break;
    }
  }
  document.getElementById("stat-streak").textContent = streak;

  // Calendar
  const calendar = document.getElementById("progress-calendar");
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const today = new Date();

  let calHTML = '<div class="calendar-title">Last 28 Days</div><div class="calendar-grid">';
  dayNames.forEach(d => {
    calHTML += `<div class="cal-day">${d}</div>`;
  });

  // Get day of week for 28 days ago
  const startDate = new Date(today);
  startDate.setDate(startDate.getDate() - 27);
  const startDayOfWeek = startDate.getDay();

  // Add empty cells for offset
  for (let i = 0; i < startDayOfWeek; i++) {
    calHTML += `<div class="cal-cell"></div>`;
  }

  for (let i = 0; i < 28; i++) {
    const date = new Date(startDate);
    date.setDate(date.getDate() + i);
    const dayName = date.toLocaleDateString("en-US", { weekday: "long" });
    const isDone = state.completedDays.includes(dayName);
    const isToday = date.toDateString() === today.toDateString();
    const dayNum = date.getDate();

    calHTML += `<div class="cal-cell ${isDone ? "done" : ""} ${isToday ? "today" : ""}">${dayNum}</div>`;
  }

  calHTML += "</div>";
  calendar.innerHTML = calHTML;
}

// ==================== TAB NAVIGATION ====================

function switchTab(tabName) {
  state.currentTab = tabName;

  document.querySelectorAll(".tab-btn").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.tab === tabName);
  });

  document.querySelectorAll(".tab-content").forEach(content => {
    content.classList.toggle("active", content.id === `tab-${tabName}`);
  });

  if (tabName === "progress") {
    renderProgress();
  }
  if (tabName === "exercise") {
    renderExerciseSelector();
    renderDemoArea();
  }
}

// ==================== REMINDERS ====================

function initReminders() {
  const toggle = document.getElementById("reminder-toggle");
  const timeInput = document.getElementById("reminder-time");
  const saveBtn = document.getElementById("save-reminder");
  const status = document.getElementById("reminder-status");

  // Load saved settings
  const savedReminder = localStorage.getItem("taiChiReminder");
  if (savedReminder) {
    const settings = JSON.parse(savedReminder);
    toggle.checked = settings.enabled;
    timeInput.value = settings.time || "08:00";
  }

  saveBtn.addEventListener("click", () => {
    const settings = {
      enabled: toggle.checked,
      time: timeInput.value
    };
    localStorage.setItem("taiChiReminder", JSON.stringify(settings));

    if (toggle.checked && "Notification" in window) {
      Notification.requestPermission().then(perm => {
        if (perm === "granted") {
          status.textContent = `Reminder set for ${timeInput.value} daily`;
          scheduleNotification(timeInput.value);
        } else {
          status.textContent = "Notification permission denied";
        }
      });
    } else {
      status.textContent = "Reminder saved";
    }
  });
}

function scheduleNotification(time) {
  // Simple notification scheduling using setTimeout
  // In a real PWA, you'd use the Push API or periodic background sync
  const [hours, minutes] = time.split(":").map(Number);
  const now = new Date();
  const scheduled = new Date();
  scheduled.setHours(hours, minutes, 0, 0);

  if (scheduled <= now) {
    scheduled.setDate(scheduled.getDate() + 1);
  }

  const delay = scheduled - now;
  setTimeout(() => {
    if (Notification.permission === "granted") {
      new Notification("☯ Tai Chi Time", {
        body: "Time for your daily Tai Chi practice!",
        icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>☯</text></svg>"
      });
    }
    scheduleNotification(time); // Reschedule for next day
  }, delay);
}

// ==================== PWA INSTALL ====================

let deferredPrompt = null;

function initPWA() {
  window.addEventListener("beforeinstallprompt", (e) => {
    e.preventDefault();
    deferredPrompt = e;
    const installBtn = document.getElementById("install-btn");
    installBtn.style.display = "block";
    installBtn.addEventListener("click", () => {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then(() => {
        deferredPrompt = null;
        installBtn.style.display = "none";
      });
    });
  });
}

// ==================== SETTINGS ====================

function initSettings() {
  const stepSlider = document.getElementById("step-duration");
  const stepVal = document.getElementById("step-duration-val");

  stepSlider.value = state.stepDuration / 1000;
  stepVal.textContent = `${stepSlider.value}s`;

  stepSlider.addEventListener("input", () => {
    state.stepDuration = parseInt(stepSlider.value) * 1000;
    stepVal.textContent = `${stepSlider.value}s`;
    saveState();
  });
}

// ==================== RESET ====================

function initReset() {
  document.getElementById("reset-progress").addEventListener("click", () => {
    if (confirm("Are you sure you want to reset all progress? This cannot be undone.")) {
      state.completedDays = [];
      state.completedExercises = [];
      state.lastActiveDate = null;
      saveState();
      renderWeekGrid();
      renderProgress();
    }
  });
}

// ==================== INIT ====================

function init() {
  loadState();

  // Auto-select first exercise so Demo tab has content on load
  if (!state.selectedExercise) {
    state.selectedExercise = Object.keys(EXERCISES)[0];
    state.currentStep = 0;
  }

  renderWeekGrid();
  renderExerciseSelector();
  renderDemoArea();
  renderProgress();
  initReminders();
  initPWA();
  initSettings();
  initReset();

  // Tab navigation
  document.querySelectorAll(".tab-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      switchTab(btn.dataset.tab);
    });
  });
}

// Start the app
document.addEventListener("DOMContentLoaded", init);
