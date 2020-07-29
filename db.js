db.collection ('recipies').onSnapshot (snapshot => {
  // console.log ("snapshot", snapshot.docChanges());

  snapshot.docChanges().forEach((change)=>{
    // console.log(change, change.doc.data(), change.doc.id)

    if(change.type === 'added'){
      // add the document data to the web page
      renderRecipe(change.doc.data(), change.doc.id)
    }
    if(change.type === 'removed'){
      // delete the document data from the web page
    }
  })
});
