//////CONTACT FORM VALIDATION
jQuery(document).ready(function ($) {
	
	//if submit button is clicked
	$('#commentValidate').change(function () {	
		console.log("change trigger !!!");
		var recaptchaResponse = grecaptcha.getResponse(); // Get the ReCAPTCHA response token.
		var recaptchaSecret = '6LdVUbAoAAAAAMwkrIEjWZ6rBdPlgzi_rpDQgUeQ'; // Replace with your actual secret key.

		// Create a FormData object to send the data as a POST request.
		var formData = new FormData();
		formData.append('secret', recaptchaSecret);
		formData.append('response', recaptchaResponse);

			// Send a POST request to the ReCAPTCHA verification endpoint.
			fetch('https://www.google.com/recaptcha/api/siteverify', {
				method: 'POST',
				body: formData,
				headers: {
					'Origin' : 'https://katalog-milout.jan-pol.eu/'
				}
			})
			.then(response => response.json())
			.then(data => {
				if (data.success) {
					alert("ReCAPTCHA validation successful.");
					console.log("ReCAPTCHA validation successful.");
					// You can submit the form or trigger any other action here.
					getElementById(submit).removeAttribute("disabled");
						$('#submit').click(function () {		
							
							//Get the data from all the fields
							var name = $('input[name=name]'); 
							var email = $('input[name=email]');
							var regx = /^([a-z0-9_\-\.])+\@([a-z0-9_\-\.])+\.([a-z]{2,4})$/i;
							var comment = $('textarea[name=comment]');
							var returnError = false;
							
							//Simple validation to make sure user entered something
							//Add your own error checking here with JS, but also do some error checking with PHP.
							//If error found, add hightlight class to the text field
							if (name.val()=='') {
								name.addClass('error');
								returnError = true;
							} else name.removeClass('error');
							
							if (email.val()=='') {
								email.addClass('error');
								returnError = true;
							} else email.removeClass('error');		
							
							if(!regx.test(email.val())){
							  email.addClass('error');
							  returnError = true;
							} else email.removeClass('error');
							
							
							if (comment.val()=='') {
								comment.addClass('error');
								returnError = true;
							} else comment.removeClass('error');
							
							// Highlight all error fields, then quit.
							if(returnError == true){
								return false;	
							}
							
							//organize the data
							
							var data = 'name=' + name.val() + '&email=' + email.val() + '&comment='  + encodeURIComponent(comment.val());

							//disabled all the text fields
							$('.text').attr('disabled','true');
							
							//show the loading sign
							$('.loading').show();
							
							//start the ajax
							$.ajax({
								//this is the php file that processes the data and sends email
								url: "contact.php",	
								
								//GET method is used
								type: "GET",

								//pass the data			
								data: data,		
								
								//Do not cache the page
								cache: false,
								
								//success
								success: function (html) {				
									//if contact.php returned 1/true (send mail success)
									if (html==1) {
									
										//show the success message
										$('.done').fadeIn('slow');
										
										$(".form").find('input[type=text], textarea').val("");
										
									//if contact.php returned 0/false (send mail failed)
									} else alert('Sorry, unexpected error. Please try again later.');				
								}		
							});
							
							//cancel the submit button default behaviours
							return false;
						});	
					} 
					else {
					// ReCAPTCHA validation failed; handle it accordingly (e.g., show an error message).
					alert("ReCAPTCHA validation failed."); 
					}
				}
			)
			}	)	
	
			//.catch(error => {
			//	// Handle errors, such as network issues or request failure.
			//	alert("An error occurred: " + error);
		
		
			document.getElementById('btnRevealAddress').addEventListener('click', function() {
				console.log("click");

					console.log("click2");
					$.ajax({
						type: 'GET',
						url: 'mail_address.php',
						success: function(data) {
							$('#hidden_mail').html(data);
						},
						error: function() {
							alert('Wystąpił błąd podczas wykonywania żądania.');
						}
					});

			});	
});				