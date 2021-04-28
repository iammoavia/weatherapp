var app = angular.module("mainapp", ['ngRoute']);
app.config(function ($routeProvider) {
    $routeProvider

        .when("/dashboard", {
            templateUrl: "assets/ng-views/dashboard.htm",
            controller: "dashboardCtrl"
        }).when("/cameras", {
            templateUrl: "assets/ng-views/cameras.htm",
            controller: "camerasCtrl"
        }).when("/hospital", {
            templateUrl: "assets/ng-views/hospital.htm",
            controller: "hospitalCtrl"
        }).when("/airport", {
            templateUrl: "assets/ng-views/airport.htm",
            controller: "airportCtrl"
        }).when("/weatherstation", {
            templateUrl: "assets/ng-views/weatherstation.htm",
            controller: "weatherstationCtrl"
        }).when("/passenger", {
            templateUrl: "assets/ng-views/passenger.htm",
            controller: "passengerCtrl"
        }).when("/subways", {
            templateUrl: "assets/ng-views/subway.htm",
            controller: "subwayCtrl"
        }).when("/ports", {
            templateUrl: "assets/ng-views/ports.htm",
            controller: "portsCtrl"
        }).when("/moon", {
            templateUrl: "assets/ng-views/moon.htm",
            controller: "moonCtrl"
        }).when("/slipways", {
            templateUrl: "assets/ng-views/slipways.htm",
            controller: "slipwaysCtrl"
        }).when("/skicenter", {
            templateUrl: "assets/ng-views/skicenter.htm",
            controller: "skicenterCtrl"
        }).when("/kite", {
            templateUrl: "assets/ng-views/kite.htm",
            controller: "kiteCtrl"
        }).when("/mountain", {
            templateUrl: "assets/ng-views/mountain.htm",
            controller: "mountainCtrl"
        }).when("/camping", {
            templateUrl: "assets/ng-views/camping.htm",
            controller: "campingCtrl"
        }).when("/fishingshelter", {
            templateUrl: "assets/ng-views/fishingshelter.htm",
            controller: "fishingshelterCtrl"
        }).when("/payment", {
            templateUrl: "assets/ng-views/payment.htm",
            controller: "paymentCtrl"
        }).when("/userprofiles", {
            templateUrl: "assets/ng-views/userprofiles.htm",
            controller: "userprofilesCtrl"
        }).when("/blockuser", {
            templateUrl: "assets/ng-views/blockuser.htm",
            controller: "blockuserCtrl"
        }).when("/settings", {
            templateUrl: "assets/ng-views/settings.htm",
            controller: "settingsCtrl"
        })
        .otherwise({ redirectTo: '/dashboard' });
});

let map;
let update_map;
let marker;
let update_marker;
let camera_map_update;
let marker_camera_update;

let current_marker;
let update_current_marker;

let hospital_map;
let hospital_marker;
let hospital_map_update;
let marker_hospital_update;



// Airport
let airpot_map;
let airpot_update_map;
let airport_marker;
let update_airport_marker;

// Port Auth
let port_auth_map;
let port_auth_update_map;
let port_auth_marker;
let update_port_auth_marker;

// Port Auth
let live_sky_map;
let live_sky_update_map;
let live_sky_marker;
let update_live_sky_marker;


function scrollto($document_id) {
    $('html,body').animate({
        scrollTop: $("#" + $document_id).offset().top
    }, 'slow');
}

function initMapCamera($id) {

    map = new google.maps.Map(document.getElementById($id), {
        center: { lat: 40.7590403, lng: -74.0392714 },
        zoom: 8,
    });

    google.maps.event.addListener(map, 'click', function (event) {
        placeMarkerCamera(event.latLng);
    });

    console.log('Init. Google Map (Camera)');
}


