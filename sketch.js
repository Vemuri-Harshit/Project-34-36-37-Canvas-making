var drawing = [];
var currentPath = []; 

var button;
var clear;
var nameId,input;
var isDrawing = false;

var database;

function setup(){

var canvas = createCanvas(400,400);



canvas.mousePressed(startPath);
canvas.mouseReleased(endPath);

database = firebase.database();

var ref = database.ref('drawings');
ref.on('value',getData,errData);




button = createButton("Save");
button.position(500,60);

clear = createButton("Clear");
clear.position(500,30);





}


function startPath(){

  isDrawing = true;
currentPath = [];
drawing.push(currentPath);


}

function endPath(){

  isDrawing = false;

}




function draw(){

background(0);

if(isDrawing){
  var point ={
    x:mouseX,
    y:mouseY
  }
  currentPath.push(point)
}


stroke(255);
strokeWeight(3);
noFill();

for(var i = 0;i<drawing.length;i++ ){

      var path = drawing[i];

      beginShape();    

  for(var j = 0;j<path.length;j++ ){

      vertex(path[j].x,path[j].y);

  }

  endShape();
}

button.mousePressed(()=>{

var dRef = database.ref('drawings');

var data={

   name: "Harshit",
  drawing:drawing

}

dRef.push(data);

})

clear.mousePressed(()=>{

  drawing = [];

  })
}

function getData(data){

  var elts = selectAll('.listing');
  for(var i = 0;i<elts.length;i++){

    elts[i].remove();
  }

  var drawings = data.val();
  var keys = Object.keys(drawings);//???????

  for(i = 0;i<keys.length;i++){

    var key = keys[i];

   var li = createElement('li','');//
   li.class('listing');//
   li.parent('drawingList');//??????

   var ahref = createA('#',key);//
   ahref.parent(li);
   ahref.mousePressed(showDrawing);//

  }


}

function errData(err){

console.log(err);

}

function showDrawing(){

  var key = this.html();

  var ref = database.ref('drawings/' + key);
  ref.once('value',oneDrawing,errData);

  function oneDrawing(data){

    var d = data.val();
    drawing = d.drawing;//

  }

}