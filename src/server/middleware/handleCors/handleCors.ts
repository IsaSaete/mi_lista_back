import cors from "cors";

const handleCors = cors({
  origin(requestOrigin, callback) {
    const allowedOriginPatterns = process.env.ALLOWED_ORIGIN_PATTERNS;

    if (!allowedOriginPatterns) {
      callback(new Error("Not allowed origins"));
      return;
    }

    const originMatches = allowedOriginPatterns.split(",").some((pattern) => {
      const result = new RegExp(pattern).test(requestOrigin!);

      return result;
    });

    if (!requestOrigin || originMatches) {
      callback(null, true);
    } else {
      callback(new Error("Origin not allowed"));
    }
  },
  credentials: true,
});

export default handleCors;
