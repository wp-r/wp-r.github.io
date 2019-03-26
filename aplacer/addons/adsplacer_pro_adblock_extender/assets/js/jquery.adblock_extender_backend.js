jQuery(document).ready(function($) {


    $('.custom-ads-tabs').tabs();
    $('#adsplacer_settings_tabs').tabs();

    function openModal(id) {
        var modal = $(id);

        if ($('#fade').size() == 0)
            $('body').append('<div id="fade"></div>');

        $('#fade').css("opacity", 0.8).data('currentModal', id).fadeIn();

        modal.fadeIn().position({
            my: "center",
            at: "center",
            of: window,
            collision : "flipfit"
        });


        if(id == '#addShortcodeModal'){
            setTimeout(function(){
                jQuery('#device').chosen();
                jQuery('#os').chosen();
                jQuery('#os').on('change', function(){
                    customizeOsSelect(this);
                });
                jQuery('#template').on('change', function(){
                    if(parseInt($(this).val())){
                        jQuery('#contentValue').attr('disabled', true);
                        jQuery('.new.adsplacer-block-overlay').show();
                    }
                    else {
                        jQuery('#contentValue').attr('disabled', false);
                        jQuery('.new.adsplacer-block-overlay').hide();
                    }
                });
                jQuery('#country').chosen();
                jQuery('#browser').chosen();
                jQuery('#origin').chosen();
                jQuery('#paragraph').chosen();
                jQuery('#paragraph').on('change', function(e){
                    customNumberSelect(e, this);
                });
                jQuery('#tag-h2').chosen();
                jQuery('#tag-h2').on('change', function(e){
                    customNumberSelect(e, this);
                });
                jQuery('#tag-h3').chosen();
                jQuery('#tag-h3').on('change', function(e){
                    customNumberSelect(e, this);
                });
                jQuery('#taxonomy').chosen();
                //jQuery('.new-timing [name=timing_work_till]').datepicker({'dateFormat' : 'yy-mm-dd'});
                var dateFormat = "yy-mm-dd",
                    new_from = $("[name=timing_work_from]")
                        .datepicker({
                            defaultDate: "+1w",
                            changeMonth: true,
                            changeYear: true,
                            dateFormat: dateFormat,
                            numberOfMonths: 1
                        })
                        .on( "change", function() {
                            new_to.datepicker( "option", "minDate", getDate( this, dateFormat ) );
                        }),
                    new_to = $( "[name=timing_work_till]" ).datepicker({
                        defaultDate: "+1w",
                        changeMonth: true,
                        changeYear: true,
                        dateFormat: dateFormat,
                        numberOfMonths: 1
                    })
                        .on( "change", function() {
                            new_from.datepicker( "option", "maxDate", getDate( this, dateFormat ) );
                        });
                jQuery('.new-timing [name=timing_enable_work_till]').on('change', function(){
                    if(jQuery(this).attr('checked') != 'checked'){
                        jQuery('.new-timing .timetable-overlay.work-till').show();
                    }
                    else {
                        jQuery('.new-timing .timetable-overlay.work-till').hide();
                    }
                });

                jQuery('.new-timing [name=timing_enabled]').on('change', function(){
                    if(jQuery(this).attr('checked') != 'checked'){
                        jQuery('.new-timing .timetable-overlay.days-table').show();
                    }
                    else {
                        jQuery('.new-timing .timetable-overlay.days-table').hide();
                    }
                });
            },100);
            setTimeout(function(){
                jQuery('#addShortcodeModal .input-spoiler').hide();
            },400);
        }
    }
    jQuery('.spoiler-header').on('click', function(e){
        jQuery(this).parent().find('.input-spoiler').toggle();
    });

    $('a.open-modal-button').click(function() {
        var id = $(this).attr('href');
        if ($(id).size() != 0) openModal(id);
        return false;
    });

    function closeModals() {
        var currentModal = $('#fade').data('currentModal');
        if (currentModal != '')
            $('#fade, '+currentModal).fadeOut('slow', function() {
                if ($(this).attr('id') != 'fade' && currentModal == '#editShortcodeModal') {
                    var shortcode_input = $('#editableShortcode');
                    var description_input = $('#editableShortcodeDescription');
                    var value_input = $('#editableShortcodeValue');
                    var new_group_input = $('#editableShortcodeNewGroup');
                    // var group_select_options = $('#editableShortcodeAvailableGroup');
                    var editButton = $('#editShortcodeButton');
                    var progressContainer = $('#viewShortcodeProgressContainer');
                    var form = $('#editable');
                    var pResult = $('p#editResult');

                    shortcode_input.val('');
                    description_input.val('');
                    value_input.val('');
                    new_group_input.val('');
                    editButton.removeData('shortcodeId');
                    editButton.removeData('editNonce');
                    progressContainer.removeClass('hidden');
                    form.addClass('hidden');
                    pResult.text('');
                }
            });
    }

    $('body').on('click', 'div#fade, a.adsplacer-pro-modal-close-button', (function() {
        closeModals();
        return false;
    }));

    $(document).keyup(function(e) {
        if (e.keyCode == 27) closeModals();
    });

    $('#addNewShortcodeButton').click(function() {
        jQuery('#contentValue-html').click();
        var button = $(this);
        var progressIcon = $('#addShortcodeProgress');
        var pResult = $('p#addResult');

        sendData = {};
        sendData.action = 'adsplacer_pro_adblock_extender_new_ad';
        sendData.content = $('#contentValue').val();
        sendData.template = $('[name="template"]').val();
        sendData.platform = $('[name="platform"]').val();
        sendData.description = $('[name=description]').val();
        sendData.location = $('[name=location]').val();
        sendData.new_nonce = button.data('addNonce');

        progressIcon.removeClass('hidden');
        button.prop('disabled', true);
        pResult.text('').removeClass('success error');

        $.post(ajaxurl, sendData, function(data) {
            // data = $.parseJSON(data);

            if (data.success) {
                pResult.addClass('success').text(data.success);
                progressIcon.addClass('hidden');
                setTimeout("window.location.reload()", 300);
            } else {
                if (data.error) pResult.addClass('error').text(data.error); else pResult.addClass('error').text('Unknown error, please contact the plugin developers...');
                button.prop('disabled', false);
                progressIcon.addClass('hidden');
            }
        }, 'json');

        return false;
    });

    $('a.submitdelete').click(function() {
        if(!confirm('Are you sure?'))
            return ;
        var id = $(this).data('id');
        var nonce = $('input[name=nonce_del]').val();
        var parentTr = $(this).parents('tr');

        $.post(ajaxurl, {id: id, del_nonce: nonce, action: 'adsplacer_pro_adblock_extender_delete_ad'}, function(data) {
            // data = $.parseJSON(data);

            if (data.success) {
                alert(data.success);
                parentTr.fadeOut(1000, function() {
                    $(this).remove();
                });
            } else {
                if (data.error) alert(data.error); else alert('Unknown error, please contact the plugin developers...');
            }
        }, 'json');

        return false;
    });

    $('a.submitenable').click(function() {
        var id = $(this).data('id');
        var nonce = $('input[name=nonce_enable]').val();
        var parentTr = $(this).parents('tr');

        $.post(ajaxurl, {id: id, nonce: nonce, action: 'adsplacer_pro_enable_ad'}, function(data) {
            if (data.success) {
                parentTr.css({'background-color' : '#f9f9f9'});
                parentTr.find('.submitdisable').show();
                parentTr.find('.submitenable').hide();
            }
            else {
                if (data.error) alert(data.error); else alert('Unknown error, please contact the plugin developers...');
            }
        }, 'json');

        return false;
    });

    $('a.submitdisable').click(function() {
        var id = $(this).data('id');
        var nonce = $('input[name=nonce_disable]').val();
        var parentTr = $(this).parents('tr');

        $.post(ajaxurl, {id: id, nonce: nonce, action: 'adsplacer_pro_disable_ad'}, function(data) {
            if (data.success) {
                parentTr.css({'background-color' : '#ffd3d3'});
                parentTr.find('.submitdisable').hide();
                parentTr.find('.submitenable').show();
            }
            else {
                if (data.error) alert(data.error); else alert('Unknown error, please contact the plugin developers...');
            }
        }, 'json');

        return false;
    });

    $('a.submitclone').click(function() {
        if(confirm('Вы уверены?')){
            var nonce = $('input[name=nonce_clone]').val();
            var id = $(this).data('id');
            var sendData = {};
            sendData.id = id;
            sendData.action = 'adsplacer_pro_clone_ad';
            sendData.nonce = nonce;

            $.post(ajaxurl, sendData, function(data) {
                if (data.success) {
                    setTimeout("window.location.reload()", 300);
                } else {
                    alert('Произошла ошибка');
                }
            }, 'json');
        }
    });

    $('a.submitedit').click(function() {
        var modalID = $(this).attr('href');
        var id = $(this).data('id');
        var nonce = $('input[name=nonce_view]').val();
        var progressContainer = $('#viewShortcodeProgressContainer');
        var form = $('#editable');

        var sendData = {};
        sendData.id 			= id;
        sendData.view_nonce 	= nonce;
        sendData.action 		= 'adsplacer_pro_adblock_extender_view_ad';
        var value_input 		= $('#editableValue');
        var editButton 			= $('#editShortcodeButton');
        var pResult 			= $('p#editResult');
        var description_input 	= $('#editableShortcodeDescription');
        var template 			= $('#edit-template');
        var platform 			= $('#edit-platform');
        openModal(modalID);

        $.post(ajaxurl, sendData, function(data) {
            if (data.success) {
                description_input.val(data.success.description);
                value_input.val(data.success.value);
                platform.val(data.success.platform);
                if(data.success.template){
                    value_input.attr('disabled', true);
                    template.val(data.success.template.id);
                    jQuery('.edit.adsplacer-block-overlay').show();
                }
                else {
                    value_input.attr('disabled', false);
                    template.val(0);
                    jQuery('.edit.adsplacer-block-overlay').hide();
                }
                setTimeout(function(){
                    jQuery('#edit-template').on('change', function(){
                        if(parseInt($(this).val())){
                            jQuery('#editableValue').attr('disabled', true);
                            jQuery('.edit.adsplacer-block-overlay').show();
                        }
                        else {
                            jQuery('#editableValue').attr('disabled', false);
                            jQuery('.edit.adsplacer-block-overlay').hide();
                        }
                    });
                },100);
                setTimeout(function(){
                    jQuery('#editShortcodeModal .input-spoiler').hide();
                },400);
                editButton.data('id', data.success.id);
                editButton.data('edit-nonce', data.success.nonce);
                progressContainer.addClass('hidden');
                form.removeClass('hidden');
            } else {
                progressContainer.addClass('hidden');
                if (data.error) pResult.addClass('error').text(data.error); else pResult.addClass('error').text('Unknown error, please contact the plugin developers...');
            }

            $(modalID).position({
                my: "center",
                at: "center",
                of: window,
                collision : "flipfit"
            });
        }, 'json');

        return false;
    });


    $('#editShortcodeButton').click(function() {
        jQuery('#editableValue-html').click();
        var button = $(this);
        var progressIcon = $('#editShortcodeProgress');
        var pResult = $('p#editResult');

        var id = button.data('id');

        var sendData = {};
        sendData.id = id;
        sendData.description = $('#editableShortcodeDescription').val();
        sendData.content = $('#editableValue').val();
        sendData.editable_nonce = button.data('editNonce');
        sendData.action = 'adsplacer_pro_adblock_extender_update_ad';
        sendData.template = $('#edit-template').val();
        sendData.platform = $('#edit-platform').val();
        progressIcon.removeClass('hidden');

        if (id == '') {
            progressIcon.addClass('hidden');
            return false;
        }

        button.prop('disabled', true);
        pResult.text('').removeClass('success error');

        $.post(ajaxurl, sendData, function(data) {
            if (data.success) {
                pResult.addClass('success').text(data.success);
                progressIcon.addClass('hidden');
                setTimeout("window.location.reload()", 300);
            } else {
                if (data.error) pResult.addClass('error').text(data.error); else pResult.addClass('error').text('Unknown error, please contact the plugin developers...');
                button.prop('disabled', false);
                progressIcon.addClass('hidden');
            }
        }, 'json');

        return false;
    });

});

jQuery(document).ready(function(){
    jQuery('#adsplacer_pro-extra-ads-list').sortable(
        {
            update: function (event, ui) {

            },
            start: function (event, ui) {
            },
            stop: function (event, ui) {
                var elements = jQuery('#adsplacer_pro-extra-ads-list tr');
                var data = [];
                for(var k = 0; k < elements.length; k++){
                    data[data.length] = jQuery(elements[k]).data('id');
                }
                var sendData = {};
                sendData.data = data.join();
                sendData.action = 'adsplacer_pro_adblock_extender_sort_ads';
                jQuery.post(ajaxurl, sendData, function(data) {
                    var elements2 = jQuery('.position-order');
                    for(var m = 0; m < elements2.length; m++){
                        jQuery(elements2[m]).html(m+1+'');
                    }
                }, 'json');
            }
        }
    );
    jQuery('#enable,#standard_ad,#first_only').on('change', function(){
        var form = jQuery('#adsplacer_settings_form');
        jQuery.ajax({
            type: "POST",
            url: window.location.href,
            data: form.serialize()
        });
    });
});