function initMapCameraUpdate($id) {

    camera_map_update = new google.maps.Map(document.getElementById($id), {
        center: { lat: 40.7590403, lng: -74.0392714 },
        zoom: 8,
    });

    google.maps.event.addListener(camera_map_update, 'click', function (event) {
        placeMarkerCameraUpdate(event.latLng);
    });

    console.log('Init. Google Map (Update Camera)');

}

function placeMarkerCamera(location) {

    if (typeof marker != 'undefined' && marker != null) {
        marker.setPosition(location);
    } else {
        marker = new google.maps.Marker({
            position: location,
            map: map
        });
    }

    console.log('Init. Marker Function');

}

function placeMarkerCameraUpdate(location) {

    if (typeof marker_camera_update != 'undefined' && marker_camera_update != null) {
        marker_camera_update.setPosition(location);
    } else {
        marker_camera_update = new google.maps.Marker({
            position: location,
            map: camera_map_update
        });
    }

    $('#editing_camera_latitude').val(location.lat());
    $('#editing_camera_longitude').val(location.lng());


    console.log('Init. Marker Function (update)');

}


function initMapHospital($id) {

    hospital_map = new google.maps.Map(document.getElementById($id), {
        center: { lat: 40.7590403, lng: -74.0392714 },
        zoom: 8,
    });

    google.maps.event.addListener(hospital_map, 'click', function (event) {
        placeMarkerHospital(event.latLng);
    });

    console.log('Init. Google Map (Hospital)');
}


function initMapHospitalUpdate($id) {

    hospital_map_update = new google.maps.Map(document.getElementById($id), {
        center: { lat: 40.7590403, lng: -74.0392714 },
        zoom: 8,
    });

    google.maps.event.addListener(hospital_map_update, 'click', function (event) {
        placeMarkerHospitalUpdate(event.latLng);
    });

    console.log('Init. Google Map (Update hospital)');

}

function placeMarkerHospital(location) {

    if (typeof hospital_marker != 'undefined' && hospital_marker != null) {
        hospital_marker.setPosition(location);
    } else {
        hospital_marker = new google.maps.Marker({
            position: location,
            map: hospital_map
        });
    }

    console.log('Init. Marker Function');

}

function placeMarkerHospitalUpdate(location) {

    if (typeof marker_hospital_update != 'undefined' && marker_hospital_update != null) {
        marker_hospital_update.setPosition(location);
    } else {
        marker_hospital_update = new google.maps.Marker({
            position: location,
            map: hospital_map_update
        });
    }

    $('#editing_hospital_latitude').val(location.lat());
    $('#editing_hospital_longitude').val(location.lng());


    console.log('Init. Marker Function (update)');

}

// Airport
function initMapAirport($id) {

    airport_map = new google.maps.Map(document.getElementById($id), {
        center: { lat: 40.7590403, lng: -74.0392714 },
        zoom: 8,
    });

    google.maps.event.addListener(airport_map, 'click', function (event) {
        placeMarkerAirport(event.latLng);
    });

    console.log('Init. Google Map (airport)');
}


function initMapAirportUpdate($id) {

    airport_map_update = new google.maps.Map(document.getElementById($id), {
        center: { lat: 40.7590403, lng: -74.0392714 },
        zoom: 8,
    });

    google.maps.event.addListener(airport_map_update, 'click', function (event) {
        placeMarkerAirportUpdate(event.latLng);
    });

    console.log('Init. Google Map (Update airport)');

}

function placeMarkerAirport(location) {

    if (typeof airport_marker != 'undefined' && airport_marker != null) {
        airport_marker.setPosition(location);
    } else {
        airport_marker = new google.maps.Marker({
            position: location,
            map: airport_map
        });
    }

    console.log('Init. Marker Function');

}

function placeMarkerAirportUpdate(location) {

    if (typeof marker_airport_update != 'undefined' && marker_airport_update != null) {
        marker_airport_update.setPosition(location);
    } else {
        marker_airport_update = new google.maps.Marker({
            position: location,
            map: airport_map_update
        });
    }

    $('#editing_airport_latitude').val(location.lat());
    $('#editing_airport_longitude').val(location.lng());


    console.log('Init. Marker Function (update)');

}
// End Airport


