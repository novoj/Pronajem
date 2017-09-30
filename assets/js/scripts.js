/*
    Slider
*/
$(window).load(function() {
    $('.flexslider').flexslider({
        animation: "slide",
        slideshowSpeed: 5000,
        controlNav: false
    });
});


/*
    Filterable portfolio
*/
jQuery(document).ready(function() {
    $clientsHolder = $('ul.portfolio-img');
    $clientsClone = $clientsHolder.clone(); 
 
    $('.filter-portfolio a').click(function(e) {
        e.preventDefault();
        $filterClass = $(this).attr('class');
 
        $('.filter-portfolio a').attr('id', '');
        $(this).attr('id', 'active-imgs');
 
        if($filterClass == 'all'){
            $filters = $clientsClone.find('li');
        }
        else {
            $filters = $clientsClone.find('li[data-type~='+ $filterClass +']');
        }
 
        $clientsHolder.quicksand($filters, {duration: 700}, function() {
            $("a[rel^='prettyPhoto']").prettyPhoto({social_tools: false});
        });
    });
});


/*
    Pretty Photo
*/
jQuery(document).ready(function() {
    $("a[rel^='prettyPhoto']").prettyPhoto({social_tools: false});
});


/*
    Show latest tweets
*/
jQuery(function($) {
    $(".show-tweets").tweet({
        username: "stavarov",
        page: 1,
        count: 10,
        loading_text: "nahrávám ..."
    }).bind("loaded", function() {
        var ul = $(this).find(".tweet_list");
        var ticker = function() {
            setTimeout(function() {
                ul.find('li:first').animate( {marginTop: '-4em'}, 500, function() {
                    $(this).detach().appendTo(ul).removeAttr('style');
                });
                ticker();
            }, 5000);
        };
        ticker();
    });
});


/*
    Flickr feed
*/
$(document).ready(function() {
    $('.flickr-feed').jflickrfeed({
        limit: 80,
        qstrings: {
            id: '134237050@N03'
        },
        itemTemplate: '<li><a href="{{link}}" target="_blank"><img src="{{image_s}}" alt="{{title}}" /></a></li>'
    });

    $('.flickr-feed-big').jflickrfeed({
        limit: 80,
        qstrings: {
            id: '134237050@N03'
        },
        itemTemplate: '<a href="{{image_b}}" target="_blank" rel="prettyPhoto[pp_gal]"><img src="{{image_m}}" alt="{{title}}" /></a>',
        itemCallback: function() {
            $(".flickr-feed-big a[rel^='prettyPhoto']").prettyPhoto({social_tools: false});
        }
    });
});


/*
    Google maps
*/
jQuery(document).ready(function() {
    var position = new google.maps.LatLng(50.047653,15.771505);
    var iconBase = 'https://maps.google.com/mapfiles/kml/shapes/';
    var homeImage = {
        url: iconBase + 'ranger_station.png',        
        size: new google.maps.Size(24, 24),        
        scaledSize: new google.maps.Size(24, 24),                
        anchor: new google.maps.Point(12, 12)
    };
    var busImage = {
        url: iconBase + 'bus.png',        
        size: new google.maps.Size(24, 24),        
        scaledSize: new google.maps.Size(24, 24),                
        anchor: new google.maps.Point(12, 12)
    };
    var barsImage = {
        url: iconBase + 'bars.png',        
        size: new google.maps.Size(24, 24),        
        scaledSize: new google.maps.Size(24, 24),                
        anchor: new google.maps.Point(12, 12)
    };
    var universityImage = {
        url: iconBase + 'info_circle.png',        
        size: new google.maps.Size(24, 24),        
        scaledSize: new google.maps.Size(24, 24),                
        anchor: new google.maps.Point(12, 12)
    };
    var groceryImage = {
        url: iconBase + 'grocery.png',        
        size: new google.maps.Size(24, 24),        
        scaledSize: new google.maps.Size(24, 24),                
        anchor: new google.maps.Point(12, 12)
    };
    var poolImage = {
        url: iconBase + 'swimming.png',        
        size: new google.maps.Size(24, 24),        
        scaledSize: new google.maps.Size(24, 24),                
        anchor: new google.maps.Point(12, 12)
    };
    var bikeImage = {
        url: iconBase + 'cycling.png',        
        size: new google.maps.Size(24, 24),        
        scaledSize: new google.maps.Size(24, 24),                
        anchor: new google.maps.Point(12, 12)
    };

    $('.map').gmap({'center': position,'zoom': 15, 'disableDefaultUI':false, 'callback': function() {
            var self = this;
            self.addMarker({'position': new google.maps.LatLng(50.045961,15.767429), title: "Pronajímaný byt", icon: homeImage });	
            self.addMarker({'position': new google.maps.LatLng(50.045151,15.766624), title: "Zastávka MHD", icon: busImage});   
            self.addMarker({'position': new google.maps.LatLng(50.049553,15.765766), title: "Zastávka meziměstské dopravy", icon: busImage});   
            self.addMarker({'position': new google.maps.LatLng(50.047032,15.767868), title: "Titan - restaurace a masáže", icon: barsImage});   
            self.addMarker({'position': new google.maps.LatLng(50.0489,15.771398), title: "Hospoda u Josefa", icon: barsImage});               
            self.addMarker({'position': new google.maps.LatLng(50.049271,15.766731), title: "Univerzita Pardubice", icon: universityImage});   
            self.addMarker({'position': new google.maps.LatLng(50.047535,15.765154), title: "Lídl", icon: groceryImage});   
            self.addMarker({'position': new google.maps.LatLng(50.049829,15.763491), title: "Malá sámoška", icon: groceryImage});   
            self.addMarker({'position': new google.maps.LatLng(50.047039,15.778329), title: "Koupaliště", icon: poolImage});   
            self.addMarker({'position': new google.maps.LatLng(50.044249,15.771441), title: "Rekreační zóna", icon: bikeImage});   
        }
    }); 
});


/*
    Contact form
*/
jQuery(document).ready(function() {
    $('.contact-form form').submit(function() {

        $('.contact-form form .nameLabel').html('Name');
        $('.contact-form form .emailLabel').html('Email');
        $('.contact-form form .messageLabel').html('Message');

        var postdata = $('.contact-form form').serialize();
        $.ajax({
            type: 'POST',
            url: 'assets/sendmail.php',
            data: postdata,
            dataType: 'json',
            success: function(json) {
                if(json.nameMessage != '') {
                    $('.contact-form form .nameLabel').append(' - <span class="violet" style="font-size: 13px; font-style: italic"> ' + json.nameMessage + '</span>');
                }
                if(json.emailMessage != '') {
                    $('.contact-form form .emailLabel').append(' - <span class="violet" style="font-size: 13px; font-style: italic"> ' + json.emailMessage + '</span>');
                }
                if(json.messageMessage != '') {
                    $('.contact-form form .messageLabel').append(' - <span class="violet" style="font-size: 13px; font-style: italic"> ' + json.messageMessage + '</span>');
                }
                if(json.nameMessage == '' && json.emailMessage == '' && json.messageMessage == '') {
                    $('.contact-form form').fadeOut('fast', function() {
                        $('.contact-form').append('<p><span class="violet">Díky za zprávu!</span> Hned jak to bude možné Vás kontaktuji zpět.</p>');
                    });
                }
            }
        });
        return false;
    });
});

