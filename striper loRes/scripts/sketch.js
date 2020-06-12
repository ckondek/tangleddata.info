let img1,img2,dest,xOff,yOff,zOff,z,rOff,index,q;
function preload(){
  let garden=getDB()
  let size=garden.length;
  let path1=getPath(garden[Math.round(Math.random()*size)])
  let path2=getPath(garden[Math.round(Math.random()*size)])
  img1=loadImage(path1);
  img2=loadImage(path2);

}
function setup() {
  createCanvas(1200,700)
  background(200)
  xOff=0;
  yOff=0;
  z=0;
  zOff=0
  dest=createImage(width/3,height/3)
  img1.resize(width/3,height/3)
  img2.resize(width/3,height/3)
  img1.loadPixels()
  img2.loadPixels()
  dest.loadPixels()
  noiseSeed(8,0.7)
}
function draw() {
  console.log("entering")
  z+=0.05;
  xOff=0;
  yOff=0;

  for (let y=0;y<dest.height;y++){
    yOff+=0.0001;
    for (let x=0;x<dest.width;x++){
      xOff+=0.0001;
      index=(x+y*dest.width)*4
      q=noise(xOff,yOff,z)
      //q=random()
      if (q>0.5){
        dest.pixels[index]=img1.pixels[index+1]
        dest.pixels[index+1]=img1.pixels[index]
        dest.pixels[index+2]=img1.pixels[index+2]

      }else{
        dest.pixels[index]=img2.pixels[index+1]
        dest.pixels[index+1]=img2.pixels[index+2]
        dest.pixels[index+2]=img2.pixels[index]
      }
      dest.pixels[index+3]=20
    }
  }
  dest.updatePixels()

  image(dest,0,0,width,height)
}
