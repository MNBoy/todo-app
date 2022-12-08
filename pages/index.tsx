import Head from 'next/head';

import TodoList from '@components/todos/TodoList';

export default function Home() {
  return (
    <>
      <Head>
           <title>TODO APP</title>
      </Head>

      <TodoList />
    </>
  );
}
