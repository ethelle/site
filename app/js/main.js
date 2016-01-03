var app = (function(){

	var init = function(){
		setUpListeners();
	};

	var setUpListeners = function(){
		$('form').on('submit', checkForm);
		$('.add').on('click', showForm);
		$('.popap-close').on('click', hideForm);
        $('.add-progect').on('click', hideForm);
		$('.file').on('change', showText);

	};

	var showText =function(){
		console.log($(this).val());
        var file_name =$(this).val().replace( "C:\\fakepath\\", '' );
		$('.fakeinput').html(file_name);
	};

	var showForm = function(){
		$('.add-progect').show();
		$('.popap').show();
	};
 	var hideForm = function(){
		$('.add-progect').hide();
		$('.popap').hide();
	};


	var checkForm = function(e){

		e.preventDefault();

		var form = $(this);
		var items = form.find('input, textarea').not('input[type="submit"]');
        var tooltips = form.find('.err-text');
   //     console.log(tooltips);
		var flag = true;

		$.each(items, function(index, val){
			var content = $(val).val();
			if(content.length === 0){
				$(this).addClass("error");
				showTooltip(index);
                if (index==1) {
                    $(".fakeinput").addClass("error");
                }                
            //    console.log(index);
				flag = false;
			} else {
				$(this).removeClass("error");
                hideTooltip(index);
                 if (index==1) {
                    $(".fakeinput").removeClass("error");
                }  
			}
		});


		if(flag){
			submitForm(form);
		}

	};

	var submitForm = function(form){
		var url = form.attr("action");

		var data = form.serialize();

		$.ajax({
			url: url,
			type: 'POST',
			dataType: 'json',
			data: data
		}).done(
			function(data){
				console.log(data.status);
			}
		).fail( function(){
			console.log("Ошибка");
		});

	};


	var showTooltip = function(index){
        var aaa ='.err-text' + '#err'+index;
        $(aaa).show();
	};
    
   var hideTooltip = function(index){
        var aaa ='.err-text' + '#err'+index;
        $(aaa).hide();
	};
    
	return{
		init:init
	}
}());


app.init();
