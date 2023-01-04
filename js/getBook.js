$(function(){
    function getBookList() {
        $.get("http://www.liulongbin.top:3006/api/getbooks",function(res){
            if(res.status !== 200)
                return alert("获取图书列表失败！");
            var rows = [];
            $.each(res.data,function(i,item){
                rows.push("<tr><td>" + item.id + "</td><td>" + item.bookname + "</td><td>" +
            item.author + "</td><td>" + item.publisher + '</td><td><a href="javascript:;" class="del" data-id="'+item.id+'">删除</a></td></tr>' )
            });
            $('#bookBody').empty().prepend(rows.join(""))
        })
    }
    getBookList();
    $('tbody').on('click','.del',function(){
        var ids = $(this).attr('data-id');
        $.get('http://www.liulongbin.top:3006/api/delbook',{ id:ids },function(res){
            if(res.status !== 200)
                return alert('删除图书失败！');
            getBookList();
        })
    })
    $('#btnAdd').on('click',function(){
        var bookname = $('#iptBookname').val().trim();
        var author = $('#iptAuthor').val().trim();
        var publisher = $('#iptPublisher').val().trim();
        if(bookname.length<=0||author.length<=0||publisher.length<=0){
            return alert('请填写完整的图书信息!');
        }
        $.post('http://www.liulongbin.top:3006/api/addbook',
        { bookname:bookname, author:author, publisher:publisher },
        function(res){
            if(res.status !== 201)
                return alert('添加图书失败！');
            getBookList();
            $('#iptBookname').val("");
            $('#iptAuthor').val("");
            $('#iptPublisher').val("");
        })
    })
})
