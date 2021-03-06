const fs = require('fs');
const path = require('path');
const CronJob = require('cron').CronJob;
const { twitterClient } = require('./src/twitterClient.js');
const { getCorvidImage } = require('./src/getCorvidImage');
const { DESTINATION } = require('./src/constants');

async function postCorvid() {
    try {
        // get a corvid from gcs and add it to the images folder as 'hourlyCorvid.jpg'
        await getCorvidImage();

        // upload the image to twitter
        const jpgImg = path.resolve(DESTINATION);
        const mediaId = await twitterClient.v1.uploadMedia(jpgImg)

        // post the image as a tweet
        await twitterClient.v1.tweet('', { media_ids: [mediaId] });

        // delete the image downloaded in the getCorvidImage step
        await fs.unlink(jpgImg, (err) => {
            if (err) console.error('error unlinking', err);
        });
    } catch (e) {
        console.error('error:', e);
        if (e.data) {
            console.error('twitter error data: ', e.data);
        }
    }
}

const job = new CronJob(
    '0 * * * *', // every hour
    () => {
        postCorvid();
    }
)

job.start();
