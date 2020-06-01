let garden=[];
let picNum=0;
let sr;
let info;
let info2;
function preload(){
  /*
  getDB() returns JSON from the Database
  parseItem takes element of JSON and
  returns image_path, original_created_at,
  created_at,and camera
  */
  let entries=getDB().map(getList)
  //Build Image Array
  for (let i=0;i<entries.length;i++){

    loadImage(entries[i][0],img=>{
      console.log("image:" ,img)

      garden.push(
        {
          "image":img,
          "image_nr": i,
          "path":entries[i][0],
          "created":entries[i][1],
          "entered":entries[i][2],
          "camera":entries[i][3],
          "generation":entries[i][4]
        })
    })
  }
}
function setup() {
  cnv=createCanvas(1200,675)
  sr=cnv.width/cnv.height
  background(200)
  for (let i=0;i<garden.length;i++){
    let b=createButton(i+1,i+1)
    b.addClass('pic_num')
    b.parent('buttons')
    b.mousePressed(getPic_num)
  }
  info=createDiv();
  info2=createDiv();
  noLoop()
}
function draw() {
  background(200)
  let temp=garden[picNum]['image'];
  console.log("temp:",temp)
  let created;
  if (garden[picNum].created== null){
    created = "Sometime in the past"
  } else{
    created =new Date(garden[picNum].created)
  }
  let entered=new Date(garden[picNum].entered)
  console.log("created: "+created+"  ")
  info.html("Created: "+created)
  info2.html("Seed Planted: "+entered)
  temp=makeAspect(temp)
  temp.resize(width,0)


  image(temp,0,0)
}
function getPic_num(){
  loop()
  picNum=this.value()-1
  noLoop()
}
function makeAspect(img){
  console.log("-------")
  console.log("sr:",sr)
  console.log("c width: ",width)
  let ir=img.width/img.height
  console.log("ir: ",ir)
  let newWidth=img.width
  console.log("imgWidth: ",newWidth)
  let newHeight=img.height
  console.log("imgHeight: ",newHeight)
  if (ir < sr){
    newHeight=img.width/sr
  }else if (ir > sr){
    newWidth = img.height * sr
  }
  console.log(img.width/2-newWidth/2,img.height/2-newHeight/2,newWidth,newHeight)
  img=img.get(img.width/2-newWidth/2,img.height/2-newHeight/2,newWidth,newHeight)
  //img.resize(width,0)
  console.log("newSizes:",img.width,img.height)
  return img
}
