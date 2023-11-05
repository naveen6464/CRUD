const { DynamoDBClient, PutItemCommand } = require("@aws-sdk/client-dynamodb");
const fs = require('fs');
const csvParser = require('csv-parser');

const dynamodbClient = new DynamoDBClient({ region: 'us-east-1' });
const tableName = 'transaction';

fs.createReadStream('test.csv')
  .pipe(csvParser())
  .on('data', (row) => {
    const params = {
      TableName: tableName,
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
        'createdAt': { N: row.createdAt },
        'cvv': { S: row.cvv },
        'email': { S: row.email },
        'expDate': { S: row.expDate },
        'firstName': { S: row.firstName },
        'fundraiserAmount': { N: row.fundraiserAmount },
        'invoiceId': { S: row.invoiceId },
        'isActive': { S: row.isActive},
        'isAnonymous': { S: row.isAnonymous },
        'lastName': { S: row.lastName },
        'method': { S: row.method },
        'modeType': { S: row.modeType },
        'paymentMethod': { S: row.paymentMethod },
        'state': { S: row.state },
        'streetAddress': { S: row.streetAddress },
        'tipAmount': { N: row.tipAmount },
        'tipPercent': { N: row.tipPercent },
        'totalAmount': { S: row.totalAmount },
        'transactionId': { S: row.transactionId },
        'unit': { S: row.unit },
        'updatedAt': { S: row.updatedAt },
        'userId': { S: row.userId },
        'userName': { S: row.userName },
        'verified': { S: row.verified},
      },
    };
console.log(params,"params");
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
