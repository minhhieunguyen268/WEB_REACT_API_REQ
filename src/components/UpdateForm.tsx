import React, { useEffect } from "react";
import { Form, Input, Button } from "antd";
import type { User } from "../interfaces/interfaces";

interface UserFormProps {
  user: User | null;
  onSubmit: (values: { email: string; name: string; job: string }) => void;
  form: any;
}

const UpdateForm: React.FC<UserFormProps> = ({ user, onSubmit, form }) => {

  useEffect(() => {
    if (user) {
      form.setFieldsValue({
        email: user.email,
        name: user.first_name + " " + user.last_name,
        job: user.job || "", 
      });
    }
  });

  return (
    <Form form={form} onFinish={onSubmit}>
      <Form.Item
        label="Email"
        name="email"
        rules={[{ required: true, message: "Please input the email!" }]}
          labelCol={{ span: 24 }} 
        wrapperCol={{ span: 24 }} 
        >
        <Input placeholder="Email" />
      </Form.Item>

      <Form.Item
        label="Name"
        name="name"
        rules={[{ required: true, message: "Please input the name!" }]}
          labelCol={{ span: 24 }} 
        wrapperCol={{ span: 24 }} 
        >
        <Input placeholder="Name" />
      </Form.Item>

      <Form.Item
        label="Job"
        name="job"
        rules={[{ required: true, message: "Please input the job!" }]}
          labelCol={{ span: 24 }} 
        wrapperCol={{ span: 24 }} 
      >
        <Input placeholder="Job" />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Update User
        </Button>
      </Form.Item>
    </Form>
  );
};

export default UpdateForm;
