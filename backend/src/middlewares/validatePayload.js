export const validatePayload = (schema) => {
  return (req, res, next) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        success: false,
        message: "Data validation error",
      });
    }

    next();
  };
};
export default validatePayload;
