'use strict'
const fs = require('fs')
const { exec } = require('child_process')
import customScriptTemplate from './customScriptTemplate'
import getConnection from './sfdc'

export function build(alias){
    return new Promise ( (resolve, reject) => {
        var cmd = 'rollup -c'
        const execTask = exec(cmd, {}, (err, stdout, stderr) => {
            if(err){
                console.log(stderr)
                reject(err)
            }else{
                console.log(stdout)
                resolve(stdout)
            }
        })
    })
}

export function buildDev(alias){
    return new Promise ( (resolve, reject) => {
        var cmd = 'rollup -c rollup.config.dev.js'
        const execTask = exec(cmd, {}, (err, stdout, stderr) => {
            if(err){
                console.log(stderr)
                reject(err)
            }else{
                console.log(stdout)
                resolve(stdout)
            }
        })
    })
}


export function push(alias){
    let conn, qcpScript, qcp

    return new Promise ( (resolve, reject) => {
        let errHandle = (err) => {
            reject(err)
        }
        Promise.all([getBundle(), getConnection(alias)])
            .then( (responses) => {
                qcpScript = responses[0]
                qcp = customScriptTemplate
                conn = responses[1]
                return fetchQuoteCalculatorPlugin(conn)
            }, errHandle)
            .then( (customScriptRecord) =>{

                qcp.SBQQ__Code__c = qcpScript

                if(customScriptRecord){
                    qcp.Id = customScriptRecord.Id;
                    console.log('qcp', qcp)

                    conn.sobject('SBQQ__CustomScript__c').update(qcp, (err, ret) => {
                        if(err || !ret.success){
                            reject(ret)
                        }else{
                            resolve(ret)
                        }
                    })
                }else{
                    console.log('qcp', qcp)

                    conn.sobject('SBQQ__CustomScript__c').insert(qcp, (err, ret) => {
                        if(err || !ret.success){
                            reject(ret)
                        }else{
                            resolve(ret)
                        }
                    })
                }

            }, errHandle)

    })
}

function getBundle(){
    return new Promise( (resolve, reject) => {
        fs.readFile('./dist/bundle.js', 'utf8', (err, data) => {
            if(err){
                reject(err)
            }else{
                resolve(data)
            }
        })
    })
}

export function fetchQuoteCalculatorPlugin(conn){
    return new Promise( (resolve, reject) => {
        conn.query("SELECT Id, Name, SBQQ__Code__c " +
                "FROM SBQQ__CustomScript__c " +
                "WHERE Name = '" + customScriptTemplate.Name + "' ORDER BY Id", function(err, result) {
            if (err) {
                reject(err)
            }else{
                console.log('found custom script records: ' + result.records.length)
                result.records.length > 0 ? resolve(result.records[0]) : resolve(null)
            }
        });
    })
}

