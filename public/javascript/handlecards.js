var div = document.getElementById('allcards');
var divChildren = div.childNodes;
var flag=true;
for (var i=1; i<divChildren.length; i=i+2) {

  if(flag){

    divChildren[i].classList.add("div1");
    console.log(1,divChildren[i].classList); 
    flag=false;

  }
  else{
    divChildren[i].classList.add("div2");
    console.log(2,divChildren[i].classList); 
    flag=true;

  }
  
  
}