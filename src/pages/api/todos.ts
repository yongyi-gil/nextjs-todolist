import { NextApiRequest, NextApiResponse } from "next";
import Data from "@/lib/api/data";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    try {
      const todos = Data.todo.getList();
      res.statusCode = 200;
      return res.send(todos);
    } catch (error) {
      res.statusCode = 500;
      res.send(error);
    }
  }

  res.statusCode = 405;
  return res.end();
}