const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const axios = require('axios')

app.use(bodyParser.json())
app.use(cors({
    origin: '*'
}))
let PORT = process.env.PORT || 5000

// homepage 
app.get('/', (req, res) => {
    return res.send({
        message: 'Welcome to google map api Restaurant'
    })
})

app.post('/listrestaurant', (req, res) => {
    let keyWord = req.body.keyword
    const URI = 'https://maps.googleapis.com/maps/api/place/textsearch/json?query=restaurants+'+keyWord+'+thailand&key=AIzaSyAad3yPhxIlvCiiLN7SUjjuymXUCohTGEs';
    const encodedURI = encodeURI(URI);
    axios({
        method: 'get',
        url: encodedURI,
        headers: {
            'Content-Type': 'application/json'
        }
      })
        .then((response) =>{
          res.json(response.data)
    }).catch(error =>{
        res.json(error)
    })
})


app.listen(PORT, ()=>{
    console.log('running port 3000')
})

module.exports = app