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
        }).when("/access", {
            templateUrl: "assets/ng-views/admins.htm",
            controller: "accessCtrl"
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

// Kite Surfing
let kite_map;
let kite_map_update;
let kite_marker;
let update_kite_marker;
let marker_kite_update;

// Kite Surfing
let pport_map;
let pport_map_update;
let pport_marker;
let update_pport_marker;
let marker_pport_update;

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

// Fishing shelter
let fs_map;
let fs_map_update;
let fs_marker;
let update_fs_marker;
let marker_fs_update;


// camping
let camping_map;
let camp_map_update;
let camp_marker;
let update_camp_marker;
let marker_camp_update;


// Wstation
let wstation_map;
let wstation_update_map;
let wstation_marker;
let update_wstation_marker;

// Wstation
let skicenter_map;
let skicenter_update_map;
let skicenter_marker;
let update_skicenter_marker;

// File Upload Service
app.service('fileUpload', function ($http) {
    this.uploadFileToUrl = function (file, uploadUrl) {
        var fd = new FormData();
        fd.append('image', file);

        $http.post(uploadUrl, fd, {
            transformRequest: angular.identity,
            headers: { 'Content-Type': undefined }
        })
            .then(function (response) {

                if (!response.data.success) {
                    Toast.fire({
                        icon: 'error',
                        title: response.data.message
                    });
                    return false;
                }

                return true;
            }, function () {
                Toast.fire({
                    icon: 'error',
                    title: "Error uploading attachment !"
                });
                return false;
            });
    }
});

app.directive('fileModel', function ($parse) {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            var model = $parse(attrs.fileModel);
            var modelSetter = model.assign;

            element.bind('change', function () {
                scope.$apply(function () {
                    modelSetter(scope, element[0].files[0]);
                });
            });
        }
    };
});


function scrollto($document_id) {
    $('html,body').animate({
        scrollTop: $("#" + $document_id).offset().top
    }, 'slow');
}

function initMapCamera($id) {

    map = new google.maps.Map(document.getElementById($id), {
        center: { lat: 39.0742, lng: 21.8243 },
        zoom: 8,
    });

    google.maps.event.addListener(map, 'click', function (event) {
        placeMarkerCamera(event.latLng);
    });

    console.log('Init. Google Map (Camera)');
}


