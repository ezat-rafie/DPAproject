function erRegister(){
    if(isFormValid()){
        var username = $("#txtUsername").val();
        var fullName = $("#txtFullName").val();
        var email = $("#txtEmail").val();
        var password = $("#txtPassword").val();

        console.info("Register form is valid");
        options = [username, fullName, email, password];

        function callback() {
            console.info("Registered");
            window.location.href = "#erArtistsPage";
        }

        Registration.erInsert(options, callback);
    }
    else {
        console.error("Register form validation failed");
    }
}

function login(){
    if(loginFormValid()){
        var retrievedUser;
        var retrievedPass;
        var usernameLogin = $("#txtLoginUsername").val();
        var passwordLogin = $("#txtLoginPassword").val();
        function callback(tx, results) {
            var row = results.rows[0];
            if (row){
                retrievedUser= row['userName'];
                retrievedPass= row['password'];

                if((usernameLogin === retrievedUser) && (passwordLogin === retrievedPass)){
                    localStorage.setItem("id", row['id']);
                    window.location.href = "#erAddArtPage";
                }
                else {
                    alert("Wrong login credentials");
                }
            }
            else {
                alert("Wrong login credentials");
            }
        }
        options = [usernameLogin, passwordLogin];
        Logins.erCheckLogin(options, callback);



        console.info("Login form is valid");
    }
}

function addArt(){
    if(addArtFormValid()){
        var artName = $("#txtArtName").val();
        var description = $("#txtDescription").val();
        var price = $("#txtPrice").val();
        var link = $("#txtArtLink").val();
        var artistId = localStorage.getItem("id");

        console.info("Register form is valid");
        options = [artName, description, price, link, artistId];

        function callback() {
            console.info("Art Added");
            window.location.href = "#erArtsPage";
        }

        AddArt.erAddArt(options, callback);
    }
    else {
        console.error("Register form validation failed");
    }
}

function erUpdateFeedback(){
    if(isEditFormValid()){
        var id = localStorage.getItem("id");

        var businessName = $("#erEditBusinessName").val();
        var typeId = $("#erTypeEdit").val();
        var reviewerEmail = $("#erEditReviewerEmail").val();
        var reviewerComments = $("#erEditReviewerComment").val();
        var reviewDate = $("#erEditReviewDate").val();
        var hasRating = $("#erEditAddRating").prop("checked");
        var rating1;
        var rating2;
        var rating3;
        if (hasRating === true){
            rating1 = $("#erEditFoodQuality").val();
            rating2 = $("#erEditService").val();
            rating3 = $("#erEditValue").val();
        }
        else {
            rating1 = 0;
            rating2 = 0;
            rating3 = 0;
        }

        options = [businessName, typeId, reviewerEmail, reviewerComments,
            reviewDate, hasRating, rating1, rating2, rating3, id];

        function callback() {
            console.info("Record updated successfully");
        }

        Review.erUpdate(options, callback);
        alert("feedback successfully update");
        $(location).prop('href', '#erViewFeedbackPage');
    }
    else {
        console.info("Form is not valid");
    }
}

function erDeleteFeedback(){
    var id = localStorage.getItem("id");

    var options = [id];

    function callback() {
        alert("feedback successfully deleted");
        $(location).prop('href', '#erViewFeedbackPage');
    }

    Review.erDelete(options, callback);
}

function showArtists(){
    $("#artistList").html("Empty");
    $("#artistList").listview("refresh");


    var options = [];


    function callback(tx, results) {
        var htmlCode = "";
        for (var i = 0; i < results.rows.length; i++) {
            var row = results.rows[i];

            htmlCode += "<li><a data-role='button' data-row-id=" + row['id'] + " href='#'>" +
                "<h3>Full Name: " + row['fullName'] + "</h3>" +
                "<p>Email: " + row['email'] + "</p>" +
                "</a></li>";
        }
        function clickHandler() {
            localStorage.setItem("id", $(this).attr("data-row-id"));
            $(location).prop('href', '#erArtsPage');
        }

        var lv = $("#artistList");
        lv = lv.html(htmlCode);
        lv.listview("refresh");

        $("#artistList a").on("click", clickHandler);
    }
    Registration.erSelectAll(options, callback);
}

function showArts(){
    $("#artList").html("Empty");
    $("#artList").listview("refresh");

    var id = localStorage.getItem("id");
    var options = [id];


    function callback(tx, results) {
        var htmlCode = "";
        for (var i = 0; i < results.rows.length; i++) {
            var row = results.rows[i];

            htmlCode += "<li>" +
                "<h3>Art Name: " + row['artName'] + "</h3>" +
                "<p>Description: " + row['description'] + "</p>" +
                "<img src='" + row['artLink'] + "' width='50%' alt='"+row['artName']+"'>" +
                "<p>Price: " + row['price'] + "</p>" +
                "</li>";
        }
        var lv = $("#artList");
        lv = lv.html(htmlCode);
        lv.listview("refresh");
    }
    GetArt.erSelectAll(options, callback);
}

