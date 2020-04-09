var express = require('express');
var socket = require('socket.io');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

var app = express();

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI || `mongodb://localhost:27017/ten`);

app.use(bodyParser.json());

// server = app.listen(8080, function(){
//     console.log('server is running on port 8080')
// });

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
  
    const path = require('path');
    app.get('*', (req,res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
  
  }
  
  const PORT = process.env.PORT || 5000;
  server = app.listen(PORT, () => {
    console.log(`app running on port ${PORT}`)
  });


io = socket(server);

io.on('connection', (socket) => {
    console.log(socket.id);

    socket.on('SEND_MESSAGE', function(data){
        io.emit('RECEIVE_MESSAGE', data);
    })
});



