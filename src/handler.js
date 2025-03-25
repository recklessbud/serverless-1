const serverless = require("serverless-http");
const express = require("express");
const app = express();
const getdbClient  = require('./db/db.config');
const { newLeads, getLeads, updateLeads } = require("./db/crud");
const { validate } = require("./middlware/validators");
const { STAGE } = require("./config/env.config");
// const getDrizzleClient = require("./db/db.config");

//files
//  const {DATABASE_URL, DEBUG} = require("./config/env.config");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

 

app.get("/",  async (req, res, next) => {
  // console.log(DATABASE_URL)
  const sql = await getdbClient()
  const now = Date.now();
  const [results] = await sql`select now();`
  const delta = (results.now.getTime() - now) / 1000
  return res.status(200).json({
    message: "Hello from root!",
    results: delta
  });
});


app.get("/leads", async(req, res, next) => {
  try {
  const results = await getLeads();
  return res.status(200).json({
    message: "Hello from path!",
    results: results,
    stage: STAGE
  });
  } catch (error) {
    console.log(error)
  }

});

app.post("/leads", async(req, res, next) => {
  const postData =  req.body
  const {data, hasError, message} = await validate(postData)
  if(hasError === true){
    return res.status(400).json({
      message: message ? message : "invalid request"
    })
  }else 
  if(hasError === undefined){
    return res.status(500).json({
     message: "server error"
    })
  }
  const results = await newLeads(data)
  return res.status(200).json({
    message: "Hello from path!",
    results: results.newEmail
  });
});

app.put("/leads/:id", async(req, res, next) => {
  const { id } = req.params
   try {
    const {email, name} = req.body
    const update = await updateLeads({email, name, id})
    return res.status(200).json({
      message: "update success",
      update: update
    })
   } catch (error) {
    console.log(error)
   }
});   
app.use((req, res, next) => {
  return res.status(404).json({
    error: "Not Found",
  });
});

exports.handler = serverless(app);