// port_auth
function initMapPort_auth($id) {

    port_auth_map = new google.maps.Map(document.getElementById($id), {
        center: { lat: 40.7590403, lng: -74.0392714 },
        zoom: 8,
    });

    google.maps.event.addListener(port_auth_map, 'click', function (event) {
        placeMarkerPort_auth(event.latLng);
    });

    console.log('Init. Google Map (port_auth)');
}


function initMapPort_authUpdate($id) {

    port_auth_map_update = new google.maps.Map(document.getElementById($id), {
        center: { lat: 40.7590403, lng: -74.0392714 },
        zoom: 8,
    });

    google.maps.event.addListener(port_auth_map_update, 'click', function (event) {
        placeMarkerPort_authUpdate(event.latLng);
    });

    console.log('Init. Google Map (Update port_auth)');

}

function placeMarkerPort_auth(location) {

    if (typeof port_auth_marker != 'undefined' && port_auth_marker != null) {
        port_auth_marker.setPosition(location);
    } else {
        port_auth_marker = new google.maps.Marker({
            position: location,
            map: port_auth_map
        });
    }

    console.log('Init. Marker Function');

}

function placeMarkerPort_authUpdate(location) {

    if (typeof marker_port_auth_update != 'undefined' && marker_port_auth_update != null) {
        marker_port_auth_update.setPosition(location);
    } else {
        marker_port_auth_update = new google.maps.Marker({
            position: location,
            map: port_auth_map_update
        });
    }

    $('#editing_port_auth_latitude').val(location.lat());
    $('#editing_port_auth_longitude').val(location.lng());


    console.log('Init. Marker Function (update)');

}
// End port_auth



