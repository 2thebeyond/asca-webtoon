const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccountKey.json"); // Firebase 콘솔에서 발급

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

module.exports = admin;