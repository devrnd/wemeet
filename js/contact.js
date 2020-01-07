$(document).ready(function(){
    
    (function($) {
        "use strict";

    
    jQuery.validator.addMethod('answercheck', function (value, element) {
        return this.optional(element) || /^\bcat\b$/.test(value)
    }, "type the correct answer -_-");

    // validate contactForm form
    $(function() {
        $('#contactForm').validate({
            rules: {
                name: {
                    required: true,
                    minlength: 2
                },
                subject: {
                    required: true,
                    minlength: 4
                },
                number: {
                    required: true,
                    minlength: 5
                },
                email: {
                    required: true,
                    email: true
                },
                message: {
                    required: true,
                    minlength: 20
                }
            },
            messages: {
                name: {
                    required: "Komm schon, du hast einen Namen, nicht wahr?",
                    minlength: "Ihr Name muss aus mindestens 2 Zeichen bestehen"
                },
                subject: {
                    required: "Komm schon, du hast ein Thema, nicht wahr?",
                    minlength: "Ihr Betreff muss aus mindestens 4 Zeichen bestehen"
                },
                number: {
                    required: "Komm schon, du hast eine Nummer, nicht wahr?",
                    minlength: "Ihre Nummer muss aus mindestens 5 Zeichen bestehen"
                },
                email: {
                    required: "Keine E-Mail, keine Nachricht"
                },
                message: {
                    required: "ähm ... ja, Sie müssen etwas schreiben, um dieses Formular zu senden.",
                    minlength: "das ist alles? Ja wirklich?"
                }
            },
            submitHandler: function(form) {
                $(form).ajaxSubmit({
                    type:"POST",
                    data: $(form).serialize(),
                    url:"contact_process.php",
                    success: function() {
                        $('#contactForm :input').attr('disabled', 'disabled');
                        $('#contactForm').fadeTo( "slow", 1, function() {
                            $(this).find(':input').attr('disabled', 'disabled');
                            $(this).find('label').css('cursor','default');
                            $('#success').fadeIn()
                            $('.modal').modal('hide');
		                	$('#success').modal('show');
                        })
                    },
                    error: function() {
                        $('#contactForm').fadeTo( "slow", 1, function() {
                            $('#error').fadeIn()
                            $('.modal').modal('hide');
		                	$('#error').modal('show');
                        })
                    }
                })
            }
        })
    })
        
 })(jQuery)
})
