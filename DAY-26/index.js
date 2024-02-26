const MongoClient = require('mongodb').MongoClient;

// Connection URL
const url = 'mongodb+srv://yash1409:<password>@cluster0.n8wj9y6.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

// Database Name
const dbName = 'productsDB';

// Create a new MongoClient
const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });

// Connect to the MongoDB server
client.connect(function(err) {
  if (err) {
    console.error('Error connecting to MongoDB:', err);
    return;
  }

  console.log('Connected successfully to server');

  // Select the database
  const db = client.db(dbName);

  // Define the getProductStatistics function
  function getProductStatistics() {
    const pipeline = [
      {
        $group: {
          _id: null,
          totalProducts: { $sum: 1 },
          averagePrice: { $avg: "$price" },
          highestQuantity: { $max: "$quantity" }
        }
      }
    ];

    // Execute the aggregation pipeline
    return db.collection('products').aggregate(pipeline).toArray();
  }

  // Call getProductStatistics function and log the result
  getProductStatistics()
    .then(result => {
      console.log('Product Statistics:', result[0]);
    })
    .catch(err => {
      console.error('Error fetching product statistics:', err);
    });
});