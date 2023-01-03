const { TableClient } = require("@azure/data-tables");

const env = {
    connectionString:"DefaultEndpointsProtocol=https;AccountName=tripaccount;AccountKey=MvAI160KjMP9MFIPEBntoIIn2TMQPxJMRYA10fbnlFUd4AlTYTGlkzF2dMYwsSHuTn0ps8bkhON++AStei4+jg==;EndpointSuffix=core.windows.net",
    tableName: "places",
  };

const serviceClient = TableClient.fromConnectionString(
  env.connectionString,
  env.tableName
);


const insertEntity = async function (entity) {
    await serviceClient.createEntity(entity);
};

const getPlace = async function (partition_key, row_key) {
  await serviceClient.getEntity(partition_key, row_key);
};



// Create row for users
entity = {PartitionKey:"users", RowKey:1, 
    name: "Kamilo", 
    email: "kamil.skowron@gmail.com", 
    password: "secret", 
    image: "https://bi.im-g.pl/im/05/1b/1a/z27374597Q,Zofia-Zborowska-reaguje-na-niekorzystne-zdjecia-zr.jpg", 
    places: "1" }

// Create row for places
entity = {PartitionKey:"places", RowKey:"2",   
    title: "Plac grunwaldzki", 
    description: "fajne miejsce", 
    image: "https://upload.wikimedia.org/wikipedia/commons/4/44/Wroclaw%2C_Plac_Grunwaldzki.jpg",
    address: "Wroclaw, Plac grunwaldzki 1",
    location_lat: 11,
    location_lng: 23,
    creator: 1
}

getPlace('places','1').then(function(result){
  console.log(result)
})

