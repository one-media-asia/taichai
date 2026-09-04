// Tai Chi Week Planner - app.js (EN + zh-CN)

// ==================== DATA (English source of truth; day keys stay English) ====================

javascript
try {
  var _cookies = document.cookie.split(';').reduce(function(acc, c) {
    var parts = c.trim().split('=');
    if (parts.length === 2) acc[parts[0]] = parts[1];
    return acc;
  }, {});
  if (_cookies.taichi_access !== 'granted') {
    window.location.replace('gate.html');
  }
} catch(e) { /* ignore */ }


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

// ==================== I18N ====================

const I18N = {
  en: {
    title: "☯ Tai Chi Week",
    subtitle: "Yang Style · 7-Day Journey",
    documentTitle: "Tai Chi Week Planner",
    tabPlan: "📅 Plan",
    tabDemo: "🏋️ Demo",
    tabProgress: "📊 Progress",
    tabSettings: "⚙️ Settings",
    placeholder: "Select an exercise above to begin the demonstration.",
    daysCompleted: "Days Completed",
    dayStreak: "Day Streak",
    exercisesDone: "Exercises Done",
    resetProgress: "Reset All Progress",
    confirmReset: "Are you sure you want to reset all progress? This cannot be undone.",
    dailyReminder: "⏰ Daily Reminder",
    enableReminder: "Enable reminder",
    reminderTime: "Reminder time",
    saveReminder: "Save Reminder",
    preference: "🎯 Preference",
    secondsPerStep: "Seconds per step",
    installApp: "📲 Install App",
    installHint: "Add to your home screen for the full app experience.",
    installPwa: "Install PWA",
    legal: "📜 Legal",
    privacyPolicy: "Privacy Policy",
    language: "🌐 Language",
    startTodaysPractice: "Start Today's Practice",
    todaysFocus: "Today's focus",
    pressStart: "Press Start to begin",
    stepOf: "Step {x} of {y}",
    prev: "⏮ Prev",
    start: "▶ Start",
    next: "Next ⏭",
    pause: "⏸ Pause",
    resume: "▶ Resume",
    last28Days: "Last 28 Days",
    dayAbbr: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    reminderSet: "Reminder set for {time} daily",
    notificationDenied: "Notification permission denied",
    reminderSaved: "Reminder saved",
    notifTitle: "☯ Tai Chi Time",
    notifBody: "Time for your daily Tai Chi practice!",
    weekdays: {
      Monday: "Monday",
      Tuesday: "Tuesday",
      Wednesday: "Wednesday",
      Thursday: "Thursday",
      Friday: "Friday",
      Saturday: "Saturday",
      Sunday: "Sunday"
    },
    weekFocus: {
      Monday: "Foundation & Breathing",
      Tuesday: "Balance & Leg Strength",
      Wednesday: "Flow & Coordination",
      Thursday: "Core & Stability",
      Friday: "Flexibility & Stretch",
      Saturday: "Full Form Practice",
      Sunday: "Rest & Gentle Flow"
    },
    exercises: {},
    installBannerTitle: "Install Tai Chi Week as an app",
    installBannerInstall: "Install",
    installBannerDismiss: "Not now",
    installBannerIosHint: "Tap Share, then Add to Home Screen"
  },
  "zh-CN": {
    title: "☯ 太极周计划",
    subtitle: "杨氏 · 七日之旅",
    documentTitle: "太极周计划",
    tabPlan: "📅 计划",
    tabDemo: "🏋️ 演示",
    tabProgress: "📊 进度",
    tabSettings: "⚙️ 设置",
    placeholder: "请在上方选择一个动作开始演示。",
    daysCompleted: "完成天数",
    dayStreak: "连续天数",
    exercisesDone: "已练动作",
    resetProgress: "重置全部进度",
    confirmReset: "确定要重置全部进度吗？此操作无法撤销。",
    dailyReminder: "⏰ 每日提醒",
    enableReminder: "开启提醒",
    reminderTime: "提醒时间",
    saveReminder: "保存提醒",
    preference: "🎯 偏好设置",
    secondsPerStep: "每步秒数",
    installApp: "📲 安装应用",
    installHint: "添加到主屏幕，获得完整应用体验。",
    installPwa: "安装 PWA",
    legal: "📜 法律信息",
    privacyPolicy: "隐私政策",
    language: "🌐 语言",
    startTodaysPractice: "开始今日练习",
    todaysFocus: "今日重点",
    pressStart: "点击开始",
    stepOf: "第 {x} 步，共 {y} 步",
    prev: "⏮ 上一步",
    start: "▶ 开始",
    next: "下一步 ⏭",
    pause: "⏸ 暂停",
    resume: "▶ 继续",
    last28Days: "近 28 天",
    dayAbbr: ["日", "一", "二", "三", "四", "五", "六"],
    reminderSet: "已设置每日 {time} 提醒",
    notificationDenied: "通知权限被拒绝",
    reminderSaved: "提醒已保存",
    notifTitle: "☯ 太极时间",
    notifBody: "该开始今天的太极练习了！",
    weekdays: {
      Monday: "星期一",
      Tuesday: "星期二",
      Wednesday: "星期三",
      Thursday: "星期四",
      Friday: "星期五",
      Saturday: "星期六",
      Sunday: "星期日"
    },
    weekFocus: {
      Monday: "基础与呼吸",
      Tuesday: "平衡与腿力",
      Wednesday: "连贯与协调",
      Thursday: "核心与稳定",
      Friday: "柔韧与拉伸",
      Saturday: "整套练习",
      Sunday: "休息与轻柔练习"
    },
    exercises: {
      "commencing-form": {
        name: "起势",
        benefit: "平静心神，调整呼吸，为练习做好准备",
        steps: [
          "两脚与肩同宽站立，双臂自然垂于体侧。",
          "吸气，双臂缓缓前举至与肩同高，掌心向下。",
          "呼气，屈肘下按，如轻推水面。",
          "双臂缓缓落回体侧，微微屈膝下沉。",
          "保持下沉姿势，做 3 次深呼吸，感受扎根。",
          "重复起落动作 3 次，呼吸均匀平稳。"
        ]
      },
      "parting-wild-horses-mane": {
        name: "野马分鬃",
        benefit: "改善平衡，增强腿力，开胸展肩",
        steps: [
          "弓步起势：左脚在前，屈膝，重心约七成在前脚。",
          "左臂抬至胸高，掌心向内，如持盾。",
          "右手前伸至腰高，掌心向下，如抚马背。",
          "重心移至后脚，同时腰向左转。",
          "左臂向上向外分出，如分鬃。",
          "右手按于右胯旁，完成动作。",
          "归中，换另一侧重复。",
          "左右交替 6 次，缓慢连贯。"
        ]
      },
      "cloud-hands": {
        name: "云手",
        benefit: "练腰部旋转，提升协调，放松肩部",
        steps: [
          "两脚比肩略宽，微屈膝站立。",
          "右手抬至面高，掌心向内，如云。",
          "左手置于腰际，掌心向上。",
          "腰向右转，右手横扫过面部。",
          "腰向左转时，双手顺势换位。",
          "每次转身，重心由右脚移到左脚。",
          "双手连续划圆，如云飘动。",
          "动作连贯流畅，不要停顿。",
          "重复 8–10 次，保持均匀呼吸。"
        ]
      },
      "golden-rooster": {
        name: "金鸡独立",
        benefit: "锻炼单腿平衡，强化核心，提升专注",
        steps: [
          "并脚站立，双臂自然下垂。",
          "重心完全落到左脚，脚掌扎根。",
          "缓缓抬起右膝至髋高，小腿垂直。",
          "同时右掌上举至肩高。",
          "左手下按于左胯旁以平衡。",
          "注视一点，保持姿势做 5 次慢呼吸。",
          "缓慢有控制地落下腿与手臂。",
          "换另一侧，抬左膝与左掌。",
          "左右各 3 次，逐渐延长保持时间。"
        ]
      },
      "brush-knee": {
        name: "搂膝拗步",
        benefit: "发展腿力，协调上下肢",
        steps: [
          "右脚在前弓步，双手置于腰际。",
          "右手向下划弧，搂过右膝。",
          "左掌前推至胸高，掌心向外。",
          "推掌完成时腰略向左转。",
          "重心前移沉入前腿。",
          "双手收回腰际归中。",
          "上左脚，换另一侧重复。",
          "左右交替前行。",
          "搂手宜柔，推掌宜沉稳。"
        ]
      },
      "kick-heel": {
        name: "蹬脚",
        benefit: "增强腿力，提高柔韧，培养发力",
        steps: [
          "左脚站立，右脚抬起屈膝。",
          "两腕在胸前交叉，左腕在上。",
          "右腿向前蹬出，以脚跟发力，脚尖上勾。",
          "同时双手向两侧推出。",
          "蹬脚与分手同时完成。",
          "立即收腿，两腕回到交叉位。",
          "有控制地落脚。",
          "右侧做 3 次后换左侧。",
          "上身保持直立，不要后仰。"
        ]
      },
      "grasp-sparrows-tail": {
        name: "揽雀尾",
        benefit: "学习掤、捋、挤、按四种基本劲法",
        steps: [
          "左脚上步成弓步，左臂前掤（掤）。",
          "左臂上弧如雀胸，掌心向内。",
          "重心后移，腰左转，双手下捋（捋）。",
          "右手上托左肘下，左手前伸（挤）。",
          "双手相向前挤。",
          "重心后移再双掌前按（按）。",
          "按完沉入前腿，双臂在胸高伸出。",
          "归位，整套重复 3 次。",
          "各式连贯，不停顿。"
        ]
      },
      "single-whip": {
        name: "单鞭",
        benefit: "开胸伸脊，培养螺旋劲",
        steps: [
          "由揽雀尾，重心移到后脚。",
          "腰左转，左臂向外侧伸至肩高。",
          "右手成勾手：指尖下垂，屈腕。",
          "右脚上步成弓步，腰右转。",
          "左掌前推至面高，掌心向外。",
          "右勾手向右侧伸至肩高。",
          "重心约七成在前腿，后腿伸直但不僵。",
          "保持 3 次呼吸，感受开胸。",
          "归中，换另一侧重复。"
        ]
      },
      "wave-hands-clouds": {
        name: "云手（左右云手）",
        benefit: "腰转顺畅，肩部放松，连绵不断",
        steps: [
          "两脚平行，比肩略宽，屈膝站立。",
          "右手抬至面高，掌心向己如云。",
          "左手置于肚脐高，掌心向上。",
          "腰右转，右手向右横扫。",
          "腰左转时双手换位：左手上升，右手下落。",
          "重心随转身由右脚平滑移到左脚。",
          "双手划连续水平 8 字。",
          "肘松肩沉。",
          "自然呼吸；动作缓慢均匀不断。",
          "重复 10 次，再反向 10 次。"
        ]
      }
    },
    installBannerTitle: "将太极周安装为应用",
    installBannerInstall: "安装",
    installBannerDismiss: "暂不",
    installBannerIosHint: "点击分享，然后选择“添加到主屏幕”"
  }
};

