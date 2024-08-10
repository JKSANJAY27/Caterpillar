class ErrorHandler extends Error {
  constructor(message, statusCode) {
      super(message);
      this.statusCode = statusCode;
  }
}

export const errorMiddleware = (err, req, res, next) => {
  // Default values
  err.message = err.message || "Internal Server Error";
  err.statusCode = err.statusCode || 500;

  // Custom error handling
  if (err.code === 11000) {
      const message = `Duplicate ${Object.keys(err.keyValue)} entered`;
      err = new ErrorHandler(message, 400);
  } else if (err.name === "JsonWebTokenError") {
      const message = "JSON Web Token is invalid, try again!";
      err = new ErrorHandler(message, 400);
  } else if (err.name === "TokenExpiredError") {
      const message = "JSON Web Token has expired, try again!";
      err = new ErrorHandler(message, 400);
  } else if (err.name === "CastError") {
      const message = `Invalid ${err.path}`;
      err = new ErrorHandler(message, 400);
  }

  const errorMessage = err.errors
      ? Object.values(err.errors)
          .map((error) => error.message)
          .join(" ")
      : err.message;

  return res.status(err.statusCode).json({
      success: false,
      message: errorMessage,
  });
};

export default ErrorHandler;
