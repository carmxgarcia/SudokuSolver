function checkTable (size,grid) {
	var subgrid = Math.sqrt(size);
	var k=0;
	var x=[],y=[];
	for(i=0;i<size;i++){
		for(j=0;j<size;j++){
			var a=document.getElementById("cell_"+i+j).value;
			if(a !="" && a!= undefined){
				grid[i][j]=a;
				x.push(i);				
				y.push(j);
			}
			if(size == 4){
		      	if ((j < subgrid && i < subgrid) || (i >= subgrid && j >= subgrid))
		        	$("#cell_"+i+j).parent().parent().attr('style','background:#4db6ac !important');
		        else
					$("#cell_"+i+j).parent().parent().attr('style','background:#b2dfdb !important');	        	
	        }

	        if(size == 9){
		      	if ((j < subgrid && i < subgrid) || (i < subgrid && j >= 2*subgrid) || (i >= 2*subgrid && j >= 2*subgrid) || (i >= 2*subgrid && j < subgrid) || (i < 2*subgrid && i >= subgrid && j < 2*subgrid && j >= subgrid))
		        	$("#cell_"+i+j).parent().parent().attr('style','background:#4db6ac !important');
		        else
					$("#cell_"+i+j).parent().parent().attr('style','background:#b2dfdb !important');	        	
	        }
		}
	}

	flag=0;
	for(i=0;i<size;i++){
		for(j=0;j<size;j++){
			for(k=j+1;k<size;k++){
				if(!(grid[i][j]>=0 && grid[i][j]<size)){
					$("#cell_"+i+j).parent().parent().attr('style','background:rgb(244, 84, 84) !important');
					flag=1;
				}
				if(grid[i][j]==grid[i][k] && grid[i][j]!=0){
					flag=1;
					$("#cell_"+i+j).parent().parent().attr('style','background:rgb(244, 84, 84) !important');
					$("#cell_"+i+k).parent().parent().attr('style','background:rgb(244, 84, 84) !important');
				}
				if(grid[j][i]==grid[k][i] && grid[j][i]!=0){
					flag=1;
					$("#cell_"+j+i).parent().parent().attr('style','background:rgb(244, 84, 84) !important');
					$("#cell_"+k+i).parent().parent().attr('style','background:rgb(244, 84, 84) !important');
					
				}
			}

			for (h = 0; h < subgrid; h++) {
					for(var l = 0; l < subgrid; l++){
						var a = (Math.floor((i/subgrid))*(subgrid))+h;
						var b = Math.floor((j/subgrid))*(subgrid)+l;
							if(grid[a][b] == grid[i][j] && grid[i][j]!=0 && a!=i && b!=j){
								$("#cell_"+i+j).parent().parent().attr('style','background:rgb(244, 84, 84) !important');				
								flag = 1;
								break;
							}
					}
			}
		}
	}

	var flag2=0;
	if(flag==0){
		for(i=0;i<size;i++){
			for(j=0;j<size;j++){
				if(grid[i][j]==0){
					flag2=1;
					alert("No error. Please continue");
					break;
				}
			}
			if(flag2==1) break;
		}

		if(flag2==0){
			alert("Congratulations!");
		}	
	}

	for(i=0;i<x.length;i++){
		grid[x[i]][y[i]]=0;
	}
	
}


