function sendMessage(){
    alert("Mensaje")
}
function sendMessage1() {
    alert("corre")
}

function get_all_users(){
    console.log("voy a traer todos los usuarios");

    $.getJSON("/users",function(data){
     var i =0;
    $.each(data,function(){
        user_to = data[i]['id'];
        e ='<div class="alert" role="alert">';
        e = e+"<button type='button' class='btn btn-primary'>" + data[i]['username']+"</button>";
        e = e+"</div>";
        i = i+ 1;
        $("<div/>",{html:e}).appendTo("#users");
        });
    });
};
function get_messages() {
    console.log("enviare mensajes");
    $.getJSON("users/",function (data) {
       var p= 0;
    $.each(data,function () {
        messages = data[p]['id'];
        j = '<div class="alert" role="alert">';
        j = j + "<div>" + data[i]['messages'] + "</div>";
        j = j + "<div>";
        p = p + 1;
        $("<div/>", {html: e}).appendTo("#messages")
        });
    });
};
