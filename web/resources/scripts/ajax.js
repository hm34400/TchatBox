/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

$(document).ready(function () {
    updateUsers();
//        timer();

});


//$("body").click(function(){
//    $(this).data(1);
//});
//    setTimeout(function(){
//            afk();
//        },5000);
//
//function timer(){
//if($("body").data(0)) {
//
//    setTimeout();
////    alert('yes');
//}};
//

function afk() {
//  alert("VOUS ETES AFK");

    $.ajax({
        async: true,
        type: 'POST',
        url: "./afk",
        success: function (data, textStatus, jqXHR) {
            $("#wrapper").attr('class', 'away afkBack');
            $("#afk").attr('class', 'afkAlert2');
        }

    });
}

// If theres no activity for 5 seconds do something
var activityTimeout = setTimeout(afk, 5000);

function resetActive() {
//        $(document.body).attr('class', 'active');
    noAfk();
    clearTimeout(activityTimeout);
    activityTimeout = setTimeout(afk, 5000);
}

function noAfk() {

    $.ajax({
        async: true,
        type: 'POST',
        url: "./noafk",
        success: function (data, textStatus, jqXHR) {
            $("#wrapper").attr('class', 'noAway');
            $("#afk").attr('class', 'afkAlert');
        }

    });

}

// Check for mousemove, could add other events here such as checking for key presses ect.
$("body").click(function ()
{
    resetActive();
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
            var liste = $.parseJSON(data);
            $(liste).each(function (e) {
                $("#users").append("<p>" + this.afk + "@" + this.email + "</p>");
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