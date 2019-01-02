//
let count = 0;
let globalVal = new Array();

const Subject = new rxjs.Subject();

Subject.subscribe(
  data => {
    globalVal.push(data);
    console.log(globalVal);
  },
  err => {
    console.error(err);
  },
  complete => {
    console.log("Completed");
  }
);

setInterval(() => {
  Subject.next(count++);
  if (count > 5) Subject.complete();
}, 100);