function createPlayableTable(size, grid, puzzleNo, totalPuzzle){
	var divID=document.getElementById("playabletable");
	var item = document.createElement('div');
	var tbl=document.createElement('table');
	var puzzleCount = document.createElement('div');
	var height = 50;
	var subgrid = Math.sqrt(size);
	var btn = document.createElement("BUTTON");        // Create a <button> element
	var t = document.createTextNode("CHECK");       // Create a text node
	btn.appendChild(t);                                // Append the text to <button>
	btn.setAttribute('id','check_btn');
	btn.setAttribute('class', 'btn btn-success');

	var solve = document.createElement("BUTTON");
	var u = document.createTextNode("SHOW SOLUTIONS");
	solve.appendChild(u);                                // Append the text to <button>
	solve.setAttribute('id','show_sol');
	solve.setAttribute('class', 'btn btn-success');

	item.setAttribute('class', 'item');

	//tbl.style.width= dim+'%';
	tbl.setAttribute('border','1');
	var tbdy=document.createElement('tbody');
	for(var i=0;i<size;i++){
	    var tr=document.createElement('tr');
	    for(var j=0;j<size;j++){
	        var td=document.createElement('td');
	        tr.appendChild(td);
	        td.setAttribute('width',height);
	        td.setAttribute('height',height);
	        td.setAttribute('align','center');

	        if(size == 4){
		      	if ((j < subgrid && i < subgrid) || (i >= subgrid && j >= subgrid))
		        	td.setAttribute('bgcolor', '#4db6ac');
		        else
					td.setAttribute('bgcolor', '#b2dfdb');	        	
	        }

	        if(size == 9){
		      	if ((j < subgrid && i < subgrid) || (i < subgrid && j >= 2*subgrid) || (i >= 2*subgrid && j >= 2*subgrid) || (i >= 2*subgrid && j < subgrid) || (i < 2*subgrid && i >= subgrid && j < 2*subgrid && j >= subgrid))
		        	td.setAttribute('bgcolor', '#4db6ac');
		        else
					td.setAttribute('bgcolor', '#b2dfdb');	        	
	        }

			var cellID = "cell_"+i+j;
	        if(grid[i][j] == "0"){
	        	var inputDiv = document.createElement('div');
	        	inputDiv.setAttribute('class', 'form-group');
	        	var editable = document.createElement('input');
	        	editable.maxLength = "1";
	        	editable.setAttribute('class', 'form-control col-lg');
	        	editable.setAttribute('id', cellID);

	        	inputDiv.appendChild(editable);
	        	td.appendChild(inputDiv);
	        }
	        else{
	        	var ce = document.createElement('div');
	        	ce.innerHTML = grid[i][j];
	        	ce.setAttribute('id', cellID);
	        	td.appendChild(ce);	        	
	        }
	    }
	    tbdy.appendChild(tr);
	}
	puzzleNo++;

	tbl.appendChild(tbdy);
	tbl.setAttribute('align','center');
	tbl.setAttribute('id', 'puzzle-'+puzzleNo);
	puzzleCount.appendChild(document.createTextNode("Puzzle "+puzzleNo+" of "+totalPuzzle));
	puzzleCount.setAttribute("class","puzzle-count");
	item.appendChild(puzzleCount);
	item.appendChild(tbl);
	item.appendChild(btn);                    // Append <button> to <div> if playable
	item.appendChild(solve);

	divID.appendChild(item);

	$('#carousel-example-generic').removeClass('hidden');
	if(totalPuzzle<2){
		$('.carousel-control').addClass('hidden');
	}

	document.getElementById("check_btn").onclick = checkTable;

	// for (i=0; i< size; i++){
	// 	for (j = 0; j < size; j++){
	// 		var cellID = "cell_"+i+j;
	//         var cell = document.getElementById(cellID);
	//         //console.log(cell);
	//         cell.onchange = function(){
	//         	console.log(cell.type);
	//         };
	// 	}
	// }

	document.getElementById("show_sol").onclick = function () {
		console.log("solve daw");
		document.getElementById("regular").innerHTML = "";
		document.getElementById("xsudoku").innerHTML = "";
		document.getElementById("ysudoku").innerHTML = "";
		document.getElementById("xysudoku").innerHTML = "";
		//loadBlur();
		solveSudoku(size, grid);
		//unBlur();

	};

	document.getElementById("check_btn").onclick = function () {
		/*console.log("solve daw");
		document.getElementById("regular").innerHTML = "";
		document.getElementById("xsudoku").innerHTML = "";
		document.getElementById("ysudoku").innerHTML = "";
		document.getElementById("xysudoku").innerHTML = "";*/
		// loadBlur();
		checkTable(size, grid);
		//unBlur();
	};
}




function loadBlur(){
	
	document.getElementById('main').setAttribute("class", "blur");
	//if(document.getElementById('loadingDiv').style.display == 'none'){
	document.getElementById('loadingDiv').style.display = 'block';

}

function unBlur(){
	//document.getElementById('main').setAttribute("class", "center-center");
	setTimeout(function(){
		document.getElementById('main').setAttribute("class", "");
		document.getElementById('loadingDiv').style.display = 'none';
 	}, 3000);
}


