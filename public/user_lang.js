fetch('https://api.ipregistry.co/?key=tryout')
    .then(function (response) {
        return response.json();
    })
    .then(function (payload) {
        if (payload.location.country.code = 'EE') {
            
        } else {

        }
});