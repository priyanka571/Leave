export const asyncHandler = (handler: Function) => {
  return async (req: Request, context?: any) => {
    try {
      return await handler(req, context);
    } catch (error: any) {
      return Response.json(
        { success: false, message: error.message },
        { status: 500 }
      );
    }
  };
};