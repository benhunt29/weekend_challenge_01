var Employee = function(firstName, lastName, empNum, empTitle, lastReviewScore, empSalary){
	//employee object constructor
	this.firstName = firstName;
	this.lastName = lastName;
	this.empNum = empNum;
	this.empTitle = empTitle;
	this.lastReviewScore = lastReviewScore;
	this.empSalary = empSalary;
}

// Returns a random integer between min (included) and max (included)
function getRandomIntInclusive(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomEmployee(array){
	var randomEmployee = new Employee();
	randomEmployee.firstName = array[0][getRandomIntInclusive(0,array[0].length-1)];
	randomEmployee.lastName = array[1][getRandomIntInclusive(0,array[1].length-1)];
	randomEmployee.empTitle = array[2][getRandomIntInclusive(0,array[2].length-1)];
	randomEmployee.empNum = getRandomIntInclusive(0,2000);
	randomEmployee.lastReviewScore = getRandomIntInclusive(1,5);
	randomEmployee.empSalary = getRandomIntInclusive(20000,200000);

	return randomEmployee;

};

function displayEmployee(addedEmployee){
	//insert new div for each added employee
	$('<div class = "existingEmployee"></div>').insertAfter('#topLevel');
	$addedEmployeeDiv = $('#topLevel').next();

	$addedEmployeeDiv.append('<ul></ul>');
	
	$addedEmployeeDivUl = $addedEmployeeDiv.children().first();
	//add the remove button to the added employee div
	$addedEmployeeDiv.prepend('<button id = "removeButton"> Remove Employee </button>')
	
	//add relevant employee info as list items
	$addedEmployeeDivUl.append('<li>' + labelArray[0] + " "+ addedEmployee.firstName + '</li>');
	$addedEmployeeDivUl.append('<li>' + labelArray[1] + " "+ addedEmployee.lastName + '</li>');
	$addedEmployeeDivUl.append('<li>' + labelArray[2] + " "+ addedEmployee.empNum + '</li>');
	$addedEmployeeDivUl.append('<li>' + labelArray[3] + " "+ addedEmployee.empTitle + '</li>');
	$addedEmployeeDivUl.append('<li>' + labelArray[4] + " $"+ addedEmployee.empSalary + '</li>');
	$addedEmployeeDivUl.append('<li>' + labelArray[5] + " "+ addedEmployee.lastReviewScore + '</li>');
	$($addedEmployeeDiv.attr('lastName',addedEmployee.lastName));
};

function applyRatingColor(rating){

	//choose CSS class based on rating
	switch(rating){
			case 1: 
				$addedEmployeeDiv.addClass('oneStarRating');
				break;
			case 2: 
				$addedEmployeeDiv.addClass('twoStarRating');
				break;
			case 3: 
				$addedEmployeeDiv.addClass('threeStarRating');
				break;
			case 4: 
				$addedEmployeeDiv.addClass('fourStarRating');
				break;
			case 5: 
				$addedEmployeeDiv.addClass('fiveStarRating');
				break;
			default: 

		};
};

function sortEmployees(){
	var $employeeElements = $('.existingEmployee');

	//use JS sort function with function defining how to sort
	$employeeElements.sort(function(a,b){
	//get last names of two elements
	var an = a.getAttribute('lastName');
	var bn = b.getAttribute('lastName');

	//sorting
	if(an > bn) {
		return 1;
	}
	if(an < bn) {
		return -1;
	}
	return 0;
});
	//remove the unsorted list from the screen
	$employeeElements.detach();

	//add the sorted list to the screen
	$employeeElements.appendTo('body');
};

var firstName = '';
var lastName = '';
var empNum = 0;
var empTitle = '';
var lastReviewScore = 0;
var empSalary = 0;
var addedEmployee = {};
var $addedEmployeeDiv;
var $addedEmployeeDivUl;
var labelArray = [];
var randomArray = [
['Jim','Steve','Sam','Natalie','Michelle','Kyle','Joachim','Elizabeth'],
['Anderson','Rosen','Martin','Clarke','Wilson','Patterson','Washington','Sanders'],
['Engineer','Astronaut','Director of Operations','Vice President','Superhero','Artist','Journalist','Politician']
];
var totalSalaries = 0;

$(document).ready(function (){
	//display total employee salaries
	$("#totalSalaries").text('Total Combined Employee Salaries: $' + totalSalaries);

	//Add employee button
	$("#addEmployeeButton").on("click", function(e){
		
		firstName = $("#firstName").val();
		lastName = $("#lastName").val();
		empNum = $("#empNum").val();
		empTitle = $("#empTitle").val();

		//force review score to be between 1-5
		lastReviewScore = Math.min(Math.max(Math.round($("#lastReviewScore").val()),1),5);
		empSalary = $("#empSalary").val();
		addedEmployee = new Employee(firstName, lastName, empNum, empTitle, lastReviewScore, empSalary);

		//generate array of labels for each employee
		labelArray = [$('#firstNameLabel').text(),$('#lastNameLabel').text(),$('#empNumLabel').text(),$('#empTitleLabel').text(),$('#empSalaryLabel').text(), $('#lastReviewScoreLabel').text()];
		
		//add Employee element and color it based on rating
		displayEmployee(addedEmployee);
		applyRatingColor(parseInt(addedEmployee.lastReviewScore));

		//add employee's salary to total
		if(addedEmployee.empSalary){
			totalSalaries += parseInt(addedEmployee.empSalary);
		};
		console.log(totalSalaries);
		//update total salaries display
		$('#totalSalaries').text('Total Combined Employee Salaries: $' + totalSalaries);

		//remove employee from screen
		$('#removeButton').on('click', function(event2){
			$(this).parent().remove();

			//get removed employee's salary
			var currentSal = $(this).next().children(':nth-child(5)').text();
			currentSal = parseInt(currentSal.replace( /^\D+/g, ''));

			//subtract removed employee's salary from total
			if(addedEmployee.empSalary){
				totalSalaries -= currentSal;
			};

			//update total salaries display
			$("#totalSalaries").text('Total Combined Employee Salaries: $' + totalSalaries);
			event2.preventDefault();
		});

		//sort employee list alphabetically by last name
		sortEmployees();
		e.preventDefault();
	});

	$("#randomEmployeeButton").on("click", function(e){
		//generate a random employee
		addedEmployee = randomEmployee(randomArray);
		
		labelArray = [$('#firstNameLabel').text(),$('#lastNameLabel').text(),$('#empNumLabel').text(),$('#empTitleLabel').text(),$('#empSalaryLabel').text(), $('#lastReviewScoreLabel').text()];
		
		//add Employee element and color it based on rating
		displayEmployee(addedEmployee);
		applyRatingColor(parseInt(addedEmployee.lastReviewScore));

		//add employee's salary to total

		totalSalaries += parseInt(addedEmployee.empSalary);

		//update total salaries display
		$("#totalSalaries").text('Total Combined Employee Salaries: $' + totalSalaries);
		
		//remove employee from screen
		$('#removeButton').on('click', function(event2){
			$(this).parent().remove();
			
			//get removed employee's salary
			var currentSal = $(this).next().children(':nth-child(5)').text();
			currentSal = parseInt(currentSal.replace( /^\D+/g, ''));

			//subtract removed employee's salary from total
			totalSalaries -= currentSal;
			$("#totalSalaries").text('Total Combined Employee Salaries: $' + totalSalaries);

			event2.preventDefault();
		});

		//sort employee list alphabetically by last name
		sortEmployees();
		e.preventDefault();
	});

	
});