
var db;

function errorHandler(error){
    console.error("SQL error: " + error.message);
}

var DB = {
    erCreateDatabase: function(){
        var shortName = "DPA";
        var version = "1.0";
        var displayName = "DPA Database";
        var dbSize = 2 * 1024 * 1024;

        function dbCreateSuccess() {
            console.info("Success: Database created successfully");
        }

        db = openDatabase(shortName, version, displayName, dbSize, dbCreateSuccess);
    },
    erCreateTables: function (){
        function txFunction(tx) {
            var artistTable = "CREATE TABLE IF NOT EXISTS artist(" +
                "id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT," +
                "userName  VARCHAR(20) NOT NULL," +
                "fullName VARCHAR(40)," +
                "email VARCHAR(40)," +
                "password VARCHAR(20) NOT NULL);";
            var options = [];

            tx.executeSql(artistTable, options, successCallback, errorHandler);

            //Declare sql for create type table
            var artTable = "CREATE TABLE IF NOT EXISTS art(" +
                "id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT," +
                "artName VARCHAR(20) NOT NULL," +
                "description VARCHAR(40)," +
                "price INTEGER," +
                "artLink VARCHAR(40)," +
                "artistId Integer," +
                "FOREIGN KEY(artistId) REFERENCES artist(id));";
            //Call executeSql
            tx.executeSql(artTable, options, successCallback, errorHandler);

            function successCallback() {
                console.info("Tables successfully created");
            }
        }

        function successTransaction() {
            console.info("Table transaction successfully created");
        }

        db.transaction(txFunction, errorHandler, successTransaction);
    },
    erDropTables: function () {
        function txFunction(tx) {
            var dropArtist = "DROP TABLE IF EXISTS artist;";
            var dropArt = "DROP TABLE IF EXISTS art;";
            var options = [];


            function successCallback() {
                console.info("Tables successfully dropped");
            }

            tx.executeSql(dropArtist, options, successCallback, errorHandler);
            tx.executeSql(dropArt, options, successCallback, errorHandler);
        }

        function successTransaction() {
            console.info("Transaction successfully dropped");
        }

        db.transaction(txFunction, errorHandler, successTransaction);
    }
}
