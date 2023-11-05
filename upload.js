const AWS = require('aws-sdk');
const fs = require('fs');
const csvParser = require('csv-parser');

// Configure AWS SDK with your credentials
AWS.config.update({
  region: 'us-east-1',
  accessKeyId: 'AKIAVIQHSAF7YMQ6HWVI',
  secretAccessKey: 'xU+TGjT2Ci9go66kX03Ks0lkLcyg8+inLv/wHwhR',
});
console.log("ss");
const dynamodb = new AWS.DynamoDB();
const tableName = 'transactions';

// Read the CSV file and upload its contents to DynamoDB
fs.createReadStream('test.csv')
  .pipe(csvParser())
  .on('data', (row) => {
    
    const params = {
      TableName: tableName,
      Item: {
        // Define the structure of your DynamoDB table here, mapping CSV columns to DynamoDB attributes
        // Example:
        Item: {
            'id': { S: row.id },
            'actualDate': { S: row.actualDate },
            'amount': { N: row.amount },
            'campaignId': { S: row.campaignId },
            'campaignList': { S: row.campaignList },
            'campaignTitle': { S: row.campaignTitle },
            'cardHolderName': { S: row.cardHolderName },
            'cardNumber': { S: row.cardNumber },
            'city': { S: row.city },
            'collectedAmount': { N: row.collectedAmount },
            'countryCode': { S: row.countryCode },
            'createdAt': { S: row.createdAt },
            'cvv': { S: row.cvv },
            'email': { S: row.email },
            'expDate': { S: row.expDate },
            'firstName': { S: row.firstName },
            'fundraiserAmount': { N: row.fundraiserAmount },
            'invoiceId': { S: row.invoiceId },
            'isActive': { S: row.isActive },
            'isAnonymous': { BOOL: row.isAnonymous },
            'lastName': { S: row.lastName },
            'method': { S: row.method },
            'modeType': { S: row.modeType },
            'paymentMethod': { S: row.paymentMethod },
            'state': { S: row.state },
            'streetAddress': { S: row.streetAddress },
            'tipAmount': { N: row.tipAmount },
            'tipPercent': { N: row.tipPercent },
            'totalAmount': { N: row.totalAmount },
            'transactionId': { S: row.transactionId },
            'unit': { S: row.unit },
            'updatedAt': { S: row.updatedAt },
            'userId': { S: row.userId },
            'userName': { S: row.userName },
            'verified': { BOOL: row.verified },
          },
      },
    };

    dynamodb.putItem(params, (err, data) => {
      if (err) {
        console.error('Error', err);
      } else {
        console.log('Uploaded item:', row.id);
      }
    });
  })
  .on('end', () => {
    console.log('CSV file processing complete');
  });



//   const AWS = require('aws-sdk');
// const fs = require('fs');
// const csvParser = require('csv-parser');

// AWS.config.update({
//   region: 'your-dynamodb-region',
//   accessKeyId: 'your-access-key-id',
//   secretAccessKey: 'your-secret-access-key',
// });

// const dynamodb = new AWS.DynamoDB();
// const tableName = 'YourDynamoDBTableName';

// fs.createReadStream('your-data.csv')
//   .pipe(csvParser())
//   .on('data', (row) => {
//     const params = {
    //   TableName: tableName,
//       Item: {
//         'id': { S: row.id },
//         'actualDate': { S: row.actualDate },
//         'amount': { N: row.amount },
//         'campaignId': { S: row.campaignId },
//         'campaignList': { S: row.campaignList },
//         'campaignTitle': { S: row.campaignTitle },
//         'cardHolderName': { S: row.cardHolderName },
//         'cardNumber': { S: row.cardNumber },
//         'city': { S: row.city },
//         'collectedAmount': { N: row.collectedAmount },
//         'countryCode': { S: row.countryCode },
//         'createdAt': { S: row.createdAt },
//         'cvv': { S: row.cvv },
//         'email': { S: row.email },
//         'expDate': { S: row.expDate },
//         'firstName': { S: row.firstName },
//         'fundraiserAmount': { N: row.fundraiserAmount },
//         'invoiceId': { S: row.invoiceId },
//         'isActive': { BOOL: row.isActive === 'true' },
//         'isAnonymous': { BOOL: row.isAnonymous === 'true' },
//         'lastName': { S: row.lastName },
//         'method': { S: row.method },
//         'modeType': { S: row.modeType },
//         'paymentMethod': { S: row.paymentMethod },
//         'state': { S: row.state },
//         'streetAddress': { S: row.streetAddress },
//         'tipAmount': { N: row.tipAmount },
//         'tipPercent': { N: row.tipPercent },
//         'totalAmount': { N: row.totalAmount },
//         'transactionId': { S: row.transactionId },
//         'unit': { S: row.unit },
//         'updatedAt': { S: row.updatedAt },
//         'userId': { S: row.userId },
//         'userName': { S: row.userName },
//         'verified': { BOOL: row.verified === 'true' },
//       },
//     };

//     dynamodb.putItem(params, (err, data) => {
//       if (err) {
//         console.error('Error', err);
//       } else {
//         console.log('Uploaded item:', row.id);
//       }
//     });
//   })
//   .on('end', () => {
//     console.log('CSV file processing complete');
//   });












const { DynamoDBClient, PutItemCommand } = require("@aws-sdk/client-dynamodb");
const fs = require('fs');
const csvParser = require('csv-parser');

const dynamodbClient = new DynamoDBClient({ region: 'your-dynamodb-region' });
const tableName = 'YourDynamoDBTableName';

fs.createReadStream('your-data.csv')
  .pipe(csvParser())
  .on('data', (row) => {
    // Function to convert "<empty>" to null
    const convertToNull = (value) => (value === '<empty>' ? null : value);

    const params = {
      TableName: tableName,
      Item: {
        'id': { S: convertToNull(row.id) },
        'actualDate': { S: convertToNull(row.actualDate) },
        // ... (other attributes)
      },
    };

    const command = new PutItemCommand(params);

    dynamodbClient.send(command)
      .then((data) => {
        console.log('Uploaded item:', row.id);
      })
      .catch((err) => {
        console.error('Error', err);
      });
  })
  .on('end', () => {
    console.log('CSV file processing complete');
  });
