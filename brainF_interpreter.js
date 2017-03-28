function brainLuck(code, input){

  //Format input, create variables
  let codeStream = code.split('');
  let dataStore = new Array(30).fill(0);
  let dataPtr = 5, byteVal= 0, gotoBal = 0;
  let output = '';
  
  let inputStream = input.split('').map((charVal) => {return charVal.charCodeAt(0)});

  //Process input cases
  PROGRAM_LOOP:    for(let i = 0; i < codeStream.length;i++) {
    
    switch(codeStream[i]) {
      
      case '>':
        dataPtr++;
        break;
        
      case '<':
        dataPtr--;
        break;
      
      case '+':
        byteVal = dataStore[dataPtr];
        if(byteVal === 255) {
          byteVal = 0;
        } else {
          byteVal++;
        }
        dataStore[dataPtr] = byteVal;
        break;
     
      case '-':
        byteVal = dataStore[dataPtr];
        if(byteVal === 0) {
          byteVal = 255;
        } else {
          byteVal--;
        }
        dataStore[dataPtr] = byteVal;
        break;
      
      case '.':
        output = output + String.fromCharCode(dataStore[dataPtr]);
        break;
      
      case ',':
        if(inputStream.length === 0 || inputStream[0] === 0 || inputStream[0] === 255) {
          //console.log("INPUT EOF");
          break PROGRAM_LOOP;
        } else {
          dataStore[dataPtr] = inputStream.shift();
        }
        break;
      
      case '[':
        if(dataStore[dataPtr] === 0) {
          gotoBal = 0;
          do {
            if(codeStream[i] === '[') {
              gotoBal++;
            } else if(codeStream[i] === ']') {
              gotoBal--;
            }
            i++;
          } while(i< codeStream.length && gotoBal !== 0);
          i--;
        }
        break;
      
      case ']':
        if(dataStore[dataPtr] !== 0) {
          do {
            if(codeStream[i] === '[') {
              gotoBal++;
            } else if(codeStream[i] === ']') {
              gotoBal--;
            }
            i--;
          } while(i >= 0 && gotoBal !== 0);
          if(i !== -1) {
            i++;
          }
        }
        
        break;
      default:
        console.log("Invalid input");
        break;
    }
  }
  return output;
}