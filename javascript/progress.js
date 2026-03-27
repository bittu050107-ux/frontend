document.addEventListener("DOMContentLoaded", () => {

  function loadData(key, def) {
    try {
      return JSON.parse(localStorage.getItem(key)) || def;
    } catch {
      return def;
    }
  }

  const habits = loadData("dlm_habits", []);
  const tasks = loadData("dlm_tasks", []);

  const habitsProgressEl = document.getElementById("habits-progress");
  const tasksProgressEl = document.getElementById("tasks-progress");
  const habitsCircleEl = document.getElementById("habits-circle");


  console.log("Habits:", habits);

  if (!habitsProgressEl) return;

  const totalHabits = habits.length;


  let compHabits = 0;

  habits.forEach((h) => {
    if (Array.isArray(h.days)) {
      const allChecked = h.days.every((d) => d === true);
      if (allChecked) compHabits++;
    }
  });

  const percentage =
    totalHabits > 0 ? Math.round((compHabits / totalHabits) * 100) : 0;


  habitsProgressEl.textContent = `${compHabits} / ${totalHabits} Completed`;


  if (habitsCircleEl) {
    habitsCircleEl.style.setProperty("--percentage", percentage + "%");

    const textEl = habitsCircleEl.querySelector(".progress-text");
    if (textEl) {
      textEl.textContent = percentage + "%";
    }
  }


  if (tasksProgressEl) {
    tasksProgressEl.textContent = `${tasks.length} Total Tasks`;
  }
});
