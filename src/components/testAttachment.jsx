// import awsconfig from '../../../Label/src/aws-exports';
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
          'lisa.cormier@bestoffrance.ca'
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
  .then(() => {
    API.put('shopsApi', `/shops`, { 
      body: {
        id: id,
        hidden: true
        
      }
    }).then(result => {
      //const result = JSON.parse(result.body);
      console.log(result)
    }).catch(err => {
      console.log(err);
    })
  })
  .catch((err) => {
    console.log(err)
  })
  
}








export default function ReportButton(props) {

  
  
    
  

  

  return (
    <button onClick={() => {onSubmit(props.message, props.user, props.id)}}>Report Business</button>
  )


}
