function checkTable () {
	alert("hello");
}

function checkUserInput () {
	console.log("checkUserInput");
}

function createPlayableTable(size, grid){
	var divID=document.getElementById("playabletable");
	var tbl=document.createElement('table');
	var dim = size==9?50:25;
	var height = size==9?75:80;
	var btn = document.createElement("BUTTON");        // Create a <button> element
	var t = document.createTextNode("CHECK");       // Create a text node
	btn.appendChild(t);                                // Append the text to <button>
	btn.setAttribute('id','check_btn');
	tbl.style.width= dim+'%';
	tbl.setAttribute('border','1');
	var tbdy=document.createElement('tbody');
	for(var i=0;i<size;i++){
	    var tr=document.createElement('tr');
	    for(var j=0;j<size;j++){
	        var td=document.createElement('td');
	        tr.appendChild(td);
	        td.setAttribute('height',height);
	        td.setAttribute('align','center');
			var cellID = "cell_"+i+j;
	        if(grid[i][j] == "0"){
	        	var ce = document.createElement('input');
	        	ce.maxLength = "1";
	        	//ce.setAttribute('contenteditable', true);
	        	ce.setAttribute('name', cellID);
	        	td.appendChild(ce);

	        	console.log(cellID);
	        	lol = document.getElementById(cellID);
	        	console.log(lol);
	        }
	        else{
	        	//console.log(grid[i][j]+" :not zero?");
	        	var ce = document.createElement('div');
	        	ce.innerHTML = grid[i][j];
	        	//ce.setAttribute('contenteditable', false);
	        	//ce.setAttribute('id', cellID);
	        	td.appendChild(ce);	        	
	        }
	    }
	    tbdy.appendChild(tr);
	}
	tbl.appendChild(tbdy);
	tbl.setAttribute('align','center');
	divID.appendChild(tbl);
	divID.appendChild(btn);                    // Append <button> to <div> if playable

	document.getElementById("check_btn").onclick = checkTable;
	divID.appendChild(document.createElement('br'));
	divID.appendChild(document.createElement('br'));
	divID.appendChild(document.createElement('br'));
}

function createTable(size, grid, divID){
	var divID=document.getElementById(divID);
	var tbl=document.createElement('table');
	var dim = 80;
	var height = size==9?40:60;
	tbl.style.width= dim+'%';
	tbl.setAttribute('border','1');
	var tbdy=document.createElement('tbody');
	for(var i=0;i<size;i++){
	    var tr=document.createElement('tr');
	    for(var j=0;j<size;j++){
	        var td=document.createElement('td');
	        tr.appendChild(td);
	        td.setAttribute('height',height);
	        td.setAttribute('align','center');
	        //console.log(grid[i][j]);
	        td.innerHTML = grid[i][j];
	    }
	    tbdy.appendChild(tr);
	}
	tbl.appendChild(tbdy);
	tbl.setAttribute('align','center');
	divID.appendChild(tbl);
	divID.appendChild(document.createElement('br'));
	divID.appendChild(document.createElement('br'));
	divID.appendChild(document.createElement('br'));
}

function showPossibleSolutions (r, x, y, xy) {
	var regdiv=document.getElementById("regular");
	var xdiv=document.getElementById("xsudoku");
	var ydiv=document.getElementById("ysudoku");
	var xydiv=document.getElementById("xysudoku");

	var regsol = document.createTextNode("X SOLUTIONS "+r);
	var xsol = document.createTextNode("X SOLUTIONS "+x);
	var ysol = document.createTextNode("Y SOLUTIONS "+y);
	var xysol = document.createTextNode("XY SOLUTIONS "+xy);

	regdiv.insertBefore(regsol, regdiv.firstChild);
	xdiv.insertBefore(xsol, xdiv.firstChild);
	ydiv.insertBefore(ysol, ydiv.firstChild);
	xydiv.insertBefore(xysol, xydiv.firstChild);
}

