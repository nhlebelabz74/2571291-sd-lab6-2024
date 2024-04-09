const { app } = require('@azure/functions');
const fs = require('fs/promises');
const path = require('path');

app.http('addCar', {
    methods: ['POST'],
    authLevel: 'anonymous',
    handler: async (request, context) => {
        try {
            const newCar = await request.json();
            const cars = await fs.readFile(path.resolve(__dirname, '../cars.json'), 'utf-8');
            const data = JSON.parse(cars);
            data.push(newCar);
            await fs.writeFile(path.resolve(__dirname, '../cars.json'), JSON.stringify(data, null, 2));

            return { body: JSON.stringify(data) };
        }
        catch (error) {
            context.error(500, 'Error adding new car:', error);
        }
    }
});