jQuery(document).ready(function ($) {
  "use strict";

  //Contact
  $('form.registrationForm').submit(function () {
    var f = $(this).find('.form-group'),
      ferror = false,
      emailExp = /^[^\s()<>@,;:\/]+@\w[\w\.-]+\.[a-z]{2,}$/i;

    f.children('input').each(function () { // run all inputs

      var i = $(this); // current input
      var rule = i.attr('data-rule');

      if (rule !== undefined) {
        var ierror = false; // error flag for current input
        var pos = rule.indexOf(':', 0);
        if (pos >= 0) {
          var exp = rule.substr(pos + 1, rule.length);
          rule = rule.substr(0, pos);
        } else {
          rule = rule.substr(pos + 1, rule.length);
        }

        switch (rule) {
          case 'required':
            if (i.val() === '') {
              ferror = ierror = true;
            }
            break;

          case 'minlen':
            if (i.val().length < parseInt(exp)) {
              ferror = ierror = true;
            }
            break;

          case 'email':
            if (!emailExp.test(i.val())) {
              ferror = ierror = true;
            }
            break;

          case 'checked':
            if (!i.attr('checked')) {
              ferror = ierror = true;
            }
            break;

          case 'regexp':
            exp = new RegExp(exp);
            if (!exp.test(i.val())) {
              ferror = ierror = true;
            }
            break;
        }
        i.next('.validation').html((ierror ? (i.attr('data-msg') !== undefined ? i.attr('data-msg') : 'wrong Input') : '')).show('blind');
      }
    });
    f.children('textarea').each(function () { // run all inputs

      var i = $(this); // current input
      var rule = i.attr('data-rule');

      if (rule !== undefined) {
        var ierror = false; // error flag for current input
        var pos = rule.indexOf(':', 0);
        if (pos >= 0) {
          var exp = rule.substr(pos + 1, rule.length);
          rule = rule.substr(0, pos);
        } else {
          rule = rule.substr(pos + 1, rule.length);
        }

        switch (rule) {
          case 'required':
            if (i.val() === '') {
              ferror = ierror = true;
            }
            break;

          case 'minlen':
            if (i.val().length < parseInt(exp)) {
              ferror = ierror = true;
            }
            break;
        }
        i.next('.validation').html((ierror ? (i.attr('data-msg') != undefined ? i.attr('data-msg') : 'wrong Input') : '')).show('blind');
      }
    });

    if (ferror) return false;

    // Prepare data for Google Form submission

    var formData = $(this).serialize();
    // console.log(formData)
    var googleFormURL = "https://docs.google.com/forms/d/e/1FAIpQLSe8bOXNhBW9OK48RnnW7qXzfyw1XWgCbbZWohZQgTas4ybdlA/formResponse"; // Updated to formResponse endpoint
    const container = document.getElementById("registerContainer");
    const iframe = document.createElement("iframe");
    iframe.src = googleFormURL + "?" + formData + "&submit=Submit";
    iframe.name = "register-iframe";
    iframe.id = "register-iframe";
    iframe.style = "display:none;";
    container.innerHTML = "";
    container.appendChild(iframe);

    var response = document.getElementById('register-iframe');
    if (response) {
      $("#sendregistration").addClass("show");
      $("#errorregistration").removeClass("show");
      $('.registrationForm').remove()
    } else {
      $("#sendregistration").removeClass("show");
      $("#errorregistration").addClass("show");
      $('#errorregistration').html("There was an error submitting the form. Please try again.");
    }

    // Prevent default form submission (already prevented by returning false later)
    return false;
  });

});