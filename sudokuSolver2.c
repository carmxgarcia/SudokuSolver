#include <stdio.h>
#include <stdlib.h>

int main(){
	
	int nPuzzles,subgrid,grid,sudoku[100][100];
	int start, move;
	int i,j,k,l,candidate,counter=0,counter2=0,flag=0,solution=0;

	FILE * fp;
	fp = fopen ("test.txt","r");

	fscanf(fp,"%d\n",&nPuzzles);

		fscanf(fp,"%d\n",&subgrid);
		grid=subgrid*subgrid;

		for(j=0;j<grid;j++){
			for(k=0;k<grid-1;k++){
				fscanf(fp,"%d ",&sudoku[j][k]);
			}
			fscanf(fp,"%d\n",&sudoku[j][k]);
		}

	int x[100],y[100];
	int nopts[(grid*grid)+2];

	int option[(grid*grid)+2][grid+2]; //array stacks of options
	

	

	for(i=0;i<grid;i++){
		for(j=0;j<grid;j++){
			if(sudoku[i][j]==0){
				x[counter]=i;
				y[counter]=j;
				counter++;
				nopts[counter+1]=0;
			}
		}
	}


	for(j=0; j<counter; j++){
		printf("(%d,%d)\n", x[j],y[j]);
	}

	int tmp = 0;

	move = start = 0; 
	nopts[start]= 1;
	/*nopts[1]=0;*/

	while (nopts[start] >0)
	{

		if(nopts[move]>0 && move<=counter)
		{
			move++;
		//	printf("---%d\n",nopts[move]);
			nopts[move]=0;
			tmp = 0;
			if(move<=grid*grid){

				for(candidate=1;candidate<=grid;candidate++){
					for(k=0;k<grid;k++){
						if(sudoku[x[counter2]][k]==candidate){
							flag=1;
							break;
						}
						if(sudoku[k][y[counter2]]==candidate){
							flag=1;
							break;
						}
					}
					if(flag==0){
						for(k=0;k<subgrid;k++){
							for(l=0;l<subgrid;l++){
								if(sudoku[(((x[counter2])/subgrid)*(subgrid))+k][(y[counter2]/subgrid)*(subgrid)+l]==candidate){
									flag=1;
									break;
								}
							}
						}
					}
					if(flag==0){
						nopts[move]++;
						option[move][nopts[move]] = candidate;
						tmp++;
					}
					flag=0;
				}
		//		printf("---%d\n",nopts[move]);
				/*for(j=1; j<=nopts[move]; j++)
						printf("%2i",option[move][j]);
					printf("\n");*/
				//printf("MOVE: %d\n", move);
				/*for(l=1;l<=move;l++){
					for(j=1; j<=nopts[l]; j++)
						printf("%2i",option[l][j]);
					printf("\n");
				}*/	
				if(nopts[move]>0){
					sudoku[x[counter2]][y[counter2]]=option[move][nopts[move]];
					counter2++;
				}

			}
		}

		else 
		{
			//backtrack
//			nopts[move]--;
			move--;
			nopts[move]--;
			counter2--;
			if(move==counter){
				printf("Move: %d\n", counter);
				solution++;
				printf("----------------SOLUTION %d-----------------\n",solution);
				for(i=0;i<grid;i++){
					for(j=0;j<grid;j++){
						printf("%d ",sudoku[i][j]);
					}
					printf("\n");
				}
		
			}
			else if(nopts[move]>0){
				sudoku[x[counter2]][y[counter2]] = option[move][nopts[move]];
				counter2++;
			}
			//printf("-----------%d\n",counter2);
			sudoku[x[counter2]][y[counter2]]=0;


		}

	}

	fclose(fp);
}