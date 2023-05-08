import { Response } from 'express';

const handleErrorHttp = (res: Response, code: number, message: string) => {
  res.status(code).json({
    status: 'FAILED',
    error: message
  });
};

export default handleErrorHttp;