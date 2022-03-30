require('dotenv').config();
mongoose = require('mongoose');

// mongoose.connect(process.env.MONGO_URI).then(result => {
//   console.log('Connected to db.');
//   // Listen for requests
//   app.listen(3000, 'localhost', 20, () => {
//      console.log('Now listening for requests');
//   });
// }).catch(err => {
//   console.log('Error while trying to connect to the database', err);
// });
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

// Get the Schema
const Schema = mongoose.Schema;

// create a Person schema
const personSchema = new Schema({
  name: { type: String, required: true },
  age: Number,
  favoriteFoods: [String]
});

// And a Person model from the personSchema
let Person = mongoose.model("Person", personSchema);

const createAndSavePerson = (done) => {
  const person = new Person({
    name: 'John Doe',
    age: 20,
    favoriteFoods: ['Omlet', 'Fries', 'Peanut Butter']
  });

  person.save((err, data) => {
    if (err) done(err);
    if (data) done(null, data);
  });
  // done(null /*, data*/);
};

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, (err, data) => {
    if (err) done(err);
    if (data) done(null, data);
  });
  // done(null /*, data*/);
};

const findPeopleByName = (personName, done) => {
  Person.find({ name: personName }, (err, data) => {
    if (err) done(err);
    if (data) done(null, data);
  });
  // done(null /*, data*/);
};

const findOneByFood = (food, done) => {
  Person.findOne({ favoriteFoods: food }, (err, data) => {
    if (err) done(err);
    if (data) done(null, data);
  });
  // done(null /*, data*/);
};

const findPersonById = (personId, done) => {
  Person.findById(personId, (err, data) => {

  });
  // done(null /*, data*/);
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  Person.findById(personId, (err, person) => {
    if (err) done(err);
    if (person) {
      person.favoriteFoods.push(foodToAdd);
      person.save((err, updatedPerson) => {
        if (err) done(err);
        if (updatedPerson) done(null, updatedPerson);
      });
    }
  });

};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;

  Person.findOneAndUpdate({ name: personName }, { age: ageToSet }, { new: true }, (err, updatedPerson) => {
    if (err) done(err);
    done(null, updatedPerson);
  });
  // done(null /*, data*/);
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId, (err, removedPerson) => {
    if (err) done(err);
    if (removedPerson) {
      done(null, removedPerson);
    }
  });

  // Person.findOneAndRemove({ _id: personId }, (err, removedPerson) => {
  //   if (err) done(err);
  //   if (removedPerson) {
  //     done(null, removedPerson);
  //   }
  // });
  // done(null /*, data*/);
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";

  Person.remove({ name: nameToRemove }, (err, resp) => {
    if (err) done(err);
    if (resp) {
      done(null, resp);
    }
  });

  // done(null /*, data*/);
};

const queryChain = (done) => {
  const foodToSearch = "burrito";

  Person.find({ favoriteFoods: foodToSearch })
    .sort({ name: -1 })
    .limit(2)
    .select({ favoriteFoods: 1, name: 1, age: 0 })
    .exec((err, people) => {
      if (err) done(err);
      if (people) {
        done(null, people);
      }
    });

  // done(null /*, data*/);
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
