import { TodoType } from "@/types/todo";
import { NextApiRequest, NextApiResponse } from "next";
import fs from 'fs';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    try {
      const todosBuffer = fs.readFileSync('data/todos.json');
      const todosString = todosBuffer.toString();

      if (!todosString) {
        res.statusCode = 200;
        res.send([]);
      }

      const todos: TodoType[] = JSON.parse(todosString);
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