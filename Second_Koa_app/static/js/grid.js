$.fn.grid = function (options){
    var $tbody = $(this).find("tbody")
    var colums = options.colums
    var url = options.url
    var content = []
    $.ajax({
        type : "get",
        value:1,
        url : url,
        dataType : "json",
        async : false,
        success : function(data){
            content = data
        }
    })
            
    for (var c=0; c< content.length;++c){
        var html = "<tr>"
         $.each(content[c],function(key,value){
            html+="<td>"+value+"</td>"
        })
        html+="</tr>"
        console.log(html)
        $("#tbody").append(html)
        }
        
    }
