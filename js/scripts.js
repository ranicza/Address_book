var Contact = {
	firstName: '',
	lastName: '',
	addresses: [],
	phones: [],
	emails: [],
	fullName: function(){
		return this.firstName + ' ' + this.lastName;
	},
	valid: function(){
		if(this.firstName.length == 0 || this.firstName == undefined || this.lastName.length == 0 || this.lastName == undefined){
			alert("Enter your contact correctly!");
			return false;
		}else return true;
	}
};

var Address = {
	street: '',
	city: '',
	state: '',
	fullAddress: function(){
		return this.street + this.city + this.state;
	},
	valid: function(){
		if(this.street.length == 0 || this.city.length == 0 || this.state.length ==0 || this.street == undefined ||
			this.city == undefined || this.state == undefined){
			alert("Enter your address correctly!");
			return false;
		}else{
			return true;
		}
	}
};

var Phone = {
	phone: '',
	workPhone: '',
	cellPhone: '',
	phoneFormat: function() {
		var number = this.valid();
		return "(+" + number.slice(0, 3) + " " + number.slice(3, 5) + " " + number.slice(5,8) + "-"+
			number.slice(8, 10) + "-" + number.slice(10, 12) + ")";
	},
	valid: function() {
		var number = this.phone.replace(/[^\d]/g,'');
		if (number.length == 12) {
			return number;
		} else {
			alert("Enter your phone number correctly!");
			return false;
		}
	}
};

var Email = {
	mail: '',
	workMail: '',
	cellMail: '',
	valid: function(){
		//var reg = /\S+@\S+\.\S+/;
		var reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
		if(reg.test(this.mail)){
			return reg.test(this.mail);
		}else{
			alert("Enter your email correctly!");
		}
	}
};


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

		var newContact = Object.create(Contact);
		newContact.firstName = inputFirstName;
		newContact.lastName = inputLastName;


		$('.new-address').each(function(){
			var inputtedStreet = $(this).find('input#new_street').val();
			var inputtedCity = $(this).find("input#new_city").val();
			var inputtedState = $(this).find("input#new_state").val();

			var newAddress = Object.create(Address);
			newAddress.city = inputtedCity;
			newAddress.street = inputtedStreet;
			newAddress.state = inputtedState;
			newContact.addresses.push(newAddress);
		});

		$('.new-phones').each(function(){
			var inputtedPhone = $(this).find('input#new_phone').val();

			var newPhone = Object.create(Phone);
			newPhone.phone = inputtedPhone;
			newContact.phones.push(newPhone);
		});

		$('.new-mail').each(function(){
			var inputtedEmail = $(this).find('input#new_email').val();
			var newEmail = Object.create(Email);
			newEmail.mail = inputtedEmail;
			newContact.emails.push(newEmail);
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