// portsCtrl
app.controller('portsCtrl', function ($scope, $http) {

    $('.dimmer').show();
    $scope.page_title = '';
    port_auth_marker = null;
    marker_port_auth_update = null;

    $scope.hide = (id) => {
        $('#' + id).hide();
        console.log('hiding');
        scrollto('port_auth_listing_table');
    };


    $scope.edit = (index, port_auth) => {
        $scope.editing = angular.copy(port_auth);
        $scope.editing_port_auth_index = index;



        newlatlng = new google.maps.LatLng(parseFloat(port_auth.latitude), parseFloat(port_auth.longitude));
        // console.log(newlatlng);
        if (marker_port_auth_update != null && typeof marker_port_auth_update != 'undefined') {
            marker_port_auth_update.setPosition(newlatlng);
        } else {
            // Add Marker
            marker_port_auth_update = new google.maps.Marker({
                position: { lat: parseFloat(port_auth.latitude), lng: parseFloat(port_auth.longitude) },
                map: port_auth_map_update
            });
        }

        port_auth_map_update.setCenter({ lat: parseFloat(port_auth.latitude), lng: parseFloat(port_auth.longitude) });

        $('#editport_auth').show();
        scrollto('editport_auth');

    };

    $scope.save = function () {

        // Sending PUT Request for update
        $('.dimmer').show();
        // var postData = $.param($scope.camera);
        // console.log($scope.camera);
        $id = angular.copy($scope.editing._id);

        $scope.editing.longitude = "" + marker_port_auth_update.position.lng();

        $scope.editing.latitude = "" + marker_port_auth_update.position.lat();

        // delete $scope.editing._id;
        $http.patch('https://livecamsapi.herokuapp.com/port-authorities/' + $id, $scope.editing).then(function (response) {

            if (response.data.success) {
                $scope.port_auths[$scope.editing_port_auth_index] = angular.copy($scope.editing);
                $scope.port_auths[$scope.editing_port_auth_index]._id = $id;
                marker_port_auth_update.setMap(null);
                marker_port_auth_update = null;
                $scope.hide();

                Toast.fire({
                    icon: 'success',
                    title: 'Porth Authority updated successfully'
                });

                scrollto('port_auth_listing_table');

            } else {
                // alert(response.data.message);
                Toast.fire({
                    icon: 'error',
                    title: response.data.message
                });
            }
            $('.dimmer').hide();
           
        }, function (response) {
            Toast.fire({
                icon: 'error',
                title: 'Something went wrong !'
            })
            $('.dimmer').hide();
        });

    };

    // Delete port_auth
    $scope.delete = (index, port_auth) => {

        $('.dimmer').show();

        $http.delete('https://livecamsapi.herokuapp.com/port-authorities/' + port_auth._id, {}).then(function (response) {

            if (response.data.success) {
                $scope.port_auths.splice(index, 1);
                Toast.fire({
                    icon: 'success',
                    title: response.data.message
                })
            } else {
                Toast.fire({
                    icon: 'error',
                    title: response.data.message
                });
            }
            $('.dimmer').hide();
        }, function (response) {
            Toast.fire({
                icon: 'error',
                title: 'Something went wrong !'
            })
        });

    };

    // Add New port_auth
    $scope.submit = () => {

        $scope.port_auth.longitude = "" + port_auth_marker.position.lng();

        $scope.port_auth.latitude = "" + port_auth_marker.position.lat();

        // $scope.port_auth.TEL = $scope.port_auth.TEL.toString();
        $('.dimmer').show();
        // var postData = $.param($scope.port_auth);
        console.log($scope.port_auth);
        $http.post('https://livecamsapi.herokuapp.com/port-authorities/create-port-authority', $scope.port_auth).then(function (response) {

            if (response.data.success) {
                $scope.port_auth._id = response.data.Data._id;
                $scope.port_auths.push($scope.port_auth);
                // alert(response.data.message);
                $scope.port_auth = null;
                port_auth_marker.setMap(null);
                port_auth_marker = null;
                Toast.fire({
                    icon: 'success',
                    title: response.data.message
                });
                scrollto('port_auth_listing_table');
            } else {
                alert(response.data.message);
            }
            $('.dimmer').hide();
        }, function (response) {
            console.log(response);
            $('.dimmer').hide();
        });


    };
  

    $scope.$on('$viewContentLoaded', function () {
        //Here your view content is fully loaded !!
        $http.get('https://livecamsapi.herokuapp.com/port-authorities/get-all-port-authorites', {}).then(function (response) {
            if (response.data.success) {
                $scope.port_auths = response.data.Data;
                initMapPort_auth('port_auth-map-container-google');

                // Hospitalss-update-map-container

                initMapPort_authUpdate('editing-port_auth-map-container-google');
            } else {
                console.log(message);
            }
            $('.dimmer').hide();
        }, function (response) {
            console.log('something went wrong', response);
            $('.dimmer').hide();
        });


    });

});

app.controller('dashboardCtrl', function ($scope, $http) {

    $('.dimmer').show();
    $scope.dashboard_loaded = false;

    $scope.$on('$viewContentLoaded', function () {
        //Here your view content is fully loaded !!
        $http.get('https://livecamsapi.herokuapp.com/get-counts', {}).then(function (response) {
            if (response.data.success) {
                $scope.dashboard = response.data;
                $scope.dashboard_loaded = true;
            } else {
                console.log(message);
            }
            $('.dimmer').hide();
        }, function (response) {
            console.log('something went wrong', response);
            $('.dimmer').hide();
        });


    });

});

app.controller('settingsCtrl', function ($scope, $http) {

    console.log('App Initialized');

});

app.controller('blockuserCtrl', function ($scope, $http) {

    console.log('App Initialized');

});

app.controller('userprofilesCtrl', function ($scope, $http) {

    console.log('App Initialized');

});

