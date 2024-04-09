const { app } = require('@azure/functions');
const fs = require('fs/promises');
const path = require('path');

app.http('removeCar', {
    methods: ['DELETE'],
    authLevel: 'anonymous',
    route: 'removeCar/{carId}',
    handler: async (request, context) => {
        try {
            const index = request.params.carId;
            const cars = await fs.readFile(path.resolve(__dirname, '../cars.json'), 'utf-8');
            const data = JSON.parse(cars);

            if (index === -1) {
                context.error(404, 'Car not found');
            }
            else {
                data.splice(index, 1);
                await fs.writeFile(path.resolve(__dirname, '../cars.json'), JSON.stringify(data, null, 2));
                
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