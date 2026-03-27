document.addEventListener("DOMContentLoaded", () => {
  // ✅ localStorage helpers
  function loadData(key, defaultValue) {
    return JSON.parse(localStorage.getItem(key)) || defaultValue;
  }

  function saveData(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
  }

  let habits = loadData("dlm_habits", []);

  const habitInput = document.getElementById("habit-input");
  const addHabitBtn = document.getElementById("add-habit-btn");
  const habitsList = document.getElementById("habits-list");

  function renderHabits() {
    habitsList.innerHTML = "";

    habits.forEach((item, index) => {
      // ✅ FIX: ensure days array exists (main error fix)
      if (!item.days) {
        item.days = [false, false, false, false, false, false, false];
      }

      const checkedDays = item.days.filter((d) => d).length;
      const progress = Math.round((checkedDays / 7) * 100);

      const tr = document.createElement("tr");

      tr.innerHTML = `
        <td>${item.title}</td>

        ${item.days
          .map(
            (day, i) => `
          <td>
            <input type="checkbox"
              ${day ? "checked" : ""}
              data-index="${index}"
              data-day="${i}">
          </td>
        `,
          )
          .join("")}

        <td>
          <span style="font-weight:bold; color:${progress === 100 ? "green" : "black"};">
            ${progress}%
          </span>
        </td>

        <td>
          <button class="danger" data-delete="${index}">Delete</button>
        </td>
      `;

      habitsList.appendChild(tr);
    });

    saveData("dlm_habits", habits);
  }

  // ➕ Add habit
  addHabitBtn.addEventListener("click", () => {
    const title = habitInput.value.trim();
    if (!title) return;

    habits.push({
      title,
      days: [false, false, false, false, false, false, false],
    });

    habitInput.value = "";
    renderHabits();
  });

  // ⌨️ Enter key support
  habitInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") addHabitBtn.click();
  });

  // 🎯 Event delegation
  habitsList.addEventListener("click", (e) => {
    // checkbox
    if (e.target.type === "checkbox") {
      const index = Number(e.target.dataset.index);
      const day = Number(e.target.dataset.day);

      habits[index].days[day] = e.target.checked;
      renderHabits();
    }

    // delete
    if (e.target.tagName === "BUTTON") {
      const index = Number(e.target.dataset.delete);
      habits.splice(index, 1);
      renderHabits();
    }
  });

  renderHabits();
});
