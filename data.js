var vogels = require('vogels');
vogels.AWS.config.loadFromPath('credentials.json');
const Joi = require('joi');
const AWS = require('aws-sdk');

AWS.config.update({ accessKeyId: "myKeyId", secretAccessKey: "secretKey", region: "us-east-1" });
vogels.dynamoDriver(new AWS.DynamoDB({ endpoint: 'http://localhost:8000' }));


var Contact = vogels.define('Contact', {
    hashKey : 'Id',
   
    // add the timestamp attributes (updatedAt, createdAt)
    timestamps : true,
   
    schema : {
      Id   : Joi.number(),
      name    : Joi.string(),
      number     : Joi.number()
    }

  });

//   Contact.create({Id: 1, name: 'Foo Bar', number: 1}, function (err, acc) {
//     console.log('created contact in DynamoDB');
//   })

  Contact.query(1).exec(function() {
      console.log('queried')
  });