const { AWS_ACCESS, AWS_SECRET } = require("../config/env.config");
const { putDatabaseUrl } = require("../lib/secret");

const args = process.argv.slice(2);

if(args.length !== 2){
    console.log('usage: tsx src/cli/putSecret.js <stage> <dburl>')
    process.exit(1)
}

if (require.main === module) {
    console.log("Update Secret")
    const [stage, dbUrl] = args
    putDatabaseUrl(stage, dbUrl).then(val=>{
        console.log(val)
        console.log(`secrets set for ${stage} to ${dbUrl}`)
        process.exit(0)
    })
    .catch(err=>{
        console.log(err)
        process.exit(1)
    })
}