$(document).ready(function(){
    var id = $('#receiverId').val();

    $('#message').click(function(){
        var message = $.trim($('#msg').val());
        // console.log(message);
        
        if(message != ''){
            $.post('/message/'+id, {
                message: message,
                id: id
            }, function(data){
                $('#msg').val('');
                // console.log();
                
            });
        }
    });
    // setInterval(function(){
    //     $('.msg').load(location.href + '.msg');
    // }, 200);
});