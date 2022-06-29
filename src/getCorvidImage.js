require('dotenv').config();
const path = require('path');
const {Storage} = require('@google-cloud/storage');
const { DESTINATION } = require('./constants');

const { GOOGLE_PROJECT_ID, GCLOUD_STORAGE_BUCKET } = process.env;

async function getCorvidImage() {
    const storageClient = new Storage({
        projectId: GOOGLE_PROJECT_ID
    });

    const cwd = path.join(__dirname, '..');
    const bucketName = GCLOUD_STORAGE_BUCKET;
    const fileName = "";
    const destinationFileName = path.join(cwd, DESTINATION);

    const [files] = await storageClient.bucket(bucketName).getFiles();

    const randomImageIndex = Math.floor(Math.random() * (files.length - 1));
    
    const hourlyCorvid = files[randomImageIndex].metadata.name // ex: th-1219742473.jpg

    const downloadOptions = {
        destination: destinationFileName,
    };

    await storageClient.bucket(bucketName).file(hourlyCorvid).download(downloadOptions);

    console.debug(
        `gs://${bucketName}/${fileName} downloaded to ${destinationFileName}.`
    );

}


module.exports = { getCorvidImage }
