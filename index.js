var world = require('/.event.js');

var prompt = require('prompt');
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('address.db');

function add_contact(firstName, lastName){
    db.run('insert into contacts(firstName, lastName) values(' + "'"+firstName + "', '"  + lastName  +"')");
}

function list_contact(){
     db.all('select * from contacts', function(err, contacts){
         contacts.forEach(function(contact){
             console.log(contact.firstName + " " + contact.lastName);
         })

    });
    trigger('contacts_listed');
};

//function add_address_to_contact(zip, city, address_line1, address_line2, contact_id){
//    db.run('insert into addresses(zip, city, address_line1, address_line2, contact_id) VALUES(' + "'"+zip + "', '"  + city + "', '" + address_line1  + "', '"+ address_line2+"', " +contact_id +")" );
//    //trigger('list-address-to-contact')();
//};

function add_address_to_contact(addressResult, contact_id){
    db.run('insert into addresses(zip, city, address_line1, address_line2, contact_id) VALUES(' + "'"+addressResult.zip + "', '"  + addressResult.city + "', '" + addressResult.address_line1  + "', '"+ addressResult.address_line2+"', " +contact_id +")",
    function(){
        trigger('list-address-to-contact');
    });

};

 function list_contact_addresses(id){
      db.all('select contacts.id and contacts.firstName from contacts where contacts.id = ' + id);
       db.each('select  contacts.firstName, contacts.lastName, addresses.zip, addresses.city from contacts, addresses where ' + 'contacts.id = ' + id +' and addresses.contact_id = contacts.id', function(err, contact){
         console.log(contact.firstName + " " + contact.lastName+ ": " + contact.zip + " " + contact.city);
         //trigger('list-contact-addresses')();
     })
 };

function add_phones_to_contact(contact_id, mobile_number, home_number, work_number){
    console.log('insert into phones(mobile_number, home_number, work_number, contact_id) VALUES(' + "'"+mobile_number + "', '"  + home_number + "', '" + work_number  + "', "+ id +")");
    db.run('insert into phones(mobile_number, home_number, work_number, contact_id) VALUES(' + "'"+mobile_number + "', '"  + home_number + "', '" + work_number  + "', "+ contact_id +")" );
};


   prompt.get(['command'], function (err, result) {
        if (result.command == 'contact') {
            prompt.get(['firstName', 'lastName'], function (err, names) {
                add_contact(names.firstName, names.lastName);
            });
        } else if (result.command == 'listC') {
           // on('list-contact', function(){
            list_contact();
           // })
        } else if (result.command == 'address') {
            list_contact();
           on('contacts_listed', function(){
            prompt.get(['zip', 'city', 'address_line1', 'address_line2', 'contact_id'], function (err, resultAddress) {
                add_address_to_contact(resultAddress, resultAddress.contact_id);
                //add_address_to_contact(resultAddress.zip, resultAddress.city, resultAddress.address_line1, resultAddress.address_line2, resultAddress.contact_id);
            });
               on('list-address-to-contact', list_contact);
           })
        } else if (result.command == 'listA') {
            // on('list-contact-addresses', function(){
            prompt.get(['id_contact'], function (err, idResult) {
                list_contact_addresses(idResult.id);
            });
            // });
        } else if (result.command == 'phone') {
            prompt.get(['id_contact', 'mobile_number', 'home_number', 'work_number'], function (err, numbers) {
                add_phones_to_contact(numbers.contact_id, numbers.mobile_number, numbers.home_number, numbers.work_number);
            })
        } else {
            console.log('Incorrect command');
        }
    });
