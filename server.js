var http = require('http');
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('address.db');

http.createServer(function (request, response) {
    response.writeHead(200, {'Content-Type': 'text/html'});
    if (request.url == '/list'){
        response.write('<h3>Contacts:</h3>')
        db.all('select * from contacts',function(err, contacts){
            contacts.forEach(function(contact){
                response.write('<p>' + contact.id + ': ' + contact.firstName + ' ' + contact.lastName + '</p>');
            });

            response.end();
        })
    } else if(request.url == '/list_addresses') {
        response.write('<h3>Addresses:</h3>');
        db.all('select contacts.firstName, contacts.lastName, addresses.zip, addresses.city, addresses.address_line1,' +
        'addresses.address_line2  from addresses, contacts where addresses.contact_id = contacts.id', function (err, addresses) {
            addresses.forEach(function (address) {
                response.write("<p>"+ address.firstName + ' ' + address.lastName + ' : ' + address.zip + ' ' +
                address.city + ' ' + address.address_line1 + ' ' + address.address_line2 + "</p>");
            });
            response.end();
        });
    }
}).listen(1337, '127.0.0.1');

// http://localhost:1337/
