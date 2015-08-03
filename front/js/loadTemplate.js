
loadTemplate = function(name) {
	$.ajax({
		url : '/' + name,
		success : function(content) {
			$("#content").html(content);
		},
	});
};

$('a').click(function (event) {
	event.preventDefault();
	var url = $(this).attr('href');
	loadTemplate(url);
});

$("#wedding-gallery").justifiedGallery({
  rowHeight : 180,
  lastRow : 'nojustify',
  margins : 3
}).on('jg.complete', function () {
	console.log('swipebox prepare');
  $('#wedding-gallery a').swipebox();
});