app.controller('paymentCtrl', function ($scope, $http) {

    console.log('App Initialized');

});

app.controller('fishingshelterCtrl', function ($scope, $http) {

    console.log('App Initialized');

});

app.controller('campingCtrl', function ($scope, $http) {

    $('.dimmer').show();
    $scope.page_title = '';


    // Fetch Live Hospitals On Content Load
    $scope.$on('$viewContentLoaded', function () {
        //Here your view content is fully loaded !!
        $http.get('https://livecamsapi.herokuapp.com/camping/get-all-camping-points', {}).then(function (response) {
            if (response.data.success) {
                $scope.campings = response.data.Data;
            } else {
                console.log(message);
            }
            $('.dimmer').hide();
        }, function (response) {
            console.log('something went wrong', response);
            $('.dimmer').hide();
        });

    });

});

app.controller('mountainCtrl', function ($scope, $http) {

    console.log('App Initialized');

});

app.controller('kiteCtrl', function ($scope, $http) {

    console.log('App Initialized');

});

app.controller('skicenterCtrl', function ($scope, $http) {

    console.log('App Initialized');

});

app.controller('subwayCtrl', function ($scope, $http) {

    console.log('App Initialized');

});

app.controller('moonCtrl', function ($scope, $http) {

    console.log('App Initialized');

});

app.controller('slipwaysCtrl', function ($scope, $http) {

    console.log('App Initialized');

});

app.controller('passengerCtrl', function ($scope, $http) {

    

});

app.controller('weatherstationCtrl', function ($scope, $http) {

    console.log('App Initialized');

});

