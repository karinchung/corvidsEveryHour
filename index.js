const fs = require('fs');
const path = require('path');
const CronJob = require('cron').CronJob;
const { twitterClient } = require('./src/twitterClient.js');
const { getCorvidImage } = require('./src/getCorvidImage');

const jpgImg = path.resolve('src/images/hourlyCorvid.jpg');

async function postCorvid() {
    try {
        await getCorvidImage();

        // upload image to twitter
        const mediaId = await twitterClient.v1.uploadMedia(jpgImg)

        // post image as tweet
        await twitterClient.v1.tweet('', { media_ids: [mediaId] });

        // delete the image downloaded from the getCorvidImage step
        await fs.unlink(jpgImg, (err) => {
            if (err) console.error('error unlinking', err)
        });
    } catch (e) {
        console.error(e);
        if (e.data) {
            console.error('error data: ', e.data)
        }
    }
}

const job = new CronJob(
    '0 * * * * *', // every hour
    () => {
        postCorvid();
    }
)

job.start();
