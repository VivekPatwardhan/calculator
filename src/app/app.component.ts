import { ReturnStatement } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { reference } from '@popperjs/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss','../assets/css/custom.css']
})

export class AppComponent {
  title = 'calculator';
  display='0';
  displayLimit = 15;
  referenceLimit = 40;
  calculate = '';
  reference = '';
  // show = '';
  // wah = "../assets/audio/sabbas.mp3"; 


  numericals=[7,8,9,4,5,6,1,2,3,'.',0,'00'];
  operators=['⌫','AC','√','/','-','x'];

  onNumClick(buttonClick: any):any{
    let displayLength = this.display.length;

    // 0 key when 0 on display
    if(buttonClick=='0' && this.display=='0') {
      this.display = '0';      
    }

    // 00 key when 0 on display
    else if(buttonClick=='00' && this.display=='0') {
      this.display = '0';
    }

    // 0 to 9 key when 0 on display
    else if(buttonClick>=0 && this.display=='0') {
      this.display = this.display.substring(0,displayLength-1);
      this.display = this.display+''+buttonClick;
      this.reference = this.reference+''+buttonClick;
      this.calculate = this.reference;
    }

    // 00, 0 to 9 key when non-zero on display
    else if((buttonClick>=0 || buttonClick=='00') && this.display!='0' && displayLength<15) {
      this.display = this.display+''+buttonClick;
      this.reference = this.reference+''+buttonClick;
      this.calculate = this.reference;
    }

    else if(buttonClick=='.' && !this.display.includes('.') && displayLength<14) {
      this.display = this.display+'.';
      if(this.reference=='') {
        this.reference = '0.';
      }            
      else if(this.reference!='' && this.display=='0') {
        this.reference = this.reference+'0.';
      }
      else if(this.reference!='' && this.display!='0') {
        this.reference = this.reference+'.';
      }
    }
    // return this.display;
  }
  
