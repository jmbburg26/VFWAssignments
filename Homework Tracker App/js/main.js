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
	

	//Get Radio Button Value Function

	function getRadioButton(){
		var findRadios = document.forms[0].due;
		for (var i=0; i<findRadios.length; i++){
			if(findRadios[i].checked){
				dueValue = findRadios[i].value;
			}
		}
	}

	
	function dataControls(n){
		switch(n){
		case "on":
			sData('form').style.display = "none";
			sData('clearLink').style.display = "inline";
			sData('displayData').style.display = "none";
			sData('addAssignment').style.display = "inline";
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
	
	function storeData(){
		var userValues		=Math.floor(Math.random()*100000001);
		getRadioButton();
		
		var userItem			= {};
			userItem.fname		= ["Full Name:", sData('fname').value];
			userItem.email		= ["Email:", sData('email').value];
			userItem.course		= ["Course", sData('course').value];
			userItem.answer		= ["Project Due", dueValue];
			userItem.date		= ["Date", sData('date').value];
			userItem.notes		= ["Notes", sData('notes').value];
			userItem.complete	= ["Hours To Complete", sData('complete').value];
		localStorage.setItem(userValues, JSON.stringify(userItem));
		alert("Homework Added!");
	}	
	
	//Variable Defaults
	var selectCourses = ["-- Current Courses --", "MMD", "MMD2", "SDI", "VFW", "PMA", "PMA 2"],
		dueValue;
	

	makeCourses();
	
	function getData(){
		dataControls("on");
		//Write Data from Local Storage
		var makeDiv = document.createElement('div');
		makeDiv.setAttribute("id", "userItem");
		var newList = document.createElement('ul');
		makeDiv.appendChild(newList);
		document.body.appendChild(makeDiv);
		sData('userItem').style.display = "block";
		for(var i=0, j=localStorage.length; i<j; i++){
			var newli = document.createElement('li');
			var newLinksLi = document.createElement('li');
			newList.appendChild(newli);
			var key = localStorage.key(i);
			var value = localStorage.getItem(key);
			//Convert string back to object from JSON 
			var newObj = JSON.parse(value);
			var newSubList = document.createElement('ul');
			newli.appendChild(newSubList);
			for(var n in newObj){
				var makeNewSubli = document.createElement('li');
				newSubList.appendChild(makeNewSubli);
				var optSubText = newObj[n][0]+" "+newObj[n][1];
				makeSubli.innerHTML = optSubText;
				newSubList.appendChild(newLinksLi);
			}
			//newItemLinks();//Create and edit buttons for items in local storage
		}
	}

	//Clear Data
	function boomData(){
		if(localStorage.length === 0){
			alert("There is no assignment.")
		}else{
			alert("All homework has been deleted!");
			window.location.reload();
			return false;	
		}
	};
	
	
	//Button Links
	var displayLink = sData('displayDataLink');
	displayLink.addEventListener("click", getData);
	var clearLink = sData('boom');
	clearLink.addEventListener("click", boomData);
	var save = sData('save');
	save.addEventListener("click", storeData);
});