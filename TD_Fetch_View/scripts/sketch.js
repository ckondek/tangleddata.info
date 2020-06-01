let garden;
let db = "https://tangled.garden/api/images/?format=json";
let request = new XMLHttpRequest()
request.open("GET",db,false)
request.send()
garden=JSON.parse(request.responseText)
//need to change metadata string into object
let img;

//function returns a function to be used with map.
function getByKey(key){
  return function (entry){
    return entry[key];
  }
}
let getImagePaths=getByKey('image_file')

let paths=garden.map(getImagePaths)
let indexArray=new Array()
let images=[]
let scale=200
let xGrid;
let yGrid;
let slider;
let fps;

function preload(){
  let count=0
  for (let j = 0;j<paths.length;j++){
    count++
    loadImage(paths[j],img =>{
      indexArray.push(j)
      //img.resize(200,0);
      images.push(img);
      console.log("loading image: "+count)
    });
  }
  console.log("leaving preload")
}
function setup(){
  createCanvas(1600,800);
  background(51)
  let fields=Object.keys(garden[0]);
  for (let i = 0;i<fields.length;i++){
    let d=createDiv(fields[i]);
    d.class('menuItems')
    d.parent('fields')
  }
  slider = createSlider(0.5, 30, 25, 0.5);
  slider.style("width",'200px')
  slider.position(10,10)
  fps=createDiv(slider.value()+" FPS")
  fps.position(220,10)
  xGrid=width/scale;
  yGrid=height/scale;

}
function draw(){
  let val=slider.value()
  fps.html(slider.value()+" FPS")
  frameRate(val)
  var picCount=0;
  for (let y=0;y<yGrid;y++){
    for (let x =0;x<xGrid;x++){
      push()
      translate(x*scale,y*scale);
      image(images[floor(Math.random()*paths.length)],0,0,200,200)
      pop();
      picCount++;
    }
  }
}
