export const isDebugEnabled = () => process.env.DEBUG === "1";

export const logger = (req, res, next) => {
  if (isDebugEnabled()) {
    console.log(`////////////// Request Object Start --> ${new Date()} ////////////////////`);
    console.log(`${req.method} ${req.url}`);
    console.log("================Request Params======================");
    console.log(req.params);
    console.log("================Request Body======================");
    console.log(req.body);
    console.log("================Request Query======================");
    console.log(req.query);
    console.log("////////////// Request Object End////////////////////");
  }
  next();
};
