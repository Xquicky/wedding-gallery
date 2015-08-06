$(document).ready(
  function() {
    $("#wedding-gallery").justifiedGallery({
      rowHeight : 180,
      maxRowHeight: 180,
      lastRow : 'nojustify',
      margins : 3
    });

    $("#add-photos-input").fileinput({
      showCaption: false,
      multiple: true,
      uploadAsync: true,
      uploadUrl: '/savePhotos',
      previewFileType:'image',
      allowedFileTypes: ['image'],
      allowedPreviewTypes: ['image'],
      browseLabel: 'Ajouter',
      dropZoneTitle: 'Déposer vos fichiers',
      msgInvalidFileType: 'Fichier "{name}" du mauvais type. Seul le type "{types}" est accepté.'
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
