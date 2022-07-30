const laconiaBatch = require('@laconia/batch');
const axios = require('axios');

const wait = async (ms) => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
};

const batchJob = laconiaBatch(
    () =>
      laconiaBatch.s3({
        path: '.',
        s3Params: {
          Bucket: 'nearst-marton-test-laconia-batch',
          Key: 'test.json',
        },
      }),
    {
      itemsPerSecond: 0.5,
      timeNeededToRecurseInMillis: 10,
    }
  )
    .on('start', () => {
      console.log(`START`);
    })
    .on('item', async (_, item) => {
      const { data } = await axios.get('https://icanhazdadjoke.com/', {
        headers: { Accept: 'application/json', 'User-Agent': 'marton-test' },
      });

      wait(1500);

      const { data: secondJoke } = await axios.get(
        'https://icanhazdadjoke.com/',
        {
          headers: { Accept: 'application/json', 'User-Agent': 'marton-test' },
        }
      );
      console.log('JOKE', {
        name: item.name,
        '#1': data.joke,
        '#2': secondJoke.joke,
      });
    })
    .on('stop', () => {
      console.log(`STOP`);
    })
    .on('end', () => {
      console.log(`END`);
    });

exports.handler = batchJob;