// Fill English exercise entries from EXERCISES source of truth
Object.keys(EXERCISES).forEach((id) => {
  I18N.en.exercises[id] = {
    name: EXERCISES[id].name,
    benefit: EXERCISES[id].benefit,
    steps: EXERCISES[id].steps.slice()
  };
});

let currentLocale = "en";

function detectLocale() {
  try {
    const saved = localStorage.getItem("taiChiLang");
    if (saved === "en" || saved === "zh-CN") return saved;
  } catch (e) { /* ignore */ }
  const nav = (navigator.language || navigator.userLanguage || "en").toLowerCase();
  return nav.startsWith("zh") ? "zh-CN" : "en";
}

function getLocale() {
  return currentLocale;
}

function setLocale(lang) {
  if (lang !== "en" && lang !== "zh-CN") lang = "en";
  currentLocale = lang;
  try {
    localStorage.setItem("taiChiLang", lang);
  } catch (e) { /* ignore */ }
  document.documentElement.lang = lang === "zh-CN" ? "zh-CN" : "en";
  applyStaticI18n();
  updateLangToggleUI();
  updateInstallBannerText();
  renderWeekGrid();
  renderExerciseSelector();
  // Re-render demo: if a day detail was open without an exercise, keep exercise view
  if (state.selectedExercise) {
    renderDemoArea();
  } else {
    renderDemoArea();
  }
  renderProgress();
}

