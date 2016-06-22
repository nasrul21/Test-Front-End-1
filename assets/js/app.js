$(document).ready(function() {
	var description = function(json) {
		var title = "<span class='title'>"+json.nama+"</span>";
		var harga = "<span class='price'>Rp "+json.harga.toLocaleString()+"</span>";
		var stok = "<span class='stock'>Tersedia <b>"+json.stok+"</b> stok</span>";
		var pelapak = "<span class='pelapak'>"+
						"<i class='ion-android-person' /> "+json.pelapak.nama+"<br>" +
						"<i class='ion-location' /> "+json.pelapak.lokasi+"<br>" +
					"</span>";
		var deskripsi = "<span class='deskripsi'>"+json.deskripsi+"</span>"
		var button = "<a href='#' class='beli'>Beli</a>";
		return title+harga+stok+pelapak+deskripsi+button;
	};
	$(".item")
		.hover(function() {
			var content = $(this).find(".preview");
			var loading = $(this).find("#loading");
			var index = $(this).index();
			var item = $(this);
			$(this).find(".preview").slideDown(500, function() {
				if (item.attr('loaded')==0) {
					setTimeout(function(){ 
						$.getJSON("json/products.json", function(data, status) {
							var detail = data[index];
							content.html(description(detail));
							item.attr('loaded',1);
						});
					}, 1000);
				}
			});
		}, function() {
			$(this).find(".preview").slideUp(500);
		});
});