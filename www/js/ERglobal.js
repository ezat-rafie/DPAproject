function btnShowMap_click() {
    getPosition();
}

function btnRegister_click() {
    erRegister();
}

function btnLogin_click() {
    login();
}

function btnAddArt_click() {
    addArt();
}

function erArtistsPage_show() {
    showArtists();
}

function erArtsPage_show() {
    showArts();
}

function init() {
    $("#erAboutPage").on("pageshow", btnShowMap_click);
    $("#erArtistsPage").on("pageshow", erArtistsPage_show);
    $("#erArtsPage").on("pageshow", erArtsPage_show);
    $("#btnRegister").on("click", btnRegister_click);
    $("#btnLogin").on("click", btnLogin_click);
    $("#btnAddArt").on("click", btnAddArt_click);
}

function initDB(){
    try {
        DB.erCreateDatabase();
        if (db) {
            console.info("Creating tables...");
            DB.erCreateTables();
        }
        else{
            console.error("Error: Cannot create Tables: database does not exist!");
        }
    } catch (e) {
        console.error("Error: (Fatal) Error in initDB(). Can not proceed");
    }
}

$(document).ready(function () {
    init();
    initDB();
});