function t(key, vars) {
  const pack = I18N[currentLocale] || I18N.en;
  let str = pack[key];
  if (str === undefined) str = I18N.en[key];
  if (str === undefined) return key;
  if (vars && typeof str === "string") {
    Object.keys(vars).forEach((k) => {
      str = str.replace(new RegExp("\\{" + k + "\\}", "g"), vars[k]);
    });
  }
  return str;
}

function localizedDay(dayEn) {
  const pack = I18N[currentLocale] || I18N.en;
  return (pack.weekdays && pack.weekdays[dayEn]) || dayEn;
}

function localizedFocus(dayEn) {
  const pack = I18N[currentLocale] || I18N.en;
  const plan = WEEK_PLAN.find((d) => d.day === dayEn);
  return (pack.weekFocus && pack.weekFocus[dayEn]) || (plan && plan.focus) || "";
}

function localizedExercise(id) {
  const pack = I18N[currentLocale] || I18N.en;
  if (pack.exercises && pack.exercises[id]) {
    return pack.exercises[id];
  }
  return EXERCISES[id];
}

function chipLabel(id) {
  const ex = localizedExercise(id);
  if (!ex) return id;
  if (currentLocale === "zh-CN") {
    return ex.name;
  }
  // English: English-first name, strip nothing — chip shows short English part
  const base = EXERCISES[id];
  return base.name.split("(")[0].trim();
}

