var locations_radio = $("#locations input:radio");
var location_ca = $('#location_CA');
var sideAd_radio = $('.sideAd_radio');
var order_selec_sec = $('#order_selector_section');
var order_selector = $('#order');
var cat_selector_sec = $('#category_selector_section');
var cat_selector = $('#category');
var slideshow_radio = $('#location_SA')

var media_radio = $('#media-format input:radio');
var image_section = $('#image_section');
var image_selector = $('#image');
var media_image = $('#media_image');
var media_youtube = $('#media_youtube');
var yt_section = $('#ytLink_section');
var yt_s_selector = $('#ytShortLink');
var yt_f_selector = $('#ytFullLink');

// show appropriate fields when edit page first load
$(document).ready(() => {
    // Only show order selector when sideAd option is checked
    if (sideAd_radio.is(':checked')) {
        order_selec_sec.removeClass('hidden');
        order_selector.prop('required', true);
    } else {
        order_selec_sec.addClass('hidden');
        order_selector.prop('required', false);
    }

    // Only show category picker when adding commercial ad
    if (location_ca.is(':checked')) {
        // Show category selector and set it to be required
        cat_selector_sec.removeClass('hidden');
        cat_selector.prop('required', true);
    } else {
        // Hide category selector and set not required
        cat_selector_sec.addClass('hidden');
        cat_selector.prop('required', false);
    }

    // Only allow youtube for slideshow ads
    if (!slideshow_radio.is(':checked')) {
        // Set youtube media format unchecked and disable it
        media_youtube.prop('disabled', true);
    } else {
        // Set youtube media format enabled
        media_youtube.prop('disabled', false);
    }

    if (media_youtube.is(':checked')) {
        yt_section.removeClass('hidden');
        
        yt_s_selector.prop('required', true);
        yt_f_selector.prop('required', true);
        
        yt_s_selector.prop('disabled', false);
        yt_f_selector.prop('disabled', false);

        image_section.addClass('hidden');
        image_selector.prop('required', false);
        image_selector.prop('disabled', true);
    } else {
        image_section.removeClass('hidden');
        image_selector.prop('required', true);
        image_selector.prop('disabled', false);

        yt_section.addClass('hidden');
        
        yt_s_selector.prop('required', false);
        yt_f_selector.prop('required', false);
        
        yt_s_selector.prop('disabled', true);
        yt_f_selector.prop('disabled', true);
    }
})

locations_radio.change(() => {
    // Only show order selector when sideAd option is checked
    if (sideAd_radio.is(':checked')) {
        order_selec_sec.removeClass('hidden');
        order_selector.prop('required', true);
    } else {
        order_selec_sec.addClass('hidden');
        order_selector.prop('required', false);
    }

    // Only show category picker when adding commercial ad
    if (location_ca.is(':checked')) {
        // Show category selector and set it to be required
        cat_selector_sec.removeClass('hidden');
        cat_selector.prop('required', true);
    } else {
        // Hide category selector and set not required
        cat_selector_sec.addClass('hidden');
        cat_selector.prop('required', false);
    }

    // Only allow youtube for slideshow ads
    if (!slideshow_radio.is(':checked')) {
        // Set image media format checked
        media_image.prop('checked', true);

        // Set youtube media format unchecked and disable it
        media_youtube.prop('checked', false);
        media_youtube.prop('disabled', true);

        // Show image section and set it to be required
        image_section.removeClass('hidden');
        image_selector.prop('required', true);

        // Hide youtube section and not required
        yt_section.addClass('hidden');
        yt_s_selector.prop('required', false);
        yt_f_selector.prop('required', false);
    } else {
        // Set youtube media format enabled
        media_youtube.prop('disabled', false);
    }
})

media_radio.change(() => {
    if (media_youtube.is(':checked')) {
        yt_section.removeClass('hidden');
        
        yt_s_selector.prop('required', true);
        yt_f_selector.prop('required', true);
        
        yt_s_selector.prop('disabled', false);
        yt_f_selector.prop('disabled', false);

        image_section.addClass('hidden');
        image_selector.prop('required', false);
        image_selector.prop('disabled', true);
    } else {
        image_section.removeClass('hidden');
        image_selector.prop('required', true);
        image_selector.prop('disabled', false);

        yt_section.addClass('hidden');
        
        yt_s_selector.prop('required', false);
        yt_f_selector.prop('required', false);
        
        yt_s_selector.prop('disabled', true);
        yt_f_selector.prop('disabled', true);
    }
})


$('#deleteModal').on('show.bs.modal', function (event) {
    var button = $(event.relatedTarget);
    var postTo = button.data('post-to');
    var adId = button.data('ad-id');
    var title = button.data('title');
    var location = button.data('location');
    var image = button.data('image');
    var yt_short_link = button.data('yt_short_link') || '[ No Link ]';
    var yt_full_link = button.data('yt_full_link') || '[ No Link ]';

    var modal = $(this);
    modal.find('#deleteModalForm').attr('action', postTo);
    modal.find('#ad_id').val(adId);
    modal.find('#location').val(location);
    modal.find('#title').val(title);
    modal.find('#deleteModalImagePlaceHolder').html(() => {
        var imageHtml = "";
        if (image !== "") {
            imageHtml = "<div style='overflow: hidden';>" +
                            "<a href='" + image + "' data-fancybox='ad-image' data-caption='Ad Image'>" +
                                "<img src='" + image + "' style='max-height: 200px;' alt='Ad image' />" +
                            "</a>" + 
                        "</div>";
        } else {
            imageHtml = "<div>" +
                            "[ NO IMAGE ]" +
                        "</div>";
        }
        return imageHtml;
    });
    modal.find('#yt_short_link').val(yt_short_link);
    modal.find('#yt_full_link').val(yt_full_link);
})