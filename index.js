const CronJob = require('cron').CronJob;
const { twitterClient } = require('./src/twitterClient.js');

async function postCorvid() {
    try {
        // TODO: get image
        let rotatedImage;
        // upload image to twitter
        const [mediaId] = await twitterClient.v1.uploadMedia(Buffer.from(rotatedImage), { type: 'png' });
        // post image as tweet
        await twitterClient.v1.tweet(null, { media_ids: mediaId });
    } catch (e) {
        console.error(e)
    }
}

const job = new CronJob(
    '0 * * * * *', // every hour
    () => {
        postCorvid();
    }
)

job.start();
