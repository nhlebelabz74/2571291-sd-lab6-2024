const { app } = require('@azure/functions');
const fs = require('fs/promises');
const path = require('path');

const filePath = path.resolve(__dirname, '../cars.json'); // Create a path to the cars.json file

app.http('addCar', {
    methods: ['POST'], // Listen for POST requests
    authLevel: 'anonymous',
    handler: async (request, context) => {
        try {
            const newCar = await request.json(); // Parse the request body as JSON
            const cars = await fs.readFile(filePath, 'utf-8');
            const data = JSON.parse(cars);
            data.push(newCar); // Add the new car to the data array
            await fs.writeFile(filePath, JSON.stringify(data, null, 2)); // Write the updated data array back to the file

            return { body: JSON.stringify(data) };
        }
        catch (error) {
            context.error(500, 'Error adding new car:', error); 
        }
    }
});