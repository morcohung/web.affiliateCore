export  function chageMonthToAbbreviation(months: number) {
  let monthString;
  switch(months) {
    case 1:
      monthString= `jan`;
      break;
    case 2:
      monthString= `feb`;
      break;    
    case 3:
      monthString= `mar`;
      break;  
    case 4:
      monthString= `apr`;
      break;  
    case 5:
      monthString= `may`;
      break;  
    case 6:
      monthString= `jun`;
      break;  
    case 7:
      monthString= `jul`;
      break;  
    case 8:
      monthString= `aug`;
      break;  
    case 9:
      monthString= `sep`;
      break;  
    case 10:
      monthString= `oct`;
      break;  
    case 11:
      monthString= `nov`;
      break;  
    case 12:
      monthString= `dec`;
      break;                                                                                                      
  }      
  return monthString;
}

export function chageMonthsToString(months: number) {       
  let monthString;
  switch(months) {
    case 1:
      monthString= `january`;
      break;
    case 2:
      monthString= `february`;
      break;    
    case 3:
      monthString= `march`;
      break;  
    case 4:
      monthString= `april`;
      break;  
    case 5:
      monthString= `may`;
      break;  
    case 6:
      monthString= `june`;
      break;  
    case 7:
      monthString= `july`;
      break;  
    case 8:
      monthString= `august`;
      break;  
    case 9:
      monthString= `september`;
      break;  
    case 10:
      monthString= `october`;
      break;  
    case 11:
      monthString= `november`;
      break;  
    case 12:
      monthString= `december`;
      break;                                                                                                      
  }    
  return monthString;
} 