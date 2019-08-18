const express = require('express')
const app = express()
const port = 3000
const mongoose = require('mongoose');

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }))

var storeSchema = new mongoose.Schema({
    Class: String,
    Color: String,
  });

  const Store = mongoose.model('classes', storeSchema);


app.get('/', (req, res) => {
mongoose.connect('mongodb+srv://dave:4JHsFUCL2UCZiaAm@cluster0-d4cp5.mongodb.net/store?retryWrites=true&w=majority', {useNewUrlParser: true});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    const hList = [];
    const bColor = [];

      Store.find(function (err, stores) {
        if (err) return console.error(err);
        // console.log(stores)
        // Loop through items in stores and push to global array to be displayed
        for(let i in stores){
            // console.log(stores[i].Class)
            const className = stores[i].Class
            let theColor = stores[i].Color
            bColor.push(theColor)
            hList.push(`<div style="background-color: ${theColor}; border: 1px solid purple; height: 200px; width: 200px; float: left; margin: 5px; text-align: center;"><h1>${className}</h1></div>`)
        }
        res.send(hList.join('') + `<form action="/addClass" method="POST">
        <input type="submit" value="Add Class">
        </form>`)
      })

      


});
}

)

app.use('/addClass', (req, res) => {
    res.send(`<form action="/displayClasses" method="POST">
    Please add your Class: <input type="text" name="class"><br>
    Color: <input type="text" name="color"><br>
    <input type="submit" value="Submit">
  </form>`)

  
})

app.use('/displayClasses', (req, res) => {
    mongoose.connect('mongodb+srv://dave:4JHsFUCL2UCZiaAm@cluster0-d4cp5.mongodb.net/store?retryWrites=true&w=majority', {useNewUrlParser: true});
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function() {
        console.log("connected in addclass")
        const wowClass = new Store({ Class: req.body.class, Color: req.body.color });
wowClass.save(function (err, wowClass) {
    if (err) return console.error(err);
    else{
        res.redirect('/')
    }
  });
    });

    
 
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))