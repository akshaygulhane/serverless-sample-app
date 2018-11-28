
const serverless = require('serverless-http');
const express = require('express')
const app = express()

app.get('/', function (req, res) {
  res.send('Hello World!')
})

const bodyParser = require('body-parser');
const AWS = require('aws-sdk');

const CONTACTS_TABLE = 'contacts';
const USERS_TABLE = 'users';

const IS_OFFLINE = true;

let dynamoDb;


  dynamoDb = new AWS.DynamoDB.DocumentClient({
    region: 'localhost',
    endpoint: 'http://localhost:8000'
  })
  console.log(dynamoDb);

app.use(bodyParser.json({ strict: false }));

app.get('/contacts', function(req, res) {
    res.status(200).json([
        {
            'name' : 'test',
            'contact' : '1234'
        },
        {
            'name' : 'test1',
            'contact' : '1234'
        },
    ])
})


app.get('/contacts/:name', function(req, res) {
    res.status(200).json([
        {
            'name' : 'test',
            'contact' : '1234'
        },
        {
            'name' : 'test1',
            'contact' : '1234'
        },
    ])
})


app.get('/contacts/all', function(req, res) {
    res.status(200).json([
        {
            'name' : 'test',
            'contact' : '1234'
        },
        {
            'name' : 'test1',
            'contact' : '1234'
        },
    ])
})

app.put('/contacts', function(req, res) {
    //put the data in the dynamodb and then send the response
    let jsonBody = (req.body);
    let name = jsonBody.name;
    let number = jsonBody.number;

    var params = {
        TableName: 'contacts',
        Item: {
            name: name,
            number: number
        }
    };

    dynamoDb.put(params, function(err, data) {
        if (err) res.send(err); // an error occurred
        else res.send(data); // successful response
    });

    // res.send(`Contact of ${name} with the number ${number} added successfully!`)

})

app.delete('/contacts', function(req, res) {
    //put the data in the dynamodb and then send the response
    let jsonBody = JSON.parse(req.body);
    let name = jsonBody.name;
    let number = jsonBody.number;

    res.send(`Contact of ${name} with the number ${number} deleted successfully!`)

})

// // Get User endpoint
// app.get('/users/:userId', function (req, res) {
//     const params = {
//       TableName: USERS_TABLE,
//       Key: {
//         userId: req.params.userId,
//       },
//     }
  
//     dynamoDb.get(params, (error, result) => {
//       if (error) {
//         console.log(error);
//         res.status(400).json({ error: 'Could not get user' });
//       }
//       if (result.Item) {
//         const {userId, name} = result.Item;
//         res.json({ userId, name });
//       } else {
//         res.status(404).json({ error: "User not found" });
//       }
//     });
//   })
  
  // Create User endpoint
//   app.post('/users', function (req, res) {
//     const { userId, name } = req.body;
//     if (typeof userId !== 'string') {
//       res.status(400).json({ error: '"userId" must be a string' });
//     } else if (typeof name !== 'string') {
//       res.status(400).json({ error: '"name" must be a string' });
//     }
  
//     const params = {
//       TableName: 'users',
//       Item: {
//         userId: userId,
//         name: name,
//       },
//     };
  
//     dynamoDb.put(params, (error) => {
//       if (error) {
//         console.log(error);
//         res.status(400).json({ error: 'Could not create user' });
//       }
//       res.json({ userId, name });
//     });
//   })

module.exports.handler = serverless(app);