$(document).ready(function() {

    showLead();

    $("#formAddUser").submit(function(){ // пeрeхвaтывaeм всe при сoбытии oтпрaвки
    	var form = $(this), // зaпишeм фoрму, чтoбы пoтoм нe былo прoблeм с this
    		data = form.serialize(); // пoдгoтaвливaeм дaнныe
        $.ajax({ // инициaлизируeм ajax зaпрoс
            type: 'POST', // oтпрaвляeм в POST фoрмaтe, мoжнo GET
            url: '../php/logic.php', // путь дo oбрaбoтчикa, у нaс oн лeжит в тoй жe пaпкe
            dataType: 'json', // oтвeт ждeм в json фoрмaтe
            data: data,
            complete: function(data){ // сoбытиe пoслe удaчнoгo oбрaщeния к сeрвeру и пoлучeния oтвeтa
            	$("#AddWorker").modal('hide');
            	showLead();
            },
            error: function(data){
            	showLead();
            }
        });
        return false;
    });

    function showLead(){ // вывод лидов
	    $.getJSON('../php/db.json', function(data) {
	        var output = "<tr>",
				numberUser = 1, // счетчик
                fio = ""; // соединение имени и фамилии
	        for(var i in data) {
                fio = data[i].name + " " + data[i].lastname + " " + data[i].surname;
	            output += "<tr><th scope='row'>" + numberUser + "</th><td>" + data[i].position + "</th><td>" + fio + "</th><td>" + data[i].birthday + "</th><td>" + data[i].dateWork + "</th><td>" + data[i].subdivision + "</th><td>" + data[i].spell + "</td></tr>";
	            numberUser ++;
	        }
	        output += "</tr>";
	        $('#json').html(output); // вывод на страницу
	  	});
	}


      function filterUser(position,subdivision){
       $.ajax({
       url: "../php/db.json",
       type: "POST", 
       dataType: "json"})
       .done(function(j) {
           var str = '', // тут будем хранить строку которую вставим в документ
               name = '', // тут соберем имя до купы
               a = 1;  // счетчик
           for(var i in j){

               /* если не передали должность, то пропускаем это условие */
               if(position !== 'none'){
               /* если данный обьект не тот который мы ищем, то выпрыгиваем из итерации */
                   if( j[i]['position'] !== position){
                        continue 
                   }// фильтр 
               }

                /* если не передали подразделение, то пропускаем это условие */
               if(subdivision !== 'none'){
                /* если данный обьект не тот который мы ищем, то выпрыгиваем из итерации */
                   if( j[i]['subdivision'] !== subdivision){
                       continue 
                   }// фильтр 
               }

               if(!j[i]['text']){
                   j[i]['text'] = ''; 
               }// заменяем на строку если null
               
               name = j[i]['name'] + ' ' + j[i]['lastname'] + ' ' + j[i]['surname'];   // собираем имя

               str += "<tr><th scope='row'>" + a + "</th><td>" + j[i]['position'] + "</td><td>" + name + "</td><td>" + j[i]['birthday'] + "</td><td>" + j[i]['dateWork'] + "</td><td>" + j[i]['subdivision'] + "</td><td>" + j[i]['spell'] + "</td></tr>";
               a++;
           }
           $('#json').html(str);
    })}

    $('#sendFilter').on('click',function(){
       var position = $('#formFilter #position').find('option:selected').val(),
           subdivision = $('#formFilter #subdivision').find('option:selected').val();
       console.log(position,subdivision);
       filterUser(position,subdivision);
    });

});