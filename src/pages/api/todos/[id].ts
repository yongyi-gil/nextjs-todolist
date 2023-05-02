import Data from "@/lib/api/data";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'PATCH') {
    try {
      console.log('PATCH', req.query);
      const todoId = Number(req.query.id);
      const todo = Data.todo.exist({ id: todoId });
      if (!todo) {
        res.statusCode = 404;
        res.end();
      }

      const todos = await Data.todo.getList();
      const changedTodos = todos.map((todo) => {
        if (todo.id === todoId) {
          console.log(todo.id, todoId);
          return { ...todo, checked: !todo.checked };
        }

        return todo;
      })

      console.log('changedTodos', changedTodos);
      Data.todo.write(changedTodos);
      res.statusCode = 200;
      res.end();
    } catch (e) {
      console.log(e);
      res.statusCode = 500;
      return res.send(e);
    }
  }
  
  if (req.method === 'DELETE') {
    try {
      console.log('DELETE', req.query);console.log('PATCH', req.query);
      const todoId = Number(req.query.id);
      const todo = Data.todo.exist({ id: todoId });
      if (!todo) {
        res.statusCode = 404;
        res.end();
      }

      const todos = await Data.todo.getList();
      const changedTodos = todos.filter((todo) => todo.id !== todoId);

      Data.todo.remove(changedTodos);
      res.statusCode = 200;
      res.end();
    } catch (e) {
      console.log(e);
      res.statusCode = 500;
      return res.send(e);
    }
  }

  res.statusCode = 405;
  return res.end();
};