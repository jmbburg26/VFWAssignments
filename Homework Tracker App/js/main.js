//John Brandenburg
//Project 3
//Term: 0113

window.addEventListener("DOMContentLoaded", function(){

//Save Data Function
	function sData(x){
		var userElements = document.getElementById(x);
		return userElements;
	};
	
//Create Select Field Option
	function makeCourses(){
		var courseTag = document.getElementsByTagName("form"),
			selectLi = sData('select'),
			makeSelect = document.createElement('select');
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
		var radios = document.forms[0].answer;
		for (var i=0; i<radios.length; i++){
			if(radios[i].checked){
			dueValue = radios[i].value;
			}
		}
	}
	getRadioButton();
	
	function toggleControls(n){
		switch(n){
		case "on":
			sData('form').style.display = "none";
			sData('clearLink').style.display = "inline";
			sData('displayData').style.display = "none";
			break;
		case "off":
			sData('form').style.display = "block";
			sData('clearLink').style.display = "inline";
			sData('displayData').style.display = "inline";
			sData('userItem').style.display = "none";
			break;
		default:
			return false;
		}
	}
	
	function storeData	(){
		var userValues		=Math.floor(Math.random()*100000001);
		
		var userItem			= {};
			userItem.fname		= ["Full Name:", sData('fname').value];
			userItem.email		= ["Email:", sData('email').value];
			userItem.course		= ["Course", sData('course').value];
			userItem.date		= ["Date", sData('date').value];
			userItem.notes		= ["Notes", sData('notes').value];
			userItem.answer		= ["Project Due", dueValue];
			userItem.complete	= ["Hours To Complete", sData('complete').value];
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
	sData('userItem').style.display = "block";
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
	var displayLink = sData('display');
	displayLink.addEventListener("click", getData);
	var clearLink = sData('clear');
	clearLink.addEventListener("click", clearData);
	var save = sData('save');
	save.addEventListener("click", storeData);
});