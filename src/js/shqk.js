window.tran = new Translater();
$(document).ready(function() {
	$(".qrcode").magnificPopup({
        type: "image",
        tLoading: "Loading image #%curr%...",
        mainClass: "mfp-img-mobile",
        image: {
            tError: '<a href="%url%">The image #%curr%</a> could not be loaded.'
        }
    })
	$('.popup-modal').magnificPopup({
		type: 'inline',
		preloader: false,
		focus: '#username',
	});
	$(".popup-activity").magnificPopup({
        type: "image",
        tLoading: "Loading image #%curr%...",
        mainClass: "mfp-img-mobile",
        gallery: {
            enabled: !0,
            navigateByImgClick: !0,
            preload: [0, 1]
        },
        image: {
            tError: '<a href="%url%">The image #%curr%</a> could not be loaded.'
        }
    })
	var map = new AMap.Map('map', {
        zoom:13,
        center: [121.439624,31.014617],
    });
	var marker = new AMap.Marker({
		position: new AMap.LngLat(121.439624,31.014617), 
		title: '上海巧坤化工科技有限公司'
	});

	map.add(marker);
});

