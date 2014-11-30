$(document).ready(function(){
	$('#add-address').click(function(){
		$("#new-addresses").append('<div class= "has-success new-address">' + '<p>Another address</p>'+'<div class = "form-group">' +
		'<label class="control-label" for = "new_street">*Street</label>' + '<input type="text" class="form-control" id="new_street">' +
			'</div>' + '<div class="form-group">' +  '<label class="control-label" for="new_city">*City</label>' +
			'<input type="text" class="form-control" id ="new_city">' + '</div>' + '<div class="form-group">' +
			'<label class="control-label" for="new_state">*State</label>' + '<input type="text" class="form-control" id="new_state">' +
			'</div>' +'</div>');
	});
	$('#add-phone-number').click(function(){
		$("#new-phone-numbers").append('<div class="has-success new-phones">' + '<p>*Another phone number</p>' + '<div class="form-group">'+
		'<label class="control-label" for="new_phone">*Phone number</label>' + '<input type="text" class="form-control" id="new_phone">' + '</div>' +'</div>');
	});
	$('#add-email').click(function(){
		$("#new-emails").append('<div class="has-success new-mail">' + '<p>Another email</p>' + '<div class="form-group">'+
		'<label class="control-label" for="new_email">*Email</label>' + '<input type="text" class="form-control" id="new_email">' + '</div>' +'</div>');
	});

	$('form#new-contact').submit(function(event){
		event.preventDefault();

		var inputFirstName = $("input#new-first-name").val();
		var inputLastName = $('input#new-last-name').val();

		var newContact = {
			firstName: inputFirstName,
			lastName: inputLastName,
			addresses: [],
			phones: [],
			emails: [],
			fullName: function(){
				return this.firstName + ' ' + this.lastName;
			}
		};

		$('.new-address').each(function(){
			var inputtedStreet = $(this).find('input#new_street').val();
			var inputtedCity = $(this).find("input#new_city").val();
			var inputtedState = $(this).find("input#new_state").val();

			var newAddress = {
				street: inputtedStreet,
				city: inputtedCity,
				state: inputtedState,
				fullAddress: function(){
					return this.street + this.city + this.state;
				}
			};
			newContact.addresses.push(newAddress);
		});

		$('.new-phones').each(function(){
			var inputtedPhone = $(this).find('input#new_phone').val();
			var newPhones = {phone: inputtedPhone};
			newContact.phones.push(newPhones);
		});

		$('.new-mail').each(function(){
			var inputtedEmail = $(this).find('input#new_email').val();
			var newEmails = {mail: inputtedEmail};
			newContact.emails.push(newEmails);
		});

		$("ul#contacts").append("<li><span class='contact'>"+ newContact.fullName()  + "</span></li>");

		$('.contact').last().click(function(){
			$('#show-contact').show();
			$("#show-contact h2").text(newContact.firstName + " " + newContact.lastName);
			$('.first-name').text(newContact.firstName);
			$('.last-name').text(newContact.lastName);
			$('ul#addresses').text('');
			$('ul#phones_num').text('');
			$('ul#emails').text('');

			newContact.addresses.forEach(function(address){
				$("ul#addresses").append("<li>" + address.fullAddress() + "</li>");
			});
			newContact.phones.forEach(function(phone){
				$("ul#phones_num").append("<li>" + phone.phone +"</li>");
			});
			newContact.emails.forEach(function(mail){
				$("ul#emails").append("<li>" + mail.mail +"</li>");
			});
		});

		$('input#new-first-name').val("");
		$('input#new-last-name').val("");
		$("input#new_street").val("");
		$("input#new_city").val("");
		$("input#new_state").val("");
		$("input#new_phone").val("");
		$("input#new_email").val("");
		$("#new-addresses").empty();
		$("#new-addresses").append('<div class="new-address">' + '<div class="form-group">' + '<label for="new_street">Street</label>' +
		'<input type="text" class="form-control" id="new_street">' + '</div>' + '<div class="form-group">' + '<label for="new_city">City</label>' +
		'<input type="text" class="form-control" id="new_city">' +	'</div>' + '<div class="form-group">' + '<label for="new_state">State</label>' +
		'<input type="text" class="form-control" id = "new_state">' + '</div>' +	'</div>');
		$('#new-phone-numbers').empty();
		$('#new-phone-numbers').append(' <div class="new-phones">' + '<div class="form-group">' + '<label for="new_phone">Phone number</label>' +
		'<input type="text" class="form-control" id = "new_phone">' + '</div>' + '</div>');
		$('#new-emails').empty();
		$('#new-emails').append('<div class="new-mail">' + '<div class="form-group">' + '<label for="new_email">Email</label>' +
		'<input type="text" class="form-control" id ="new_email">' + '</div>' + '</div>');
	});
});


