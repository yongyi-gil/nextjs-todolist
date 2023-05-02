import React, { useMemo, useCallback, useState } from 'react';
import styled from 'styled-components';

import { TodoType } from '@/types/todo';
import palette from '@/styles/palette';

import { checkTodoAPI, deleteTodoApi } from '@/lib/api/todos';

import TrashIcon from '../../public/static/svg/ic_trash.svg';
import CheckIcon from '../../public/static/svg/ic_check.svg';

// export하지 않는 타입에 대해서는 interface
interface Iprops {
  todos: TodoType[];
}

type ObjectIndexType = {
  [key: string]: number | undefined;
}

const Container = styled.div`
  width: 100%;

  .todo-list-header {
    padding: 12px;
    border-bottom: 1px solid ${palette.gray};
    
    .todo-list-last-todo {
      font-size: 14px;

      span {
        margin-left: 8px;
      }

      .todo-list-header-colors {
        display: flex;

        .todo-list-header-color-num {
          display: flex;
          margin-right: 8px;
  
          p {
            font-size: 14px;
            line-height: 16px;
            margin: 0;
            margin-left: 6px;
          }
  
          .todo-list-header-round-color {
            width: 16px;
            height: 16px;
            border-radius: 50%;
          }
        }
      }
    }

    ${Object.keys(palette).map((name) => {
      return `
        .bg-${name} {
          background-color: ${name}
        }
      `;
    }).join('\n')}

    .todo-list {
      padding: 0;

      .todo-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        height: 52px;
        border-bottom: 1px solid ${palette.gray};

        .todo-left-side {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          .todo-color-block {
            width: 12px;
            height: 100%;
          }
          .checked-todo-text {
            color: ${palette.gray};
            text-decoration: line-through;
          }
          .todo-text {
            margin-left: 12px;
            font-size: 16px;
          }
        }

        .todo-right-side {
          display: flex;
          margin-right: 12px;
          .todo-button {
            cursor: pointer;
            width: 20px;
            height: 20px;
            border-radius: 50%;
            border: 1px solid ${palette.gray};
            background-color: transparent;
            outline: none;
          }
          
          svg {
            cursor: pointer;
            &:first-child {
              margin-right: 16px;
            }
          }

          .todo-trash {
            width: 16px;
            path {
              fill: ${palette.deep_red};
            }
          }

          .todo-check {
            width: 16px;
            path {
              fill: ${palette.deep_green};
            }
          }
        }
      }
    }
  }
`;

const TodoList: React.FC<Iprops> = ({ todos }) => {
  const [ localTodos, setLocalTodos ] = useState(todos);
  const checkTodo = async (id: number) => {
    try {
      await checkTodoAPI(id);
      const newTodos = localTodos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, checked: !todo.checked };
        }
        return todo;
      });

      setLocalTodos(newTodos);
    } catch (e) {
      console.log(e);
    }
  }

  const deleteTodo = async (id: number) => {
    try {
      await deleteTodoApi(id);
      const newTodos = localTodos.filter((todo) => todo.id !== id);

      setLocalTodos(newTodos);
    } catch (e) {
      console.log(e);
    }
  }

  const getTodoColorNums = useCallback(() => {
    const colors: ObjectIndexType = {};

    localTodos.forEach((todo) => {
      const value = colors[todo.color];
      if (value) {
        colors[`${todo.color}`] += 1;
      } else {
        colors[`${todo.color}`] = 1;
      }
    })

    return colors;
    }, [todos],
  )

  const todoColorNums = useMemo(getTodoColorNums, [todos]);
  if (!todoColorNums) {
    return <></>
  };

  return (
    <Container>
      <div className="todo-list-header">
        <div className="todo-list-last-todo">
          <div className="todo-list-header-colors">
            {
              Object.keys(todoColorNums).map((color, idx) => (
                <div className="todo-list-header-color-num" key={idx}>
                  <div className={`todo-list-header-round-color bg-${color}`} />
                  <p>{todoColorNums[color]}개</p>
                </div>
              ))
            }
          </div>
        </div>
        <ul className="todo-list">
          {localTodos.map((todo) => (
            <li className="todo-item" key={todo.id}>
              <div className="todo-left-side">
                <div className={`todo-color-block bg-${todo.color}`} />
                <p className={`todo-text ${todo.checked ? "checked-todo-text" : ""}`}>
                  {todo.text}
                </p>
              </div>
              <div className="todo-right-side">
                {
                  todo.checked && (
                    <>
                      <TrashIcon
                        className="todo-trash"
                        onClick={() => {
                          deleteTodo(todo.id);
                        }}
                      />
                      <CheckIcon
                        className="todo-check"
                        onClick={() => {
                          checkTodo(todo.id);
                        }}
                      />
                    </>
                  )
                }
                {
                  !todo.checked && (
                    <button
                      type="button"
                      className="todo-button"
                      onClick={() => {
                        checkTodo(todo.id);
                      }}
                    />
                  )
                }
              </div>
            </li>
          ))}
        </ul>
      </div>
    </Container>  
  );
};

export default TodoList;