function initMapCameraUpdate($id) {

    camera_map_update = new google.maps.Map(document.getElementById($id), {
        center: { lat: 39.0742, lng: 21.8243 },
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

    $('#camera_latitude').val(location.lat());
    $('#camera_longitude').val(location.lng());

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


    // console.log('Init. Marker Function (update)');

}


function initMapHospital($id) {

    hospital_map = new google.maps.Map(document.getElementById($id), {
        center: { lat: 39.0742, lng: 21.8243 },
        zoom: 8,
    });

    google.maps.event.addListener(hospital_map, 'click', function (event) {
        placeMarkerHospital(event.latLng);
    });

    console.log('Init. Google Map (Hospital)');
}


function initMapHospitalUpdate($id) {

    hospital_map_update = new google.maps.Map(document.getElementById($id), {
        center: { lat: 39.0742, lng: 21.8243 },
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

    $('#hospital_latitude').val(location.lat());
    $('#hospital_longitude').val(location.lng());

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


    // console.log('Init. Marker Function (update)');

}

// Airport
function initMapAirport($id) {

    airport_map = new google.maps.Map(document.getElementById($id), {
        center: { lat: 39.0742, lng: 21.8243 },
        zoom: 8,
    });

    google.maps.event.addListener(airport_map, 'click', function (event) {
        placeMarkerAirport(event.latLng);
    });

}


function initMapAirportUpdate($id) {

    airport_map_update = new google.maps.Map(document.getElementById($id), {
        center: { lat: 39.0742, lng: 21.8243 },
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

    try {
        $('#airport_latitude').val(location.lat());
        $('#airport_longitude').val(location.lng());
    } catch (error) {
        console.log(error);
    }

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
        center: { lat: 39.0742, lng: 21.8243 },
        zoom: 8,
    });

    google.maps.event.addListener(port_auth_map, 'click', function (event) {
        placeMarkerPort_auth(event.latLng);
    });

    console.log('Init. Google Map (port_auth)');
}


function initMapPort_authUpdate($id) {

    port_auth_map_update = new google.maps.Map(document.getElementById($id), {
        center: { lat: 39.0742, lng: 21.8243 },
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

    $('#port_auth_latitude').val(location.lat());
    $('#port_auth_longitude').val(location.lng());

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



// fs
function initMapFs($id) {

    fs_map = new google.maps.Map(document.getElementById($id), {
        center: { lat: 39.0742, lng: 21.8243 },
        zoom: 8,
    });

    google.maps.event.addListener(fs_map, 'click', function (event) {
        placeMarkerFs(event.latLng);
    });

    console.log('Init. Google Map (fs)');
}


function initMapFsUpdate($id) {

    fs_map_update = new google.maps.Map(document.getElementById($id), {
        center: { lat: 39.0742, lng: 21.8243 },
        zoom: 8,
    });

    google.maps.event.addListener(fs_map_update, 'click', function (event) {
        placeMarkerFsUpdate(event.latLng);
    });

    console.log('Init. Google Map (Update fs)');

}

function placeMarkerFs(location) {

    if (typeof fs_marker != 'undefined' && fs_marker != null) {
        fs_marker.setPosition(location);
    } else {
        fs_marker = new google.maps.Marker({
            position: location,
            map: fs_map
        });
    }

    $('#fs_latitude').val(location.lat());
    $('#fs_longitude').val(location.lng());

}

function placeMarkerFsUpdate(location) {

    if (typeof marker_fs_update != 'undefined' && marker_fs_update != null) {
        marker_fs_update.setPosition(location);
    } else {
        marker_fs_update = new google.maps.Marker({
            position: location,
            map: fs_map_update
        });
    }

    $('#editing_fs_latitude').val(location.lat());
    $('#editing_fs_longitude').val(location.lng());


    console.log('Init. Marker Function (update)');

}
// End fs


// Camping Start
function initMapCamp($id) {

    camp_map = new google.maps.Map(document.getElementById($id), {
        center: { lat: 39.0742, lng: 21.8243 },
        zoom: 8,
    });

    google.maps.event.addListener(camp_map, 'click', function (event) {
        placeMarkerCamp(event.latLng);
    });

    console.log('Init. Google Map (camp)');
}


function initMapCampUpdate($id) {

    camp_map_update = new google.maps.Map(document.getElementById($id), {
        center: { lat: 39.0742, lng: 21.8243 },
        zoom: 8,
    });

    google.maps.event.addListener(camp_map_update, 'click', function (event) {
        placeMarkerCampUpdate(event.latLng);
    });

    console.log('Init. Google Map (Update camp)');

}

function placeMarkerCamp(location) {

    if (typeof camp_marker != 'undefined' && camp_marker != null) {
        camp_marker.setPosition(location);
    } else {
        camp_marker = new google.maps.Marker({
            position: location,
            map: camp_map
        });
    }

    $("#add_camp_latitude").val(camp_marker.position.lat());
    $("#add_camp_longitude").val(camp_marker.position.lng());

    console.log('Init. Marker Function');

}

function placeMarkerCampUpdate(location) {

    if (typeof marker_camp_update != 'undefined' && marker_camp_update != null) {
        marker_camp_update.setPosition(location);
    } else {
        marker_camp_update = new google.maps.Marker({
            position: location,
            map: camp_map_update
        });
    }

    $('#editing_camp_latitude').val(location.lat());
    $('#editing_camp_longitude').val(location.lng());


    console.log('Init. Marker Function (update)');

}





// kite
function initMapKite($id) {

    kite_map = new google.maps.Map(document.getElementById($id), {
        center: { lat: 39.0742, lng: 21.8243 },
        zoom: 8,
    });

    google.maps.event.addListener(kite_map, 'click', function (event) {
        placeMarkerKite(event.latLng);
    });

    console.log('Init. Google Map (kite)');
}


function initMapKiteUpdate($id) {

    kite_map_update = new google.maps.Map(document.getElementById($id), {
        center: { lat: 39.0742, lng: 21.8243 },
        zoom: 8,
    });

    google.maps.event.addListener(kite_map_update, 'click', function (event) {
        placeMarkerKiteUpdate(event.latLng);
    });

    console.log('Init. Google Map (Update kite)');

}

function placeMarkerKite(location) {

    if (typeof kite_marker != 'undefined' && kite_marker != null) {
        kite_marker.setPosition(location);
    } else {
        kite_marker = new google.maps.Marker({
            position: location,
            map: kite_map
        });
    }

    $('#kite_latitude').val(location.lat());
    $('#kite_longitude').val(location.lng());

}

function placeMarkerKiteUpdate(location) {

    if (typeof marker_kite_update != 'undefined' && marker_kite_update != null) {
        marker_kite_update.setPosition(location);
    } else {
        marker_kite_update = new google.maps.Marker({
            position: location,
            map: kite_map_update
        });
    }

    $('#editing_kite_latitude').val(location.lat());
    $('#editing_kite_longitude').val(location.lng());


    console.log('Init. Marker Function (update)');

}
// End kite


// wstation
function initMapWstation($id) {

    wstation_map = new google.maps.Map(document.getElementById($id), {
        center: { lat: 39.0742, lng: 21.8243 },
        zoom: 8,
    });

    google.maps.event.addListener(wstation_map, 'click', function (event) {
        placeMarkerWstation(event.latLng);
    });

    console.log('Init. Google Map (wstation)');
}


function initMapWstationUpdate($id) {

    wstation_map_update = new google.maps.Map(document.getElementById($id), {
        center: { lat: 39.0742, lng: 21.8243 },
        zoom: 8,
    });

    google.maps.event.addListener(wstation_map_update, 'click', function (event) {
        placeMarkerWstationUpdate(event.latLng);
    });

    console.log('Init. Google Map (Update wstation)');

}

function placeMarkerWstation(location) {

    if (typeof wstation_marker != 'undefined' && wstation_marker != null) {
        wstation_marker.setPosition(location);
    } else {
        wstation_marker = new google.maps.Marker({
            position: location,
            map: wstation_map
        });
    }

    $('#wstation_in_lng').val(wstation_marker.position.lng());
    $('#wstation_in_lat').val(wstation_marker.position.lat());

    console.log('Init. Marker Function');

}

function placeMarkerWstationUpdate(location) {

    if (typeof marker_wstation_update != 'undefined' && marker_wstation_update != null) {
        marker_wstation_update.setPosition(location);
    } else {
        marker_wstation_update = new google.maps.Marker({
            position: location,
            map: wstation_map_update
        });
    }

    $('#wstation_ed_lat').val(location.lat());
    $('#wstation_ed_lng').val(location.lng());


    console.log('Init. Marker Function (update)');

}
// End wstation


// portsCtrl
app.controller('portsCtrl', function ($scope, $rootScope, $http) {

    $('.dimmer').show();
    $scope.page_title = '';
    port_auth_marker = null;
    marker_port_auth_update = null;
    $rootScope.lan = lan;
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
        $http.patch('http://116.203.99.209:7000/port-authorities/' + $id, $scope.editing).then(function (response) {

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

        $http.delete('http://116.203.99.209:7000/port-authorities/' + port_auth._id, {}).then(function (response) {

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
        $http.post('http://116.203.99.209:7000/port-authorities/create-port-authority', $scope.port_auth).then(function (response) {

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
        $http.get('http://116.203.99.209:7000/port-authorities/get-all-port-authorites', {}).then(function (response) {
            if (response.data.success) {
                $scope.port_auths = response.data.Data;
                initMapPort_auth('port_auth-map-container-google');
                initMapPort_authUpdate('editing-port_auth-map-container-google');
                jQuery(document).ready(function ($) {
                    $('#port_auth_listing_table').DataTable();
                });
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


// pport
function initMapPport($id) {

    pport_map = new google.maps.Map(document.getElementById($id), {
        center: { lat: 39.0742, lng: 21.8243 },
        zoom: 8,
    });

    google.maps.event.addListener(pport_map, 'click', function (event) {
        placeMarkerPport(event.latLng);
    });

    console.log('Init. Google Map (pport)');
}


function initMapPportUpdate($id) {

    pport_map_update = new google.maps.Map(document.getElementById($id), {
        center: { lat: 39.0742, lng: 21.8243 },
        zoom: 8,
    });

    google.maps.event.addListener(pport_map_update, 'click', function (event) {
        placeMarkerPportUpdate(event.latLng);
    });

    console.log('Init. Google Map (Update pport)');

}

function placeMarkerPport(location) {

    if (typeof pport_marker != 'undefined' && pport_marker != null) {
        pport_marker.setPosition(location);
    } else {
        pport_marker = new google.maps.Marker({
            position: location,
            map: pport_map
        });
    }

    $('#pport_latitude').val(location.lat());
    $('#pport_longitude').val(location.lng());

}

function placeMarkerPportUpdate(location) {

    if (typeof marker_pport_update != 'undefined' && marker_pport_update != null) {
        marker_pport_update.setPosition(location);
    } else {
        marker_pport_update = new google.maps.Marker({
            position: location,
            map: pport_map_update
        });
    }

    $('#editing_pport_latitude').val(location.lat());
    $('#editing_pport_longitude').val(location.lng());


    console.log('Init. Marker Function (update)');

}
// End Airport


app.controller('accessCtrl', function ($scope, $rootScope, $http) {
    $rootScope.lan = lan;
    $scope.delete = (ind, acc) => {
        $http.delete('access/' + acc.id, {}).then(function (response) {
            if (response.data.status) {
                $scope.admins.splice(ind, 1);
                Toast.fire({
                    icon: 'success',
                    title: 'access deleted'
                });
            } else {
                Toast.fire({
                    icon: 'error',
                    title: 'something went wrong'
                });
            }
            $('.dimmer').hide();
        }, function (response) {
            console.log('something went wrong', response);
            $('.dimmer').hide();
            Toast.fire({
                icon: 'error',
                title: 'something went wrong'
            });
        });
    };


    $scope.$on('$viewContentLoaded', function () {
        //Here your view content is fully loaded !!
        $http.get('access', {}).then(function (response) {
            if (response.data.status) {
                $scope.admins = response.data.data;

            } else {
                Toast.fire({
                    icon: 'error',
                    title: 'something went wrong'
                });
            }
            $('.dimmer').hide();
        }, function (response) {
            console.log('something went wrong', response);
            $('.dimmer').hide();
            Toast.fire({
                icon: 'error',
                title: 'something went wrong'
            });
        });


    });

});


app.controller('dashboardCtrl', function ($scope, $rootScope, $http) {

    $('.dimmer').show();
    $rootScope.lan = lan;
    $scope.$on('$viewContentLoaded', function () {
        //Here your view content is fully loaded !!
        $http.get('http://116.203.99.209:7000/get-counts', {}).then(function (response) {
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

app.controller('settingsCtrl', function ($scope, $rootScope, $http) {
    $rootScope.lan = lan;
    $scope.access = { access: [] };
    $scope.username = $('#uname').val();
    $scope.lan = $rootScope.lan;

    $scope.changepass = () => {
        $http.post('/password', JSON.stringify({ password: $scope.password })).then(function (response) {

            if (response.data.status) {
                Toast.fire({
                    icon: 'success',
                    title: 'password changes'
                });

                $scope.password = $scope.cpassword = null;

            } else {
                Toast.fire({
                    icon: 'error',
                    title: 'something went wrong !'
                });
            }
            $('.dimmer').hide();


        }, function (response) {
            Toast.fire({
                icon: 'error',
                title: 'something went wrong !'
            });
        });
    };

    $scope.changelang = () => {
        $http.post('/lang', JSON.stringify({ lan: $scope.lan })).then(function (response) {

            if (response.data.status) {
                // Toast.fire({
                //     icon: 'success',
                //     title: 'language switched'
                // });

                window.location.reload();

            } else {
                Toast.fire({
                    icon: 'error',
                    title: 'something went wrong !'
                });
            }
            $('.dimmer').hide();


        }, function (response) {
            Toast.fire({
                icon: 'error',
                title: 'something went wrong !'
            });
        });
    };

    $scope.create = () => {



        $scope.access.access = $('input:checked').map(function () {
            return $(this).val();
        });

        $scope.access.access = $scope.access.access.get();

        console.log($scope.access.access.length);

        if ($scope.access.access.length == 0) {
            Toast.fire({
                icon: 'error',
                title: 'please select proper access'
            });
            return;
        }

        $('.dimmer').show();
        // postData = $.param();

        $http.post('/access', JSON.stringify($scope.access)).then(function (response) {

            if (response.data.status) {
                Toast.fire({
                    icon: 'success',
                    title: 'access created'
                });
                $scope.access = null;
                scrollto('Access');
            } else {
                Toast.fire({
                    icon: 'error',
                    title: 'something went wrong !'
                });
            }
            $('.dimmer').hide();


        }, function (response) {
            Toast.fire({
                icon: 'error',
                title: 'something went wrong !'
            });
        });

    }
});

app.controller('blockuserCtrl', function ($scope, $rootScope, $http) {

    $rootScope.lan = lan;

    $scope.applyfilter = () => {
        $scope.comp = angular.copy($scope.comp_c);
    };

    $scope.$on('$viewContentLoaded', function () {
        $('.dimmer').show();
        $http.get('http://116.203.99.209:7000/user/get-block-users', {}).then(function (response) {
            if (response.data.success) {
                $scope.users = response.data.Data;
                console.log($scope.users);
            } else {
                console.log(response.data);
            }
            $('.dimmer').hide();
        }, function (response) {
            console.log('something went wrong', response);
            $('.dimmer').hide();
        });

    });



    $scope.unblock = (user, index) => {

        $('.dimmer').show();
        $http.patch('http://116.203.99.209:7000/user/unblock-user/' + user._id, {}).then(function (response) {
            if (response.data.success) {

                $scope.users.splice(index, 1);

                Toast.fire({
                    icon: 'success',
                    title: 'user is active now'
                });

            } else {
                console.log(response.data);
            }
            $('.dimmer').hide();
        }, function (response) {
            console.log('something went wrong', response);
            $('.dimmer').hide();
        });

    };

});

app.controller('userprofilesCtrl', function ($scope, $rootScope, $http) {
    $rootScope.lan = lan;

    $scope.block = (ind, user) => {

        Swal.fire({
            title: 'Submit reasong to block ' + user.firstname + ' ' + user.lastname,
            input: 'text',
            inputAttributes: {
                autocapitalize: 'off'
            },
            showCancelButton: true,
            confirmButtonText: 'Block',
            showLoaderOnConfirm: true,
            allowOutsideClick: () => !Swal.isLoading()
        }).then((result) => {
            if (result.isConfirmed) {
                if (result.value == null || result.value.length == 0) {
                    Toast.fire({
                        icon: 'error',
                        title: 'Plz provide proper reason'
                    });
                } else {
                    $http.patch('http://116.203.99.209:7000/user/block-user/' + user._id, { reason: result.value }).then(function (response) {
                        if (response.data.success) {

                            $scope.users[ind].status = 'BLOCKED';

                            Toast.fire({
                                icon: 'success',
                                title: 'user blocked'
                            });

                        } else {
                            console.log(response.data);
                        }
                        $('.dimmer').hide();
                    }, function (response) {
                        console.log('something went wrong', response);
                        $('.dimmer').hide();
                    });
                }
            }
        })


    };

    $scope.unblock = (ind, user) => {
        $('.dimmer').show();
        $http.patch('http://116.203.99.209:7000/user/unblock-user/' + user._id, {}).then(function (response) {
            if (response.data.success) {
                $scope.users[ind].status = 'ACTIVE';

            } else {
                console.log(response.data);
            }
            $('.dimmer').hide();
        }, function (response) {
            console.log('something went wrong', response);
            $('.dimmer').hide();
        });
    };

    $scope.applyfilter = () => {
        $scope.comp = angular.copy($scope.comp_c);
    };

    $scope.$on('$viewContentLoaded', function () {
        $('.dimmer').show();
        $('.dropify').dropify();
        $http.get('http://116.203.99.209:7000/user/users', {}).then(function (response) {
            if (response.data.status == 'Success') {
                $scope.users = response.data.data;

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

app.controller('paymentCtrl', function ($scope, $rootScope, $http) {
    $rootScope.lan = lan;

    // Fetch  FS On Content Load
    $scope.$on('$viewContentLoaded', function () {

        $http.get('http://116.203.99.209:7000/payment/get-payments', {}).then(function (response) {
            if (response.data.success) {
                $scope.payments = response.data.payments;
                $scope.trials = response.data.trials;
                // $.noConflict();
                jQuery(document).ready(function ($) {
                    $('#fs_listing_table').DataTable();
                });
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

app.controller('fishingshelterCtrl', function ($scope, $rootScope, fileUpload, $http) {
    $rootScope.lan = lan;
    $scope.URL = 'http://116.203.99.209:7000';
    $('.dimmer').show();
    $scope.page_title = '';

    airport_marker = null;
    marker_airport_update = null;

    $scope.hide = (id) => {
        $('#' + id).hide();
        console.log('hiding');
        scrollto('airport_listing_table');
    };


    $scope.edit = (index, fs) => {
        $rootScope.lan = lan;
        $scope.editing = angular.copy(fs);
        $scope.editing_fs_index = index;

        newlatlng = new google.maps.LatLng(parseFloat($scope.editing.latitude), parseFloat($scope.editing.longitude));
        // console.log(newlatlng);
        if (marker_fs_update != null && typeof marker_fs_update != 'undefined') {
            marker_fs_update.setPosition(newlatlng);
        } else {
            // Add Marker
            marker_fs_update = new google.maps.Marker({
                position: { lat: parseFloat($scope.editing.latitude), lng: parseFloat($scope.editing.longitude) },
                map: fs_map_update
            });
        }

        fs_map_update.setCenter({ lat: parseFloat($scope.editing.latitude), lng: parseFloat($scope.editing.longitude) });

        $('#updatefs').show();
        scrollto('updatefs');

    };

    $scope.save = function () {

        // Sending PUT Request for update
        $('.dimmer').show();
        // var postData = $.param($scope.camera);
        // console.log($scope.camera);
        $id = angular.copy($scope.editing._id);

        $scope.editing.longitude = "" + marker_fs_update.position.lng();

        $scope.editing.latitude = "" + marker_fs_update.position.lat();

        // delete $scope.editing._id;
        $http.patch('http://116.203.99.209:7000/fishing-shelters/' + $id, $scope.editing).then(function (response) {

            if (response.data.success) {
                $scope.fss[$scope.editing_fs_index] = angular.copy($scope.editing);
                $scope.fss[$scope.editing_fs_index]._id = $id;

                var file = $scope.myFile;
                if (file) {

                    console.log('file is ');
                    $('.dimmer').hide();
                    var uploadUrl = "http://116.203.99.209:7000/fishing-shelters/upload-fishing-shelter-image/" + response.data.Data._id;
                    fileUpload.uploadFileToUrl(file, uploadUrl);

                }


                marker_fs_update.setMap(null);
                marker_fs_update = null;
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
    $scope.delete = (index, fs) => {

        $('.dimmer').show();

        $http.delete('http://116.203.99.209:7000/fishing-shelters/' + fs._id, {}).then(function (response) {

            if (response.data.success) {
                $scope.fss.splice(index, 1);
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

    // Add New FS
    $scope.submit = () => {
        $scope.fs.longitude = "" + fs_marker.position.lng();
        $scope.fs.latitude = "" + fs_marker.position.lat();
        // $scope.fs.TEL = $scope.fs.TEL.toString();
        $('.dimmer').show();
        // var postData = $.param($scope.fs);
        console.log($scope.fs);
        $http.post('http://116.203.99.209:7000/fishing-shelters/create-fishing-shelter', $scope.fs).then(function (response) {

            if (response.data.success) {

                var file = $scope.myFile;
                console.log('file is ');
                $('.dimmer').hide();
                var uploadUrl = "http://116.203.99.209:7000/fishing-shelters/upload-fishing-shelter-image/" + response.data.Data._id;
                fileUpload.uploadFileToUrl(file, uploadUrl);

                $scope.fs._id = response.data.Data._id;
                $scope.fss.push($scope.fs);
                // alert(response.data.message);
                $scope.fs = null;
                fs_marker.setMap(null);
                fs_marker = null;
                Toast.fire({
                    icon: 'success',
                    title: response.data.message
                });
                scrollto('fs_listing_table');
            } else {
                alert(response.data.message);
            }
            $('.dimmer').hide();
        }, function (response) {
            console.log(response);
            $('.dimmer').hide();
        });


    };


    // Fetch  FS On Content Load
    $scope.$on('$viewContentLoaded', function () {
        //Here your view content is fully loaded !!

        initMapFs('fs-map-container-google');
        initMapFsUpdate('update-fs-map-container');
        $('.dropify').dropify();
        $http.get('http://116.203.99.209:7000/fishing-shelters/get-all-fishing-shelters', {}).then(function (response) {
            if (response.data.success) {
                $scope.fss = response.data.Data;
                // $.noConflict();
                jQuery(document).ready(function ($) {
                    $('#fs_listing_table').DataTable();
                });
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

app.controller('campingCtrl', function ($scope, $rootScope, $http) {
    $rootScope.lan = lan;
    $('.dimmer').show();
    $scope.page_title = '';
    $scope.page_title = '';
    camp_marker = null;
    marker_camp_update = null;

    $scope.hide = (id) => {
        $('#' + id).hide();
        console.log('hiding');
        scrollto('camping_listing_table');
    };


    $scope.edit = (index, camping) => {
        $scope.editing = angular.copy(camping);
        $scope.editing_camping_index = index;



        newlatlng = new google.maps.LatLng(parseFloat(camping.latitude), parseFloat(camping.longitude));
        // console.log(newlatlng);
        if (marker_camp_update != null && typeof marker_camp_update != 'undefined') {
            marker_camp_update.setPosition(newlatlng);
        } else {
            // Add Marker
            marker_camp_update = new google.maps.Marker({
                position: { lat: parseFloat(camping.latitude), lng: parseFloat(camping.longitude) },
                map: camp_map_update
            });
        }

        camp_map_update.setCenter({ lat: parseFloat(camping.latitude), lng: parseFloat(camping.longitude) });

        $('#updatecamping').show();
        scrollto('updatecamping');

    };

    $scope.save = function () {

        // Sending PUT Request for update
        $('.dimmer').show();
        // var postData = $.param($scope.camera);
        // console.log($scope.camera);
        $id = angular.copy($scope.editing._id);

        $scope.editing.longitude = "" + marker_camp_update.position.lng();

        $scope.editing.latitude = "" + marker_camp_update.position.lat();

        // delete $scope.editing._id;
        $http.patch('http://116.203.99.209:7000/camping/' + $id, $scope.editing).then(function (response) {

            if (response.data.success) {
                $scope.campings[$scope.editing_camping_index] = angular.copy($scope.editing);
                $scope.campings[$scope.editing_camping_index]._id = $id;
                marker_camp_update.setMap(null);
                marker_camp_update = null;
                $scope.hide();

                Toast.fire({
                    icon: 'success',
                    title: response.data.message
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

    // Delete camping
    $scope.delete = (index, camping) => {

        $('.dimmer').show();

        $http.delete('http://116.203.99.209:7000/camping/' + camping._id, {}).then(function (response) {

            if (response.data.success) {
                $scope.campings.splice(index, 1);
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

    // Add New camping
    $scope.submit = () => {
        $scope.camping.longitude = "" + camp_marker.position.lng();
        $scope.camping.latitude = "" + camp_marker.position.lat();

        // $scope.camping.TEL = $scope.camping.TEL.toString();
        $('.dimmer').show();
        // var postData = $.param($scope.camping);
        console.log($scope.camping);
        $http.post('http://116.203.99.209:7000/camping/create-camping-point', $scope.camping).then(function (response) {

            if (response.data.success) {
                $scope.camping._id = response.data.Data._id;
                $scope.campings.push($scope.camping);
                // alert(response.data.message);
                $scope.camping = null;
                camp_marker.setMap(null);
                camp_marker = null;
                Toast.fire({
                    icon: 'success',
                    title: response.data.message
                });
                scrollto('camping_listing_table');
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
        $http.get('http://116.203.99.209:7000/camping/get-all-camping-points', {}).then(function (response) {
            if (response.data.success) {
                $scope.campings = response.data.Data;

                initMapCamp('camp-map-container');
                initMapCampUpdate('update-camp-map');
                // $.noConflict();
                jQuery(document).ready(function ($) {
                    $('#camping_listing_table').DataTable();
                });

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

app.controller('mountainCtrl', function ($scope, $rootScope, $http, fileUpload) {
    $rootScope.lan = lan;
    $('.dimmer').show();
    $scope.page_title = '';
    marker = null;
    marker_camera_update = null;



    $scope.hide = (id) => {
        $('#' + id).hide();
        console.log('hiding');
        scrollto('mountain_listing_table');
    };


    $scope.edit = (index, mountain) => {
        $scope.editing = angular.copy(mountain);
        $scope.editing_mountain_index = index;



        newlatlng = new google.maps.LatLng(parseFloat(mountain.latitude), parseFloat(mountain.longitude));
        // console.log(newlatlng);
        if (marker_camera_update != null && typeof marker_camera_update != 'undefined') {
            marker_camera_update.setPosition(newlatlng);
        } else {
            // Add Marker
            marker_camera_update = new google.maps.Marker({
                position: { lat: parseFloat(mountain.latitude), lng: parseFloat(mountain.longitude) },
                map: camera_map_update
            });
        }

        camera_map_update.setCenter({ lat: parseFloat(mountain.latitude), lng: parseFloat(mountain.longitude) });

        $('#updatemountain').show();
        scrollto('updatemountain');

    };

    $scope.save = function () {

        // Sending PUT Request for update
        $('.dimmer').show();
        // var postData = $.param($scope.camera);
        // console.log($scope.camera);
        $id = angular.copy($scope.editing._id);

        $scope.editing.longitude = "" + marker_camera_update.position.lng();

        $scope.editing.latitude = "" + marker_camera_update.position.lat();

        // delete $scope.editing_camera._id;
        $http.patch('http://116.203.99.209:7000/mount-shelters/' + $id, $scope.editing).then(function (response) {

            if (response.data.success) {
                $scope.mountains[$scope.editing_mountain_index] = angular.copy($scope.editing);
                $scope.mountains[$scope.editing_mountain_index]._id = $id;


                // var file = $scope.myFile;
                // if (file) {
                //     Toast.fire({
                //         icon: 'error',
                //         title: 'Plz Select a image'
                //     });
                //     var uploadUrl = "http://116.203.99.209:7000/livecamera/upload-live-camera-image/" + response.data.Data._id;
                //     fileUpload.uploadFileToUrl(file, uploadUrl);
                // }


                $scope.hide();

                Toast.fire({
                    icon: 'success',
                    title: 'Camera updated successfully'
                });

                $scope.hide('updatemountain');

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
        $http.get('http://116.203.99.209:7000/mount-shelters/get-all-mount-shelters', {}).then(function (response) {
            if (response.data.success) {
                $scope.mountains = response.data.Data;
                $('.dropify').dropify();
                // $.noConflict();
                jQuery(document).ready(function ($) {
                    $scope.dt = $('#mountain_listing_table').DataTable();
                });
            } else {
                console.log(message);
            }
            $('.dimmer').hide();
        }, function (response) {
            console.log('something went wrong', response);
            $('.dimmer').hide();
        });


        initMapCamera('mountain-map-container');

        // cameras-update-map-container

        initMapCameraUpdate('update-mountain-map-container');



    });

    $scope.delete = (index, mountain) => {

        $('.dimmer').show();

        $http.delete('http://116.203.99.209:7000/mount-shelters/' + mountain._id, {}).then(function (response) {

            if (response.data.success) {
                $scope.mountains.splice(index, 1);
            } else {
                Toast.fire({
                    icon: 'error',
                    title: response.data.message
                });
                $scope.dt.ajax.reload();
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

        // http://116.203.99.209:7000/livecamera/upload-live-camera-image/:liveCameraId

        $scope.mountain.longitude = "" + marker.position.lng();

        $scope.mountain.latitude = "" + marker.position.lat();

        $scope.mountain.TEL = $scope.mountain.TEL.toString();

        // var file = $scope.myFile;
        // if (!file) {
        //     Toast.fire({
        //         icon: 'error',
        //         title: 'Plz Select a image'
        //     });
        //     return;
        // }


        $('.dimmer').show();
        // var postData = $.param($scope.mountain);
        console.log($scope.mountain);
        $http.post('http://116.203.99.209:7000/mount-shelters/create-mount-shelter', $scope.mountain).then(function (response) {

            if (response.data.success) {
                $scope.mountain._id = response.data.Data._id;

                // var uploadUrl = "http://116.203.99.209:7000/mount-shelters/upload-mount-shelter-image/" + response.data.Data._id;
                // fileUpload.uploadFileToUrl(file, uploadUrl)

                $scope.mountains.push($scope.mountain);
                // alert(response.data.message);
                $scope.mountain = null;
                Toast.fire({
                    icon: 'success',
                    title: response.data.message
                });
                scrollto('mountain_listing_table');
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

app.controller('kiteCtrl', function ($scope, $rootScope, $http) {
    $rootScope.lan = lan;

    $('.dimmer').show();
    $scope.page_title = '';
    port_auth_marker = null;
    marker_port_auth_update = null;

    $scope.hide = (id) => {
        $('#' + id).hide();
        console.log('hiding');
        scrollto('kite_listing_table');
    };


    $scope.edit = (index, kite) => {
        $scope.editing = angular.copy(kite);
        $scope.editing_kite_index = index;



        newlatlng = new google.maps.LatLng(parseFloat(kite.latitude), parseFloat(kite.longitude));
        // console.log(newlatlng);
        if (typeof marker_kite_update != 'undefined' && marker_kite_update != null) {
            marker_kite_update.setPosition(newlatlng);
        } else {
            // Add Marker
            marker_kite_update = new google.maps.Marker({
                position: { lat: parseFloat(kite.latitude), lng: parseFloat(kite.longitude) },
                map: kite_map_update
            });
        }

        kite_map_update.setCenter({ lat: parseFloat(kite.latitude), lng: parseFloat(kite.longitude) });

        $('#updatekite').show();
        scrollto('updatekite');

    };

    $scope.save = function () {

        // Sending PUT Request for update
        $('.dimmer').show();
        // var postData = $.param($scope.camera);
        // console.log($scope.camera);
        $id = angular.copy($scope.editing._id);

        $scope.editing.longitude = "" + marker_kite_update.position.lng();

        $scope.editing.latitude = "" + marker_kite_update.position.lat();

        // delete $scope.editing._id;
        $http.patch('http://116.203.99.209:7000/kite-surfings/' + $id, $scope.editing).then(function (response) {

            if (response.data.success) {
                $scope.kites[$scope.editing_kite_index] = angular.copy($scope.editing);
                $scope.kites[$scope.editing_kite_index]._id = $id;
                marker_kite_update.setMap(null);
                marker_kite_update = null;
                $scope.hide();

                Toast.fire({
                    icon: 'success',
                    title: 'Porth Authority updated successfully'
                });

                scrollto('kite_listing_table');

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
    $scope.delete = (index, kite) => {

        $('.dimmer').show();

        $http.delete('http://116.203.99.209:7000/kite-surfings/' + kite._id, {}).then(function (response) {

            if (response.data.success) {
                $scope.kites.splice(index, 1);
                Toast.fire({
                    icon: 'success',
                    title: response.data.message
                });
                scrollto('kite_listing_table');
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

        $scope.kite.longitude = "" + kite_marker.position.lng();

        $scope.kite.latitude = "" + kite_marker.position.lat();

        $('.dimmer').show();
        console.log($scope.kite);
        $http.post('http://116.203.99.209:7000/kite-surfings/create-kitesurfing', $scope.kite).then(function (response) {

            if (response.data.success) {
                $scope.kite._id = response.data.Data._id;
                $scope.kites.push($scope.kite);
                // alert(response.data.message);
                $scope.kite = null;
                kite_marker.setMap(null);
                kite_marker = null;
                Toast.fire({
                    icon: 'success',
                    title: response.data.message
                });
                scrollto('kite_listing_table');
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
        $http.get('http://116.203.99.209:7000/kite-surfings/get-all-kitesurfings', {}).then(function (response) {
            if (response.data.success) {

                $scope.kites = response.data.Data;
                initMapKite('kite-map-container-google');
                initMapKiteUpdate('editing-kite-map-container-google');

                // $.noConflict();
                jQuery(document).ready(function ($) {
                    $('#kite_listing_table').DataTable();
                });

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

app.controller('skicenterCtrl', function ($scope, $rootScope, $http) {
    $rootScope.lan = lan;
    $('.dimmer').show();
    $scope.page_title = '';
    airport_marker = null;
    marker_airport_update = null;

    $scope.hide = (id) => {
        $('#' + id).hide();
        console.log('hiding');
        scrollto('skicenter-listing-table');
    };


    $scope.edit = (index, skicenter) => {
        $scope.editing = angular.copy(skicenter);
        $scope.editing_skicenter_index = index;



        newlatlng = new google.maps.LatLng(parseFloat(skicenter.latitude), parseFloat(skicenter.longitude));
        // console.log(newlatlng);
        if (marker_airport_update != null && typeof marker_airport_update != 'undefined') {
            marker_airport_update.setPosition(newlatlng);
        } else {
            // Add Marker
            marker_airport_update = new google.maps.Marker({
                position: { lat: parseFloat(skicenter.latitude), lng: parseFloat(skicenter.longitude) },
                map: airport_map_update
            });
        }

        airport_map_update.setCenter({ lat: parseFloat(skicenter.latitude), lng: parseFloat(skicenter.longitude) });

        $('#updateskicenter').show();
        scrollto('updateskicenter');

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
        $http.patch('http://116.203.99.209:7000/ski-centers/' + $id, $scope.editing).then(function (response) {

            if (response.data.success) {
                $scope.skicenters[$scope.editing_skicenter_index] = angular.copy($scope.editing);
                $scope.skicenters[$scope.editing_skicenter_index]._id = $id;
                marker_airport_update.setMap(null);
                marker_airport_update = null;
                $scope.hide();

                Toast.fire({
                    icon: 'success',
                    title: 'ski center updated successfully'
                });
                // scrollto('skicenter-listing-table');
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

    // Delete skicenter
    $scope.delete = (index, skicenter) => {

        $('.dimmer').show();

        $http.delete('http://116.203.99.209:7000/ski-centers/' + skicenter._id, {}).then(function (response) {

            if (response.data.success) {
                $scope.skicenters.splice(index, 1);
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
            scrollto('skicenter-listing-table');
            $('.dimmer').hide();
        }, function (response) {
            Toast.fire({
                icon: 'error',
                title: 'Something went wrong !'
            })
        });

    };

    // Add New skicenter
    $scope.submit = () => {

        $scope.skicenter.longitude = "" + airport_marker.position.lng();

        $scope.skicenter.latitude = "" + airport_marker.position.lat();

        // $scope.skicenter.TEL = $scope.skicenter.TEL.toString();
        $('.dimmer').show();
        // var postData = $.param($scope.skicenter);
        console.log($scope.skicenter);
        $http.post('http://116.203.99.209:7000/ski-centers/create-skicenter', $scope.skicenter).then(function (response) {

            if (response.data.success) {
                $scope.skicenter._id = response.data.Data._id;
                $scope.skicenters.push($scope.skicenter);
                // alert(response.data.message);
                $scope.skicenter = null;
                airport_marker.setMap(null);
                airport_marker = null;
                Toast.fire({
                    icon: 'success',
                    title: response.data.message
                });
                scrollto('skicenter_listing_table');
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
        $http.get('http://116.203.99.209:7000/ski-centers/get-all-skicenters', {}).then(function (response) {
            if (response.data.success) {
                $scope.skicenters = response.data.Data;

                initMapAirport('skicenter-map-container-google');
                initMapAirportUpdate('update-skicenter-map-container');

                // $.noConflict();
                jQuery(document).ready(function ($) {
                    $('#skicenter-listing-table').DataTable();
                });

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

app.controller('subwayCtrl', function ($scope, $rootScope, $http) {
    $rootScope.lan = lan;
    $('.dimmer').show();
    $scope.page_title = '';
    airport_marker = null;
    marker_airport_update = null;

    $scope.hide = (id) => {
        $('#' + id).hide();
        console.log('hiding');
        scrollto('subway-listing-table');
    };


    $scope.edit = (index, subway) => {
        $scope.editing = angular.copy(subway);
        $scope.editing_subway_index = index;



        newlatlng = new google.maps.LatLng(parseFloat(subway.latitude), parseFloat(subway.longitude));
        // console.log(newlatlng);
        if (marker_airport_update != null && typeof marker_airport_update != 'undefined') {
            marker_airport_update.setPosition(newlatlng);
        } else {
            // Add Marker
            marker_airport_update = new google.maps.Marker({
                position: { lat: parseFloat(subway.latitude), lng: parseFloat(subway.longitude) },
                map: airport_map_update
            });
        }

        airport_map_update.setCenter({ lat: parseFloat(subway.latitude), lng: parseFloat(subway.longitude) });

        $('#updatesubway').show();
        scrollto('updatesubway');

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
        $http.patch('http://116.203.99.209:7000/subways/' + $id, $scope.editing).then(function (response) {

            if (response.data.success) {
                $scope.subways[$scope.editing_subway_index] = angular.copy($scope.editing);
                $scope.subways[$scope.editing_subway_index]._id = $id;
                marker_airport_update.setMap(null);
                marker_airport_update = null;
                $scope.hide();

                Toast.fire({
                    icon: 'success',
                    title: 'ski center updated successfully'
                });
                // scrollto('subway-listing-table');
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

    // Delete skicenter
    $scope.delete = (index, subway) => {
        $('.dimmer').show();
        $http.delete('http://116.203.99.209:7000/subways/' + subway._id, {}).then(function (response) {

            if (response.data.success) {
                $scope.subways.splice(index, 1);
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
            scrollto('subway-listing-table');
            $('.dimmer').hide();
        }, function (response) {
            Toast.fire({
                icon: 'error',
                title: 'Something went wrong !'
            })
        });

    };

    // Add New skicenter
    $scope.submit = () => {

        $scope.subway.longitude = "" + airport_marker.position.lng();

        $scope.subway.latitude = "" + airport_marker.position.lat();

        // $scope.subway.TEL = $scope.subway.TEL.toString();
        $('.dimmer').show();
        // var postData = $.param($scope.subway);
        console.log($scope.subway);
        $http.post('http://116.203.99.209:7000/subways/create-subway', $scope.subway).then(function (response) {

            if (response.data.success) {
                $scope.subway._id = response.data.Data._id;
                $scope.subways.push($scope.subway);
                // alert(response.data.message);
                $scope.subway = null;
                airport_marker.setMap(null);
                airport_marker = null;
                Toast.fire({
                    icon: 'success',
                    title: response.data.message
                });
                scrollto('subway-listing-table');
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
        $http.get('http://116.203.99.209:7000/subways/get-all-subways', {}).then(function (response) {
            if (response.data.success) {
                $scope.subways = response.data.Data;

                initMapAirport('subway-map-container-google');
                initMapAirportUpdate('update-subway-map-container-google');
                jQuery(document).ready(function ($) {
                    $('#subway-listing-table').DataTable();
                });
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

app.controller('moonCtrl', function ($scope, $rootScope, $http, fileUpload) {
    $rootScope.lan = lan;
    $scope.months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    $scope.$on('$viewContentLoaded', function () {
        //Here your view content is fully loaded !!
        $http.get('http://116.203.99.209:7000/moon-calendar/get-all-moon-calendars', {}).then(function (response) {
            if (response.data.success) {
                $scope.moons = response.data.Data;
                $('.dropify').dropify();
            } else {
                console.log(message);
            }
            $('.dimmer').hide();
        }, function (response) {
            console.log('something went wrong', response);
            $('.dimmer').hide();
        });


    });

    $scope.refresh = function () {
        //Here your view content is fully loaded !!
        $http.get('http://116.203.99.209:7000/moon-calendar/get-all-moon-calendars', {}).then(function (response) {
            if (response.data.success) {
                $scope.moons = response.data.Data;
                $('.dropify').dropify();
            } else {
                console.log(message);
            }
            $('.dimmer').hide();
        }, function (response) {
            console.log('something went wrong', response);
            $('.dimmer').hide();
        });


    };

    $scope.delete = ($index) => {
        $scope.delete = (index) => {

            $('.dimmer').show();

            $http.delete('http://116.203.99.209:7000/moon-calendar/' + $scope.moons[$index]._id, {}).then(function (response) {
                if (response.data.success) {
                    $scope.moons.splice(index, 1);
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
    }

    $scope.submit = () => {

        var file = $scope.myFile;
        var uploadUrl = "http://116.203.99.209:7000/moon-calendar/upload-moon-calendar-image";
        if (!file) {

            Toast.fire({
                icon: 'error',
                title: 'Plz Select a image'
            });
        }
        $('.dimmer').show();


        var fd = new FormData();
        fd.append('image', file);
        fd.append('month', $scope.moonc.month);
        fd.append('year', $scope.moonc.year);


        $http.post(uploadUrl, fd, {
            transformRequest: angular.identity,
            headers: { 'Content-Type': undefined }
        })
            .then(function (response) {

                if (!response.data.success) {
                    Toast.fire({
                        icon: 'error',
                        title: response.data.message
                    });
                } else {
                    scrollto('moon_listing_table');
                }

                $scope.refresh();
                $('.dimmer').hide();
                return true;
            }, function () {
                Toast.fire({
                    icon: 'error',
                    title: "Error uploading attachment !"
                });
                $('.dimmer').hide();
                return false;
            });




        $(".dropify-clear").trigger("click");
        $('.dimmer').hide();
        $scope.refresh();

    };

    $scope.refresh = () => {
        $('.dimmer').show();
        $http.get('http://116.203.99.209:7000/moon-calendar/get-all-moon-calendars', {}).then(function (response) {
            if (response.data.success) {
                $scope.moons = response.data.Data;
                // $('.dropify').dropify();
            } else {
                console.log(message);
            }
            $('.dimmer').hide();
        }, function (response) {
            console.log('something went wrong', response);
            $('.dimmer').hide();
        });
    };

});

app.controller('slipwaysCtrl', function ($scope, $rootScope, $http, fileUpload) {
    $rootScope.lan = lan;
    $('.dimmer').show();
    $scope.page_title = '';
    airport_marker = null;
    marker_airport_update = null;

    $scope.hide = (id) => {
        $('#' + id).hide();
        console.log('hiding');
        scrollto('slipway-listing-table');
    };


    $scope.edit = (index, slipway) => {
        $scope.editing = angular.copy(slipway);
        $scope.editing_slipway_index = index;

        newlatlng = new google.maps.LatLng(parseFloat(slipway.latitude), parseFloat(slipway.longitude));
        // console.log(newlatlng);
        if (marker_airport_update != null && typeof marker_airport_update != 'undefined') {
            marker_airport_update.setPosition(newlatlng);
        } else {
            // Add Marker
            marker_airport_update = new google.maps.Marker({
                position: { lat: parseFloat(slipway.latitude), lng: parseFloat(slipway.longitude) },
                map: airport_map_update
            });
        }

        airport_map_update.setCenter({ lat: parseFloat(slipway.latitude), lng: parseFloat(slipway.longitude) });

        $('#updateslipway').show();
        scrollto('updateslipway');

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
        $http.patch('http://116.203.99.209:7000/slipways/' + $id, $scope.editing).then(function (response) {

            if (response.data.success) {
                $scope.slipways[$scope.editing_slipway_index] = angular.copy($scope.editing);
                $scope.slipways[$scope.editing_slipway_index]._id = $id;
                marker_airport_update.setMap(null);
                marker_airport_update = null;

                var file = $scope.myFile;
                if (file) {
                    var uploadUrl = "http://116.203.99.209:7000/slipways/upload-slipway-image/" + $id;
                    fileUpload.uploadFileToUrl(file, uploadUrl)
                }


                $scope.hide();

                Toast.fire({
                    icon: 'success',
                    title: 'Slipway updated successfully'
                });

                $scope.refresh();
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
    $scope.delete = (index, slipway) => {

        $('.dimmer').show();

        $http.delete('http://116.203.99.209:7000/slipways/' + slipway._id, {}).then(function (response) {

            if (response.data.success) {
                $scope.slipways.splice(index, 1);
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

        $scope.slipway.longitude = "" + airport_marker.position.lng();

        $scope.slipway.latitude = "" + airport_marker.position.lat();
        var file = $scope.myFile;
        if (!file) {
            Toast.fire({
                icon: 'error',
                title: 'Plz Select a image'
            });
        }
        // $scope.airport.TEL = $scope.airport.TEL.toString();
        $('.dimmer').show();
        // var postData = $.param($scope.airport);
        console.log($scope.slipway);
        $http.post('http://116.203.99.209:7000/slipways/create-slipway', $scope.slipway).then(function (response) {

            if (response.data.success) {


                console.log('file is ');
                // $('.dimmer').hide();
                var uploadUrl = "http://116.203.99.209:7000/slipways/upload-slipway-image/" + response.data.Data._id;
                fileUpload.uploadFileToUrl(file, uploadUrl);
                // fileUpload.uploadFileToUrl(file, uploadUrl)
                $scope.slipway._id = response.data.Data._id;
                $scope.slipways.push($scope.slipway);
                // alert(response.data.message);
                $scope.slipway = null;
                airport_marker.setMap(null);
                airport_marker = null;
                Toast.fire({
                    icon: 'success',
                    title: response.data.message
                });
                scrollto('slipway-listing-table');
                $scope.refresh();
            } else {
                alert(response.data.message);
            }
            $('.dimmer').hide();
        }, function (response) {
            console.log(response);
            $('.dimmer').hide();
        });


    };


    $scope.refresh = function () {
        //Here your view content is fully loaded !!
        $http.get('http://116.203.99.209:7000/slipways/get-all-slipways', {}).then(function (response) {
            if (response.data.success) {
                $scope.slipways = response.data.Data;

                // $.noConflict();
                jQuery(document).ready(function ($) {
                    $('#slipway-listing-table').DataTable();
                });
                // $('.dropify').dropify();
                // initMapAirport('slipway-map-container-google');
                // initMapAirportUpdate('update-slipway-map-container-google');
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

    };


    // Fetch Live Hospitals On Content Load
    $scope.$on('$viewContentLoaded', function () {
        //Here your view content is fully loaded !!
        $http.get('http://116.203.99.209:7000/slipways/get-all-slipways', {}).then(function (response) {
            if (response.data.success) {
                $scope.slipways = response.data.Data;
                $('.dropify').dropify();
                initMapAirport('slipway-map-container-google');
                initMapAirportUpdate('update-slipway-map-container-google');
                // $.noConflict();
                jQuery(document).ready(function ($) {
                    $('#slipway-listing-table').DataTable();
                });
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

app.controller('passengerCtrl', function ($scope, $rootScope, $http) {
    $rootScope.lan = lan;
    $('.dimmer').show();
    $scope.page_title = '';
    pport_marker = null;
    marker_pport_update = null;

    $scope.hide = (id) => {
        $('#' + id).hide();
        console.log('hiding');
        scrollto('pport_listing_table');
    };


    $scope.edit = (index, pport) => {
        $scope.editing = angular.copy(pport);
        $scope.editing_pport_index = index;



        newlatlng = new google.maps.LatLng(parseFloat(pport.latitude), parseFloat(pport.longitude));
        // console.log(newlatlng);
        if (marker_pport_update != null && typeof marker_pport_update != 'undefined') {
            marker_pport_update.setPosition(newlatlng);
        } else {
            // Add Marker
            marker_pport_update = new google.maps.Marker({
                position: { lat: parseFloat(pport.latitude), lng: parseFloat(pport.longitude) },
                map: pport_map_update
            });
        }

        pport_map_update.setCenter({ lat: parseFloat(pport.latitude), lng: parseFloat(pport.longitude) });

        $('#updatepport').show();
        scrollto('updatepport');

    };

    $scope.save = function () {

        // Sending PUT Request for update
        $('.dimmer').show();
        // var postData = $.param($scope.camera);
        // console.log($scope.camera);
        $id = angular.copy($scope.editing._id);

        $scope.editing.longitude = "" + marker_pport_update.position.lng();

        $scope.editing.latitude = "" + marker_pport_update.position.lat();

        // delete $scope.editing._id;
        $http.patch('http://116.203.99.209:7000/passenger-ports/' + $id, $scope.editing).then(function (response) {

            if (response.data.success) {
                $scope.pports[$scope.editing_pport_index] = angular.copy($scope.editing);
                $scope.pports[$scope.editing_pport_index]._id = $id;
                marker_pport_update.setMap(null);
                marker_pport_update = null;
                $scope.hide('updatepport');

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
    $scope.delete = (index, pport) => {

        $('.dimmer').show();

        $http.delete('http://116.203.99.209:7000/passenger-ports/' + pport._id, {}).then(function (response) {

            if (response.data.success) {
                $scope.pports.splice(index, 1);
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

        $scope.pport.longitude = "" + pport_marker.position.lng();

        $scope.pport.latitude = "" + pport_marker.position.lat();

        // $scope.pport.TEL = $scope.pport.TEL.toString();
        $('.dimmer').show();
        // var postData = $.param($scope.pport);
        console.log($scope.pport);
        $http.post('http://116.203.99.209:7000/passenger-ports/create-passenger-port', $scope.pport).then(function (response) {

            if (response.data.success) {
                $scope.pport._id = response.data.Data._id;
                $scope.pports.push($scope.pport);
                // alert(response.data.message);
                $scope.pport = null;
                pport_marker.setMap(null);
                pport_marker = null;
                Toast.fire({
                    icon: 'success',
                    title: response.data.message
                });
                scrollto('pport_listing_table');
            } else {
                alert(response.data.message);
            }
            $('.dimmer').hide();
        }, function (response) {
            console.log(response);
            $('.dimmer').hide();
        });


    };



    // Fetch Live PPort On Content Load
    $scope.$on('$viewContentLoaded', function () {
        //Here your view content is fully loaded !!
        $http.get('http://116.203.99.209:7000/passenger-ports/get-all-passenger-ports', {}).then(function (response) {
            if (response.data.success) {
                $scope.pports = response.data.Data;

                initMapPport('pport-map-container-google');
                initMapPportUpdate('update-pport-map-container-google');
                jQuery(document).ready(function ($) {
                    $('#pport_listing_table').DataTable();
                });
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

app.controller('weatherstationCtrl', function ($scope, $rootScope, $http) {
    $rootScope.lan = lan;

    $('.dimmer').show();
    $scope.page_title = '';
    wstation_marker = null;
    marker_wstation_update = null;

    $scope.hide = (id) => {
        $('#' + id).hide();
        console.log('hiding');
        scrollto('wstation_listing_table');
    };


    $scope.edit = (index, wstation) => {
        $scope.editing = angular.copy(wstation);
        $scope.editing_wstation_index = index;



        newlatlng = new google.maps.LatLng(parseFloat(wstation.latitude), parseFloat(wstation.longitude));
        // console.log(newlatlng);
        if (marker_wstation_update != null && typeof marker_wstation_update != 'undefined') {
            marker_wstation_update.setPosition(newlatlng);
        } else {
            // Add Marker
            marker_wstation_update = new google.maps.Marker({
                position: { lat: parseFloat(wstation.latitude), lng: parseFloat(wstation.longitude) },
                map: wstation_map_update
            });
        }

        wstation_map_update.setCenter({ lat: parseFloat(wstation.latitude), lng: parseFloat(wstation.longitude) });

        $('#updatewstation').show();
        scrollto('updatewstation');

    };

    $scope.save = function () {

        // Sending PUT Request for update
        $('.dimmer').show();
        // var postData = $.param($scope.camera);
        // console.log($scope.camera);
        $id = angular.copy($scope.editing._id);

        $scope.editing.longitude = "" + marker_wstation_update.position.lng();

        $scope.editing.latitude = "" + marker_wstation_update.position.lat();

        // delete $scope.editing._id;
        $http.patch('http://116.203.99.209:7000/weather-stations/' + $id, $scope.editing).then(function (response) {

            if (response.data.success) {
                $scope.wstations[$scope.editing_wstation_index] = angular.copy($scope.editing);
                $scope.wstations[$scope.editing_wstation_index]._id = $id;
                marker_wstation_update.setMap(null);
                marker_wstation_update = null;
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

        $http.delete('http://116.203.99.209:7000/airports/' + airport._id, {}).then(function (response) {

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

    // Add New Wstation
    $scope.submit = () => {

        $scope.wstation.longitude = "" + wstation_marker.position.lng();

        $scope.wstation.latitude = "" + wstation_marker.position.lat();

        // $scope.wstation.TEL = $scope.wstation.TEL.toString();
        $('.dimmer').show();
        // var postData = $.param($scope.wstation);
        console.log($scope.wstation);
        $http.post('http://116.203.99.209:7000/weather-stations/create-weather-station', $scope.wstation).then(function (response) {

            if (response.data.success) {
                $scope.wstation._id = response.data.Data._id;
                $scope.wstations.push($scope.wstation);
                // alert(response.data.message);
                $scope.wstation = null;
                wstation_marker.setMap(null);
                wstation_marker = null;
                Toast.fire({
                    icon: 'success',
                    title: response.data.message
                });
                scrollto('wstation_listing_table');
            } else {
                alert(response.data.message);
            }
            $('.dimmer').hide();
        }, function (response) {
            console.log(response);
            $('.dimmer').hide();
        });


    };



    $scope.delete = (index, wstation) => {

        $('.dimmer').show();

        $http.delete('http://116.203.99.209:7000/weather-stations/' + wstation._id, {}).then(function (response) {

            if (response.data.success) {
                $scope.wstations.splice(index, 1);
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
            });
            $('.dimmer').hide();
        });

    };


    $scope.$on('$viewContentLoaded', function () {
        //Here your view content is fully loaded !!
        $http.get('http://116.203.99.209:7000/weather-stations/get-all-weather-stations', {}).then(function (response) {
            if (response.data.success) {
                $scope.wstations = response.data.Data;

                initMapWstation('wstation-map-container-google');
                initMapWstationUpdate('update-wstation-map-container');
                // $.noConflict();
                jQuery(document).ready(function ($) {
                    $('#wstation_listing_table').DataTable();
                });
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

app.controller('airportCtrl', function ($scope, $rootScope, $http) {
    $rootScope.lan = lan;
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
        $http.patch('http://116.203.99.209:7000/airports/' + $id, $scope.editing).then(function (response) {

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

        $http.delete('http://116.203.99.209:7000/airports/' + airport._id, {}).then(function (response) {

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
        $http.post('http://116.203.99.209:7000/airports/create-airport', $scope.airport).then(function (response) {

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
        $http.get('http://116.203.99.209:7000/airports/get-all-airports', {}).then(function (response) {
            if (response.data.success) {
                $scope.airports = response.data.Data;

                initMapAirport('airport-map-container-google');
                initMapAirportUpdate('update-airport-map-container');

                // $.noConflict();
                jQuery(document).ready(function ($) {
                    $('#airport_listing_table').DataTable();
                });
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

app.controller('hospitalCtrl', function ($scope, $rootScope, $http) {
    $rootScope.lan = lan;

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
        $http.get('http://116.203.99.209:7000/hospitals/get-all-hospitals', {}).then(function (response) {
            if (response.data.success) {
                $scope.hospitals = response.data.Data;
                initMapHospital('hospital-map-container-google');
                initMapHospitalUpdate('hospital-map-container-google-u');
                // $.noConflict();
                jQuery(document).ready(function ($) {
                    $('#hospital_listing_table').DataTable();
                });
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
        $http.patch('http://116.203.99.209:7000/hospitals/' + $id, $scope.editing).then(function (response) {

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

        $http.delete('http://116.203.99.209:7000/hospitals/' + hospital._id, {}).then(function (response) {

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
        $http.post('http://116.203.99.209:7000/hospitals//create-hospital', $scope.hospital).then(function (response) {

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

app.controller('camerasCtrl', function ($scope, $rootScope, $http, fileUpload) {
    $rootScope.lan = lan;
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
        $http.patch('http://116.203.99.209:7000/livecamera/update-live-camera/' + $id, $scope.editing_camera).then(function (response) {

            if (response.data.success) {
                $scope.cameras[$scope.editing_camera_index] = angular.copy($scope.editing_camera);
                $scope.cameras[$scope.editing_camera_index]._id = $id;


                var file = $scope.myFile;
                if (file) {
                    Toast.fire({
                        icon: 'error',
                        title: 'Plz Select a image'
                    });
                    var uploadUrl = "http://116.203.99.209:7000/livecamera/upload-live-camera-image/" + response.data.Data._id;
                    fileUpload.uploadFileToUrl(file, uploadUrl);
                }


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
        $http.get('http://116.203.99.209:7000/livecamera/get-all-livecameras', {}).then(function (response) {
            if (response.data.success) {
                $scope.cameras = response.data.Data;
                $('.dropify').dropify();
                // $.noConflict();
                jQuery(document).ready(function ($) {
                    $('#camera_listing_table').DataTable();
                });
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

        $http.delete('http://116.203.99.209:7000/livecamera/delete-livecamera/' + camera._id, {}).then(function (response) {

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

        // http://116.203.99.209:7000/livecamera/upload-live-camera-image/:liveCameraId

        $scope.camera.longitude = "" + marker.position.lng();

        $scope.camera.latitude = "" + marker.position.lat();

        $scope.camera.TEL = $scope.camera.TEL.toString();

        var file = $scope.myFile;
        if (!file) {
            Toast.fire({
                icon: 'error',
                title: 'Plz Select a image'
            });
            return;
        }


        $('.dimmer').show();
        // var postData = $.param($scope.camera);
        console.log($scope.camera);
        $http.post('http://116.203.99.209:7000/livecamera/create-live-camera', $scope.camera).then(function (response) {

            if (response.data.success) {
                $scope.camera._id = response.data.Data._id;

                var uploadUrl = "http://116.203.99.209:7000/livecamera/upload-live-camera-image/" + response.data.Data._id;
                fileUpload.uploadFileToUrl(file, uploadUrl)

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