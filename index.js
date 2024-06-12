const express = require('express');
const cors = require('cors');
const multer = require('multer');
require('dotenv').config()

const app = express();

// Middleware
app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));
app.use((req,res,next)=>{
  console.log(`${req.method} ${req.url}`)
  return next()
})

// Serve Homepage
app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});


// Handle files
const upload = multer({dest:'./public/uploads/'})

app.post('/api/fileanalyse',upload.single('upfile'),(req,res)=>{
const name = req.file.originalname
const type = req.file.mimetype
const size = req.file.size
const response = {name,type,size}
  res.json(response)
})

// Start Server
const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
