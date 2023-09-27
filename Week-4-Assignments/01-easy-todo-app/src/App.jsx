import { useEffect, useState } from "react";
// import PropTypes from 'prop-types';
function App() {
  var [todo, setTodo] = useState([]);
  useEffect(() => {
    fetch('http://localhost:3000/todos/', {
      method:'GET'
    }).then((response) => {
        response.json()
          .then((data) => {
            console.log(data)
            setTodo(data)
          })
    })
    setInterval(() => {
      fetch('http://localhost:3000/todos/', {
        method:'GET'
      }).then((response) => {
          response.json()
            .then((data) => {
              console.log(data)
              setTodo(data)
            })
      })
   },100) 
  }, [])
  function handleDelete(x) {
    console.log('reached')
    fetch(`http://localhost:3000/todos/${x}`, {
      method:'DELETE'
    }).then((response) => {
        response.json()
          .then((data) => {
            console.log(data)
            setTodo(data)
          })
    })
  }
  return (
    <>
      <h1>Hi this is kartik</h1>
      <ul>
        {todo.map((item) => {
          return (
            <li key={item.id}>
              {item.title + '.   '}
              {item.description + '.  '}
              {item.id+ '  '}
              <button onClick={() => handleDelete(item.id)} style={{ borderRadius: '10px' }} >Delete</button>
            </li>
          );
        })}
      </ul>
      <br />
    </>
  );
}
// function Child(props) {
//   const { firstName, lastName } = props
//   return (
//     <>
//       <h2>{firstName}</h2>
//       <h2>{lastName}</h2>
//     </>
//   )
// }

// Child.propTypes = {
//   firstName: PropTypes.string,
//   lastName : PropTypes.string
// }
export default App;
