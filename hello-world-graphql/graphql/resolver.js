var values = require("../mock-server");

module.exports = {
  Query: {
    hello: () => "world",
    person: (root, args, context, info) => {
      console.log(args);
      let arr = values.filter(val => {
        return val.id == args.id;
      })[0];
      console.log(arr);
      return arr;
    }
  }
};
