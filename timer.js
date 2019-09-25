let count = 10;
let interval = setInterval(()=>{
    count--;
    console.log(count);

    if(count === 0) {
      clearInterval(interval);
    }
  }, 1000);


