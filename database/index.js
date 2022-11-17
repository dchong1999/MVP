const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/customers')
  .then((response) => console.log('db connected'))
  .catch((error) => console.log('ERROR: db not connected'));

const customerSchema = mongoose.Schema({
  OrderNo: Number,
  Name: String,
  Completed: Boolean
});

const Customers = mongoose.model('Customers', customerSchema);

const getUpdates = (entries) => {
  entries.forEach((entry) => {
    Customers.findOneAndUpdate({OrderNo: entry[0]}, {$setOnInsert: {Name: entry[1], Completed: false}}, {upsert: true})
      .catch((error) => console.log('getUpdates S to D > ERROR: ', error));
  });
};

const getQueue = () => {
  return Customers.find({Completed: false}, 'Name OrderNo').sort('OrderNo')
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.log('getQueue S to D > ERROR: ', error);
    });
};

const getAll = () => {
  return Customers.find().sort('OrderNo')
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.log('getAll S to D > ERROR: ', error);
    });
};

const markCompleted = (OrderNo) => {
  return Customers.findOneAndUpdate({OrderNo: OrderNo}, {Completed: true})
    .catch((error) => console.log('markCompleted S to D > ERROR: ', error));
};

const markNotCompleted = (OrderNo) => {
  return Customers.findOneAndUpdate({OrderNo: OrderNo}, {Completed: false})
    .catch((error) => console.log('markNotCompleted S to D > ERROR: ', error));
};

const reset = () => {
  return Customers.deleteMany()
    .catch((error) => console.log('reset S to D > ERROR: ', error));
};

module.exports.getUpdates = getUpdates;
module.exports.getQueue = getQueue;
module.exports.getAll = getAll;
module.exports.markCompleted = markCompleted;
module.exports.markNotCompleted = markNotCompleted;
module.exports.reset = reset;
