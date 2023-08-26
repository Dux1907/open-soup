function createElement(todo){
    const parent = document.getElementById('main')
    parent.innerHTML = ''
    for(let i = 0 ; i < todo.length ; i++){
      const child = document.createElement('div')
      const child1 = document.createElement('span')
    const child2 = document.createElement('span')
    const child3 = document.createElement('span')
       child1.innerHTML = todo[i].title + ' '
      child2.innerHTML = todo[i].description + ' '
      child3.innerHTML = todo[i].id
      child.appendChild(child1)
      child.appendChild(child2)
      child.appendChild(child3)
       parent.appendChild(child)
    }
  }
  
  setInterval(() =>{
    let todo = []
    let k = Math.floor(Math.random() * 100) 
    for(let i = 0 ; i < k ;i++){
      todo.push({
        title:'Gym',
        description:'Go to gym',
        id : i + 1
      })
    }
    createElement(todo)
  },1000)
  