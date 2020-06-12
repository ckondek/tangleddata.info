function getDB(){

  let db = "https://tangled.garden/api/images/?format=json";
  let request = new XMLHttpRequest()
  request.open("GET",db,false)
  request.send()
  return JSON.parse(request.responseText)
}
//returns a function that takes an Object as parameter
//and returns Object[key]. To be used with Array.map()
function getByKey(key){
  return function (entry){
    return entry[key];
  }
}



let getPath=getByKey('image_file')
let getGen=getByKey('generation')
let getCreated=getByKey('original_created_at')
let getCamera=getByKey('camera')

function getByKeys(key1,key2,key3,key4,key5){
  return function (entry){
    return [entry[key1],entry[key2],entry[key3],entry[key4],entry[key5]];
  }
}

let getList=getByKeys('image_file','original_created_at','created_at','camera','generation')
