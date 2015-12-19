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

//����ͼƬԤ��
function setImagePreview(fieldupload, image, imagediv) {
    var docObj = document.getElementById(fieldupload);
    var imgObjPreview = document.getElementById(image);
    if (docObj.files && docObj.files[0]) {
        //����£�ֱ����img��                       
        imgObjPreview.style.display = 'block';
        imgObjPreview.style.width = '150px';
        imgObjPreview.style.height = '150px';
        //imgObjPreview.src = docObj.files[0].getAsDataURL();      
        //���7���ϰ汾�����������getAsDataURL()��ʽ��ȡ����Ҫһ�·�       
        imgObjPreview.src = window.URL.createObjectURL(docObj.files[0]);
    } else {
        //IE�£�ʹ���˾�                        
        docObj.select();
        var imgSrc = document.selection.createRange().text;
        var localImagId = document.getElementById(imagediv);
        //�������ó�ʼ��С                        
        localImagId.style.width = "150px";
        localImagId.style.height = "150px";
        //ͼƬ�쳣�Ĳ�׽����ֹ�û��޸ĺ�׺��α��ͼ
        try {
            localImagId.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale)"; localImagId.filters.item("DXImageTransform.Microsoft.AlphaImageLoader").src = imgSrc;
        } catch (e) {
            alert("���ϴ���ͼƬ��ʽ����ȷ��������ѡ��!");
            return false;
        }
        imgObjPreview.style.display = 'none';
        document.selection.empty();
    }
    return true;
}