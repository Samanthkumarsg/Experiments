let count = 0;

const event = new rxjs.Observable(observer => {
  observer.next("Value " + count);
  ++count;
  observer.next("Value " + count);
});

console.log(event);

event.subscribe(
  val => console.log(val),
  err => console.error(err),
  complete => console.log(complete)
);
