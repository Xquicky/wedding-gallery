
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

$(document).ready(
	function() {
		$("#wedding-gallery").justifiedGallery({
		  rowHeight : 180,
		  lastRow : 'nojustify',
		  margins : 3
		}).on('jg.complete', function () {
		  $('#wedding-gallery a').swipebox();
		});
	}
);