app.controller('airportCtrl', function ($scope, $http) {

    $('.dimmer').show();
    $scope.page_title = '';
    airport_marker = null;
    marker_airport_update = null;

    $scope.hide = (id) => {
        $('#' + id).hide();
        console.log('hiding');
        scrollto('airport_listing_table');
    };


    $scope.edit = (index, airport) => {
        $scope.editing = angular.copy(airport);
        $scope.editing_airport_index = index;



        newlatlng = new google.maps.LatLng(parseFloat(airport.latitude), parseFloat(airport.longitude));
        // console.log(newlatlng);
        if (marker_airport_update != null && typeof marker_airport_update != 'undefined') {
            marker_airport_update.setPosition(newlatlng);
        } else {
            // Add Marker
            marker_airport_update = new google.maps.Marker({
                position: { lat: parseFloat(airport.latitude), lng: parseFloat(airport.longitude) },
                map: airport_map_update
            });
        }

        airport_map_update.setCenter({ lat: parseFloat(airport.latitude), lng: parseFloat(airport.longitude) });

        $('#updateairport').show();
        scrollto('updateairport');

    };

    $scope.save = function () {

        // Sending PUT Request for update
        $('.dimmer').show();
        // var postData = $.param($scope.camera);
        // console.log($scope.camera);
        $id = angular.copy($scope.editing._id);

        $scope.editing.longitude = "" + marker_airport_update.position.lng();

        $scope.editing.latitude = "" + marker_airport_update.position.lat();

        // delete $scope.editing._id;
        $http.patch('https://livecamsapi.herokuapp.com/airports/' + $id, $scope.editing).then(function (response) {

            if (response.data.success) {
                $scope.airports[$scope.editing_airport_index] = angular.copy($scope.editing);
                $scope.airports[$scope.editing_airport_index]._id = $id;
                marker_airport_update.setMap(null);
                marker_airport_update = null;
                $scope.hide();

                Toast.fire({
                    icon: 'success',
                    title: 'Camera updated successfully'
                });

            } else {
                // alert(response.data.message);
                Toast.fire({
                    icon: 'error',
                    title: response.data.message
                });
            }
            $('.dimmer').hide();
        }, function (response) {
            Toast.fire({
                icon: 'error',
                title: 'Something went wrong !'
            })
            $('.dimmer').hide();
        });

    };








    // Delete airport
    $scope.delete = (index, airport) => {

        $('.dimmer').show();

        $http.delete('https://livecamsapi.herokuapp.com/airports/' + airport._id, {}).then(function (response) {

            if (response.data.success) {
                $scope.airports.splice(index, 1);
                Toast.fire({
                    icon: 'success',
                    title: response.data.message
                })
            } else {
                Toast.fire({
                    icon: 'error',
                    title: response.data.message
                });
            }
            $('.dimmer').hide();
        }, function (response) {
            Toast.fire({
                icon: 'error',
                title: 'Something went wrong !'
            })
        });

    };

    // Add New Airport
    $scope.submit = () => {

        $scope.airport.longitude = "" + airport_marker.position.lng();

        $scope.airport.latitude = "" + airport_marker.position.lat();

        // $scope.airport.TEL = $scope.airport.TEL.toString();
        $('.dimmer').show();
        // var postData = $.param($scope.airport);
        console.log($scope.airport);
        $http.post('https://livecamsapi.herokuapp.com/airports/create-airport', $scope.airport).then(function (response) {

            if (response.data.success) {
                $scope.airport._id = response.data.Data._id;
                $scope.airports.push($scope.airport);
                // alert(response.data.message);
                $scope.airport = null;
                airport_marker.setMap(null);
                airport_marker = null;
                Toast.fire({
                    icon: 'success',
                    title: response.data.message
                });
                scrollto('airport_listing_table');
            } else {
                alert(response.data.message);
            }
            $('.dimmer').hide();
        }, function (response) {
            console.log(response);
            $('.dimmer').hide();
        });


    };



    // Fetch Live Hospitals On Content Load
    $scope.$on('$viewContentLoaded', function () {
        //Here your view content is fully loaded !!
        $http.get('https://livecamsapi.herokuapp.com/airports/get-all-airports', {}).then(function (response) {
            if (response.data.success) {
                $scope.airports = response.data.Data;
                initMapAirport('airport-map-container-google');

                // Hospitalss-update-map-container

                initMapAirportUpdate('update-airport-map-container');
            } else {
                Toast.fire({
                    icon: 'success',
                    title: response.data.message
                });
            }
            $('.dimmer').hide();
        }, function (response) {
            Toast.fire({
                icon: 'success',
                title: 'Something went wrong !'
            });
            $('.dimmer').hide();
        });

    });

});

