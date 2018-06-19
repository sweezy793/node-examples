const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const dboper=require('./operations');
const url = 'mongodb://localhost:27017/conFusion';

MongoClient.connect(url).then((db) => {


    console.log('Connected correctly to server');

    dboper.insertDocument(db,{name:"Vadonut",desciption:"Test"},"dishes")
    .then((result)=>{
            console.log("Insert document \n",result.ops);

            return dboper.findDocument(db,"dishes");

    })
    .then((docs)=>{
            console.log("Found documents \n",docs);

            return dboper.updateDocument(db,{name:"Vadonut"},
            {desciption:"Updated Test"},"dishes");
    })
    .then((result)=>{
            console.log("Updated document\n",result.result);

            return dboper.findDocument(db,"dishes");
    })
    .then((docs)=>{
            console.log("Found updated documents \n",docs);

            return db.dropCollection("dishes");
    })
    .then((result)=>{
            console.log("Dropped collections ",result);

            return db.close();

    })
    .catch((err)=>console.log(err));
           

},(err)=>console.log(err)).catch((err)=>console.log(err)); 