function solveSudoku(gridSize, grid) {
	var move, start;
	var counter = 0, counter2 = 0, tmp = 0, candidate, flag = 0, solution = 0, flag2 = 0;
	var flag3=0,solution=0,xSolution=0,ySolution=0,xySolution=0;
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
			if(move <= gridSize*gridSize && counter2 < counter){
				for(candidate = 1; candidate <= gridSize; candidate++){
					for(var k = 0; k < gridSize; k++){
						//console.log("HELL: "+counter2);
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
					grid[x[counter2]][y[counter2]]=option[move][nopts[move]].toString();
					counter2++;
				}
			}
		}
		else{
			move--;
			nopts[move]--;
			counter2--;
			if (move == counter){
				createTable(gridSize, grid, "regular");
				solution++;
				//console.log("Move: "+counter);
				//console.log("Solution: "+solution);
				//for (i=0; i<gridSize; i++)
				//console.log(grid[i]);

				/*CHECK for X*/
				var i, j, k, l;
				for(i=0, l=gridSize-1;i<gridSize-1 && l>0;i++,l--){
					for(j=i+1, k=gridSize-1;j<gridSize && k>0;j++,k--){
						//console.log(i+" "+j+" "+k+" "+l)
						if(grid[i][i]==grid[j][j] || grid[i][l]==grid[j][k-i-1]){
							flag2=1;
							break;
						}
					}
					if(flag2==1) break;					
				}

				if(flag2!=1){
					/*if there is X, print*/
					// console.log("X "+solution);
					// for (i=0; i<gridSize; i++)
					// console.log(grid[i]);
					createTable(gridSize, grid, "xsudoku");
					xSolution++;
				}

				/*if dimensions are even, no Y*/
				if(grid%2==0){
					flag3=1;
				}
				else{
				/*CHECK Y*/
					var half = Math.floor(gridSize/2);
					for(i=0, l=gridSize-1;i<gridSize-1 && l>0;i++,l--){
						if(i<half){
							for(j=i+1, k=gridSize-1;j<half && k>half;j++,k--){
								if(j>=half) break;
								if(grid[i][i]==grid[j][j] || grid[i][l]==grid[j][k-i-1]){
									flag3=1;
									break;
								}
							}
							for(j=half;j<gridSize;j++){
								if(grid[i][i]==grid[j][half] || grid[i][l]==grid[j][half]){
									flag3=1;
									break;
								}	
							}
						}
						else if(i<gridSize){
							for(j=i+1;j<gridSize;j++){
								if(grid[i][half]==grid[j][half]){
									flag3=1;
									break;
								}
							}	
						}
					}
				}
				if(flag3!=1){
					/*if there is Y, print*/
					// console.log("Y "+solution);
					// for (i=0; i<gridSize; i++)
					// console.log(grid[i]);
					createTable(gridSize, grid, "ysudoku");
					ySolution++;
				}
				if(flag2==0 && flag3==0){
					/*if there are both X and Y, print*/
					// console.log("XY "+solution);
					// for (i=0; i<gridSize; i++)
					// console.log(grid[i]);
					createTable(gridSize, grid, "xysudoku");
					xySolution++;
				}
				flag2=0;
				flag3=0;
			}
			else if(nopts[move] > 0){
				grid[x[counter2]][y[counter2]] = option[move][nopts[move]].toString();
				counter2++;
			}
			if(counter2 >= 0)
				grid[x[counter2]][y[counter2]]="0";
		}
	}
	console.log("REGULAR: "+solution);
	console.log("X:       "+xSolution);
	console.log("Y:       "+ySolution);
	console.log("XY:      "+xySolution);
	showPossibleSolutions(solution, xSolution, ySolution, xySolution);
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
	                		tokens[line] = tokens[line].replace(/\s/g, "") 
	                		var num = tokens[line].split("");
	                		console.log(num);
	                		for(var k = 0; k < gridSize; k++){
	                			grid[j].push(num[k]);
	                		}
	                		line++;
	                	}
                	
	                	createPlayableTable(gridSize, grid);
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