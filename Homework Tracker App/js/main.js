//John Brandenburg
//Project 2
//Term: 0113

window.addEventListener("DOMContentLoaded", function(){

//Save Data Function
	function $(x){
		var userElements = document.getElementById(x);
		return userElements;
	};
	
//Create Select Field Option
	function makeCourses(){
		var courseTag = document.getElementsByTagName("course"),
			selectLi = $('course'),
			makeSelect = document.createElement('course');
			makeSelect.setAttribute("id", "course");
		for(var i=0, j=selectCourses.length; i<j; i++){
			var makeOption = document.createElement('option');
			var optText = selectCourses[i];
			makeOption.setAttribute("value", optText);
			makeOption.innerHTML = optText;
			makeSelect.appendChild(makeOption);
		}
		selectLi.appendChild(makeSelect);	
	}
	
//Variable Defaults
var selectCourses = ["-- Current Courses --", "MMD2", "SDI", "VFW", "PMA"];
makeCourses();	
//Get Data Function

	function getRadioButton(){
		var radios = document.theForm[0].answer;
		for (var i=0; i<radios.length; i++){
			if(radios[i].checked){
			dueValue = radios[i].value;
			}
		}
	}
	
	function toggleControls(n){
		switch(n){
		case "on";
			$('form').style.display = "none";
			$('clearLink').style.display = "inline";
			$('displayData').style.display = "none";
			break;
		case "off";
			$('form').style.display = "block";
			$('clearLink').style.display = "inline";
			$('displayData').style.display = "inline";
			$('userItem').style.display = "none";
			break;
		default;
			return false;
		}
	};
	
	function storeData	(){
		var userValues		=Math.floor(Math.random()*100000001);
		
		var userItem			= {};
			userItem.fname		= ["Full Name:", $('fname').value];
			userItem.email		= ["Email:", $('email').value];
			userItem.course		= ["Course", $('course').value];
			userItem.date		= ["Date", $('date').value];
			userItem.notes		= ["Notes", $('notes').value];
			userItem.answer		= ["Project Due", dueValue];
			userItem.complete	= ["Hours To Complete", $('complete').value];
		localStorage.setItem(id, JSON.stringify(userItem));
		alert("Homework Added!");
	}	
	
	function getData(){
	toggleControls("on");

	//Write Data form Local Storage
	var makeDiv = document.createElement('div');
	makeDiv.setAttribute("id", "userItem");
	var makeList = document.createElement('ul');
	makeDiv.appendChild(makeList);
	document.body.appendChild(makeDiv);
	$('userItem').style.display = "block";
	for(var i=0, len=localStorage.length; i<len; i++){
		var makeli = document.createElement('li');
		makeList.appendChild(makeli);
		var key = localStorage.key(i);
		var value = localStorage.getItem(key);
		
		var obj = JSON.parse(value);
		var makeSubList = document.createElement('ul');
		makeli.appendChild(makeSubli);
		var optSubText = obj[n][0]+" "+obj[n][1];
		makeSubli.innerHTML = optSubText;
		}
	}

//Clear Data
	function clearData(){
		if(localStorage.length === 0){
			alert("There is no assignment.")
		}else{
			alert("All homework has been deleted!");
			window.location.reload();
			return false;	
		}
	};
	
	
//Button Links
	var displayLink = $('display');
	displayLink.addEventListener("click", getData);
	var clearLink = $('clear');
	clearLink.addEventListener("click", clearData);
	var save = $('save');
	save.addEventListener("click", storeData);
});