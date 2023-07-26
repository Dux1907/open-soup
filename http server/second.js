function nextfn(response2) {
  console.log(response2)
}

function callbackfn(response) {
  console.log(response.json().then(nextfn))
}

fetch("http://localhost:3000/getSum?counter=10952340", {
  method: "GET",
}).then(callbackfn);
