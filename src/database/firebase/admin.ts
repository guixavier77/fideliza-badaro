const admin = require('firebase-admin');
const serviceAccount = require('./fidelizabadaro-firebase-adminsdk-xj3f9-2b66bc0693.json');

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}
const dbAdmin = admin.firestore();
module.exports = { admin, dbAdmin };

