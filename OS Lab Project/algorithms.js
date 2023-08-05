var response;
var resource;
var noofframes;
var flagFound=0,flag=0,flag2=0;
var count=0,hit=0,miss=0;
var pagefault;
var pages=[];		
var frames=[];
var frameAge=[];
var resource = [];
var algoNumber;
	
function BuildFormFields($amount) // For Resorce allocation
			{
            response = $amount;
                if(response<0)
                	alert("Invalid Inputs");
				var
					$container = document.getElementById('FormFields'),
					$item, $field, $i;
				    $container.innerHTML = '';
				for ($i = 0; $i < $amount; $i++) {
					$item = document.createElement('div');
					$item.style.margin = '10px';
					$item.style.cssFloat="left"; 
					$item.style.width="50px";
                    $field = document.createElement('label');
                    $field.innerHTML = 'Page '+($i+1);
					$item.appendChild($field);
					$field = document.createElement('input');
					$field.name = 'Design[' + $i + ']';
					$field.type = 'text';
                    $field.setAttribute("class","form-control");
					$item.appendChild($field);
				    $container.appendChild($item);
				}
            }

function FIFO()
		{    
			algoNumber=0;
			MAIN();
		    FIFO1();	
			RESULTS();
		}

function LRU()
		{  	
			algoNumber=1;
			 MAIN();
			 LRU1();
			RESULTS();
		}

function OPR()
		{   
			algoNumber=2;
			MAIN();
			OPR1();
			RESULTS();
		}		

function MRU()
		{  
			algoNumber=3;
			MAIN();
			MRU1();
			RESULTS();
		}

