import { Skeleton } from 'antd';
import React from 'react';

const SingleTodoSkeleton = () => {
  return (
    <div className='relative flex items-center justify-between w-full px-2 py-4 border rounded h-28' data-testid='single-todo-skeleton'>
      <div className='flex flex-col w-1/5 gap-y-2'>
        <Skeleton.Input size='small' block active />
        <Skeleton.Input size='small' active />
      </div>
      <div className='flex flex-col items-end gap-y-2'>
        <div className='flex items-center gap-x-2'>
          <span className='text-sm uppercase md:text-base'>
            <Skeleton.Input size='small' active />
          </span>
          <Skeleton.Avatar size='large' active />
        </div>
        <div className='flex gap-x-2 w-52'>
          <Skeleton.Button block active />
          <Skeleton.Button block active />
        </div>
      </div>
    </div>
  );
};

export default SingleTodoSkeleton;
