
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
