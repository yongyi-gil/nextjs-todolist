import React, { useMemo, useCallback } from 'react';
import styled from 'styled-components';

import { TodoType } from '@/types/todo';
import palette from '@/styles/palette';

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
            width: 20px;
            height: 20px;
            border-radius: 50%;
            border: 1px solid ${palette.gray};
            background-color: transparent;
            outline: none;
          }
        }
      }
    }
  }
`;

const TodoList: React.FC<Iprops> = ({ todos }) => {
  const getTodoColorNums = useCallback(() => {
    const colors: ObjectIndexType = {};

    todos.forEach((todo) => {
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
          {todos.map((todo) => (
            <li className="todo-item" key={todo.id}>
              <div className="todo-left-side">
                <div className={`todo-color-block bg-${todo.color}`} />
                <p className={`todo-text ${todo.checked ? "checked-todo-text" : ""}`}>
                  {todo.text}
                </p>
              </div>
              <div className="todo-right-side">
                {
                  !todo.checked && (
                    <button
                      type="button"
                      className="todo-button"
                      onClick={() => {}}
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
