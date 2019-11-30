'use strict'

const key          = '2C7PPpaaHBK1NVCOLJgS4MRzwG+mcojP6InkYQpT3q+6WcFcOY3kvL6r'; // API Key
const secret       = '2NuuzzjfcDrwkmj9RSDOEnGBNigXZvbAGh5aszJp4P4+gY2Fmr8gyldRefa24CPYV90XR0ibV9kD0JIWEumT/g=='; // API Private Key
const KrakenClient = require('kraken-api');
const kraken       = new KrakenClient(key, secret);

function packageInfo (callback) {
    return new Promise((resolve, reject) => {

        (async (err, data) => {
            if (err) {
                // if no callback available, reject the promise
                // else, return callback using "error-first-pattern"
                return callback ? callback(err) : reject(err)
            }
            data = await kraken.api('Time');

            return callback ? callback(null, data) : resolve(data)

        })();

    })
}

module.exports = packageInfo;

