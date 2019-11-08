var current_user_id = 0;
var current_clicked_id = 0;

function me(){
  $.ajax({
            url:'/current',
            type:'GET',
            contentType: 'application/json',
            dataType:'json',
            success: function(response){
                //alert(JSON.stringify(response));
                $('#cu_username').html("<span class='glyphicon glyphicon-book'></span>  Contactos de " + response['username'])
                var name = response['name']+" "+response['fullname'];
                current_user_id = response['id']
                $('#cu_name').html(name);
                contactos();
            },
            error: function(response){
                alert(JSON.stringify(response));
            }
        });
        refresh();
    }

function updateScroll(){
  var element = document.getElementById("chat_content");
  element.scrollTop = element.scrollHeight;
}

  function contactos(){
    $.ajax({
            url:'/users',
            type:'GET',
            contentType: 'application/json',
            dataType:'json',
            success: function(response){
                //alert(JSON.stringify(response));
                var i = 0;
                var f = ""
                $.each(response, function(){
                    if(response[i].id!=current_user_id){
                      f = f + '<tr>';
                      f = f + '<td>'+response[i].id+'</td>';
                      f = f + '<td><a onclick=loadMessages('+current_user_id+','+response[i].id+')>'+response[i].name+'</a></td>';
                      f = f + '</tr>';
                    }
                    i = i+1;
                });
                $('#allusers').append(f);
            },
            error: function(response){
                alert(JSON.stringify(response));
            }
        });
  }

function loadMessages(from, to){
  current_clicked_id = to;
  $.ajax({
            url:'/messages/'+from+"/"+to,
            type:'GET',
            contentType: 'application/json',
            dataType:'json',
            success: function(response){
              var i = 0;
              var mensajes = "";
              $.each(response, function(){
                  if(response[i].user_from_id==current_user_id){
                    mensajes=mensajes+"<div class='row msg_container base_sent'>";
                    mensajes=mensajes+    "<div class='col-md-10 col-xs-10'>";
                    mensajes=mensajes+        "<div class='messages msg_sent'>";
                    mensajes=mensajes+            "<p>"+response[i].content+"</p>";
                    mensajes=mensajes+            "<time datetime='2009-11-13T20:00'>"+response[i].sent_on+"</time>";
                    mensajes=mensajes+        "</div>";
                    mensajes=mensajes+    "</div>";
                    mensajes=mensajes+    "<div class='col-md-2 col-xs-2 avatar'>";
                    mensajes=mensajes+        "<img src='http://www.bitrebels.com/wp-content/uploads/2011/02/Original-Facebook-Geek-Profile-Avatar-1.jpg' class=' img-responsive' >";
                    mensajes=mensajes+    "</div>"
                    mensajes=mensajes+"</div>"
                  }
                  else{
                    mensajes=mensajes+"<div class='row msg_container base_receive'>";
                    mensajes=mensajes+    "<div class='col-md-2 col-xs-2 avatar'>";
                    mensajes=mensajes+        "<img src='http://www.bitrebels.com/wp-content/uploads/2011/02/Original-Facebook-Geek-Profile-Avatar-1.jpg' class=' img-responsive '>";
                    mensajes=mensajes+    "</div>";
                    mensajes=mensajes+    "<div class='col-md-10 col-xs-10'>";
                    mensajes=mensajes+        "<div class='messages msg_receive'>";
                    mensajes=mensajes+            "<p>"+response[i].content+"</p>";
                    mensajes=mensajes+            "<time datetime='2009-11-13T20:00'>"+response[i].user_from.name+" • "+response[i].sent_on+"</time>";
                    mensajes=mensajes+        "</div>";
                    mensajes=mensajes+    "</div>";
                    mensajes=mensajes+"</div>";
                  }
                  i = i+1;
              });
              $('#chat_content').html(mensajes)
              updateScroll();

            },
            error: function(response){
                alert(JSON.stringify(response));
            }

        });

}

function send_message(){
        var content = $('#btn-input').val();
        var fid = $('#fid').val();
        var tid = $('#tid').val();
        var message = JSON.stringify({
                "content": content,
                "fid": current_user_id,
                "tid": current_clicked_id
              });

        $.ajax({
            url:'/send_msg',
            type:'POST',
            contentType: 'application/json',
            data : message,
            dataType:'json',
            success: function(response){
            },
            error: function(response){
            }
        });
        loadMessages(current_user_id,current_clicked_id);
    }

  function refresh(){
     var ref = setInterval(function(){loadMessages(current_user_id,current_clicked_id);}, 6000);
  }