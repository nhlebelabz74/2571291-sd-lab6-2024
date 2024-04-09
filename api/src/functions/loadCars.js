const { app } = require('@azure/functions');
const fs = require('fs/promises');
const path = require('path');

app.http('loadCars', {
    methods: ['GET'],
    authLevel: 'anonymous',
    handler: async (request, context) => {
        try{
            const cars = await fs.readFile(path.resolve(__dirname, '../cars.json'), 'utf-8');
            const data = JSON.parse(cars);

            return { body: JSON.stringify(data) };
        }
        catch(error){
            context.error(500, 'Error fetching car data:', error);
        }
    }
});