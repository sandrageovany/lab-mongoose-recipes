const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })
  .then(self => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any documents to the database, let's delete all previous entries
    return self.connection.dropDatabase();
  })
  .then(() => {
updateDB(); })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });

async function updateDB() {
  try {

    let createdRec= await Recipe.create({title:'Pizza', cuisine:'Italian'});
    console.log(createdRec.title);
    let d= await Recipe.insertMany(data);
   d.forEach(recipe => console.log(recipe.title))
  
    await Recipe.findOneAndUpdate({title:'Rigatoni alla Genovese'},{duration:100});
    console.log('successfully updated');
    await Recipe.deleteOne({title:'Carrot Cake'});
    console.log('carrot cake deleted');
    
  }
  catch(error){
    console.log(error);
  }
  finally{
    mongoose.connection.close();
  }
}