function createTable(size, grid, div){
	var divID=document.getElementById(div);
	var tbl=document.createElement('table');
	var dim = 80;
	var height = size==9?30:60;
	var subgrid = Math.sqrt(size);
	tbl.style.width= dim+'%';
	tbl.setAttribute('border','1');
	//tbl.setAttribute('class', 'table table-striped table-hover');
	var tbdy=document.createElement('tbody');
	for(var i=0;i<size;i++){
	    var tr=document.createElement('tr');
	    for(var j=0;j<size;j++){
	        var td=document.createElement('td');
	        tr.appendChild(td);
	        td.setAttribute('height',height);
	        td.setAttribute('align','center');

	        if(size == 4){
		      	if ((j < subgrid && i < subgrid) || (i >= subgrid && j >= subgrid))
		        	td.setAttribute('bgcolor', '#4db6ac');
		        else
					td.setAttribute('bgcolor', '#b2dfdb');	        	
	        }

	        if(size == 9){
		      	if ((j < subgrid && i < subgrid) || (i < subgrid && j >= 2*subgrid) || (i >= 2*subgrid && j >= 2*subgrid) || (i >= 2*subgrid && j < subgrid) || (i < 2*subgrid && i >= subgrid && j < 2*subgrid && j >= subgrid))
		        	td.setAttribute('bgcolor', '#4db6ac');
		        else
					td.setAttribute('bgcolor', '#b2dfdb');	        	
	        }

	        if(div == "xsudoku"){
		      	if (i == j || i+j == size-1)
		        	td.setAttribute('bgcolor', '#009688'); 
	        }

	        if(div == "ysudoku"){
		      	if ((i == j || i+j == size-1) && i < size/2)
		        	td.setAttribute('bgcolor', '#009688'); 
		        if (j == Math.floor(size/2) && i > size/2)
		        	td.setAttribute('bgcolor', '#009688'); 
	        }

	        if(div == "xysudoku"){
	        	if (i == j || i+j == size-1)
		        	td.setAttribute('bgcolor', '#009688'); 
		      	if ((i == j || i+j == size-1) && i < size/2)
		        	td.setAttribute('bgcolor', '#009688'); 
		        if (j == Math.floor(size/2) && i > size/2)
		        	td.setAttribute('bgcolor', '#009688'); 
	        }

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

	var regsol = document.createTextNode("REGULAR SOLUTIONS "+r);
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
	var x=[], y=[],xx=[], yy=[];
	var dim = (gridSize*gridSize)+2;
	var nopts = new Array();
	var option = new Array();		//array stacks of option
	var subgrid = Math.sqrt(gridSize);
	var size=gridSize;

	for(i=0;i<size;i++){
		for(j=0;j<size;j++){
			var a=document.getElementById("cell_"+i+j).value;
			if(a !="" && a!= undefined){
				grid[i][j]=a;
				xx.push(i);				
				yy.push(j);
			}
		}
	}

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

				/*CHECK for X*/
				var i, j, k, l;
				for(i=0, l=gridSize-1;i<gridSize-1 && l>0;i++,l--){
					for(j=i+1, k=gridSize-1;j<gridSize && k>0;j++,k--){
						if(grid[i][i]==grid[j][j] || grid[i][l]==grid[j][k-i-1]){
							flag2=1;
							break;
						}
					}
					if(flag2==1) break;					
				}

				if(flag2!=1){
					/*if there is X, print*/
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
					createTable(gridSize, grid, "ysudoku");
					ySolution++;
				}
				if(flag2==0 && flag3==0){
					/*if there are both X and Y, print*/
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
	showPossibleSolutions(solution, xSolution, ySolution, xySolution);
	for(i=0;i<xx.length;i++){
		grid[xx[i]][yy[i]]=0;
	}
}

function pageInit() {
	document.getElementById("filecontents").innerText = "";
	document.getElementById("playabletable").innerText = "";
	document.getElementById("regular").innerText = "";
	document.getElementById("xsudoku").innerText = "";
	document.getElementById("ysudoku").innerText = "";
	document.getElementById("xysudoku").innerText = "";
}

function processPuzzles(gridArray, nPuzzles) {
	 if (gridArray.length > 1){
	 	document.getElementById('right').style.visibility = '';
	 	document.getElementById('left').style.visibility = '';
	 }
	
	var i= 0;
	createPlayableTable(gridArray[i].length, gridArray[i], i, nPuzzles);

	document.getElementById("right").onclick = function (){
		i++;
		if (i == gridArray.length)
			i = 0;
		pageInit();
		//setTimeout(function(){ document.getElementById('playabletable').setAttribute("class", "blur");
 //}, 0);
		//setTimeout(function(){ document.getElementById('playabletable').setAttribute("class", "");
 //}, 1000);
		createPlayableTable(gridArray[i].length, gridArray[i], i, nPuzzles);
		console.log(i);
	}

	document.getElementById("left").onclick = function (){
		i--;
		if (i < 0)
			i = (gridArray.length)-1;
		pageInit();
		createPlayableTable(gridArray[i].length, gridArray[i], i, nPuzzles);
		console.log(i);
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
	        //Check of the extension match 
	        if (fileTobeRead.type.match(fileExtension)) { 
	            //Initialize the FileReader object to read the 2file 
	            var fileReader = new FileReader(); 
	            fileReader.onload = function (e) { 
	                var fileContents = document.getElementById("filecontents"); 
	                fileContents.innerText = fileReader.result; 
	                contents = fileReader.result;
	                pageInit();
					// var btn = document.createElement("BUTTON");        // Create a <button> element
					// var t = document.createTextNode("NEXT");       // Create a text node
					// btn.appendChild(t);                                // Append the text to <button>
					// btn.setAttribute('id','next_btn');
					// fileContents.appendChild(btn);

	                tokens = contents.split('\n');
	                var nPuzzles = tokens[0];
	                var subgrid, gridSize, line = 1;
	                var grid = new Array();
	                var gridArray = new Array();
	                var i= 0;

	                for (var i = 0; i < nPuzzles; i++) {
	                	subgrid = tokens[line];
	                	line++;
	                	gridSize = subgrid * subgrid;
	                	
	                	for (var j = 0; j < gridSize; j++) {
	                		grid[j] = new Array();
	                		tokens[line] = tokens[line].replace(/\s/g, "") 
	                		var num = tokens[line].split("");
	                		for(var k = 0; k < gridSize; k++){
	                			grid[j].push(num[k]);
	                		}
	                		line++;
	                	}
                		gridArray.push(grid);
                		grid = new Array();
	                }
	            	processPuzzles(gridArray, nPuzzles); 		                             
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

