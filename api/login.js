
import fs from "fs";
import path from "path";

export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { userName, password } = req.body;

  const filePath = path.join(process.cwd(), "users.json");
  const users = JSON.parse(fs.readFileSync(filePath, "utf8"));

  const user = users.find(
    (u) => u.userName === userName && u.password === password
  );

  if (user) {
    return res.status(200).json({
      status: true,
      message: "Login successful",
      token: "fake-jwt-token-123",
      user: {
        id: user.id,
        userName: user.userName,
      },
    });
  } else {
    return res
      .status(401)
      .json({ status: false, message: "Sai tên đăng nhập hoặc mật khẩu" });
  }
}   