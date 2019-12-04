module.exports = {
    calculateMM: function(data, callback) {
        new Promise(function (resolve, reject) {
            let count = 0;
            let sum = 0;
            let pair = '';
            for(let ticker in data){
                if (data.hasOwnProperty(ticker)) {
                    count++;
                }else{
                    reject();
                }
            }
            console.log(count);
            for(let i in data){
                if (data.hasOwnProperty(i)) {
                    sum = sum + data[i].ask_price;
                    pair = data[i].pair;
                    // he crreqte json obj to insert
                }else{
                    reject();
                }
            }
            resolve(count);
        }).then(function(res){
            callback(null, res);
        }).catch(function(err) {
            err = 'Error during MM calculation';
            callback(err, null);
        });
    }
};
