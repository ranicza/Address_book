var world = require('./event.js');
var prompt = require('prompt');
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('address.db');

function list_contact(){
    db.all('select * from contacts', function(err, contacts){
        contacts.forEach(function(contact){
            console.log(contact.id + ': ' + contact.firstName + ' ' + contact.lastName);
        });
        world.trigger('contacts_listed');
    });
}

function add_contact(firstName, lastName){
    db.run('insert into contacts(firstName, lastName) values("'
        + firstName + '", "' + lastName + '")',function(err, contacts){
            world.trigger('contact_added');
        })
}

function add_address_to_contact(addressResult, contact_id){
    db.run('insert into addresses(zip, city, address_line1, address_line2, contact_id) VALUES(' + "'"+addressResult.zip + "', '"+
        addressResult.city + "', '" + addressResult.address_line1  + "', '"+ addressResult.address_line2+"', " +contact_id +")",
    function(err, contacts){
        world.trigger('address_added');
    });
};

function list_addresses(){
     db.all('select contacts.firstName, contacts.lastName, addresses.zip, addresses.city, addresses.address_line1,' +
     'addresses.address_line2  from addresses, contacts where addresses.contact_id = contacts.id', function(err, addresses){
         addresses.forEach(function(address){
             console.log(address.firstName + ' ' + address.lastName + ' : '+ address.zip + ' ' +
             address.city + ' ' + address.address_line1 + ' '+ address.address_line2);
         });
         world.trigger('addresses_listed');
         });
};

//function add_phones_to_contact(contact_id, mobile_number, home_number, work_number){
//    console.log('insert into phones(mobile_number, home_number, work_number, contact_id) VALUES(' + "'"+mobile_number + "', '"  + home_number + "', '" + work_number  + "', "+ id +")");
//    db.run('insert into phones(mobile_number, home_number, work_number, contact_id) VALUES(' + "'"+mobile_number + "', '"  + home_number + "', '" + work_number  + "', "+ contact_id +")" );
//};


function showMenu() {
    prompt.get(['command'], function (err, result) {
        if (result.command == 'list'){
               list_contact();
        }else if (result.command == 'add contact'){
            prompt.get(['firstName', 'lastName'], function (err, result){
                add_contact(result.firstName, result.lastName);
                world.on('contact_added', list_contact);
            });
        }else if (result.command == 'add address'){
           // world.end('contact_added');
            world.end('contacts_listed');
            list_contact();
            world.on('contacts_listed', function(){
                prompt.get(['contact_id' ,'zip', 'city', 'address_line1', 'address_line2'], function(err, result){
                    add_address_to_contact(result, result.contact_id);
                    world.end('contacts_listed');
                    world.on('address_added', list_addresses);
                });
            });
        }else if (result.command == 'list addresses'){
            world.end('address_added');
            list_addresses();
        }else if (result.command == 'exit'){
            console.loq('Bye!');
        }else{
            console.log('Incorrect command')
        }

        //} else if (result.command == 'phone') {
        //    prompt.get(['id_contact', 'mobile_number', 'home_number', 'work_number'], function (err, numbers) {
        //        add_phones_to_contact(numbers.contact_id, numbers.mobile_number, numbers.home_number, numbers.work_number);
        //    })
     });
}
showMenu();

world.on('contacts_listed', showMenu);
world.on('contact_added', showMenu);
world.on('address_added', showMenu);
world.on('addresses_listed', showMenu);
