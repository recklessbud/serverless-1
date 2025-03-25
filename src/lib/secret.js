const {SSMClient, ListAssociationsCommand, GetParameterCommand,
  PutParameterCommand, DeleteParameterCommand
} = require('@aws-sdk/client-ssm');

const { neon, neonConfig } = require("@neondatabase/serverless");

const { STAGE } = require("../config/env.config")


//files
//  const {DATABASE_URL, DEBUG} = require("./config/env.config");

//  const ssm = new AWS.SSM({region: 'us-east-1'});


 async function getDatabaseUrl(){
    const DATABASE_URL_SSM_PARAM=`/serverless-app/${STAGE}/database-url`
  const client = new SSMClient({ region: 'us-east-1' });
  const paramStore = ({
    Name: DATABASE_URL_SSM_PARAM,
    WithDecryption: true
  })

  const command = new GetParameterCommand(paramStore);
  const results = await client.send(command);
  return results.Parameter.Value
 }

 async function putDatabaseUrl(stage, dbUrlValue){
  const paramStage = stage ? stage : "dev"
  if(paramStage === "prod"){
    return
  }
  if(!dbUrlValue){
    return
  }
  const DATABASE_URL_SSM_PARAM=`/serverless-app/${paramStage}/database-url`
  const client = new SSMClient({ region: 'us-east-1' });
  const paramStore = ({
    Name: DATABASE_URL_SSM_PARAM,
    Value: dbUrlValue,
    Type: "SecureString",
    Overwrite: true
  })

  const command = new PutParameterCommand(paramStore);
  const results = await client.send(command);
  return results
}
 
 module.exports = {getDatabaseUrl, putDatabaseUrl}