function applyStaticI18n() {
  document.title = t("documentTitle");
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (key) el.textContent = t(key);
  });
}

function updateLangToggleUI() {
  document.querySelectorAll(".lang-btn").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.lang === currentLocale);
  });
}

function initLangToggles() {
  document.querySelectorAll(".lang-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      setLocale(btn.dataset.lang);
    });
  });
}

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

  grid.innerHTML = WEEK_PLAN.map((day) => {
    const isCompleted = state.completedDays.includes(day.day);
    const isToday = day.day === today;
    return `
      <div class="day-card ${isCompleted ? "completed" : ""} ${isToday ? "today" : ""}" data-day="${day.day}">
        <div class="day-name">${localizedDay(day.day)}</div>
        <div class="day-focus">${localizedFocus(day.day)}</div>
        <div class="day-check"></div>
      </div>
    `;
  }).join("");

  grid.querySelectorAll(".day-card").forEach((card) => {
    card.addEventListener("click", () => {
      showDayDetail(card.dataset.day);
    });
  });
}

function showDayDetail(dayName) {
  const day = WEEK_PLAN.find((d) => d.day === dayName);
  if (!day) return;

  const demoArea = document.getElementById("demo-area");
  demoArea.innerHTML = `
    <div class="demo-exercise-name">${localizedDay(day.day)} — ${localizedFocus(day.day)}</div>
    <div class="demo-exercise-benefit">${t("todaysFocus")}: ${localizedFocus(day.day)}</div>
    <div class="step-list">
      ${day.exercises.map((exId, i) => {
        const ex = localizedExercise(exId);
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
      <button class="demo-btn primary" id="start-day-btn">${t("startTodaysPractice")}</button>
    </div>
  `;

  demoArea.querySelectorAll(".step-list-item").forEach((item) => {
    item.addEventListener("click", () => {
      selectExercise(item.dataset.exercise);
    });
  });

  const startBtn = document.getElementById("start-day-btn");
  if (startBtn) {
    startBtn.addEventListener("click", () => {
      if (day.exercises.length > 0) {
        selectExercise(day.exercises[0]);
      }
    });
  }

  switchTab("exercise");
}