function showOneFeedback(){
    var id = localStorage.getItem("id");


    var options = [id];

    function callback(tx, results) {
        var row = results.rows[0];

        console.info("businessName: " + row['businessName'] +
            " typeId: " + row['typeId'] +
            " reviewerEmail: " + row['reviewerEmail'] +
            " reviewerComments: " + row['reviewerComments'] +
            " reviewDate: " + row['reviewDate']
        );

        $("#erEditBusinessName").val(row['businessName']);
        $("#erTypeEdit").val(row['typeId']);
        $("#erEditReviewerEmail").val(row['reviewerEmail']);
        $("#erEditReviewerComment").val(row['reviewerComments']);
        $("#erEditReviewDate").val(row['reviewDate']);
        if (row['hasRating'] == 'true') {
            $("#erEditAddRating").prop("checked", true);
            $("#erEditRating").show();
            $("#erEditFoodQuality").val(row['rating1']);
            $("#erEditService").val(row['rating2']);
            $("#erEditValue").val(row['rating3']);
            $("#erEditOverallRating").val((parseInt(row['rating1']) + parseInt(row['rating2']) +
                parseInt(row['rating3'])) * 100 / 15 + "%");
        }
        else if (row['hasRating'] == 'false'){
            $("#erEditFoodQuality").val(row['rating1']);
            $("#erEditService").val(row['rating2']);
            $("#erEditValue").val(row['rating3']);
            $("#erEditOverallRating").val((parseInt(row['rating1']) + parseInt(row['rating2']) +
                parseInt(row['rating3'])) * 100 / 15 + "%");
            $("#erEditAddRating").prop("checked", false);
            $("#erEditRating").hide();
        }

        $("#erEditFeedbackForm :checkbox").checkboxradio("refresh");

    }

    Review.erSelect(options, callback);
}

function erCancel(){
    $(location).prop('href', '#erViewFeedbackPage');
}

var lat;
var lng;
var alt;

function showMap() {
    //Step 1: initialize communication with the platform
// In your own code, replace variable window.apikey with your own apikey
    var platform = new H.service.Platform({
        apikey: 'RhQqWj5vEiYCPtE98JgYTO-p50FiO88KPFR5ZADclXQ'
    });
    var defaultLayers = platform.createDefaultLayers();

//Step 2: initialize a map
    var map = new H.Map(document.getElementById('mapContainer'),
        defaultLayers.vector.normal.map,{
            center: {lat:43.46775491096556, lng:-80.52810059276341},
            zoom: 15
            // pixelRatio: window.devicePixelRatio || 1
        });
// add a resize listener to make sure that the map occupies the whole container
    window.addEventListener('resize', () => map.getViewPort().resize());

//Step 3: make the map interactive
// MapEvents enables the event system
// Behavior implements default interactions for pan/zoom (also on mobile touch environments)
    var behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));

// Create the default UI components
    var ui = H.ui.UI.createDefault(map, defaultLayers);

// Now use the map as required...
//     var iconPin = new H.map.Icon('img/map-pin.svj');

    var svgMarkup = '<svg  width="24" height="24" xmlns="http://www.w3.org/2000/svg">' +
        '<rect stroke="black" fill="${FILL}" x="1" y="1" width="22" height="22" />' +
        '<text x="12" y="18" font-size="12pt" font-family="Arial" font-weight="bold" ' +
        'text-anchor="middle" fill="${STROKE}" >C</text></svg>';
    var ourIcon = new H.map.Icon(
        svgMarkup.replace('${FILL}', 'blue').replace('${STROKE}', 'red')),
        ourLocation = new H.map.Marker({lat: 43.46775491096556, lng: -80.52810059276341},
            {icon: ourIcon});
    map.addObject(ourLocation);

    var yourPosition = new H.map.Marker({lat: lat, lng: lng});
    map.addObject(yourPosition);
}

function getPosition(){
    try{
        if (navigator.geolocation !== null){
            var options = {};
            function onSuccess(position) {
                var coordinates = position.coords;
                lat = coordinates.latitude;
                lng = coordinates.longitude;
                alt = coordinates.altitude;

                console.info("Latitude: " + lat);
                console.info("Longitude: " + lng);
                console.info("Altitude: " + alt);

                showMap();
            }

            function onFail(error) {
                var msg = "";

                try{
                    if (error){
                        switch (error.code){
                            case error.TIMEOUT:
                                msg = "TIMEOUT: " + error.message;
                                break;
                            case error.PERMISSION_DENIED:
                                msg = "PERMISSION_DENIED: " + error.message;
                                break;
                            case error.POSITION_UNAVAILABLE:
                                msg = "POSITION_UNAVAILABLE: " + error.message;
                                break;
                            default:
                                msg = "Unhandled message code(" + error.code + "): "+ error.message;
                                break;
                        }
                        console.error(msg);
                    }
                }catch(e){
                    console.error("Exception in onFail(): " + e);
                }
            }

            navigator.geolocation.getCurrentPosition(onSuccess, onFail, options);
        }
        else{
            console.error("HTML5 geolocation is not supported.");
        }
    }catch(e){
        console.error("Exception in get position(): " + e);
    }
}

