let vDOM = [];

function createElement(existingDOM) {
  let updated = 0,
    added = 0,
    removed = 0;
  var parent = document.getElementById("main");
  vDOM.forEach((item) => {
    var existingChild = existingDOM.find((child) => {
      return child.id == item.id;
    });
    if (existingChild) {
      updated++;
      existingDOM = existingDOM.filter((child) => child.id != item.id);
      existingChild.title = item.title + " ";
      existingChild.description = item.description + " ";
    } else {
      added++;
      const child = document.createElement("div");
      child.setAttribute("id", item.id);
      const child1 = document.createElement("span");
      const child2 = document.createElement("span");
      const child3 = document.createElement("button");
      child1.innerHTML = item.title + " ";
      child2.innerHTML = item.description + " ";
      child3.innerHTML = "Delete";
      child3.setAttribute("onclick", "delete(" + item.id + ")");
      child.appendChild(child1);
      child.appendChild(child2);
      child.appendChild(child3);
      parent.appendChild(child);
    }
  });
  existingDOM.forEach((child) => {
    var remove = document.querySelector(`[id = '${child.id}']`);
    removed++;
    parent.removeChild(remove);
  });
  console.log(vDOM.length);
  console.log("Updated: " + updated);
  console.log("Added: " + added);
  console.log("Removed: " + removed);
}
function updatevDOM(todo) {
  let existingDOM = [...vDOM];
  vDOM = todo.map((item) => {
    return {
      id: item.id,
      title: item.title,
      description: item.description,
    };
  });
  createElement(existingDOM);
}
setInterval(() => {
  let todo = [];
  let k = Math.floor(Math.random() * 100);
  for (let i = 0; i < k; i++) {
    todo.push({
      title: "Gym",
      description: "Go to gym at 5",
      id: i + 1,
    });
  }
  updatevDOM(todo);
}, 4000);
