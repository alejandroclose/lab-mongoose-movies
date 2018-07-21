const mongoose = require('mongoose')
const Celebrity = require('../models/celebrity');

const dbtitle = 'movies';
mongoose.connect(`mongodb://localhost/${dbtitle}`);

const celebrities = [
  {
    name: 'Ona',
    occupation: 'Madre de familia',
    catchPhrase: 'Andreita cómete el pollo'
  },
  {
    name: 'Bert',
    occupation: 'Vividor',
    catchPhrase: 'No tengo ninguna'
  },
  {
    name: 'Jandro',
    occupation: 'Millionaire',
    catchPhrase: 'Qué linda la vida sabiéndola vivir'
  }];

  Celebrity.create(celebrities, (err) => {
    if (err) { throw (err) }
    console.log(`Created ${celebrities.length} celebrities`)
    mongoose.connection.close()
  });