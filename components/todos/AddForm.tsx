import React, { forwardRef, useImperativeHandle, useRef } from 'react';

import { Form, Input, message, Radio } from 'antd';

import Todo from '@interfaces/Todo';

const AddForm: any = forwardRef(
  (
    {
      addTodo,
      editTodo,
      closeModal,
      todos,
      selectedTodo,
    }: { addTodo: any; editTodo: any; closeModal: any; todos: []; selectedTodo: Todo },
    ref
  ) => {
    const [form] = Form.useForm();
    const formRef = useRef(null);

    /* A way to expose methods to the parent component. */
    useImperativeHandle(ref, () => ({
      onFinish() {
        const form: any = formRef.current;
        form.submit();
      },
      onReset() {
        form.resetFields();
      },
    }));

    /* Setting the form values to the selected todo if it exists. */
    if (!!selectedTodo) {
      form.setFieldsValue(selectedTodo);
    } else {
      form.resetFields();
    }

    const onFinish = async (values: any) => {
      closeModal();
      try {
        message.loading({
          key: 'message',
          content: 'Loading...',
        });

        // Simulation API call
        await new Promise((resolve, reject) => {
          setTimeout(() => {
            try {
              let data;
              if (!!selectedTodo) {
                // Update
                data = { ...values, id: selectedTodo.id, done: selectedTodo.done };
                editTodo(data);
              } else {
                // Add
                data = { ...values, id: new Date().getTime(), done: false };
                localStorage.setItem('todos', JSON.stringify([...todos, data]));
                addTodo(data);
              }

              resolve(data);
            } catch (error) {
              reject(error);
            }
          }, 1000);
        });

        message.success({
          key: 'message',
          content: !!selectedTodo ? 'Task Updated successfully!' : 'Task added successfully!',
        });
      } catch (error: any) {
        message.error({
          key: 'message',
          content: error.message,
        });
      }
    };

    return (
      <Form data-testid='add-form' ref={formRef} layout='vertical' form={form} name='control-hooks' onFinish={onFinish}>
        <Form.Item name='title' label='Title' rules={[{ required: true }]}>
          <Input value={selectedTodo?.title} />
        </Form.Item>

        <Form.Item name='description' label='Description' rules={[{ required: true }]}>
          <Input.TextArea value={selectedTodo?.description} rows={4} />
        </Form.Item>

        <Form.Item name='gift' label='Gift and KPI for this task :)' rules={[{ required: true }]}>
          <Input value={selectedTodo?.gift} />
        </Form.Item>

        <Form.Item rules={[{ required: true }]} name='priority' label='Priority'>
          <Radio.Group className='flex justify-between' value={selectedTodo?.priority}>
            <Radio value='low'> Low </Radio>
            <Radio value='medium'> Medium </Radio>
            <Radio value='high'> High </Radio>
          </Radio.Group>
        </Form.Item>
      </Form>
    );
  }
);

AddForm.displayName = 'AddForm';

export default AddForm;