function MAIN()
			{
			noofframes = document.getElementById('noofFrames').value;
			var res_form = document.resource;
			count=0,hit=0,miss=0;
					
			for(var i = 1;i <= response; i++)
						{
						resource[i-1] = Number(res_form[i].value);
						pages[i-1] = Number(res_form[i].value);         //added
						}

						//added
						for(var i=0;i<noofframes;i++)
						{  
						frames[i]=-1;
						frameAge[i]=-1;
						}

						//TABLE for NEED
						var tab_need = document.getElementById("tab_need");
						var row = tab_need.insertRow(0);
						var cell = row.insertCell(0);
						if(algoNumber==0)	cell.innerHTML = "<br><b>FIRST COME FIRST SERVE</b>";
						if(algoNumber==1)	cell.innerHTML = "<br><b>LEAST RECENTLY USED</b>";
						if(algoNumber==2)	cell.innerHTML = "<br><b>OPTIMAL PAGE REPLACEMENT</b>";
						if(algoNumber==3)	cell.innerHTML = "<br><b>MOST RECENTLY USED</b>";
						var pro_head = tab_need.insertRow(1);
                        var cell = pro_head.insertCell(0);
                        cell.innerHTML = "<b>Pages</b>";
                        for(i=1;i<=noofframes;i++)
                        {
                            cell = pro_head.insertCell(i);
                            cell.innerHTML = "<b>FRAME "+(i)+"</b>";
						}
						
						
						cell = pro_head.insertCell(i);
						cell.innerHTML = "<b>Page Fault</b>";
						cell = pro_head.insertCell(i+1);
						cell.innerHTML = "<b>Page Hit</b>";
					}

					function RESULTS(){			
						var tab_alloc = document.getElementById("tab_need");
						var row = tab_alloc.insertRow(j+3);
						var cell = row.insertCell(0);
						cell.innerHTML ="Number of Page_Falts:"+miss;
						var cell = row.insertCell(0);
						cell.innerHTML ="Number of Page_Hits:"+hit;
						var cell = row.insertCell(0);
						cell.innerHTML ="Hit ratio:"+hit+"/"+response+"<br><br>";

					   }
					   

				
					
	//////////////////////////////////////////////////////////////////////////FIFO
	function FIFO1(){	
		var page_f= 0;	
		for(j=0;j<response;j++)      //no of pages
		{
			 flagFound=0;
			 for( i=0;i<noofframes;i++)
					 {      
						 if(frames[i]==pages[j])
							 {	
								 flagFound=1;								
								 hit++;
								 pagefault=1;  //	 printf("hit ");								
								 page_f--;								 
							} 
						} 
							page_f++;
			
					 if((flagFound==0)&&(page_f<=noofframes))          //if frame not found and empty frame avalible
					 {
					 
						frames[j]=pages[j];
						pagefault=0;
						miss++;
					}  //FLAG FOUND ends
			
					 else if(flagFound==0)           //if frame not found
					  {
						frames[(page_f-1)%noofframes]=pages[j];
					   miss++;
					   pagefault=0;    //	printf("miss ");   
					  }
			//printing results

			var row = tab_need.insertRow(j+2);
			var cell = row.insertCell(0);
			cell.innerHTML = "<b>P"+(j+1)+"("+resource[j]+")"  + "</b>";		
			for(k=0;k<noofframes;k++)
			{
				var cell = 	row.insertCell(k+1);
				cell.innerHTML = frames[k];
			}
			var cell=row.insertCell(k+1);
			if(pagefault==0)
			cell.innerHTML = "<font color=#008000>YES</font>";
			else
			cell.innerHTML = "<font color=#FF0000>NO</font>";	
			var cell=row.insertCell(k+2);
			if(pagefault==0)
			cell.innerHTML = "<font color=#FF0000>NO</font>";
			else
			cell.innerHTML = "<font color=#008000>YES</font>";						
		}  
		var row = tab_need.insertRow(j+2);
		var cell = row.insertCell(0);
		cell.innerHTML = "RESULT:";
						  
	}		


	/////////////////////////////////////////////////////////////////////////////////////OPR
	function OPR1(){		
		for(j=0;j<response;j++)      //no of pages
		{
			 flagFound=0,flag=0,flag2=0;       //variables used for 'if frame found or not found'
			 var temp=[];                      //for storing positions for pages that occur in future
			 var k,max,pos,flag3=0;

			 for( i=0;i<noofframes;i++)
					 {
						 if(frames[i]==pages[j])   //if page found
							 {	
								 flagFound=1;
								 flag=1;
								 count++;
								 frameAge[i]=count; //age frame
								 hit++;
								 pagefault=1;  //	 printf("hit ");
								  break;
							} } 
			
					 if(flagFound==0)          //if frame not found and empty frame avalible
					 {
						   for(i=0;i<noofframes;i++)
						   {
								if(frames[i]==-1)   
								{
								frames[i]=pages[j];
								flag=1;
								count++;
								frameAge[i]=count;
								pagefault=0;	//  printf("miss ");
								miss++;
								break;		
								}  }  }  //FLAG FOUND ends
			
					  if(flag==0)           //if page not found in frame 
					  {
						flag3 =0;
          
						for(i=0;i<noofframes;i++)
						{
						  temp[i] = -1;  //array for storing position of pages that occur in future from present frame in orderly manner
						  
						  for(k =j+1;k<response;k++)         //checking in future for pages from present frame
						  {
							if(frames[i] == pages[k])   //when page is found in future
							{
							  temp[i] = k;    //store that page's position in array when it occured in future
							  break;
							}
						  }
						}

						for(i=0;i<noofframes;i++)         //if any page from  present frame not present
						{
						  if(temp[i] == -1)
						  {
							pos = i;    //found position for new page
							flag3 = 1;
							break;
						  }
						}
						if(flag3 ==0)                     //if all pages present in future
						{
						  max = temp[0];    //initialise max 
						  pos = 0;
						  
						  for(i= 1;i<noofframes;i++)   //storing that value in max which occured at last position
						  {
							if(temp[i] > max)
							{
							  max = temp[i];
							  pos =i;        //found position for new page
							}
						  }             
						}
					   frames[pos]=pages[j];  //placing new page at a position in frame found by using opr
					   count++;
					   frameAge[pos]=count;
					   miss++;
					   pagefault=0;    //	printf("miss ");   
					  }
			//printing results

			var row = tab_need.insertRow(j+2);
			var cell = row.insertCell(0);
			cell.innerHTML = "<b>P"+(j+1)+"("+resource[j]+")"  + "</b>";		
			for(k=0;k<noofframes;k++)
			{
				var cell = 	row.insertCell(k+1);
				cell.innerHTML = frames[k];
			}
			var cell=row.insertCell(k+1);
			if(pagefault==0)
			cell.innerHTML = "<font color=#008000>YES</font>";
			else
			cell.innerHTML = "<font color=#FF0000>NO</font>";	
			var cell=row.insertCell(k+2);
			if(pagefault==0)
			cell.innerHTML = "<font color=#FF0000>NO</font>";
			else
			cell.innerHTML = "<font color=#008000>YES</font>";					
		}  
		var row = tab_need.insertRow(j+2);
		var cell = row.insertCell(0);
		cell.innerHTML = "RESULTS: ";
						  
	}

	///////////////////////////////// lru
	// Time Complexity of LRU numbeofpages*numberofframes==(response*noofframes)
	function LRU1(){		
		for(j=0;j<response;j++)      //no of pages
		{
			 flagFound=0,flag=0,flag2=0;
			 for( i=0;i<noofframes;i++) // loop for no. of frames
					 {
						 if(frames[i]==pages[j])
							 {	
								 flagFound=1;
								 flag=1;
								 count++;
								 frameAge[i]=count; //age frame
								 hit++;
								 pagefault=1;  //	 printf("hit ");
								  break;
							} } 
			
					 if(flagFound==0)          //if frame not found and empty frame avalible
					 {
						   for(i=0;i<noofframes;i++)
						   {
								if(frames[i]==-1)
								{
								frames[i]=pages[j];
								flag=1;
								count++;
								frameAge[i]=count;
								pagefault=0;	//  printf("miss ");
								miss++;
								break;		
								}  }  }  //FLAG FOUND ends
			
					  if(flag==0)           //if frame not found
					  {
						min=frameAge[0];
					   var m=0;
						// for lru
					   if(algoNumber==1)
						{	for(i=0;i<noofframes;i++)
								{
									if(frameAge[i]<min) // determinies frame age
									{
										min=frameAge[i];
										m=i;  // least recently used frame stored
									}  
									}
						}

					   frames[m]=pages[j];
					   count++;
					   frameAge[m]=count;
					   miss++;
					   pagefault=0;    //	printf("miss ");   
					  }
			//printing results

			var row = tab_need.insertRow(j+2);
			var cell = row.insertCell(0);
			cell.innerHTML = "<b>P"+(j+1)+"("+resource[j]+")"  + "</b>";		
			for(k=0;k<noofframes;k++)
			{
				var cell = 	row.insertCell(k+1);
				cell.innerHTML = frames[k];
			}
			var cell=row.insertCell(k+1);
			if(pagefault==0)
			cell.innerHTML = "<font color=#008000>YES</font>";
			else
			cell.innerHTML = "<font color=#FF0000>NO</font>";	
			var cell=row.insertCell(k+2);
			if(pagefault==0)
			cell.innerHTML = "<font color=#FF0000>NO</font>";
			else
			cell.innerHTML = "<font color=#008000>YES</font>";						
		}  	
		var row = tab_need.insertRow(j+2);
		var cell = row.insertCell(0);
		cell.innerHTML = "LRU RESULTS:";                 
	}

	////////////////// mru
	// Time Complexity of MRU numbeofpages*numberofframes==(response*noofframes)
	function MRU1(){		
		for(j=0;j<response;j++)      //no of pages
		{
			 flagFound=0,flag=0,flag2=0;
			 for( i=0;i<noofframes;i++) //loop for no. of frames
					 {
						 if(frames[i]==pages[j]) //if page hit 
							 {	
								 flagFound=1;
								 flag=1;
								 count++;
								 frameAge[i]=count; //age frame
								 hit++;
								 pagefault=1;  //	 printf("hit ");
								  break;
							} 
						} 
			
					 if(flagFound==0)          //if frame not found and empty frame avalible
					 {
						   for(i=0;i<noofframes;i++)
						   {
								if(frames[i]==-1)
								{
								frames[i]=pages[j];
								flag=1;
								count++;
								frameAge[i]=count;
								pagefault=0;	//  printf("miss ");
								miss++;
								break;		
								}  }  }  //FLAG FOUND ends
			
					  if(flag==0)           //if frame not found
					  {
					   min=frameAge[0];
					   var m=0;
						//   for mru	
						if(algoNumber==3)
						{	for(i=0;i<noofframes;i++)
							{
								if(frameAge[i]>min) // checks frame age
								{
									min=frameAge[i];
									m=i; // most recently used frame stored
								}  
								}
						}	

					   frames[m]=pages[j];
					   count++;
					   frameAge[m]=count;
					   miss++;
					   pagefault=0;    //	printf("miss ");   
					  }
			//printing results

			var row = tab_need.insertRow(j+2);
			var cell = row.insertCell(0);
			cell.innerHTML = "<b>P"+(j+1)+"("+resource[j]+")"  + "</b>";		
			for(k=0;k<noofframes;k++)
			{
				var cell = 	row.insertCell(k+1);
				cell.innerHTML = frames[k];
			}
			var cell=row.insertCell(k+1);
			if(pagefault==0)
			cell.innerHTML = "<font color=#008000>YES</font>";
			else
			cell.innerHTML = "<font color=#FF0000>NO</font>";	
			var cell=row.insertCell(k+2);
			if(pagefault==0)
			cell.innerHTML = "<font color=#FF0000>NO</font>";
			else
			cell.innerHTML = "<font color=#008000>YES</font>";						
		}  	
		var row = tab_need.insertRow(j+2);
		var cell = row.insertCell(0);
		cell.innerHTML = "MRU RESULTS:";                 
	}	
	