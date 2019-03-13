<?php

	header('Content-Type: text/html; charset=utf-8');
	
	$name = $_POST['WorkName'];
	$lastname = $_POST['WorkSurname'];
	$verylastname = $_POST['WorkPatronymic'];
	$skills = $_POST['WorkSpell'];
	$birthday = $_POST['birthday'];
	$dateWork = $_POST['dateWork'];
	//принимаем переменные

	if(isset($_POST['position']))
	{
	    $position = $_POST['position'];
	}

	if(isset($_POST['subdivision']))
	{
	    $subdivision = $_POST['subdivision'];
	}

	$name = htmlspecialchars($name);
	$lastname = htmlspecialchars($lastname);
	$verylastname = htmlspecialchars($verylastname);
	$skills = htmlspecialchars($skills);
	$position = htmlspecialchars($position);
	$subdivision = htmlspecialchars($subdivision);
	$birthday = htmlspecialchars($birthday);
	$dateWork = htmlspecialchars($dateWork);
	//Преобразовывает все символы

	$file = file_get_contents('db.json');
	// Открыть файл data.json
	          
	$taskList = json_decode($file,TRUE);
	// Декодировать в массив 

	unset($file);
	// Очистить переменную $file
	           
	$taskList[] = array(
		'name'=>$name,
		'lastname'=>$lastname,
		'surname'=>$verylastname,
		'spell'=>$skills,
		'birthday'=>$birthday,
		'dateWork'=>$dateWork,
		'position'=>$position,
		'subdivision'=>$subdivision
	);
	// Представить новую переменную как элемент массива, в формате 'ключ'=>'имя переменной'
	          
	file_put_contents('db.json',json_encode($taskList));
	// Перекодировать в формат и записать в файл.

	unset($taskList); 
	// Очистить переменную $taskList

?>