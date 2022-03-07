import awsconfig from '../aws-exports';
const AWS = require('aws-sdk');


const SESConfig = {
  apiVersion: "2010-12-01",
  accessKeyId: 'testing',
  accessSecretKey: '',
  region: "us-east-1"
}
AWS.config.update(SESConfig);




export default function ReportButton(props) {


// Create sendEmail params 
const params = {
  Destination: { /* required */
    CcAddresses: [
      'lisa.cormier@bestoffrance.ca',
      /* more items */
    ],
    ToAddresses: [
      'lisa.cormier@bestoffrance.ca',
      /* more items */
    ]
  },
  Message: { /* required */
    Body: { /* required */
      Html: {
       Charset: "UTF-8",
       Data: "HTML_FORMAT_BODY"
      },
      Text: {
       Charset: "UTF-8",
       Data: "TEXT_FORMAT_BODY"
      }
     },
     Subject: {
      Charset: 'UTF-8',
      Data: 'Test email'
     }
    },
  Source: 'lisa.cormier@bestoffrance.ca', /* required */
  ReplyToAddresses: [
     'lisa.cormier@bestoffrance.ca',
    /* more items */
  ],
};
// Create the promise and SES service object
var sendPromise = new AWS.SES().sendEmail(params).promise();

  const onClick = function(){
    sendPromise.then(
    function(data) {
      console.log(data.MessageId);
    }).catch(
      function(err) {
      console.error(err, err.stack);
    });
  }
  

  return (
    <button onClick={onClick}>Report Business</button>
  )


}
