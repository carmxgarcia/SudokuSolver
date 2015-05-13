function createTable(size, grid){
	var body=document.getElementsByTagName('body')[0];
	var tbl=document.createElement('table');
	var dim = size==9?50:25;
	var btn = document.createElement("BUTTON");        // Create a <button> element
	var t = document.createTextNode("SHOW SOLUTION");       // Create a text node
	btn.appendChild(t);                                // Append the text to <button>
	tbl.style.width= dim+'%';
	tbl.setAttribute('border','1');
	var tbdy=document.createElement('tbody');
	for(var i=0;i<size;i++){
	    var tr=document.createElement('tr');
	    for(var j=0;j<size;j++){
	        var td=document.createElement('td');
	        tr.appendChild(td);
	        td.setAttribute('height','50');
	        //console.log(grid[i][j]);
	        td.innerHTML = grid[i][j];
	    }
	    tbdy.appendChild(tr);
	}
	tbl.appendChild(tbdy);
	body.appendChild(tbl);
	body.appendChild(btn);                    // Append <button> to <body>
	body.appendChild(document.createElement('br'));
}

function solveSudoku(gridSize, grid) {
	var move, start;
	var counter = 0, counter2 = 0, tmp = 0, candidate, flag = 0, solution = 0;
	var x=[], y=[];
	var dim = (gridSize*gridSize)+2;
	var nopts = new Array();
	var option = new Array();		//array stacks of option
	var subgrid = Math.sqrt(gridSize);

	for (var i = 0; i < gridSize; i++) {
		for (var j = 0; j < gridSize; j++) {
			if (grid[i][j] == 0){
				x[counter] = i;
				y[counter] = j;
				counter++;
				nopts[counter+1]=0;
			}
		}
	}

	move = start = 0;
	nopts[start] = 1;

	//creates a 2D array for option: option[][]
	for (var i = 0; i < dim; i++) {
		option[i] = new Array();
	}

	while(nopts[start] > 0){
		if(nopts[move] > 0 && move <= counter){
			move++;
			nopts[move] = 0;
			tmp = 0;
			if(move <= gridSize*gridSize){
				for(candidate = 1; candidate <= gridSize; candidate++){
					for(var k = 0; k < gridSize; k++){
						if (grid[x[counter2]][k] == candidate){
							flag = 1;
							break;
						}
						if(grid[k][y[counter2]] == candidate){
							flag = 1;
							break;
						}
					}
					if(flag == 0){
						for (var k = 0; k < subgrid; k++) {
							for(var l = 0; l < subgrid; l++){
								var a = (Math.floor(((x[counter2])/subgrid))*(subgrid))+k;
								var b = Math.floor((y[counter2]/subgrid))*(subgrid)+l;
								
								//console.log(grid);
								if(grid[a][b] == candidate){
									flag = 1;
									break;
								}
							}
						}
					}
					if(flag == 0){
						nopts[move]++;
						option[move][nopts[move]] = candidate;
						tmp++;
					}
					flag=0;
				}
				if(nopts[move] > 0){
					grid[x[counter2]][y[counter2]]=option[move][nopts[move]];
					counter2++;
				}
			}
		}
		else{
			move--;
			nopts[move]--;
			counter2--;
			if (move == counter){
				console.log("Move: "+counter);
				solution++;
				console.log("Solution: "+solution);
				for (var i = 0; i < gridSize; i++){
					for(var j = 0; j < gridSize; j++){
						console.log(grid[i][j]);
					}
				}
			}
			else if(nopts[move] > 0){
				grid[x[counter2]][y[counter2]] = option[move][nopts[move]];
				counter2++;
			}
			//console.log(counter2);
			if(counter2 >= 0)
				grid[x[counter2]][y[counter2]]=0;
		}
	}
}

window.onload = function () { 
	var contents;
	//Check the support for the File API support 
	if (window.File && window.FileReader && window.FileList && window.Blob) {
	    var fileSelected = document.getElementById('txtfiletoread');
	    fileSelected.addEventListener('change', function (e) { 
	        //Set the extension for the file 
	        var fileExtension = /text.*/; 
	        //Get the file object 
	        var fileTobeRead = fileSelected.files[0];
	        //Check of the extensio match 
	        if (fileTobeRead.type.match(fileExtension)) { 
	            //Initialize the FileReader object to read the 2file 
	            var fileReader = new FileReader(); 
	            fileReader.onload = function (e) { 
	                var fileContents = document.getElementById('filecontents'); 
	                fileContents.innerText = fileReader.result; 
	                contents = fileReader.result;

	                tokens = contents.split('\n');
	                var nPuzzles = tokens[0];
	                var subgrid, gridSize, line = 1;
	                var grid = new Array();

	                for (var i = 0; i < nPuzzles; i++) {
	                	subgrid = tokens[line];
	                	line++;
	                	gridSize = subgrid * subgrid;
	                	
	                	for (var j = 0; j < gridSize; j++) {
	                		grid[j] = new Array();
	                		var num = tokens[line].split(" ");
	                		console.log(num);
	                		for(var k = 0; k < gridSize; k++)
	                			grid[j].push(num[k]);
	                		line++;
	                	}
                	
	                	createTable(gridSize, grid);
	                	solveSudoku(gridSize, grid);
	                }

	                		                
	            } 
	            fileReader.readAsText(fileTobeRead); 
	        } 
	        else { 
	            alert("Please select text file"); 
	        }

	    }, false);
	} 
	else { 
	    alert("Files are not supported"); 
	}
} 