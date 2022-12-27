const prompt=require('prompt');
prompt.start();
const mongoclient=require("mongodb").MongoClient;
const url="mongodb://127.0.0.1:27017/nodedb";  
function mymsg()
{
    console.log("MyChoices")
    console.log("1.Insert")
    console.log("2.Find")
    console.log("3.Update")
    console.log("4.Delete")
    console.log("5.Exit")
    prompt.get(['choice'],function(err,res){
        if(err)
        throw err
    console.log(res.choice)    
    
    if(res.choice=="1")
    {
        customInsert()

    }
    if(res.choice=="2")
    {
        customFind()
    }
    if(res.choice=="3")
    {
        customUpdate()
    }
    if(res.choice=="4")
    {
        customDelete()
    }
    if(res.choice=="5")
    {
        customExit()
    }
})
}
function customInsert()
{
mongoclient.connect(url,function(err,db){
if(err)
throw err;
console.log("Connected to MongoDb")
prompt.get(['_id','name','pwd'],function(err,res){
if(err)
throw err;
var myobj={_id:res._id,name:res.name,pwd:res.pwd}

var dbo=db.db("nodedb")
dbo.collection("tbl_login").insertOne(myobj,function(err,res)
{
if(err)
throw err;

console.log(res)
console.log(res.insertedId)
if(res) 
{
console.log("One Record is Inserted")
console.log("Do you Want to continue")
prompt.get(['ch'],function(err,res){
    if(err)
    throw err
   
    if(res.ch=="Yes" || res.ch=="yes" || res.ch==1)
    {
        mymsg()
    }
    else{
        process.exit(0);
    }
})

}
else
{
console.log(err)  
}
});
  
});
}); 
}
function customFind()
{
    mongoclient.connect(url,function(err,db){
    if(err)
   throw err;
   console.log("Connected to MongoDb")
   var dbo=db.db("nodedb")
   dbo.collection("tbl_login").find({}).toArray(function(err,res)
   {
    if(err)
    throw err;
    console.log(res)
    console.log("Do you Want to continue")
     prompt.get(['ch'],function(err,res){
    if(err)
    throw err
   
    if(res.ch=="Yes" || res.ch=="yes" || res.ch==1)
    {
        mymsg()
    }
    else{
        process.exit(0);
    }
})
   })
 })
}
function customUpdate()
{ 
  mongoclient.connect(url,function(err,db)
 {
    if(err)
    throw err;
   var dbo=db.db("nodedb")
   dbo.collection("tbl_login").find({}).toArray(function(err,res)
   { 
       if(err)
       throw err
       console.log(res)
       prompt.get(['_id','name'],function(err,res)
       {
           if(err)
           throw err;
            var myobj={_id:res._id}
            var newval={$set:{name:res.name}}
           var dbo=db.db("nodedb")
           dbo.collection("tbl_login").updateOne(myobj,newval,function(err,res)
           {
             if(err)
             throw err;
             console.log(res);
              db.close();
              console.log('updated 1 row')
             console.log("Do you Want to continue")
              prompt.get(['ch'],function(err,res)
              {
                if(err)
                throw err
   
                if(res.ch=="Yes" || res.ch=="yes" || res.ch==1)
               {
                 mymsg()
               }
               else{
                 process.exit(0);
                }
              })   
           })
       })
    })
   
  })

}
   
   
function customDelete()
{
    mongoclient.connect(url,function(err,db)
    {
      if(err)
      throw err;
      console.log("Connected to MongoDb")
      var dbo=db.db("nodedb")
     dbo.collection("tbl_login").find({}).toArray(function(err,res)
     { 
        if(err)
        throw err
        console.log(res)
        console.log("delete a one document")
        prompt.get(['_id'],function(err,res)
        {
           if(err)
           throw err;
            var myobj={_id:res._id}||{name:res._id}
          var dbo=db.db("nodedb")
          dbo.collection("tbl_login").deleteOne(myobj,function(err,res)
         {
             if(err)
             throw err;
             console.log(res)
             console.log("Do you Want to continue")
             prompt.get(['ch'],function(err,res)
             {
              if(err)
               throw err
   
              if(res.ch=="Yes" || res.ch=="yes" || res.ch==1)
                {
                   mymsg()
                }
              else{
                      process.exit(0);
                    }
             })
           })
        })
     })
})
}
function customExit()
{
    process.exit(0);
}
mymsg()
