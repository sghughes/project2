// This code is not working at the moment. It is pasted in the items.handlebars file for now but want to remove it from there eventually.
function initMap() {
    // Position that map will be focued on, will need to change this to the zip the user inputs
    var myLatLng = { lat: 47.632530, lng: -122.153737 };

    // Styles a map.
    var map = new google.maps.Map(document.getElementById('map'), {
        center: myLatLng,
        zoom: 11,
        styles: [           
            // **********************Sin City theme**********************
            {
                "featureType": "all",
                "elementType": "labels",
                "stylers": [
                    {
                        "visibility": "on"
                    }
                ]
            },
            {
                "featureType": "all",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "saturation": 36
                    },
                    {
                        "color": "#000000"
                    },
                    {
                        "lightness": 40
                    }
                ]
            },
            {
                "featureType": "all",
                "elementType": "labels.text.stroke",
                "stylers": [
                    {
                        "visibility": "on"
                    },
                    {
                        "color": "#000000"
                    },
                    {
                        "lightness": 16
                    }
                ]
            },
            {
                "featureType": "all",
                "elementType": "labels.icon",
                "stylers": [
                    {
                        "visibility": "on"
                    }
                ]
            },
            {
                "featureType": "administrative",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#000000"
                    },
                    {
                        "lightness": 20
                    }
                ]
            },
            {
                "featureType": "administrative",
                "elementType": "geometry.stroke",
                "stylers": [
                    {
                        "color": "#000000"
                    },
                    {
                        "lightness": 17
                    },
                    {
                        "weight": 1.2
                    }
                ]
            },
            {
                "featureType": "administrative.locality",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#c4c4c4"
                    }
                ]
            },
            {
                "featureType": "administrative.neighborhood",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#707070"
                    }
                ]
            },
            {
                "featureType": "landscape",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#000000"
                    },
                    {
                        "lightness": 20
                    }
                ]
            },
            {
                "featureType": "poi",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#000000"
                    },
                    {
                        "lightness": 21
                    },
                    {
                        "visibility": "on"
                    }
                ]
            },
            {
                "featureType": "poi.business",
                "elementType": "geometry",
                "stylers": [
                    {
                        "visibility": "on"
                    }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#be2026"
                    },
                    {
                        "lightness": "0"
                    },
                    {
                        "visibility": "on"
                    }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "geometry.stroke",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "visibility": "on"
                    }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "labels.text.stroke",
                "stylers": [
                    {
                        "visibility": "on"
                    },
                    {
                        "hue": "#ff000a"
                    }
                ]
            },
            {
                "featureType": "road.arterial",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#000000"
                    },
                    {
                        "lightness": 18
                    }
                ]
            },
            {
                "featureType": "road.arterial",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#575757"
                    }
                ]
            },
            {
                "featureType": "road.arterial",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#ffffff"
                    }
                ]
            },
            {
                "featureType": "road.arterial",
                "elementType": "labels.text.stroke",
                "stylers": [
                    {
                        "color": "#2c2c2c"
                    }
                ]
            },
            {
                "featureType": "road.local",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#000000"
                    },
                    {
                        "lightness": 16
                    }
                ]
            },
            {
                "featureType": "road.local",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#999999"
                    }
                ]
            },
            {
                "featureType": "road.local",
                "elementType": "labels.text.stroke",
                "stylers": [
                    {
                        "saturation": "-52"
                    }
                ]
            },
            {
                "featureType": "transit",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#000000"
                    },
                    {
                        "lightness": 19
                    }
                ]
            },
            {
                "featureType": "water",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#000000"
                    },
                    {
                        "lightness": 17
                    }
                ]
            }, 
             // **********************Dark Theme**********************
            // { elementType: 'geometry', stylers: [{ color: '#242f3e' }] },
            // { elementType: 'labels.text.stroke', stylers: [{ color: '#242f3e' }] },
            // { elementType: 'labels.text.fill', stylers: [{ color: '#746855' }] },
            // {
            //     featureType: 'administrative.locality',
            //     elementType: 'labels.text.fill',
            //     stylers: [{ color: '#d59563' }]
            // },
            // {
            //     featureType: 'poi',
            //     elementType: 'labels.text.fill',
            //     stylers: [{ color: '#d59563' }]
            // },
            // {
            //     featureType: 'poi.park',
            //     elementType: 'geometry',
            //     stylers: [{ color: '#263c3f' }]
            // },
            // {
            //     featureType: 'poi.park',
            //     elementType: 'labels.text.fill',
            //     stylers: [{ color: '#6b9a76' }]
            // },
            // {
            //     featureType: 'road',
            //     elementType: 'geometry',
            //     stylers: [{ color: '#38414e' }]
            // },
            // {
            //     featureType: 'road',
            //     elementType: 'geometry.stroke',
            //     stylers: [{ color: '#212a37' }]
            // },
            // {
            //     featureType: 'road',
            //     elementType: 'labels.text.fill',
            //     stylers: [{ color: '#9ca5b3' }]
            // },
            // {
            //     featureType: 'road.highway',
            //     elementType: 'geometry',
            //     stylers: [{ color: '#746855' }]
            // },
            // {
            //     featureType: 'road.highway',
            //     elementType: 'geometry.stroke',
            //     stylers: [{ color: '#1f2835' }]
            // },
            // {
            //     featureType: 'road.highway',
            //     elementType: 'labels.text.fill',
            //     stylers: [{ color: '#f3d19c' }]
            // },
            // {
            //     featureType: 'transit',
            //     elementType: 'geometry',
            //     stylers: [{ color: '#2f3948' }]
            // },
            // {
            //     featureType: 'transit.station',
            //     elementType: 'labels.text.fill',
            //     stylers: [{ color: '#d59563' }]
            // },
            // {
            //     featureType: 'water',
            //     elementType: 'geometry',
            //     stylers: [{ color: '#17263c' }]
            // },
            // {
            //     featureType: 'water',
            //     elementType: 'labels.text.fill',
            //     stylers: [{ color: '#515c6d' }]
            // },
            // {
            //     featureType: 'water',
            //     elementType: 'labels.text.stroke',
            //     stylers: [{ color: '#17263c' }]
            // },
            // **********************Dark night vision theme**********************
            // {
            //     "featureType": "all",
            //     "elementType": "all",
            //     "stylers": [
            //         {
            //             "invert_lightness": true
            //         },
            //         {
            //             "saturation": "-9"
            //         },
            //         {
            //             "lightness": "0"
            //         },
            //         {
            //             "visibility": "simplified"
            //         }
            //     ]
            // },
            // {
            //     "featureType": "landscape.man_made",
            //     "elementType": "all",
            //     "stylers": [
            //         {
            //             "weight": "1.00"
            //         }
            //     ]
            // },
            // {
            //     "featureType": "road.highway",
            //     "elementType": "all",
            //     "stylers": [
            //         {
            //             "weight": "0.49"
            //         }
            //     ]
            // },
            // {
            //     "featureType": "road.highway",
            //     "elementType": "labels",
            //     "stylers": [
            //         {
            //             "visibility": "on"
            //         },
            //         {
            //             "weight": "0.01"
            //         },
            //         {
            //             "lightness": "-7"
            //         },
            //         {
            //             "saturation": "-35"
            //         }
            //     ]
            // },
            // {
            //     "featureType": "road.highway",
            //     "elementType": "labels.text",
            //     "stylers": [
            //         {
            //             "visibility": "on"
            //         }
            //     ]
            // },
            // {
            //     "featureType": "road.highway",
            //     "elementType": "labels.text.stroke",
            //     "stylers": [
            //         {
            //             "visibility": "on"
            //         }
            //     ]
            // },
            // {
            //     "featureType": "road.highway",
            //     "elementType": "labels.icon",
            //     "stylers": [
            //         {
            //             "visibility": "on"
            //         }
            //     ]
            // }
        ]
    });
    // Place marker on lat & lng as defined above
    var buyerLocation = new google.maps.Marker({
        position: myLatLng,
        map: map,
        title: "hello"
    });

    var sellersMap = {
        // location is Factoria
        seller1: {
            center: { lat: 47.5683, lng: -122.1693 },
        },
        // location is Kirkland
        seller2: {
            center: { lat: 47.6769, lng: -122.2060 }
        }
    };

    // Add the circle for this city to the map.
    for (var city in sellersMap) {
        var sellerCircles = new google.maps.Circle({
            strokeColor: '#010101',
            strokeOpacity: 0.4,
            strokeWeight: 1,
            fillColor: '#fcfcfc',
            fillOpacity: 0.35,
            map: map,
            center: sellersMap[city].center,
            radius: 2000
        });
    }
}

