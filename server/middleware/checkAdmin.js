const admin = require("../firebaseAdmin");
const { User } = require("../Model/User.js");

async function checkAdmin(req, res, next) {
  try {
    const authHeader = req.headers.authorization || "";
    const idToken = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : null;

    if (!idToken) {
      return res.status(401).json({ success: false, message: "토큰 없음" });
    }

    // Firebase 토큰 검증
    const decodedToken = await admin.auth().verifyIdToken(idToken);

    // DB에서 uid 기반으로 사용자 찾기
    const userInfo = await User.findOne({ uid: decodedToken.uid });

    if (!userInfo) {
      return res.status(404).json({ success: false, message: "사용자 없음" });
    }

    // 관리자 권한 체크
    if (userInfo.isAdmin) {
      req.user = userInfo; // 다음 미들웨어에서 사용 가능
      next();
    } else {
      return res.status(403).json({ success: false, message: "관리자 권한 없음" });
    }
  } catch (err) {
    console.error(err);
    return res.status(401).json({ success: false, message: "토큰 검증 실패" });
  }
}

module.exports = { checkAdmin };
