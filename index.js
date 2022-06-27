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
        console.debug('mediaId', mediaId);
        console.debug('about to post image');

        // post image as tweet
        await twitterClient.v1.tweet('', { media_ids: [mediaId] });

        // delete the image downloaded from the getCorvidImage step
        fs.unlink(jpgImg, (e) => {
            console.error('error unlinking', e)
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
        console.debug('about to kick off corvid posting function')
        postCorvid();
    }
)

job.start();
