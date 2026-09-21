(function () {
  const WEEKDAY_ORDER = ["montag", "dienstag", "mittwoch", "donnerstag", "freitag"];

  const tabsEl = document.getElementById("day-tabs");
  const dayHeaderEl = document.getElementById("day-header");
  const exerciseListEl = document.getElementById("exercise-list");
  const progressFillEl = document.getElementById("progress-fill");
  const progressLabelEl = document.getElementById("progress-label");
  const resetBtnEl = document.getElementById("reset-btn");
  const weekOverviewEl = document.getElementById("week-overview");

  function todayKey() {
    const d = new Date();
    return d.toISOString().slice(0, 10); // YYYY-MM-DD
  }

  function jsWeekdayToPlanId() {
    const idx = new Date().getDay(); // 0 = Sonntag
    const map = { 1: "montag", 2: "dienstag", 3: "mittwoch", 4: "donnerstag", 5: "freitag" };
    return map[idx] || null;
  }

  function storageKey(dayId) {
    return `trainingsplan_progress_${todayKey()}_${dayId}`;
  }

  function loadProgress(dayId) {
    try {
      const raw = localStorage.getItem(storageKey(dayId));
      return raw ? JSON.parse(raw) : {};
    } catch (e) {
      return {};
    }
  }

  function saveProgress(dayId, progress) {
    try {
      localStorage.setItem(storageKey(dayId), JSON.stringify(progress));
    } catch (e) {
      /* localStorage nicht verfügbar - Fortschritt wird nur für diese Sitzung gehalten */
    }
  }

  let activeDayId = localStorage.getItem("trainingsplan_active_day") || jsWeekdayToPlanId() || "montag";
  if (!TRAININGSPLAN.some((d) => d.id === activeDayId)) activeDayId = "montag";

  function setsCountFor(uebung) {
    return uebung.arbeitssaetze;
  }

  function renderTabs() {
    tabsEl.innerHTML = "";
    TRAININGSPLAN.forEach((day) => {
      const btn = document.createElement("button");
      btn.className = "day-tab" + (day.id === activeDayId ? " active" : "");
      btn.innerHTML = `${day.tag}<span class="tab-sub">${day.fokus.split(" ")[0]}</span>`;
      btn.addEventListener("click", () => {
        activeDayId = day.id;
        localStorage.setItem("trainingsplan_active_day", activeDayId);
        renderTabs();
        renderDay();
      });
      tabsEl.appendChild(btn);
    });
  }

  function rirBadgesForSet(uebung, setIndex) {
    const total = setsCountFor(uebung);
    if (uebung.rir === "conservative") {
      return `<span class="set-rir-label cons">RIR 2-3</span>`;
    }
    // progressive: alle bis auf letzten Satz RIR 1-2, letzter Satz RIR 0
    if (setIndex === total - 1) {
      return `<span class="set-rir-label zero">RIR 0</span>`;
    }
    return `<span class="set-rir-label mid">RIR 1-2</span>`;
  }

  function renderDay() {
    const day = TRAININGSPLAN.find((d) => d.id === activeDayId);
    if (!day) return;

    dayHeaderEl.innerHTML = `
      <h2>${day.tag}</h2>
      <div class="fokus">${day.fokus}</div>
    `;

    const progress = loadProgress(day.id);

    exerciseListEl.innerHTML = "";
    day.uebungen.forEach((uebung, uIdx) => {
      const total = setsCountFor(uebung);
      const arbeitssaetzeText = uebung.arbeitssaetzeText || `${uebung.arbeitssaetze} Arbeitssätze`;
      const checkedArr = progress[uIdx] || new Array(total).fill(false);

      const card = document.createElement("div");
      card.className = "exercise-card";

      const setsHtml = Array.from({ length: total })
        .map((_, sIdx) => {
          const checked = checkedArr[sIdx] ? "checked" : "";
          return `
            <label class="set-toggle">
              <input type="checkbox" data-ex="${uIdx}" data-set="${sIdx}" ${checked} />
              <span class="set-circle">${sIdx + 1}</span>
              ${rirBadgesForSet(uebung, sIdx)}
            </label>
          `;
        })
        .join("");

      card.innerHTML = `
        <div class="exercise-top">
          <div class="exercise-name">${uebung.name}</div>
        </div>
        <div class="exercise-meta">
          <span class="badge">${uebung.aufwaermsaetze}</span>
          <span class="badge">${arbeitssaetzeText}</span>
          <span class="badge">${uebung.wiederholungen} Wdh.</span>
        </div>
        ${uebung.hinweis ? `<div class="hinweis">${uebung.hinweis}</div>` : ""}
        <div class="sets-row">${setsHtml}</div>
      `;

      exerciseListEl.appendChild(card);

      const allDone = checkedArr.length === total && checkedArr.every(Boolean);
      if (allDone) card.classList.add("all-done");
    });

    exerciseListEl.querySelectorAll('input[type="checkbox"]').forEach((cb) => {
      cb.addEventListener("change", () => {
        const uIdx = Number(cb.dataset.ex);
        const sIdx = Number(cb.dataset.set);
        const p = loadProgress(day.id);
        const total = setsCountFor(day.uebungen[uIdx]);
        const arr = p[uIdx] || new Array(total).fill(false);
        arr[sIdx] = cb.checked;
        p[uIdx] = arr;
        saveProgress(day.id, p);
        renderDay();
      });
    });

    updateProgressBar(day);
  }

  function updateProgressBar(day) {
    const progress = loadProgress(day.id);
    let total = 0;
    let done = 0;
    day.uebungen.forEach((uebung, uIdx) => {
      const setsTotal = setsCountFor(uebung);
      total += setsTotal;
      const arr = progress[uIdx] || [];
      done += arr.filter(Boolean).length;
    });
    const pct = total === 0 ? 0 : Math.round((done / total) * 100);
    progressFillEl.style.width = `${pct}%`;
    progressLabelEl.querySelector(".progress-text").textContent = `${done} / ${total} Sätze erledigt (${pct}%)`;
  }

  resetBtnEl.addEventListener("click", () => {
    if (!confirm("Fortschritt für diesen Tag zurücksetzen?")) return;
    saveProgress(activeDayId, {});
    renderDay();
  });

  function renderWeekOverview() {
    weekOverviewEl.innerHTML = "";
    const todayId = jsWeekdayToPlanId();
    TRAININGSPLAN.forEach((day) => {
      const card = document.createElement("div");
      card.className = "week-card" + (day.id === todayId ? " today" : "");
      card.innerHTML = `
        <div class="wc-day">${day.tag}</div>
        <div class="wc-fokus">${day.fokus}</div>
      `;
      card.addEventListener("click", () => {
        activeDayId = day.id;
        localStorage.setItem("trainingsplan_active_day", activeDayId);
        renderTabs();
        renderDay();
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
      weekOverviewEl.appendChild(card);
    });
  }

  renderTabs();
  renderDay();
  renderWeekOverview();
})();
