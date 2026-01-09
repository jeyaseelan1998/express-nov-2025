const app = require("../../src/index.js");

app.listen(PORT, async () => {
  await connectDatabase();
  console.log(`Server is running on http://localhost:${PORT}`);
});