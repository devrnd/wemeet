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
                    required: "Bitte geben Sie Ihren Namen an",
                    minlength: "Ihr Name muss aus mindestens 2 Zeichen bestehen"
                },
                subject: {
                    required: "Bitte geben Sie einen Betreff ein",
                    minlength: "Ihr Betreff muss aus mindestens 4 Zeichen bestehen"
                },
                number: {
                    required: "Komm schon, du hast eine Nummer, nicht wahr?",
                    minlength: "Ihre Nummer muss aus mindestens 5 Zeichen bestehen"
                },
                email: {
                    required: "Bitte geben Sie die E-Mail Adresse ein",
                    email: "Bitte geben Sie eine gültige E-Mail-Adresse ein"
                },
                message: {
                    required: "Geben Sie Ihre Nachricht ein",
                    minlength: "Ihre Eingabe ist zu kurz"
                }
            },
            submitHandler: function(form) {
                grecaptcha.ready(function () {
                    grecaptcha.execute('6Lc1I80UAAAAAPqlUIiP8XOaqkSwTHugAke_uDGW', { action: 'send_email' }).then(function (token) {
                        // add token to form
                        let form = $('form')
                        form.prepend('<input type="hidden" name="g-recaptcha-response" value="' + token + '">');
                        form.ajaxSubmit({
                            type:"POST",
                            data: form.serialize(),
                            url:"contact_process.php",
                            success: function() {
                                // $('#contactForm :input').attr('disabled', 'disabled');
                                $('#contactForm').fadeTo( "slow", 1, function() {
                                    // $(this).find(':input').attr('disabled', 'disabled');
                                    // $(this).find('label').css('cursor','default');
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
                    });
                });
                
            }
        })
    })
        
 })(jQuery)
})