function renderExerciseSelector() {
  const selector = document.getElementById("exercise-selector");
  const allExercises = Object.keys(EXERCISES);

  selector.innerHTML = allExercises.map((id) => {
    const isActive = state.selectedExercise === id;
    return `
      <div class="exercise-chip ${isActive ? "active" : ""}" data-exercise="${id}">
        ${chipLabel(id)}
      </div>
    `;
  }).join("");

  selector.querySelectorAll(".exercise-chip").forEach((chip) => {
    chip.addEventListener("click", () => {
      selectExercise(chip.dataset.exercise);
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
    demoArea.innerHTML = `<p class="placeholder-text">${t("placeholder")}</p>`;
    return;
  }

  const ex = localizedExercise(state.selectedExercise);
  if (!ex) return;

  demoArea.innerHTML = `
    <div class="demo-exercise-name">${ex.name}</div>
    <div class="demo-exercise-benefit">${ex.benefit}</div>
    <div class="step-display">
      <div class="step-animation" id="step-emoji">🧘</div>
      <div class="step-text" id="step-text">${t("pressStart")}</div>
      <div class="step-counter" id="step-counter">${t("stepOf", { x: 0, y: ex.steps.length })}</div>
    </div>
    <div class="progress-bar-wrap">
      <div class="progress-bar-fill" id="demo-progress" style="width:0%"></div>
    </div>
    <div class="demo-controls">
      <button class="demo-btn secondary" id="demo-prev" disabled>${t("prev")}</button>
      <button class="demo-btn primary" id="demo-start">${t("start")}</button>
      <button class="demo-btn secondary" id="demo-next" disabled>${t("next")}</button>
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

  document.getElementById("demo-start").addEventListener("click", toggleDemo);
  document.getElementById("demo-prev").addEventListener("click", prevStep);
  document.getElementById("demo-next").addEventListener("click", nextStep);

  demoArea.querySelectorAll(".step-list-item").forEach((item) => {
    item.addEventListener("click", () => {
      goToStep(parseInt(item.dataset.step, 10));
    });
  });
}

function updateDemoDisplay() {
  if (!state.selectedExercise) return;
  const ex = localizedExercise(state.selectedExercise);
  if (!ex) return;

  const stepText = document.getElementById("step-text");
  const stepCounter = document.getElementById("step-counter");
  const stepEmoji = document.getElementById("step-emoji");
  const progressFill = document.getElementById("demo-progress");
  const startBtn = document.getElementById("demo-start");
  const prevBtn = document.getElementById("demo-prev");
  const nextBtn = document.getElementById("demo-next");

  if (!stepText || !startBtn) return;

  if (state.currentStep === 0 && !state.demoRunning) {
    stepText.textContent = t("pressStart");
    stepCounter.textContent = t("stepOf", { x: 0, y: ex.steps.length });
    stepEmoji.textContent = "🧘";
    progressFill.style.width = "0%";
    startBtn.textContent = t("start");
    prevBtn.disabled = true;
    nextBtn.disabled = true;
    return;
  }

  const stepIndex = Math.min(state.currentStep, ex.steps.length - 1);
  stepText.textContent = ex.steps[stepIndex];
  stepCounter.textContent = t("stepOf", { x: stepIndex + 1, y: ex.steps.length });
  stepEmoji.textContent = getStepEmoji(stepIndex, ex.steps.length);
  progressFill.style.width = `${((stepIndex + 1) / ex.steps.length) * 100}%`;

  startBtn.textContent = state.demoRunning ? t("pause") : t("resume");
  prevBtn.disabled = state.currentStep <= 0;
  nextBtn.disabled = state.currentStep >= ex.steps.length - 1;

  document.querySelectorAll(".step-list-item").forEach((item, i) => {
    item.style.background = i === stepIndex ? "var(--accent-light)" : "";
    item.style.borderRadius = i === stepIndex ? "8px" : "";
  });

  if (state.currentStep >= ex.steps.length - 1) {
    markExerciseCompleted(state.selectedExercise);
  }
}

function getStepEmoji(step) {
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
  const ex = localizedExercise(state.selectedExercise);
  if (!ex) return;

  if (state.currentStep >= ex.steps.length - 1) {
    state.currentStep = 0;
  }

  state.demoRunning = true;
  updateDemoDisplay();

  state.demoInterval = setInterval(() => {
    state.currentStep++;
    const current = localizedExercise(state.selectedExercise);
    if (!current || state.currentStep >= current.steps.length) {
      state.currentStep = current ? current.steps.length - 1 : 0;
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
  if (state.selectedExercise && document.getElementById("step-text")) {
    updateDemoDisplay();
  }
}

function nextStep() {
  const ex = localizedExercise(state.selectedExercise);
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
  const ex = localizedExercise(state.selectedExercise);
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

  const today = new Date().toLocaleDateString("en-US", { weekday: "long" });
  const todayPlan = WEEK_PLAN.find((d) => d.day === today);
  if (todayPlan) {
    const allDone = todayPlan.exercises.every((ex) => state.completedExercises.includes(ex));
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
  document.getElementById("stat-days").textContent = state.completedDays.length;
  document.getElementById("stat-exercises").textContent = state.completedExercises.length;

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

  const calendar = document.getElementById("progress-calendar");
  const dayNames = t("dayAbbr");
  const today = new Date();

  let calHTML = `<div class="calendar-title">${t("last28Days")}</div><div class="calendar-grid">`;
  dayNames.forEach((d) => {
    calHTML += `<div class="cal-day">${d}</div>`;
  });

  const startDate = new Date(today);
  startDate.setDate(startDate.getDate() - 27);
  const startDayOfWeek = startDate.getDay();

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

  document.querySelectorAll(".tab-btn").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.tab === tabName);
  });

  document.querySelectorAll(".tab-content").forEach((content) => {
    content.classList.toggle("active", content.id === `tab-${tabName}`);
  });

  if (tabName === "progress") {
    renderProgress();
  }
  if (tabName === "exercise") {
    renderExerciseSelector();
    if (state.selectedExercise) {
      renderDemoArea();
    }
  }
}

// ==================== REMINDERS ====================

function initReminders() {
  const toggle = document.getElementById("reminder-toggle");
  const timeInput = document.getElementById("reminder-time");
  const saveBtn = document.getElementById("save-reminder");
  const status = document.getElementById("reminder-status");

  const savedReminder = localStorage.getItem("taiChiReminder");
  if (savedReminder) {
    try {
      const settings = JSON.parse(savedReminder);
      toggle.checked = settings.enabled;
      timeInput.value = settings.time || "08:00";
    } catch (e) { /* ignore */ }
  }

  saveBtn.addEventListener("click", () => {
    const settings = {
      enabled: toggle.checked,
      time: timeInput.value
    };
    localStorage.setItem("taiChiReminder", JSON.stringify(settings));

    if (toggle.checked && "Notification" in window) {
      Notification.requestPermission().then((perm) => {
        if (perm === "granted") {
          status.textContent = t("reminderSet", { time: timeInput.value });
          scheduleNotification(timeInput.value);
        } else {
          status.textContent = t("notificationDenied");
        }
      });
    } else {
      status.textContent = t("reminderSaved");
    }
  });
}

function scheduleNotification(time) {
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
      new Notification(t("notifTitle"), {
        body: t("notifBody"),
        icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>☯</text></svg>"
      });
    }
    scheduleNotification(time);
  }, delay);
}

// ==================== PWA INSTALL + BANNER ====================

let deferredPrompt = null;

function isStandalonePwa() {
  if (window.matchMedia && window.matchMedia("(display-mode: standalone)").matches) {
    return true;
  }
  if (typeof navigator.standalone === "boolean" && navigator.standalone) {
    return true;
  }
  return false;
}

function isIosSafari() {
  const ua = navigator.userAgent || "";
  const isIOS = /iPad|iPhone|iPod/.test(ua) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
  const isWebkit = /WebKit/.test(ua);
  const isChromeLike = /CriOS|FxiOS|EdgiOS|OPiOS/.test(ua);
  return isIOS && isWebkit && !isChromeLike;
}

function isInstallBannerDismissed() {
  try {
    return localStorage.getItem("taiChiInstallBannerDismissed") === "1";
  } catch (e) {
    return false;
  }
}

function dismissInstallBanner(permanent) {
  const banner = document.getElementById("install-banner");
  if (banner) banner.classList.remove("visible");
  document.body.classList.remove("has-install-banner");
  if (permanent) {
    try {
      localStorage.setItem("taiChiInstallBannerDismissed", "1");
    } catch (e) { /* ignore */ }
  }
}

function updateInstallBannerText() {
  const banner = document.getElementById("install-banner");
  if (!banner) return;
  const titleEl = banner.querySelector(".install-banner-title");
  const installBtn = banner.querySelector(".install-banner-install");
  const dismissBtn = banner.querySelector(".install-banner-dismiss");
  const hintEl = banner.querySelector(".install-banner-ios-hint");
  if (titleEl) titleEl.textContent = t("installBannerTitle");
  if (installBtn) installBtn.textContent = t("installBannerInstall");
  if (dismissBtn) dismissBtn.textContent = t("installBannerDismiss");
  if (hintEl) hintEl.textContent = t("installBannerIosHint");
}

function showInstallBanner(mode) {
  // mode: "prompt" | "ios"
  if (isStandalonePwa() || isInstallBannerDismissed()) return;

  let banner = document.getElementById("install-banner");
  if (!banner) {
    banner = document.createElement("div");
    banner.id = "install-banner";
    banner.className = "install-banner";
    banner.innerHTML = `
      <div class="install-banner-inner">
        <div class="install-banner-text">
          <span class="install-banner-title"></span>
          <span class="install-banner-ios-hint" hidden></span>
        </div>
        <div class="install-banner-actions">
          <button type="button" class="install-banner-install"></button>
          <button type="button" class="install-banner-dismiss" aria-label="Dismiss"></button>
        </div>
      </div>
    `;
    document.body.prepend(banner);

    banner.querySelector(".install-banner-dismiss").addEventListener("click", () => {
      dismissInstallBanner(true);
    });

    banner.querySelector(".install-banner-install").addEventListener("click", async () => {
      if (deferredPrompt) {
        deferredPrompt.prompt();
        try {
          await deferredPrompt.userChoice;
        } catch (e) { /* ignore */ }
        deferredPrompt = null;
        dismissInstallBanner(true);
        const settingsInstall = document.getElementById("install-btn");
        if (settingsInstall) settingsInstall.style.display = "none";
      } else {
        // iOS / no prompt: reveal Share → Add to Home Screen hint; keep banner until Not now
        const hint = banner.querySelector(".install-banner-ios-hint");
        if (hint) hint.hidden = false;
      }
    });
  }

  updateInstallBannerText();

  const installBtn = banner.querySelector(".install-banner-install");
  const hintEl = banner.querySelector(".install-banner-ios-hint");
  if (mode === "ios") {
    if (hintEl) hintEl.hidden = false;
    // On iOS, Install just acknowledges / dismisses with hint visible briefly
  } else {
    if (hintEl) hintEl.hidden = true;
  }
  if (installBtn) {
    installBtn.style.display = mode === "ios" && !deferredPrompt ? "inline-flex" : "inline-flex";
  }

  banner.classList.add("visible");
  document.body.classList.add("has-install-banner");
}

function initPWA() {
  window.addEventListener("beforeinstallprompt", (e) => {
    e.preventDefault();
    deferredPrompt = e;
    const installBtn = document.getElementById("install-btn");
    if (installBtn) {
      installBtn.style.display = "block";
      installBtn.onclick = () => {
        if (!deferredPrompt) return;
        deferredPrompt.prompt();
        deferredPrompt.userChoice.then(() => {
          deferredPrompt = null;
          installBtn.style.display = "none";
          dismissInstallBanner(true);
        });
      };
    }
    showInstallBanner("prompt");
  });

  window.addEventListener("appinstalled", () => {
    deferredPrompt = null;
    dismissInstallBanner(true);
    const installBtn = document.getElementById("install-btn");
    if (installBtn) installBtn.style.display = "none";
  });

  // Softer iOS Add to Home Screen tip
  if (!isStandalonePwa() && !isInstallBannerDismissed() && isIosSafari()) {
    // Delay slightly so it doesn't fight first paint
    setTimeout(() => showInstallBanner("ios"), 1200);
  }
}

// ==================== SETTINGS ====================

function initSettings() {
  const stepSlider = document.getElementById("step-duration");
  const stepVal = document.getElementById("step-duration-val");

  stepSlider.value = state.stepDuration / 1000;
  stepVal.textContent = `${stepSlider.value}s`;

  stepSlider.addEventListener("input", () => {
    state.stepDuration = parseInt(stepSlider.value, 10) * 1000;
    stepVal.textContent = `${stepSlider.value}s`;
    saveState();
  });
}

// ==================== RESET ====================

function initReset() {
  document.getElementById("reset-progress").addEventListener("click", () => {
    if (confirm(t("confirmReset"))) {
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
  currentLocale = detectLocale();
  document.documentElement.lang = currentLocale === "zh-CN" ? "zh-CN" : "en";
  applyStaticI18n();
  initLangToggles();
  updateLangToggleUI();
  renderWeekGrid();
  renderExerciseSelector();
  renderDemoArea();
  renderProgress();
  initReminders();
  initPWA();
  initSettings();
  initReset();

  document.querySelectorAll(".tab-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      switchTab(btn.dataset.tab);
    });
  });
}

document.addEventListener("DOMContentLoaded", init);
