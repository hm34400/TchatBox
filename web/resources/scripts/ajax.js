/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

$(document).ready(function () {
    updateUsers();
//        timer();

});


// ------ FONCTION AFK ------

function afk() {
    $.ajax({
        async: true,
        type: 'POST',
        //appelle la methode du controller afk
        url: "./afk",
        success: function () {
            //change le style de la page en tant que Afk
            $("#wrapper").attr('class', 'away afkBack');
            $("#afk").attr('class', 'afkAlert2');
        }

    });
}

// Declenche la fonction afk au bout de 5 secondes
var activityTimeout = setTimeout(afk, 10000);

function resetActive() {
    //appelle la fonction noafk 
    noAfk();
    //reinitialise le timeout
    clearTimeout(activityTimeout);
    //redemarre un timeout et active la fonction afk au bout de 5 secondes
    activityTimeout = setTimeout(afk, 10000);
}

function noAfk() {

    $.ajax({
        async: true,
        type: 'POST',
        //appelle la methode du controller noafk
        url: "./noafk",
        success: function () {
            //change le style de la page en tant que noAfk
            $("#wrapper").attr('class', 'noAway');
            $("#afk").attr('class', 'afkAlert');
        }

    });

}

// Si un click sur le body, appelle la fonction resetactive
$("body").click(function ()
{
    resetActive();
});



// ------- FONCTION TYPING

function typing() {

    $.ajax({
        async: true,
        type: 'POST',
        datatype: 'text',
        url: "./typing",
        success: function (data, textStatus, jqXHR) {
        }

    });
}
function noTyping() {

    $.ajax({
        async: true,
        type: 'POST',
        url: "./notyping",
        success: function (data, textStatus, jqXHR) {
        }

    });
}


$("#msg").keypress(function () {
    typing();
    $("#typing").text(this.utilisateur + " est en train d'écrire");

});
function debounce(fn, duration) {
    var timer;
    return function () {
        clearTimeout(timer);
        timer = setTimeout(fn, duration);
    };
}

$(function () {
    noTyping();
    $('#msg').on('keyup', debounce(function () {

        $("#typing").text("User is not typing");
    }, 20000));

});



$("form").submit(function (e) {
    e.preventDefault();
    $.ajax({
        async: true,
        type: 'POST',
        dataType: 'text',
        data: {
            "msg": $("#msg").val()
        },
        url: "./message/add",
        success: function (data, textStatus, jqXHR) {
            $("#msg").val("");
            updateMessages();
        }

    });
});


function updateUsers() {
    $.ajax({
        async: true,
        type: 'GET',
        dataType: 'text',
        url: "./users",
        success: function (data, textStatus, jqXHR) {
            $("#users").empty();
            $("#usersAfk").empty();
            var liste = $.parseJSON(data);
            $(liste).each(function (e) {
                if (this.afk == 1) {
                    $("#users").append("<p> AFK - " + "@" + this.email + "</p>");
                } else {
                    $("#users").append("<p>" + "@" + this.email + "</p>");

                }
            });
            setTimeout(function () {
                updateMessages();
            }, 1000);
        }

    });
}

function updateMessages() {
    $.ajax({
        async: true,
        type: 'GET',
        dataType: 'text',
        url: "./messages",
        success: function (data, textStatus, jqXHR) {
            $("#messages").empty();
            var liste = $.parseJSON(data);
            $(liste).each(function (e) {
                $("#messages").append("<p>" + this.heure.date + "</p><p>@" + this.utilisateur + " : " + this.message + "</p><br/>");

            });

            $("#messages").animate({scrollTop: $('#messages').height() + 10000}, 1000);
            setTimeout(function () {
                updateUsers();
            }, 1000);
        }
    });
}