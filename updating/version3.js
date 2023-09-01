let vDOM = []

function createElement() {
    let updated = 0,
      added = 0,
      removed = 0;
    var parent = document.getElementById("main");
    currentChildren = Array.from(parent.children);
  
    vDOM.forEach((item) => {
      var existingChild = currentChildren.find((child) => {
        return (child.id == item.id);
      });
      if (existingChild) {
        updated++;
        currentChildren = currentChildren.filter(
          (child) => child.id != item.id
        );
        existingChild.children[0].innerHTML = item.title + " ";
        existingChild.children[1].innerHTML = item.description + " ";
      } else {
        added++;
        const child = document.createElement("div");
        child.setAttribute('id',item.id)
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
    currentChildren.forEach((child) => {
      removed++;
      parent.removeChild(child);
    });
    console.log(vDOM.length);
    console.log("Updated: " + updated);
    console.log("Added: " + added);
    console.log("Removed: " + removed);
  }
function updatevDOM(todo) {
   vDOM = todo.map(item => {
        return {
            id: item.id,
            title: item.title,
            description:item.description
          }
   })
    createElement()
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
  