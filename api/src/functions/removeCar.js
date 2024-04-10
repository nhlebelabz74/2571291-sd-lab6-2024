const { app } = require('@azure/functions');
const fs = require('fs/promises');
const path = require('path');

const filePath = path.resolve(__dirname, '../cars.json'); // Create a path to the cars.json file

app.http('removeCar', {
    methods: ['DELETE'],
    authLevel: 'anonymous',
    route: 'removeCar/{carId}', // Define a route parameter named carId
    handler: async (request, context) => {
        try {
            const index = request.params.carId;
            const cars = await fs.readFile(filePath, 'utf-8');
            const data = JSON.parse(cars);

            if (typeof index === 'undefined') { // Check if the carId parameter is missing
                context.error(404, 'Car not found');
            }
            else {
                data.splice(index, 1);
                await fs.writeFile(filePath, JSON.stringify(data, null, 2));
                
                return { 
                    body: JSON.stringify(data) 
                };
            }
        }
        catch (error) {
            context.error(500, 'Error removing car:', error);
        }
    }
});