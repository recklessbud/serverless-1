// const e = require('express');
const {z} = require('zod');

const validate = (schema) => {
    const leadSchema = z.object({
        email: z.string().email(),
    })
    let hasError
    let result = {}
    let message
    try {
    result = leadSchema.parse(schema)
    hasError=false
    message=""
    } catch (error) {
        hasError=true
        message="invalid data please try again"
    }
  
  return {
    data: result,
    hasError: hasError,
    message: message
  }
}

module.exports = {
  validate
}