app.controller('hospitalCtrl', function ($scope, $http) {


    $('.dimmer').show();
    $scope.page_title = '';
    hospital_marker = null;
    marker_hospital_update = null;



    $scope.hide = (id) => {
        $('#' + id).hide();
        console.log('hiding');
        scrollto('hospital_listing_table');
    };



    // Fetch Live Hospitals On Content Load
    $scope.$on('$viewContentLoaded', function () {
        //Here your view content is fully loaded !!
        $http.get('https://livecamsapi.herokuapp.com/hospitals/get-all-hospitals', {}).then(function (response) {
            if (response.data.success) {
                $scope.hospitals = response.data.Data;

                initMapHospital('hospital-map-container-google');

                // Hospitalss-update-map-container

                initMapHospitalUpdate('hospital-map-container-google-u');

            } else {
                console.log(message);
            }
            $('.dimmer').hide();
        }, function (response) {
            console.log('something went wrong', response);
            $('.dimmer').hide();
        });

    });

    // Update Section Start

    $scope.edit = (index, hospital) => {
        $scope.editing = angular.copy(hospital);
        $scope.editing_hospital_index = index;



        newlatlng = new google.maps.LatLng(parseFloat(hospital.latitude), parseFloat(hospital.longitude));
        // console.log(newlatlng);
        if (marker_hospital_update != null && typeof marker_hospital_update != 'undefined') {
            marker_hospital_update.setPosition(newlatlng);
        } else {
            // Add Marker
            marker_hospital_update = new google.maps.Marker({
                position: { lat: parseFloat(hospital.latitude), lng: parseFloat(hospital.longitude) },
                map: hospital_map_update
            });
        }

        hospital_map_update.setCenter({ lat: parseFloat(hospital.latitude), lng: parseFloat(hospital.longitude) });

        $('#updatehospital').show();
        scrollto('updatehospital');

    };

    $scope.save = function () {

        // Sending PUT Request for update
        $('.dimmer').show();
        // var postData = $.param($scope.camera);
        console.log($scope.camera);
        $id = angular.copy($scope.editing._id);

        $scope.editing.longitude = "" + marker_hospital_update.position.lng();

        $scope.editing.latitude = "" + marker_hospital_update.position.lat();

        // delete $scope.editing._id;
        $http.patch('https://livecamsapi.herokuapp.com/hospitals/' + $id, $scope.editing).then(function (response) {

            if (response.data.success) {
                $scope.hospitals[$scope.editing_hospital_index] = angular.copy($scope.editing);
                $scope.hospitals[$scope.editing_hospital_index]._id = $id;
                marker_hospital_update.setMap(null);
                marker_hospital_update = null;
                $scope.hide();

                Toast.fire({
                    icon: 'success',
                    title: 'Camera updated successfully'
                });

            } else {
                // alert(response.data.message);
                Toast.fire({
                    icon: 'error',
                    title: response.data.message
                });
            }
            $('.dimmer').hide();
        }, function (response) {
            Toast.fire({
                icon: 'error',
                title: 'Something went wrong !'
            })
            $('.dimmer').hide();
        });

    };


    // Update Section ENDS

    // Delete Hospital
    $scope.delete = (index, hospital) => {

        $('.dimmer').show();

        $http.delete('https://livecamsapi.herokuapp.com/hospitals/' + hospital._id, {}).then(function (response) {

            if (response.data.success) {
                $scope.hospitals.splice(index, 1);
                Toast.fire({
                    icon: 'success',
                    title: response.data.message
                })
            } else {
                Toast.fire({
                    icon: 'error',
                    title: response.data.message
                });
            }
            $('.dimmer').hide();
        }, function (response) {
            Toast.fire({
                icon: 'error',
                title: 'Something went wrong !'
            })
        });

    };


    // Add New Hospital
    $scope.submit = () => {

        $scope.hospital.longitude = "" + hospital_marker.position.lng();

        $scope.hospital.latitude = "" + hospital_marker.position.lat();

        $scope.hospital.TEL = $scope.hospital.TEL.toString();
        $('.dimmer').show();
        // var postData = $.param($scope.hospital);
        console.log($scope.hospital);
        $http.post('https://livecamsapi.herokuapp.com/hospitals//create-hospital', $scope.hospital).then(function (response) {

            if (response.data.success) {
                $scope.hospital._id = response.data.Data._id;
                $scope.hospitals.push($scope.hospital);
                // alert(response.data.message);
                $scope.hospital = null;
                hospital_marker.setMap(null);
                hospital_marker = null;
                Toast.fire({
                    icon: 'success',
                    title: response.data.message
                });
                scrollto('hospital_listing_table');
            } else {
                alert(response.data.message);
            }
            $('.dimmer').hide();
        }, function (response) {
            console.log(response);
            $('.dimmer').hide();
        });


    };

});

