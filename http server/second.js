function logResponseBody(jsonBody) {
    console.log(jsonBody);
  }
  
  function fetchAndHandleSum() {
    fetch("http://localhost:3000/handleSum?counter=100", {
      method: "GET",
    })
      .then((response) => response.json())
      .then(logResponseBody)
      .catch((error) => console.error(error));
  }
  
  fetchAndHandleSum();
  