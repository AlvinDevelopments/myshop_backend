const express = require('express');

const mongoose = require('mongoose');

const bodyParser = require('body-parser');



const app = express();
const port = process.env.PORT || 8080;


mongoose.connect('mongodb://alvnl:123yo@ds161539.mlab.com:61539/guestbook');

const Comment = mongoose.model('Comment',{name:String, term: String});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/api/hello', (req, res) => {
  console.log('hello!!');
  res.send({ express: 'Hello From Express' });
});


app.post('/post', (req, res) => {
  // console.log(req);
  const comment = new Comment({name:req.body.comment.name, term:req.body.comment.term});
  comment.save().then(()=>console.log('posted up!!!!'));
  res.send({ express: 'Posted' });

});

app.get('/comments', (req, res) => {
  // console.log(req);
  Comment.find(function(err,comments){
    console.log(comments);
    if(err){
      return console.error(err);
    }
    return res.send(comments.reverse());
  });
});

app.listen(port, () => console.log(`Listening on port ${port}`));
