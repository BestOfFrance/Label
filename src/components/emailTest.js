import './CreateAccount.css'
import API from '@aws-amplify/api';


const AWS = require('aws-sdk');

const SES_CONFIG = {
    accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY,
    secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
    region: 'us-east-1',
};

const AWS_SES = new AWS.SES(SES_CONFIG);
// console.log(process.env)



let sendEmail = (message, user, id) => {
    let params = {
      Source: 'lisa.cormier@bestoffrance.ca',
      Destination: {
        ToAddresses: [
          'lcormier5@hotmail.com'
        ],
      },
      ReplyToAddresses: [],
      Message: {
        Body: {
          Html: {
            Charset: 'UTF-8',
            Data: message,
          },
        },
        Subject: {
          Charset: 'UTF-8',
          Data: user,
        }
      },
    };
    return AWS_SES.sendEmail(params).promise();
};

const onSubmit = function (message, user, id) {
  sendEmail(message, user, id) 
  .then((out) => {
    console.log(out)
  })
  
}








export default function ReportButton(props) {

  
  

  

  return (
    <button onClick={() => {onSubmit('hello', 'hello', 'hello')}}>Report Business</button>
  )


}
