const next = require("next");
const express = require("express");

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  // 라우트 예시
  server.get("/example", (req, res) => {
    // Next.js 페이지 렌더링
    return app.render(req, res, "/example", req.query);
  });

  // 그 외의 모든 요청은 Next.js가 처리하도록 설정
  server.all("*", (req, res) => {
    return handle(req, res);
  });

  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
