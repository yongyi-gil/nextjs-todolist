import React from 'react';
import { GetServerSideProps, NextPage } from 'next';

import { TodoType } from '@/types/todo';

import { getTodosAPI } from '@/lib/api/todos';

import TodoList from '@/components/TodoList';
interface IProps {
  todos: TodoType[];
}

const app: NextPage<IProps> = ({ todos }) => {
  return (
    <TodoList
      todos={todos}
    />
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const { data } = await getTodosAPI();
    console.log('data', data);
    return { props: { todos: data }};
  } catch (e) {
    console.log('error', e);
    return { props: { todos: [] }};
  }
}

export default app;
