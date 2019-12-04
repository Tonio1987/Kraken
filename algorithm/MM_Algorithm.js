module.exports = {
    calculateMM: function(data, callback) {
        new Promise(function (resolve, reject) {
            let count = 0;
            for(let ticker in data){
                if (data.hasOwnProperty(ticker)) {
                    count++;
                }
            }
            console.log(count);
            resolve(count);
        }).then(function(res){
            callback(null, res);
        }).catch(function(err) {
            callback(err, null);
        });
    }
};
