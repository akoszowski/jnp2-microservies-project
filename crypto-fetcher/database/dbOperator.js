const { Pool } = require('pg')

const connectionString = 'postgres://cesuxydywskzgr:f86a5aa242e895bdf2f795b7f4af812e2e06ec5404feecbac65fad25709136bf@ec2-54-74-95-84.eu-west-1.compute.amazonaws.com:5432/d7f6kvgsivse16'
const pool = new Pool({
    connectionString,
    ssl: {
        rejectUnauthorized: false
    }
})

module.exports = pool
