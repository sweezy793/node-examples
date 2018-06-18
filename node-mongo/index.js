const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const dboper=require('./operations');
const url = 'mongodb://localhost:27017/conFusion';

MongoClient.connect(url, (err, db) => {
    

    assert.equal(err,null);

    console.log('Connected correctly to server');

    dboper.insertDocument(db,{name:"Vadonut",desciption:"Test"},
    "dishes",(result)=>{
        console.log("Insert document \n",result.ops);

        dboper.findDocument(db,"dishes",(docs)=>{
            console.log("Found documents \n",docs);

            dboper.updateDocument(db,{name:"Vadonut"},
            {desciption:"Updated Test"},"dishes",
            (result)=>{
                    console.log("Updated document\n",result.result);

                    dboper.findDocument(db,"dishes",(docs)=>{
                        console.log("Found updated documents \n",docs);

                        db.dropCollection("dishes",(result)=>{
                            console.log("Dropped collections ",result);

                            db.close();

                        });
            });
        });
    });

    });
}); 