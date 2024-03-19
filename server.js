const express = require('express');
const path = require('path');

const PORT = 3333;

const app = express();

// parses json into js
app.use(express.json());
// serves static files

app.use(express.static('dist'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// app.use(express.static('public'));

// app.get('/', (req, res) => {
//     return res.status(200).sendFile(path.join(__dirname, './index.html'));
//   });

// // sends a 404 error for trying to access a page that doesn't exist
// app.get('*', (req, res) => res.sendStatus(404));

// global error handlers
app.use((err, req, res, next) =>{
  const defaultError = {
    log: 'Error in middleware',
    status: 500,
    message: { err: 'An error occurred.' },
  };
  const errorObj = Object.assign(defaultError, err);
  console.log('Err', errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});


app.listen(PORT, () =>{
    console.log('Server on PORT:', PORT);
  });