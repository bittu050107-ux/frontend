document.addEventListener("DOMContentLoaded", () => {
  let planner = window.loadData("dlm_planner", []);

  const plannerInput = document.getElementById("inp");
  const addPlannerBtn = document.getElementById("btn");
  const plannerList = document.getElementById("item");
  const plannerTime = document.getElementById("inp-time")

  if (plannerList) {
    function renderplanner() {
      plannerList.innerHTML = "";
      planner.forEach((planner, index) => {
        const li = document.createElement("li");
        li.className = `list-item fade-in ${planner.completed ? "completed" : ""}`;

        li.innerHTML = `
                    <div class="item-left">
                        <input type="checkbox" ${planner.completed ? "checked" : ""} data-index="${index}">
                        <span>${planner.title}</span>
                        <small>${planner.time} </small>
                    </div>
                    <button class="danger" data-index="${index}">Delete</button>
                `;
        plannerList.appendChild(li);





        
      });
    }
    
    

    renderplanner();





    addPlannerBtn.addEventListener("click", () => {
      const title = plannerInput.value.trim();
      if (title) {
        planner.push({ title, completed: false });
        window.saveData("dlm_planner", planner);
        plannerInput.value = "";
        renderplanner();
      }
    });

    plannerList.addEventListener("click", (e) => {
      const index = e.target.getAttribute("data-index");
      if (index === null) return;

      if (e.target.tagName === "INPUT") {
        planner[index].completed = e.target.checked;
        window.saveData("dlm_planner", planner);
        renderplanner();
      } else if (e.target.tagName === "BUTTON") {
        planner.splice(index, 1);
        window.saveData("dlm_planner", planner);
        renderplanner();
      }
    });
  }
});
