function findDiff(arr1,arr2){
  let found,updated = 0,added = 0,removed = 0
  for(let i = 0 ; i < arr2.length ; i++){
    let item = arr2[i]
    found = false
    for(let j = 0 ; j < arr1.length ; j++){
      if(item == arr1[j]){
          found = true;break;
      }
        
    }
  if(found)
    updated += 1
  else
    added += 1
}
  for(let i = 0 ; i < arr1.length ; i++){
    let found = false
   for(let j = 0 ; j < arr2.length ; j++){
       if(arr2[j] == arr1[i]){
           found = true;
           break;
       }
         
   }
    if(!found)
      removed++;
  }
  return {
    updated: updated,
    added:added,removed:removed
  }
}

let diff = findDiff([],[1,2,3,4,5])
console.log(diff)