  onOpClick(buttonClick: any){
    
    let referenceLength = this.reference.length;

    switch (buttonClick) {

      case '⌫':
        let displayLength = this.display.length;

        if(this.display!='0' && displayLength>1) {
          this.display = this.display.substring(0,displayLength-1);
          this.reference = this.reference.substring(0,referenceLength-1);
          this.calculate = this.reference;
        }

        if(displayLength==1 && this.display!='0') {
          this.display = '0';
          this.reference = this.reference.substring(0,referenceLength-1);
          this.calculate = this.reference;
        }

        if(displayLength==1 && this.display=='0' && (this.reference.slice(-1)=='+'|| this.reference.slice(-1)=='x' || 
        this.reference.slice(-1)=='/' || this.reference.slice(-1)=='-')) {
          this.display = '0';
          this.reference = this.reference;
          this.calculate = this.reference;
        }
      break;

      case 'AC':
        this.display = '0';
        this.reference = '';
        this.calculate = '';
      break;

      case '√':
        let number = parseFloat(this.display);
        let result = number**0.5;
        this.display = ''+result;
        if(this.reference!='') {
          this.reference = '√'+this.reference;
        }
      break;

      case '+':
        if(this.reference=='') {
          this.display = '0';
          this.reference = '';
        }
        
        if(this.reference.slice(-1)=='.' && this.display!='0') {
          this.reference = this.reference+'0';
          this.reference = this.reference+'+';
          this.calculate = this.reference;
          this.display = ''+(parseFloat(this.calculate)-parseFloat(this.calculate));
        }

        else if(this.display!='0') {
          this.reference = this.reference+'+';
          this.calculate = this.reference;
          this.display = ''+(parseFloat(this.calculate)-parseFloat(this.calculate));
        }

        else if(this.reference.slice(-1)=='+'|| this.reference.slice(-1)=='x' || 
          this.reference.slice(-1)=='/' || this.reference.slice(-1)=='-') {
          this.reference = this.reference.substring(0,referenceLength-1);
          this.reference = this.reference+'+';
          this.calculate = this.reference;
        }
      break;

      case '=':
        // var onlyNumArray;
        // var onlyOpsArray;
        // var result = '';

        if (this.display=='0' && this.reference==''){
          this.display = '0';
          this.reference = '';
        }
        else{
          // this.display = ''+calculation(this.calculate);
          // function calculation(x: any) {
            // var result;
            // let calLength = x.length;
            // if(x.slice(-1)=='+'){
            //     x = x.substring(0,calLength-1);
            // }
            // if(x.slice(-1)=='-'){
            //     x = x.substring(0,calLength-1);
            // }
            // if(x.slice(-1)=='x'){
            //     x = x.substring(0,calLength-1);
            // }
            // if(x.slice(-1)=='/'){
            //     x = x.substring(0,calLength-1);
            // }
            
            // if(x.includes('+')){
            //     let arr = x.split('+');
            //     let num1 = parseFloat(arr[0]), num2 = parseFloat(arr[1]);
            //     result = num1 + num2;
            // }
            // if(x.includes('-')){
            //     let arr = x.split('-');
            //     let num1 = parseFloat(arr[0]), num2 = parseFloat(arr[1]);
            //     result = num1 - num2;
            // }
            // if(x.includes('x')){
            //     let arr = x.split('x');
            //     let num1 = parseFloat(arr[0]), num2 = parseFloat(arr[1]);
            //     result = num1 * num2;
            // }
            // if(x.includes('/')){
            //     let arr = x.split('/');
            //     let num1 = parseFloat(arr[0]), num2 = parseFloat(arr[1]);
            //     result = num1 / num2;
            // }
            // return result;

            const regexNums = /[0-9.0-9]*/g;
            const regexOps = /[x\+\-\/]*/g;
            var finalArray = [], onlyNumArray: any, onlyOpsArray: any;
            console.log("ref: "+this.calculate);
            var onlyNumbers = this.calculate.match(regexNums);
            var onlyOperators = this.calculate.match(regexOps);
            // console.log("onlyNumbers: "+onlyNumbers);
            // console.log("onlyOperators: "+onlyOperators);
            function removeBlanks(value: any, index: any, arr: any) {
                if (value != '') {
                    arr.splice(index, 1);
                    return true;
                }
                return false;
            }
            // var onlyNumArray = onlyNumbers.filter(removeBlanks);
            onlyNumArray = onlyNumbers?.filter(removeBlanks);
            onlyOpsArray = onlyOperators?.filter(removeBlanks);
            console.log("onlyNumArray: "+onlyNumArray);
            console.log("onlyNumArray len: "+onlyNumArray.length);
            console.log("onlyOpsArray: "+onlyOpsArray);
            console.log("onlyOpsArray len: "+onlyOpsArray.length);
            for(let i=0;i<onlyNumArray.length-1;i++) {
                finalArray.push(onlyNumArray[i]);
                finalArray.push(onlyOpsArray[i]);
            }
            finalArray.push(onlyNumArray[onlyNumArray.length-1]);
            console.log("finalArray: "+finalArray);

            var llenn = finalArray.length;
    
            // ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ MULTIPLICATION and DIVISION START ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
            for(let i=0;i<llenn;i++) {
                if(finalArray[i]=='x'){
                    var res = 0;
                    res = parseFloat(finalArray[i-1]) * parseFloat(finalArray[i+1]);
                    // console.log(`While i is ${i} : ${finalArray[i-1]} x ${finalArray[i+1]}: `+res);
                    finalArray.splice(i-1,3,res.toString());
                    i=i-1; 
                }   
                if(finalArray[i]=='/'){
                    var res = 0;
                    res = parseFloat(finalArray[i-1]) / parseFloat(finalArray[i+1]);
                    // console.log(`While i is ${i} : ${finalArray[i-1]} / ${finalArray[i+1]}: `+res);
                    finalArray.splice(i-1,3,res.toString());
                    i=i-1; 
                }    
            }
            console.log("After Mul and Div: "+finalArray.join(""));
            // ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑ MULTIPLICATION and DIVISION END ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑
    
            llenn = finalArray.length;
    
            // ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ ADDITION and SUBTRACTION START ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
            for(let i=0;i<llenn;i++) {
                if(finalArray[i]=='+'){
                    var res = 0;
                    res = parseFloat(finalArray[i-1]) + parseFloat(finalArray[i+1]);
                    // console.log(`While i is ${i} : ${finalArray[i-1]} + ${finalArray[i+1]}: `+res);
                    finalArray.splice(i-1,3,res.toString());
                    i=i-1; 
                }
                if(finalArray[i]=='-'){
                    var res = 0;
                    res = parseFloat(finalArray[i-1]) - parseFloat(finalArray[i+1]);
                    // console.log(`While i is ${i} : ${finalArray[i-1]} - ${finalArray[i+1]}: `+res);
                    finalArray.splice(i-1,3,res.toString());
                    i=i-1; 
                }
            }
            console.log("After Add and Sub: "+finalArray.join(""));
            // ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑ ADDITION and SUBTRACTION END ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑
    
            llenn = finalArray.length;
            let result = ''+finalArray.toString();
            console.log("Yaaayyyy: "+result);
            this.display = result;
            // this.onOpClick.display = result;
          // }
          // let r = result;
          // let r = this.onOpClick.arguments;
          // this.display = r;
          // return result;      
        }
        // let r = this.onOpClick.arguments;
        
        if(this.reference.slice(-1)=='+'|| this.reference.slice(-1)=='x' || 
          this.reference.slice(-1)=='/' || this.reference.slice(-1)=='-') {
          this.reference = this.reference.substring(0,referenceLength-1);
          this.calculate = this.reference;
        }    
      // this.display = r;
      // return r;
      break;

      case '-':
        if(this.reference=='') {
          this.display = '0';
          this.reference = '';
        }
        
        if(this.reference.slice(-1)=='.' && this.display!='0') {
          this.reference = this.reference+'0';
          this.reference = this.reference+'-';
          this.calculate = this.reference;
          this.display = ''+(parseFloat(this.calculate)-parseFloat(this.calculate));
        }

        else if(this.display!='0') {
          this.reference = this.reference+'-';
          this.calculate = this.reference;
          this.display = ''+(parseFloat(this.calculate)-parseFloat(this.calculate));
        }

        else if(this.reference.slice(-1)=='+'|| this.reference.slice(-1)=='x' || 
          this.reference.slice(-1)=='/' || this.reference.slice(-1)=='-') {
          this.reference = this.reference.substring(0,referenceLength-1);
          this.reference = this.reference+'-';
          this.calculate = this.reference;
        }        
      break;

      case 'x':
        if(this.reference=='') {
          this.display = '0';
          this.reference = '';
        }
        
        if(this.reference.slice(-1)=='.' && this.display!='0') {
          this.reference = this.reference+'0';
          this.reference = this.reference+'x';
          this.calculate = this.reference;
          this.display = ''+(parseFloat(this.calculate)-parseFloat(this.calculate));
        }

        else if(this.display!='0') {
          this.reference = this.reference+'x';
          this.calculate = this.reference;
          this.display = ''+(parseFloat(this.calculate)-parseFloat(this.calculate));
        }

        else if(this.reference.slice(-1)=='+'|| this.reference.slice(-1)=='x' || 
          this.reference.slice(-1)=='/' || this.reference.slice(-1)=='-') {
          this.reference = this.reference.substring(0,referenceLength-1);
          this.reference = this.reference+'x';
          this.calculate = this.reference;
        }
      break;

      case '/':
        if(this.reference=='') {
          this.display = '0';
          this.reference = '';
        }
        
        if(this.reference.slice(-1)=='.' && this.display!='0') {
          this.reference = this.reference+'0';
          this.reference = this.reference+'/';
          this.calculate = this.reference;
          this.display = ''+(parseFloat(this.calculate)-parseFloat(this.calculate));
        }

        else if(this.display!='0') {
          this.reference = this.reference+'/';
          this.calculate = this.reference;
          this.display = ''+(parseFloat(this.calculate)-parseFloat(this.calculate));
        }

        else if(this.reference.slice(-1)=='+'|| this.reference.slice(-1)=='x' || 
          this.reference.slice(-1)=='/' || this.reference.slice(-1)=='-') {
          this.reference = this.reference.substring(0,referenceLength-1);
          this.reference = this.reference+'/';
          this.calculate = this.reference;
        }
      break;
    }
  }  
  
  // calculation () {

  // }
} 
