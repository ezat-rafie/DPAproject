var Registration = {
    erInsert: function(options, callback){
        function txFunction(tx) {
            var sql = "INSERT INTO artist(userName, fullName, email, password) VALUES(?,?,?,?);";
            tx.executeSql(sql, options, callback, errorHandler );
        }
        function successTransaction() {
            console.info("transaction insert was successful");
        }
        db.transaction(txFunction, errorHandler, successTransaction);
    },
    erSelectAll: function(options, callback){
        function txFunction(tx) {
            var sql = "SELECT * FROM artist;";
            tx.executeSql(sql, options, callback, errorHandler );
        }
        function successTransaction() {
            console.info("Success: selectAll transaction successful");
        }
        db.transaction(txFunction, errorHandler, successTransaction);
    }
};

var AddArt = {
    erAddArt: function(options, callback){
        function txFunction(tx) {
            var sql = "INSERT INTO art(artName, description, price, artLink, artistId) VALUES(?,?,?,?,?);";
            tx.executeSql(sql, options, callback, errorHandler );
        }
        function successTransaction() {
            console.info("transaction insert was successful");
        }
        db.transaction(txFunction, errorHandler, successTransaction);
    }
};

var GetArt ={
    erSelectAll: function(options, callback){
        function txFunction(tx) {
            var sql = "SELECT * FROM art WHERE artistId = ?;";
            tx.executeSql(sql, options, callback, errorHandler );
        }
        function successTransaction() {
            console.info("Success: selectAll transaction successful");
        }
        db.transaction(txFunction, errorHandler, successTransaction);
    }
};



var Logins = {
    erCheckLogin: function (options, callback) {
        function txFunction(tx) {
            var sql = "SELECT * FROM artist WHERE userName=? AND password=?;";
            tx.executeSql(sql, options, callback, errorHandler );
        }
        function successTransaction() {
            console.info("Success: Select transaction successful");
        }
        db.transaction(txFunction, errorHandler, successTransaction);
    }
};
