import { useState } from "react"
import PropTypes from 'prop-types';
function App() {

  var [todo, setTodo] = useState({
    title: 'go workout',
     description: 'go to workout now',
    id : 1
  })
  // var todo = {
  //   title: 'go workout',
  //   description: 'go to workout now',
  //   id : 1
  // } Inefficient way to declare,use state instead of variables


  setInterval(() => {
    setTodo({
      title: 'go kartik',
       description: 'go to kartik now',
      id : 1
    })
    //console.log(todo)
  }, 2000);
  return (
    <>
      <h1>Hi this is kartik</h1>
      {todo.title}
      {todo.description}
      {todo.id}
      <Child firstName='kartik' lastName='madaan'></Child>
    </>
  )
}
function Child(props) {
  const { firstName, lastName } = props
  return (
    <>
      <h2>{firstName}</h2>
      <h2>{lastName}</h2>
    </>
  )
}

Child.propTypes = {
  firstName: PropTypes.string,
  lastName : PropTypes.string
}
export default App