export const isDebugEnabled = () => process.env.DEBUG === "1";

export const logger = (req, res, next) => {
  if (isDebugEnabled()) {
    console.log("////////////// Request Object Start////////////////////");
    console.log(`${req.method} ${req.url}`);
    console.log("================Request Params======================");
    console.log(res.params);
    console.log("================Request Body======================");
    console.log(res.body);
    console.log("================Request Query======================");
    console.log(res.query);
    console.log("////////////// Request Object End////////////////////");
  }
  next();
};
