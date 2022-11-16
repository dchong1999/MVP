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
      console.log('getQueue S to D > ERROR:', error);
    });
};

module.exports.getUpdates = getUpdates;
module.exports.getQueue = getQueue;

