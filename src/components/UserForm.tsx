import React from "react";
import { Form, Input, Button } from "antd";
import type { User } from "../interfaces/interfaces";



interface UserFormProps {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  onSubmit: (values: { name: string; job: string }) => void;
  isEditMode: boolean;
  form: any; 
}

const UserForm: React.FC<UserFormProps> = ({ user, setUser, onSubmit, isEditMode, form }) => {
  return (
    <Form form={form} onFinish={onSubmit}>
      <Form.Item
        label="Name"
        name="name"
        rules={[{ required: true, message: "Please input the name!" }]}
        labelCol={{ span: 24 }} 
        wrapperCol={{ span: 24 }}
      >
        <Input
          placeholder="Name"
          value={user?.name || ""}
          onChange={(e) => setUser({ ...user, name: e.target.value } as User)}
        />
      </Form.Item>

      <Form.Item
        label="Job"
        name="job"
        rules={[{ required: true, message: "Please input the job!" }]}
        labelCol={{ span: 24 }} 
        wrapperCol={{ span: 24 }} 
      >
        <Input
          placeholder="Job"
          value={user?.job || ""}
          onChange={(e) => setUser({ ...user, job: e.target.value } as User)}
        />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          {isEditMode ? "Update User" : "Create User"}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default UserForm;
