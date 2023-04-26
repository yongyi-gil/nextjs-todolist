import React from 'react';
import { NextPage } from 'next';
import TodoList from '@/components/TodoList';
import { TodoType } from '@/types/todo';

const todos: TodoType[] = [
  { id: 1, text: '이력서 정리하기', color: 'red', checked: true },
  { id: 2, text: 'Nextjs 공부하기', color: 'orange', checked: false },
  { id: 3, text: 'Nodejs 공부하기', color: 'green', checked: false },
  { id: 4, text: 'GeekNews 소식보기', color: 'blue', checked: false },
  { id: 5, text: 'Nextjs 공부하기', color: 'black', checked: true },
];

const app: NextPage = () => {
  return (
    <TodoList
      todos={todos}
    />
  );
};

export default app;
