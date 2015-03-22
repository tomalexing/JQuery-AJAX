;$(function() {
var $orders = $('#orders');
var $name = $('#name');
var $drink = $('#drink');
	$.ajax({
		type:'GET',
		url:'/api/orders',
		success: function(data) {
			$.each(data, function(i, order){
				$orders.append('<li>Name: '+order.name+', Drink: '+order.drink+'  <button id = '+ order.id+' class ="remove"> X </button> </li> ');
			});
		},
		error: function() {
			alert('error loading orders');
		}
	});

	function submit() {
	 	var order = {
			name: $name.val(),
			drink: $drink.val()
		};
		success = function (){
					var prev = ($orders.find('li').last().find('button').attr('id')||0) ;
					$orders.append('<li>Name: '+order.name+', Drink: '+order.drink+'   <button id = '+(	1+1*prev ) +'  class ="remove"> X </button> </li> ');
					$name.val("");
					$drink.val("");
			}();
		$.ajax({
			type: 'POST',
			url: '/api/orders',
			data: order,
        	
			error: function() {
			alert('error sending orders');
			}
		});
	};
	$('#add-order').on('click',function() {
		submit();
	});
	$("input").keypress(function(e) {
		if(e.which === 13)
			submit();
	});

	$orders.delegate('.remove', 'click',function() {
		var $li = $(this).closest('li');
		success = function (){
			$li.fadeOut(300,function() { 
				$(this).remove();
			});
		}();
		$.ajax({
			type: 'DELETE',
			url: '/api/orders/' + $(this).attr("id")
		});
	});


});