'use strict'
import jsforce from 'jsforce'
const fs = require('fs');
const { exec } = require('child_process')

var credentials = {
    username: null,
    password: null,
    optionalToken: null,
    loginUrl: null
}

const noCredsMsg = 'Neither a Salesforce alias nor sfCredentials.json were provided for deployment'

export default function(alias){
    return new Promise( (resolve, reject) =>{

        if(alias){
            let cmd = 'sfdx force:org:display --json -u ' + alias
            const execTask = exec(cmd, {}, (err, stdout, stderr) => {
                if(err){
                    reject(err)
                }else{
                    let orgDetail = JSON.parse(stdout)
                    let conn = new jsforce.Connection({
                        instanceUrl: orgDetail.result.instanceUrl,
                        accessToken: orgDetail.result.accessToken
                    })
                    conn.identity( (err, res) => {
                        if(err){
                            reject(err)
                        }else{
                            //console.log('identity', res)
                            resolve(conn)
                        }
                    })
                }
            })
        }else if(fs.existsSync('././sfCredentials.json')){

            let sfCredentials = require('../sfCredentials')
            credentials.username = sfCredentials.username != 'user@myorg.com' ? sfCredentials.username : null
            credentials.password = sfCredentials.password != 'supersecret' ? sfCredentials.password : null
            credentials.token = sfCredentials.token
            credentials.loginUrl = sfCredentials.loginUrl || "https://test.salesforce.com"

            let user = credentials.username,
                pass = credentials.password + (credentials.token ? credentials.token : '')

            if(!user){
                reject(noCredsMsg)
            }

            let conn = new jsforce.Connection({
                loginUrl: credentials.loginUrl
            })

            console.log('credentials', credentials)
            conn.login(user, pass, (err, userInfo) => {
                if(err){
                    reject(err)
                }else{
                    console.log('userinfo', userInfo)
                    resolve(conn)
                }
            })

        }else{
            reject(noCredsMsg)
        }

    })
}