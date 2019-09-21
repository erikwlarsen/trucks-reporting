// const request = require('request-promise');
const { Client } = require('pg');

// const make311Request = payload => request('someurl.com', payload);

exports.handler = async (event) => {
  try {
    const {
      userAddress,
      lat,
      lon,
      description,
      licensePlate,
    } = event;
    const datetime = new Date().toISOString();
  
    const client = new Client();
    await client.connect();
    await client.query(`
  INSERT INTO truck_data (user_address, lat, lon, description, license_plate, created_at)
    VALUES (${userAddress}, ${lat}, ${lon}, ${description}, ${licensePlate}, ${datetime});
    `);
  
    // await make311Request();
  
    return {
      statusCode: 200,
      body: 'OK',
    };
  } catch (err) {
    console.error(err);
    return {
      statusCode: 500,
      body: 'Server error'
    };
  }
};
