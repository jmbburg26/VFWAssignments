//John Brandenburg
//Project 3
//Term: 0113

window.addEventListener("DOMContentLoaded", function(){

	//Save Data Function
	function sData(x){
		var userElements = document.getElementById(x);
		return userElements;
	}
	
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
			sData('boom').style.display = "inline";
			sData('displayDataLink').style.display = "none";
			sData('addAssignment').style.display = "inline";
			break;
		case "off":
			sData('form').style.display = "block";
			sData('boom').style.display = "inline";
			sData('displayDataLink').style.display = "inline";
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
			userItem.course		= ["Course:", sData('course').value];
			userItem.answer		= ["Project Due:", dueValue];
			userItem.date		= ["Date:", sData('date').value];
			userItem.notes		= ["Notes:", sData('notes').value];
			userItem.complete	= ["Hours To Complete:", sData('complete').value];
		localStorage.setItem(userValues, JSON.stringify(userItem));
		alert("Homework Added!");
	}	
	
	//Variable Defaults
	var selectCourses = ["-- Current Courses --", "MMD", "MMD2", "SDI", "VFW", "PMA", "PMA 2"],
		dueValue;
	

	makeCourses();
	
	function getData(){
		dataControls("on");
		if(localStorage.length === 0){
			alert("There are no assignments in Local Storage.");
		}
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
				makeNewSubli.innerHTML = optSubText;
				newSubList.appendChild(newLinksLi);
			}
			newItemLinks(localStorage.key(i), newLinksLi); //Create "delete" and "edit" buttons for items in local storage
		}
	}
	
	//Make Item Links
	function newItemLinks(key, newLinksLi){
		var newLinksLi = document.createElement('li');
		//Edit single item link
		var editLink = document.createElement('a');
		editLink.href = "#";
		editLink.key = key;
		var editHWork = "Edit Assignment";
		editLink.addEventListener("click", editAssignment);
		editLink.innerHTML = editHWork;
		newLinksLi.appendChild(editHWork);
		
		//add break tag
		var lineBreak = document.createElement('br');
		newLinksLi.appendChild(lineBreak);
		
		//Delete single item link
		var deleteLink = document.createElement('a');
		deleteLink.href = "#";
		deleteLink.key = key;
		var deleteHWork = "Delete Assignment";
		//deleteLink.addEventListener("click", deleteAssignment);
		deleteLink.innerHTML = deleteHWork;
		newLinksLi.appendChild(deleteHWork);
	}
	
	function editAssignment(){
		var value = localStorage.getData(this.key);
		var userItem = JSON.parse(value);
		
		//Show form
		dataControls("off");
		
		//populate form 
		sData('fname').value = userItem.fname[1];
		sData('email').value = userItem.email[1];
		sData('course').value = userItem.course[1];
		var radioValue = document.forms[0].dueValue;
		for(var i=0; i<radioValue.length; i++){
			if(radioValue[i].value == "Yes" && userItem.dueValue[1] == "Yes"){
				radioValue[i].setAttribute("checked", "checked");
			} else if(radioValue[i].value == "No" && userItem.dueValue = "No"){
				radioValue[i].setAttribute("checked", "checked");
			} else if(radioValue[i].value == "Unknown" && userItem.dueValue = "Unknown"){
				radioValue[i].setAttribute("checked", "checked");
			}	
		}		
		sData('date').value = userItem.date[1];
		sData('notes').value = userItem.notes[1];
		sData('complete').value = userItem.complete[1];
		
		//Remove first listener form input "save assignment"
		save.removeEventListener("click", storeData);
		//Change save button to edit
		sData('save').value = "Edit Assignment";
		var editSave = sData('save');
		//
		editSave.addEventListener("click", validate);
		editSave.key = this.key;
		
	}
	
	//Clear Data
	function boomData(){
		if(localStorage.length === 0){
			alert("There is no assignment.")
		}else{
			localStorage.clear();
			alert("All homework has been deleted!");
			window.location.reload();
			return false;	
		}
	}
	
	function validate(){
	
	}
	
	//Button Links
	var displayLink = sData('displayDataLink');
	displayLink.addEventListener("click", getData);
	var clearLink = sData('boom');
	clearLink.addEventListener("click", boomData);
	var save = sData('save');
	save.addEventListener("click", storeData);
	
	
	
});