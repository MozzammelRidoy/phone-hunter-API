fetch('https://jsonplaceholder.typicode.com/todos/1')
      .then(response => response.json())
      .then(json => console.log(json))
      .catch(error => console.log(error));

// console.log('data');

try{
      const res = await fetch('https://jsonplaceholder.typicode.com/todos/1');
      const data = await res.json();
      console.log(data);
}
catch(error){
      console.log(error);
}

// document.getElementById('abc');

//synchronous asynchronous

console.log(1);
setTimeout(() => {
      console.log(2);
}, 3000);
console.log(3);