app.controller('camerasCtrl', function ($scope, $http) {

    $('.dimmer').show();
    $scope.page_title = '';
    marker = null;
    marker_camera_update = null;



    $scope.hide = (id) => {
        $('#' + id).hide();
        console.log('hiding');
        scrollto('camera_listing_table');
    };


    $scope.edit = (index, camera) => {
        $scope.editing_camera = angular.copy(camera);
        $scope.editing_camera_index = index;



        newlatlng = new google.maps.LatLng(parseFloat(camera.latitude), parseFloat(camera.longitude));
        // console.log(newlatlng);
        if (marker_camera_update != null && typeof marker_camera_update != 'undefined') {
            marker_camera_update.setPosition(newlatlng);
        } else {
            // Add Marker
            marker_camera_update = new google.maps.Marker({
                position: { lat: parseFloat(camera.latitude), lng: parseFloat(camera.longitude) },
                map: camera_map_update
            });
        }

        camera_map_update.setCenter({ lat: parseFloat(camera.latitude), lng: parseFloat(camera.longitude) });

        $('#updatecamera').show();
        scrollto('updatecamera');

    };

    $scope.save = function () {

        // Sending PUT Request for update
        $('.dimmer').show();
        // var postData = $.param($scope.camera);
        console.log($scope.camera);
        $id = angular.copy($scope.editing_camera._id);

        $scope.editing_camera.longitude = "" + marker_camera_update.position.lng();

        $scope.editing_camera.latitude = "" + marker_camera_update.position.lat();

        // delete $scope.editing_camera._id;
        $http.patch('https://livecamsapi.herokuapp.com/livecamera/update-live-camera/' + $id, $scope.editing_camera).then(function (response) {

            if (response.data.success) {
                $scope.cameras[$scope.editing_camera_index] = angular.copy($scope.editing_camera);
                $scope.cameras[$scope.editing_camera_index]._id = $id;

                $scope.hide();

                Toast.fire({
                    icon: 'success',
                    title: 'Camera updated successfully'
                });

            } else {
                // alert(response.data.message);
                Toast.fire({
                    icon: 'error',
                    title: response.data.message
                });
            }
            $('.dimmer').hide();
        }, function (response) {
            Toast.fire({
                icon: 'error',
                title: 'Something went wrong !'
            })
            $('.dimmer').hide();
        });

    };

    // Fetch Live Camera's On Content Load
    $scope.$on('$viewContentLoaded', function () {
        //Here your view content is fully loaded !!
        $http.get('https://livecamsapi.herokuapp.com/livecamera/get-all-livecameras', {}).then(function (response) {
            if (response.data.success) {
                $scope.cameras = response.data.Data;
            } else {
                console.log(message);
            }
            $('.dimmer').hide();
        }, function (response) {
            console.log('something went wrong', response);
            $('.dimmer').hide();
        });


        initMapCamera('cameras-map-container');

        // cameras-update-map-container

        initMapCameraUpdate('cameras-update-map-container');



    });

    $scope.delete = (index, camera) => {

        $('.dimmer').show();

        $http.delete('https://livecamsapi.herokuapp.com/livecamera/delete-livecamera/' + camera._id, {}).then(function (response) {

            if (response.data.success) {
                $scope.cameras.splice(index, 1);
            } else {
                Toast.fire({
                    icon: 'error',
                    title: response.data.message
                })
            }
            $('.dimmer').hide();
        }, function (response) {
            Toast.fire({
                icon: 'error',
                title: 'Something went wrong !'
            })
        });

    };

    $scope.submit = () => {

        $scope.camera.longitude = "" + marker.position.lng();

        $scope.camera.latitude = "" + marker.position.lat();

        $scope.camera.TEL = $scope.camera.TEL.toString();
        $('.dimmer').show();
        // var postData = $.param($scope.camera);
        console.log($scope.camera);
        $http.post('https://livecamsapi.herokuapp.com/livecamera/create-live-camera', $scope.camera).then(function (response) {

            if (response.data.success) {
                $scope.camera._id = response.data.Data._id;
                $scope.cameras.push($scope.camera);
                // alert(response.data.message);
                $scope.camera = null;
                Toast.fire({
                    icon: 'success',
                    title: response.data.message
                });
                scrollto('camera_listing_table');
            } else {
                alert(response.data.message);
            }
            $('.dimmer').hide();
        }, function (response) {
            console.log(response);
            $('.dimmer').hide();
        });


    };

});