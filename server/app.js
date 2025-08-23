const admin = require("firebase-admin");
const path = require("path");

admin.initializeApp({
  credential: admin.credential.cert(
    require(path.join(__dirname, "serviceAccountKey.json"))
  ),
});

const app = express();
app.use(express.json());
app.use(cors({ origin: `${process.env.REACT_APP_FRONTEND_URL}`, credentials: true }));

// 라우터 연결
app.use("/api/post", require("./routes/post"));

app.listen(5000, () => console.log(`✅ Server running on ${process.env.REACT_APP_BACKEND_URL}`));