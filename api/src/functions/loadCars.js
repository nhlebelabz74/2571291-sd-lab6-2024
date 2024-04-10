const { app } = require('@azure/functions');
const fs = require('fs/promises');
const path = require('path'); // Import the path module

const filePath = path.resolve(__dirname, '../cars.json'); // Create a path to the cars.json file

app.http('loadCars', {
    methods: ['GET'], // Listen for GET requests
    authLevel: 'anonymous',
    handler: async (request, context) => {
        try{
            const cars = await fs.readFile(filePath, 'utf-8'); // Read the cars.json file
            const data = JSON.parse(cars); 

            return { body: JSON.stringify(data) };
        }
        catch(error){
            context.error(500, 'Error fetching car data:', error);
        }
    }
});