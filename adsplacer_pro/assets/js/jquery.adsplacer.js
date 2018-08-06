var AdsplacerProTimingIsSelecting = false;

jQuery(document).ready(function($) {
    jQuery.fn.adsplacerProCenter = function () {
        this.css("position","absolute");
        this.css("top","50%");
        this.css("left","50%");
        this.css("transform","translate(-50%,-50%)");
        // this.css("top", Math.max(0, ((jQuery(window).height() - jQuery(this).outerHeight()) / 2) +
        //         jQuery(window).scrollTop()) + "px");
        // this.css("left", Math.max(0, ((jQuery(window).width()/2 - jQuery(this).outerWidth()/2) / 2) +
        //         jQuery(window).scrollLeft()) + "px");
        return this;
    };
	initDaySchedule();
	jQuery(document).mouseup(function() {
		if (AdsplacerProTimingIsSelecting && !jQuery(this).hasClass('stop_hours'))
			AdsplacerProTimingIsSelecting = false;
	});



	function initDaySchedule()
	{
		jQuery('.stop_hours').click(function() {
			jQuery(this).toggleClass('red');
			jQuery(this).toggleClass('green');
		}).mousedown(function() {
			show = jQuery(this).hasClass('green');
			AdsplacerProTimingIsSelecting = true;
			return false;
		}).mouseup(function() {
			AdsplacerProTimingIsSelecting = false;
			return false;
		}).mousemove(function() {
			if (AdsplacerProTimingIsSelecting) {
				if (show)
					jQuery(this).removeClass('green').addClass('red');
				else
					jQuery(this).removeClass('red').addClass('green');
			}
			return false;
		});

		jQuery('.hour_column').click(function() {
			var columnClass = 'hour_'+parseInt(this.innerHTML, 10);
			if (jQuery('.'+columnClass).filter('.green').length)
				jQuery('.'+columnClass).addClass('red').removeClass('green');
			else
				jQuery('.'+columnClass).addClass('green').removeClass('red');
			return false;
		});

		jQuery('.weekday_row').click(function() {
			var rowClass = 'weekday_' + (jQuery(this).parents('tr').prevAll().length + 1);
			if (jQuery('.'+rowClass).filter('.green').length > 0)
				jQuery('.'+rowClass).addClass('red').removeClass('green');
			else
				jQuery('.'+rowClass).addClass('green').removeClass('red');
			return false;
		});

		jQuery('.work_days').click(function() {
			jQuery('.weekday_1,.weekday_2,.weekday_3,.weekday_4,.weekday_5').addClass('green').removeClass('red');
			jQuery('.weekday_6').addClass('red').removeClass('green');
			jQuery('.weekday_7').addClass('red').removeClass('green');
			return false;
		});

		jQuery('.work_hours').click(function() {
			jQuery('.weekday_1,.weekday_2,.weekday_3,.weekday_4,.weekday_5').addClass('green').removeClass('red');
			jQuery('.weekday_6').addClass('red').removeClass('green');
			jQuery('.weekday_7').addClass('red').removeClass('green');
			var classNames = [];
			for (var i = 0; i < 8; i++)
				jQuery('.hour_'+i).addClass('red').removeClass('green');
			for (var i = 20; i < 24; i++)
				jQuery('.hour_'+i).addClass('red').removeClass('green');
			return false;
		});

		jQuery('.evening_hours').click(function() {
			jQuery('.weekday_1,.weekday_2,.weekday_3,.weekday_4,.weekday_5,.weekday_6,.weekday_7').addClass('green').removeClass('red');
			var classNames = [];
			for (var i = 0; i < 19; i++)
				jQuery('.hour_'+i).addClass('red').removeClass('green');
			return false;
		});

		jQuery('.not_work_hours').click(function() {
			jQuery('.weekday_1,.weekday_2,.weekday_3,.weekday_4,.weekday_5').addClass('red').removeClass('green');
			jQuery('.weekday_6').addClass('green').removeClass('red');
			jQuery('.weekday_7').addClass('green').removeClass('red');
			var classNames = [];
			for (var i = 0; i < 8; i++)
				jQuery('.hour_'+i).addClass('green').removeClass('red');
			for (var i = 20; i < 24; i++)
				jQuery('.hour_'+i).addClass('green').removeClass('red');
			return false;
		});

		jQuery('.clean_table').click(function() {
			jQuery('.weekday_1,.weekday_2,.weekday_3,.weekday_4,.weekday_5,.weekday_6,.weekday_7').addClass('red').removeClass('green');
			return false;
		});
	}

	function getDate( element, dateFormat ) {
		var date;
		try {
			date = $.datepicker.parseDate( dateFormat, element.value );
		} catch( error ) {
			date = null;
		}

		return date;
	}
//        jQuery('#saveTimetable').on('click', function(){
//            var workingHours = [];
//            $.each(jQuery('.green'), function(){
//                workingHours[workingHours.length] = {'day': jQuery(this).attr('weekday'), 'hour': jQuery(this).attr('hour')};
//            });
//            jQuery('#inputTimeTable').val(JSON.stringify(workingHours));
//        });

	$('#adsplacer_settings_tabs').tabs();
	$('.custom-ads-tabs').tabs();

	$('.adsplacer_code').click(function() {
		var e=this;
		if (window.getSelection) {
			var s = window.getSelection();
			if (s.setBaseAndExtent) {
				s.setBaseAndExtent(e,0,e,e.innerText.length-1);
			} else {
				var r = document.createRange();
				r.selectNodeContents(e);
				s.removeAllRanges();
				s.addRange(r);
			}
		} else if (document.getSelection) {
			var s = document.getSelection();
			var r = document.createRange();
			r.selectNodeContents(e);
			s.removeAllRanges();
			s.addRange(r);
		} else if (document.selection) {
			var r = document.body.createTextRange();
			r.moveToElementText(e);
			r.select();
		}
	});



	function customNumberSelect(e, that){
		if(jQuery(that.options[e.target.selectedIndex]).val() == 'custom'){
			var select = jQuery(that);
			select.find('option[value=custom]').remove();
			select.find('option:selected[value=custom]').prop("selected", false);
			select.trigger('chosen:updated');
			var input_div = jQuery('<div class="custom_paragraphs"><input type="text"><button class="button button-primary">Ввести</button></div>');
			select.parent().append(input_div);
			input_div.find('input').on('keypress', function(e){
				if(e.which == 13) {
					var value = parseInt(jQuery(this).val());
					if(select.find('option[value=' + value + ']').length > 0){
						select.find('option[value=' + value + ']').attr('selected','selected');
						select.trigger('chosen:updated');
					}
					else if(value && jQuery.inArray(value + '', select.val()) == -1){
						var option = jQuery("<option></option>");
						option.attr("value",value).text(value);
						select.append(option);
						option.attr('selected','selected');
						select.trigger('chosen:updated');
					}
					jQuery(this).val('');
				}
			});
			input_div.find('button').on('click', function(){
				var input = jQuery(this).parent().find('input');
				var value = parseInt(input.val());
				if(select.find('option[value=' + value + ']').length > 0){
					select.find('option[value=' + value + ']').attr('selected','selected');
					select.trigger('chosen:updated');
				}
				else if(value && jQuery.inArray(value + '', select.val()) == -1){
					var option = jQuery("<option></option>");
					option.attr("value",value).text(value);
					select.append(option);
					option.attr('selected','selected');
					select.trigger('chosen:updated');
				}
				input.val('');
			});
		}
	}

	function customizeOsSelect(that){
		var select = jQuery(that);
		if(jQuery(that).val() && jQuery(that).val().indexOf('desktop') !== -1){
			select.find('option[value=Linux]').prop("selected", true);
			select.find('option[value="Mac OS"]').prop("selected", true);
			select.find('option[value=Windows]').prop("selected", true);
			select.find('option[value=Android]').prop("selected", false);
			select.find('option[value="Windows Mobile"]').prop("selected", false);
			select.find('option[value=iOS]').prop("selected", false);
			select.find('option:selected[value=desktop]').prop("selected", false);
			select.find('option:selected[value=all]').prop("selected", false);
			select.trigger('chosen:updated');
		}
		else if(jQuery(that).val() && jQuery(that).val().indexOf('mobile') !== -1){
			select.find('option[value=Android]').prop("selected", true);
			select.find('option[value="Windows Mobile"]').prop("selected", true);
			select.find('option[value=iOS]').prop("selected", true);
			select.find('option[value=Linux]').prop("selected", false);
			select.find('option[value="Mac OS"]').prop("selected", false);
			select.find('option[value=Windows]').prop("selected", false);
			select.find('option:selected[value=mobile]').prop("selected", false);
			select.find('option:selected[value=all]').prop("selected", false);
			select.trigger('chosen:updated');
		}
		else if(jQuery(that).val() && jQuery(that).val().indexOf('all') !== -1 && jQuery(that).val().length == 2) {
			select.find('option:selected[value=all]').prop("selected", false);
			select.trigger('chosen:updated');
		}
		else if(jQuery(that).val() && jQuery(that).val().indexOf('all') !== -1){
			select.find('option:selected[value=all]').prop("selected", true);
			select.find('option[value=Android]').prop("selected", false);
			select.find('option[value="Windows Mobile"]').prop("selected", false);
			select.find('option[value=iOS]').prop("selected", false);
			select.find('option[value=Linux]').prop("selected", false);
			select.find('option[value="Mac OS"]').prop("selected", false);
			select.find('option[value=Windows]').prop("selected", false);
			select.find('option:selected[value=mobile]').prop("selected", false);
			select.find('option:selected[value=desktop]').prop("selected", false);
			select.trigger('chosen:updated');
		}
	}

	$('#adplacer_exclude_all').on('change', function() {
		var checkboxes = $('.adsplacer_checkbox');
		var checkbox = $(this);
		var checkbox_other = checkboxes.not('#adplacer_exclude_all');

		if (checkbox.is(':checked')) {
			checkbox_other.attr('disabled', true);
		} else {
			checkbox_other.removeAttr('disabled');
		}
	});

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
        //modal.fadeIn().adsplacerProCenter();

		if(id == '#addShortcodeModal'){
			setTimeout(function(){
				jQuery('#os').chosen();
				jQuery('#os').on('change', function(){
					customizeOsSelect(this);
				});
				jQuery('#template').on('change', function(e){
					var value = $(this).val();
					if(value){
						for(var k = 0; k < value.length; k++){
							if(value[k] === '0'){
                                $(this).val('');
                                jQuery('#template').trigger('chosen:updated');
							}
						}
					}
					if(parseInt(value)){
						jQuery('#contentValue').attr('disabled', true);
						jQuery('.new.adsplacer-block-overlay').show();
					}
					else {
						jQuery('#contentValue').attr('disabled', false);
						jQuery('.new.adsplacer-block-overlay').hide();
					}
				});
				jQuery('#country').chosen();
				jQuery('#city').chosen();
				jQuery('#browser').chosen();
				jQuery('#origin').chosen();
				jQuery('#author').chosen();
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
				jQuery('#tag-img').chosen();
				jQuery('#tag-img').on('change', function(e){
					customNumberSelect(e, this);
				});
				jQuery('#taxonomy').chosen();
				jQuery('#post_tag').chosen();
				jQuery('#template').chosen();
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

	jQuery('a.open-modal-button').click(function() {
		var id = jQuery(this).attr('href');
		if (jQuery(id).size() != 0) openModal(id);

		if(id == '#showStatistic'){
			populateStatistic(jQuery(this).data('id'));
		}
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

	$('#addNewTemplateButton').click(function(){
		jQuery('#contentValue-html').click();
		var button = $(this);
		var progressIcon = $('#addShortcodeProgress');
		var pResult = $('p#addResult');

		var sendData = {};
		sendData.action = 'adsplacer_pro_new_template';
		sendData.content = $('#contentValue').val();
		sendData.description = $('[name=description]').val();
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

	$('#addNewShortcodeButton').click(function() {
		jQuery('#contentValue-html').click();
		var button = $(this);
		var progressIcon = $('#addShortcodeProgress');
		var pResult = $('p#addResult');

		sendData = {};
		sendData.action = 'adsplacer_pro_new_ad';
		sendData.country = $('[name="countries[]"]').val();
		sendData.city = $('[name="cities[]"]').val();
		sendData.os = $('[name="oses[]"]').val();
		sendData.browser = $('[name="browsers[]"]').val();
		sendData.origin = $('[name="origins[]"]').val();
		sendData.author = $('[name="authors[]"]').val();
		sendData.post = $('[name="posts"]').val();
		sendData.first_time = $('#first_time:checked').length;
		sendData.ab_testing = $('#ab_testing:checked').length;
		sendData.paragraph = $('[name="paragraphs[]"]').val();
		sendData.tag = {};
		sendData.tag.h2 = $('[name="tag-h2[]"]').val();
		sendData.tag.h3 = $('[name="tag-h3[]"]').val();
		sendData.tag.img = $('[name="tag-img[]"]').val();
		sendData.taxonomy = $('[name="taxonomies[]"]').val();
		sendData.post_tag = $('[name="post_tags[]"]').val();
		sendData.content = $('#contentValue').val();
		sendData.template = $('[name="template"]').val();
		sendData.description = $('[name=description]').val();
		sendData.timing_enabled = $('.new-timing [name=timing_enabled]:checked').length;
		if($('.new-timing [name=timing_enable_work_till]:checked').length){
			sendData.timing_enable_work_till = true;
			sendData.timing_from = $('.new-timing [name=timing_work_from]').val();
			sendData.timing_till = $('.new-timing [name=timing_work_till]').val();
		}
		else {
			sendData.timing_enable_work_till = false;
		}
		sendData.timing = [];
		jQuery.each(jQuery('.new-timing .green'), function(){
			sendData.timing[sendData.timing.length] = {'day': jQuery(this).attr('weekday'), 'hour': jQuery(this).attr('hour')};
		});
		if(window.adsplacer_pro_page == 'adsplacer_pro_union_shortcodes'){
			sendData.location = $('li.ui-state-active a').data('location'); // открытая в данный момент вкладка. Для страницы объединенный шорткод
		}
		else {
			sendData.location = $('[name=location]').val();
		}
		sendData.new_nonce = button.data('addNonce');

		progressIcon.removeClass('hidden');
		button.prop('disabled', true);
		pResult.text('').removeClass('success error');

		$.post(ajaxurl, sendData, function(data) {
			// data = $.parseJSON(data);

			if (data.success) {
				pResult.addClass('success').text(data.success);
				progressIcon.addClass('hidden');
				if(window.adsplacer_pro_page == 'adsplacer_pro_union_shortcodes'){
					setTimeout(function(){
						var goUrl = location.protocol+'//'+location.host+location.pathname+(location.search?location.search:"") + '#' + $('li.ui-state-active a').data('location');
						window.location.replace(goUrl);
						window.location.reload();
					}, 300);
				}
				else {
					setTimeout("window.location.reload()", 300);
				}
			} else {
				if (data.error) pResult.addClass('error').text(data.error); else pResult.addClass('error').text('Unknown error, please contact the plugin developers...');
				button.prop('disabled', false);
				progressIcon.addClass('hidden');
			}
		}, 'json');

		return false;
	});

	$('.cloneShortcodeModal').click(function(){
		if(!confirm('Вы уверены?'))
			return ;

		var nonce = $('input[name=nonce_clone]').val();
		var id = $(this).data('id');
		var sendData = {};
		sendData.id = id;
		sendData.action = 'adsplacer_pro_clone_shortcode';
		sendData.nonce = nonce;

		$.post(ajaxurl, sendData, function(data) {
			if (data.success) {
				setTimeout("window.location.reload()", 300);
			} else {
				alert('Произошла ошибка');
			}
		}, 'json');
	});

	$('a.submitdelete').click(function() {
		if(!confirm('Are you sure?'))
			return ;
		var id = $(this).data('id');
		var nonce = $('input[name=nonce_del]').val();
		var parentTr = $(this).parents('tr');

		$.post(ajaxurl, {id: id, del_nonce: nonce, action: 'adsplacer_pro_delete_ad'}, function(data) {
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

	$('a.submitdeletetemplate').click(function() {
		if(!confirm('Are you sure?'))
			return ;
		var id = $(this).data('id');
		var nonce = $('input[name=nonce_del]').val();
		var parentTr = $(this).parents('tr');

		$.post(ajaxurl, {id: id, del_nonce: nonce, action: 'adsplacer_pro_delete_template'}, function(data) {
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
		sendData.action 		= 'adsplacer_pro_view_ad';

		var value_input 		= $('#editableValue');
		var editButton 			= $('#editShortcodeButton');
		var pResult 			= $('p#editResult');

		var description_input 	= $('#editableShortcodeDescription');
		var os 					= $('#edit-os');
		var country 			= $('#edit-country');
		var city 				= $('#edit-city');
		var browser 			= $('#edit-browser');
		var origin 				= $('#edit-origin');
		var author 				= $('#edit-author');
		var post 				= $('#edit-post');
		var first_time 			= $('#edit-first_time');
		var ab_testing 			= $('#edit-ab_testing');
		var template 			= $('#edit-template');
		var paragraph 			= $('#edit-paragraph');
		var tag 				= $('#edit-tag');
		var taxonomy 			= $('#edit-taxonomy');
		var post_tag 			= $('#edit-post_tag');
		var timing_enabled 		= $('.edit-timing [name=timing_enabled]');

		openModal(modalID);

		$.post(ajaxurl, sendData, function(data) {
			if (data.success) {
				description_input.val(data.success.description);
				value_input.val(data.success.value);
				os.val(data.success.os);
				country.val(data.success.country);
				city.val(data.success.city);
				browser.val(data.success.browser);
				origin.val(data.success.origin);
                author.val(data.success.author);
                post.val(data.success.post);
				if(parseInt(data.success.first_time)){
					first_time.prop('checked', true);
				}
				else {
					first_time.prop('checked', false);
				}
				if(parseInt(data.success.ab_testing)){
					ab_testing.prop('checked', true);
				}
				else {
					ab_testing.prop('checked', false);
				}
				if(data.success.template){
					value_input.attr('disabled', true);
					var ids = [];
					for(var k = 0; k < data.success.template.length; k++){
                        ids[ids.length] = data.success.template[k].id;
					}
					template.val(ids);
					jQuery('.edit.adsplacer-block-overlay').show();
				}
				else {
					value_input.attr('disabled', false);
					// template.val(0);
					jQuery('.edit.adsplacer-block-overlay').hide();
				}
				if(data.success.timing_enabled){
					jQuery('.edit-timing [name=timing_enabled]').attr('checked', 'checked');
					jQuery('.edit-timing .timetable-overlay.days-table').hide();
				}
				else {
					jQuery('.edit-timing [name=timing_enabled]').attr('checked', false);
					jQuery('.edit-timing .timetable-overlay.days-table').show();
				}
				if(data.success.timing_from && data.success.timing_till){
					jQuery('.edit-timing [name=timing_enable_work_till]').attr('checked', 'checked');
					jQuery('.edit-timing .timetable-overlay.work-till').hide();
					jQuery('.edit-timing [name=timing_work_from]').val(data.success.timing_from);
					jQuery('.edit-timing [name=timing_work_till]').val(data.success.timing_till);
				}
				else {
					jQuery('.edit-timing [name=timing_enable_work_till]').attr('checked', false);
					jQuery('.edit-timing .timetable-overlay.work-till').show();
					jQuery('.edit-timing [name=timing_work_from]').val('');
					jQuery('.edit-timing [name=timing_work_till]').val('');
				}
				for(var i = 0; i < data.success.paragraph.length; i++){
					if(data.success.paragraph[i] > 20){
						paragraph.find('option[value=' + data.success.paragraph[i] + ']').remove();
						paragraph.append(jQuery("<option></option>").attr("value",data.success.paragraph[i]).text(data.success.paragraph[i]));
					}
				}
				paragraph.val(data.success.paragraph);
				if(Object.keys(data.success.tags).length > 0){
					var keys = Object.keys(data.success.tags);
					for(var l = 0; l < keys.length; l++){
						var tag = keys[l];
						var numbers = data.success.tags[tag];
						for(var m = 0; m < numbers.length; m++){
							if(parseInt(numbers[m]) > 10){
								$('#edit-tag-' + tag).append(jQuery("<option></option>").attr("value", numbers[m]).text(numbers[m]));
							}
						}
						$('#edit-tag-' + tag).val(data.success.tags[tag]);
					}
				}
				taxonomy.val(data.success.taxonomy);
				post_tag.val(data.success.post_tag);
				jQuery('.edit-timing .stop_hours').addClass('red').removeClass('green');
				for(var v = 0; v < data.success.timing.length; v++){
					var b = data.success.timing[v];
					jQuery('.edit-timing .weekday_' + b.day + '.hour_' + b.hour).addClass('green').removeClass('red');
				}
				setTimeout(function(){
					jQuery('#edit-os').chosen();
					jQuery('#edit-os').trigger('chosen:updated');
					jQuery('#edit-os').on('change', function(){
						customizeOsSelect(this);
					});
					jQuery('#edit-template').on('change', function(){
                        var value = $(this).val();
                        if(value){
                            for(var k = 0; k < value.length; k++){
                                if(value[k] === '0'){
                                    $(this).val('');
                                    jQuery('#edit-template').trigger('chosen:updated');
                                }
                            }
                        }
						if(parseInt($(this).val())){
							jQuery('#editableValue').attr('disabled', true);
							jQuery('.edit.adsplacer-block-overlay').show();
						}
						else {
							jQuery('#editableValue').attr('disabled', false);
							jQuery('.edit.adsplacer-block-overlay').hide();
						}
					});
					jQuery('#edit-country').chosen();
					jQuery('#edit-country').trigger('chosen:updated');
					jQuery('#edit-city').chosen();
					jQuery('#edit-city').trigger('chosen:updated');
					jQuery('#edit-browser').chosen();
					jQuery('#edit-browser').trigger('chosen:updated');
					jQuery('#edit-origin').chosen();
					jQuery('#edit-origin').trigger('chosen:updated');
					jQuery('#edit-author').chosen();
					jQuery('#edit-author').trigger('chosen:updated');
					jQuery('#edit-paragraph').chosen();
					jQuery('#edit-tag-h2').chosen();
					jQuery('#edit-tag-h2').trigger('chosen:updated');
					jQuery('#edit-tag-h2').on('change', function(e){
						customNumberSelect(e, this);
					});
					jQuery('#edit-tag-h3').chosen();
					jQuery('#edit-tag-h3').trigger('chosen:updated');
					jQuery('#edit-tag-h3').on('change', function(e){
						customNumberSelect(e, this);
					});
					jQuery('#edit-tag-img').chosen();
					jQuery('#edit-tag-img').trigger('chosen:updated');
					jQuery('#edit-tag-img').on('change', function(e){
						customNumberSelect(e, this);
					});
					jQuery('#edit-paragraph').trigger('chosen:updated');
					jQuery('#edit-paragraph').on('change', function(e){
						customNumberSelect(e, this);
					});
					jQuery('#edit-taxonomy').chosen();
					jQuery('#edit-taxonomy').trigger('chosen:updated');
					jQuery('#edit-post_tag').chosen();
					jQuery('#edit-post_tag').trigger('chosen:updated');
					jQuery('#edit-template').chosen();
					jQuery('#edit-template').trigger('chosen:updated');



					var dateFormat = "yy-mm-dd",
						edit_from = $(".edit-timing [name=timing_work_from]")
							.datepicker({
								defaultDate: "+1w",
								changeMonth: true,
								changeYear: true,
								dateFormat: dateFormat,
								numberOfMonths: 1
							})
							.on( "change", function() {
								edit_to.datepicker( "option", "minDate", getDate( this, dateFormat ) );
							}),
						edit_to = $( ".edit-timing [name=timing_work_till]" ).datepicker({
							defaultDate: "+1w",
							changeMonth: true,
							changeYear: true,
							dateFormat: dateFormat,
							numberOfMonths: 1
						})
							.on( "change", function() {
								edit_from.datepicker( "option", "maxDate", getDate( this, dateFormat ) );
							});
					jQuery('.edit-timing [name=timing_enable_work_till]').on('change', function(){
						if(jQuery(this).attr('checked') != 'checked'){
							jQuery('.edit-timing .timetable-overlay.work-till').show();
						}
						else {
							jQuery('.edit-timing .timetable-overlay.work-till').hide();
						}
					});

					jQuery('.edit-timing [name=timing_enabled]').on('change', function(){
						if(jQuery(this).attr('checked') != 'checked'){
							jQuery('.edit-timing .timetable-overlay.days-table').show();
						}
						else {
							jQuery('.edit-timing .timetable-overlay.days-table').hide();
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

	$('a.submitedittemplate').click(function() {
		var modalID = $(this).attr('href');
		var id = $(this).data('id');
		var nonce = $('input[name=nonce_view]').val();
		var progressContainer = $('#viewShortcodeProgressContainer');
		var form = $('#editable');

		var sendData = {};
		sendData.id = id;
		sendData.view_nonce = nonce;
		sendData.action = 'adsplacer_pro_view_template';

		var description_input = $('#editableShortcodeDescription');
		var value_input = $('#editableValue');
		var editButton = $('#editTemplateButton');
		var pResult = $('p#editResult');


		openModal(modalID);

		$.post(ajaxurl, sendData, function(data) {
			if (data.success) {
				description_input.val(data.success.description);
				value_input.val(data.success.value);
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
		sendData.action = 'adsplacer_pro_update_ad';
		sendData.country = $('#edit-country').val();
		sendData.city = $('#edit-city').val();
		sendData.os = $('#edit-os').val();
		sendData.browser = $('#edit-browser').val();
		sendData.origin = $('#edit-origin').val();
		sendData.author = $('#edit-author').val();
		sendData.post = $('#edit-post').val();
		sendData.first_time = $('#edit-first_time:checked').length;
		sendData.ab_testing = $('#edit-ab_testing:checked').length;
		sendData.paragraph = $('#edit-paragraph').val();
		sendData.template = $('#edit-template').val();
		sendData.tag = {};
		sendData.tag.h2 = $('#edit-tag-h2').val();
		sendData.tag.h3 = $('#edit-tag-h3').val();
		sendData.tag.img = $('#edit-tag-img').val();
		sendData.taxonomy = $('#edit-taxonomy').val();
		sendData.post_tag = $('#edit-post_tag').val();
		if($('.edit-timing [name=timing_enable_work_till]:checked').length){
			sendData.timing_enable_work_till = true;
			sendData.timing_from = $('.edit-timing [name=timing_work_from]').val();
			sendData.timing_till = $('.edit-timing [name=timing_work_till]').val();
		}
		else {
			sendData.timing_enable_work_till = false;
		}
		sendData.timing_enabled = $('.edit-timing [name=timing_enabled]:checked').length;
		sendData.timing = [];
		jQuery.each(jQuery('.edit-timing .green'), function(){
			sendData.timing[sendData.timing.length] = {'day': jQuery(this).attr('weekday'), 'hour': jQuery(this).attr('hour')};
		});

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
				if(window.adsplacer_pro_page == 'adsplacer_pro_union_shortcodes'){
					setTimeout(function(){
						var goUrl = location.protocol+'//'+location.host+location.pathname+(location.search?location.search:"") + '#' + $('li.ui-state-active a').data('location');
						window.location.replace(goUrl);
						window.location.reload();
					}, 300);
				}
				else {
					setTimeout("window.location.reload()", 300);
				}
			} else {
				if (data.error) pResult.addClass('error').text(data.error); else pResult.addClass('error').text('Unknown error, please contact the plugin developers...');
				button.prop('disabled', false);
				progressIcon.addClass('hidden');
			}
		}, 'json');

		return false;
	});

	$('#editTemplateButton').click(function() {
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
		sendData.action = 'adsplacer_pro_update_template';

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



function addUnionShortCode()
{
	if(confirm("Добавить новый шорткод?")){
		jQuery('#adsplacer_union_shortcodes_form').submit();
	}
	else {
		return false;
	}
}

function populateStatistic(id)
{
	var title = adsplacerStatistic[id][0].ad.name;
	jQuery('#stat-title').text(title);
	var content = '';
	for (var i in adsplacerStatistic[id]) {
		if (adsplacerStatistic[id].hasOwnProperty(i)) {
			content += '<tr class="alternate">';
			content += '<td>' + adsplacerStatistic[id][i].template.name + '</td>';
			if(adsplacerStatistic[id][i].ad.location == 2){
				content += '<td>' + adsplacerStatistic[id][i].row.tag + ' - ' + adsplacerStatistic[id][i].row.p_number + '</td>';
			}
			else if(adsplacerStatistic[id][i].ad.location == 1){
				content += '<td>Перед контентом</td>';
			}
			else if(adsplacerStatistic[id][i].ad.location == 3){
				content += '<td>После контента</td>';
			}
			else if(adsplacerStatistic[id][i].ad.location > 1000 && adsplacerStatistic[id][i].ad.location < 2000){
				content += '<td>[adsp-pro-' + adsplacerStatistic[id][i].ad.location + ']</td>';
			}
			content += '<td class="tac">' + adsplacerStatistic[id][i].row.views + '</td>';
			content += '<td class="tac">' + adsplacerStatistic[id][i].row.clicks + '</td>';
			if(adsplacerStatistic[id][i].row.views !== "0"){
				var percent = Math.round(adsplacerStatistic[id][i].row.clicks / adsplacerStatistic[id][i].row.views * 100 * 100) / 100;
			}
			else {
				var percent = 0;
			}
			content += '<td class="tac percent" data-percent="' + percent + '">' + percent + '%</td>';
			content += '</tr>';
		}
	}
	jQuery('#showStatistic').find('tbody').html(content);
	for(var h = 0; h < jQuery('.tac.percent').length; h++){
		if(typeof highest === 'undefined'){
			var highest = parseFloat(jQuery(jQuery('.tac.percent')[h]).data('percent'));
			var highestKey = h;
		}
		if(typeof highest !== 'undefined' && parseFloat(jQuery(jQuery('.tac.percent')[h]).data('percent')) > highest){
			highest = parseFloat(jQuery(jQuery('.tac.percent')[h]).data('percent'));
			highestKey = h;
		}
	}
	jQuery(jQuery('.tac.percent')[highestKey]).parent().addClass('highest');


	jQuery.ajax({
		url: '/wp-admin/admin-ajax.php',
		data: {
			action: 'adsplacer_pro_last_week_statistics',
			id : id,
			type : 1
		},
		type: 'POST',
		success: function(data) {
			window.adsplacerClicksArray = data;
			var days = [];
			for(var k = 6; k >= 0; k--){
				var day = new Date();
				day.setDate(day.getDate() - k);
				days[days.length] = day.getDate();
			}
			var config = {
				type: 'line',
				data: {
					labels: days,
					datasets: [{
						label: "Клики",
						backgroundColor: '#ca8d8d',
						borderColor: '#ca8d8d',
						data: data,
						fill: false,
					}]
				},
				options: {
					responsive: true,
					title:{
						display:true,
						text:'Суммарный график кликов объявления за последнюю неделю'
					},
					tooltips: {
						callbacks: {
							title : function(){return '';}
						},
						mode: 'index',
						intersect: false,
					},
					hover: {
						mode: 'nearest',
						intersect: true
					},
					scales: {
						xAxes: [{
							display: true,
							scaleLabel: {
								display: true,
								labelString: 'День'
							}
						}],
						yAxes: [{
							display: true,
							scaleLabel: {
								display: true,
								labelString: 'Количество'
							}
						}]
					}
				}
			};
			jQuery('#canvas_clicks').after('<span id="canvas_clicks_span"></span>');
			jQuery('#canvas_clicks').remove();
			jQuery('#canvas_clicks_span').after('<canvas id="canvas_clicks" style="width: 100%;">');
            jQuery('#canvas_clicks_span').remove();
			var ctx = document.getElementById("canvas_clicks").getContext("2d");
			window.myLine = new Chart(ctx, config);
			jQuery.ajax({
				url: '/wp-admin/admin-ajax.php',
				data: {
					action: 'adsplacer_pro_last_week_statistics',
					id : id,
					type : 2
				},
				type: 'POST',
				success: function(views) {
					var data = [];
					for(var m = 0; m < 7; m++){
						if(views[m] == 0){
							data[data.length] = 0;
						}
						else {
							data[data.length] = Math.round(window.adsplacerClicksArray[m] / views[m] * 100 * 100) / 100;
						}
					}
					var days = [];
					for(var k = 6; k >= 0; k--){
						var day = new Date();
						day.setDate(day.getDate() - k);
						days[days.length] = day.getDate();
					}
					var config2 = {
						type: 'line',
						data: {
							labels: days,
							datasets: [{
								label: "CTR",
								backgroundColor: '#ca8d8d',
								borderColor: '#ca8d8d',
								data: data,
								fill: false,
							}]
						},
						options: {
							responsive: true,
							title:{
								display:true,
								text:'Суммарный график CTR объявления за последнюю неделю'
							},
							tooltips: {
								callbacks: {
									title : function(){return '';}
								},
								mode: 'index',
								intersect: false,
							},
							hover: {
								mode: 'nearest',
								title : '',
								intersect: true
							},
							scales: {
								xAxes: [{
									display: true,
									scaleLabel: {
										display: true,
										labelString: 'День'
									}
								}],
								yAxes: [{
									display: true,
									scaleLabel: {
										display: true,
										labelString: '%'
									}
								}]
							}
						}
					};
                    jQuery('#canvas_ctr').after('<span id="canvas_ctr_span"></span>');
                    jQuery('#canvas_ctr').remove();
                    jQuery('#canvas_ctr_span').after('<canvas id="canvas_ctr" style="width: 100%;">');
                    jQuery('#canvas_ctr_span').remove();
					var ctx2 = document.getElementById("canvas_ctr").getContext("2d");
					window.myLine2 = new Chart(ctx2, config2);
				},
				dataType: 'json'
			});
		},
		dataType: 'json'
	});

}