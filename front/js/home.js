$(document).ready(
  function() {
    $("#wedding-gallery").justifiedGallery({
      rowHeight : 180,
      maxRowHeight: 180,
      lastRow : 'nojustify',
      margins : 3
    });

    $("#add-photos-input").fileinput({
      previewFileType:'image',
      multiple: true,
      uploadAsync: true,
      uploadUrl: '/savePhotos',
      allowedFileTypes: ['image'],
      allowedPreviewTypes: ['image'],
      previewSettings: {
        image: {
          width: '10px',
          height: '10px'
        }
      }
    });
  }
);

$("body").click(function(event) {
  if(event.target.className == "add-photo-button" && $(".popin-photo").is(':hidden')) {
    $(".add-photo-button").css("background-color", "#b40000");
    $(".popin-photo").show(500);
  }
  else if((event.target.className !== "popin-photo" && $(event.target).parents('.popin-photo').length === 0) && $(".popin-photo").is(':visible')) {
    $(".add-photo-button").removeAttr("style");
    $(".popin-photo").hide(500);
  }
});
