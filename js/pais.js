$("#code-country").intlTelInput({
      autoHideDialCode: false,
      nationalMode: false,
      separateDialCode: true,
      preferredCountries: ['PE','CL', 'MX'],
      initialCountry: "auto",
      geoIpLookup: function(callback) {
        $.get('http://ipinfo.io', function() {}, "jsonp").always(function(resp) {
          var countryCode = (resp && resp.country) ? resp.country : "";
          callback(countryCode);
        });
      },
      
    });