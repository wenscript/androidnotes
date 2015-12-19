$(document).ready(function () {
    $('#goup').goup();
    var h = $(window).height();
    $('#scroll a').click(function () {
        $("html, body").animate({ scrollTop: h }, 900);
        return false;
    });
    $('#divheader').height(h);

    var h6 = parseInt(h / 6);
    $('#title').height(h6);
    $('#twitter').height(h6);
    $('#downloadbuttons').height(h6);
    $('#scroll').height(h6);


    $(".postTitle a").hover(function () {
        $(this).stop().animate({ paddingLeft: '10px' }, 250)
    }, function () {
        $(this).stop().animate({ paddingLeft: '0px' }, 250)
    })
});

//本地图片预览
function setImagePreview(fieldupload, image, imagediv) {
    var docObj = document.getElementById(fieldupload);
    var imgObjPreview = document.getElementById(image);
    if (docObj.files && docObj.files[0]) {
        //火狐下，直接设img属                       
        imgObjPreview.style.display = 'block';
        imgObjPreview.style.width = '150px';
        imgObjPreview.style.height = '150px';
        //imgObjPreview.src = docObj.files[0].getAsDataURL();      
        //火狐7以上版本不能用上面的getAsDataURL()方式获取，需要一下方       
        imgObjPreview.src = window.URL.createObjectURL(docObj.files[0]);
    } else {
        //IE下，使用滤镜                        
        docObj.select();
        var imgSrc = document.selection.createRange().text;
        var localImagId = document.getElementById(imagediv);
        //必须设置初始大小                        
        localImagId.style.width = "150px";
        localImagId.style.height = "150px";
        //图片异常的捕捉，防止用户修改后缀来伪造图
        try {
            localImagId.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale)"; localImagId.filters.item("DXImageTransform.Microsoft.AlphaImageLoader").src = imgSrc;
        } catch (e) {
            alert("您上传的图片格式不正确，请重新选择!");
            return false;
        }
        imgObjPreview.style.display = 'none';
        document.selection.empty();
    }
    return true;
}