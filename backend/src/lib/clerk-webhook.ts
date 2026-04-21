import { Request, Response } from 'express';
import { inngest } from './inngest';

export async function handleClerkWebhook(req: Request, res: Response) {
  const event = req.body;
  
  if (event.type === 'user.created') {
    await inngest.send({
      name: 'clerk/user.created',
      data: event.data,
    });
  }
  
  return res.status(200).json({ success: true });
}