import { useState, useEffect } from "react";
import { Table, Button, Modal, Layout, notification, Form, Space } from "antd";
import {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
} from "../../api/login-api";
import UserForm from "../../components/UserForm";
import UpdateForm from "../../components/UpdateForm";
import SideBar from "../../components/SideBar";
import type { User } from "../../interfaces/interfaces";
import LoadingOverlay from "../../components/LoadingOverlay";

const { Content } = Layout;

export default function HomePage() {
  const [users, setUsers] = useState<User[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newUser, setNewUser] = useState<User | null>(null);
  // const [userId, setuserId] = useState(0);
  const [collapsed, setCollapsed] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);
  
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Avatar",
      dataIndex: "avatar",
      key: "avatar",
      render: (text: string) => (
        <img
          src={text}
          alt="avatar"
          style={{ width: 50, height: 50, borderRadius: "50%" }}
        />
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Full Name",
      dataIndex: "first_name",
      key: "full_name",
      render: (text: string, record: User) => `${text} ${record.last_name}`,
    },
    {
      title: "Action",
      key: "action",
      render: (record: User) => (
        <>
          <Button type="link" onClick={() => editUser(record)}>
            Edit
          </Button>
          <Button
            type="link"
            danger
            onClick={() => handleDeleteUser(record.id)}
          >
            Delete
          </Button>
        </>
      ),
    },
  ];

  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      const data = await getUsers(2);
      setUsers(data.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
    setIsLoading(false);
  };

  const editUser = (user: User) => {
    
    // setuserId(user.id ?? 0);
    setIsEditModalVisible(true);
    setNewUser(user)
  };

   const addUser = () => {
    form.resetFields();
    setIsModalVisible(true)
  };

  const handleCancel = () => {
    if (isEditModalVisible) {
      setNewUser(null);
      setIsEditModalVisible(false); 
    }

    if (isModalVisible) {
      setIsModalVisible(false);
      //form.resetFields();
    }
  };

  const handleCreateUser = async (value: User) => {
    setIsLoading(true);
    try {
      const response = await createUser(value);
      fetchUsers();
      if (response.status === 201) {
        notification.success({
          message: "User Created",
          description: "The user has been successfully created!",
          placement: "topRight",
        });

        handleCancel();
      }
    } catch (err) {
      notification.error({
        message: "Error Creating User",
        description: "There was an error creating the user.",
        placement: "topRight",
      });
    } finally {
    setIsLoading(false);  
    }
  };

  const handleUpdateUser = async (value: User) => {
    if (!newUser?.id) {
      notification.error({
        message: "Invalid User ID",
        description: "The user ID is missing or invalid.",
        placement: "topRight",
      });
      return;
    }

    setIsLoading(true);
    try {
      const response = await updateUser(newUser!.id, value);
      fetchUsers();
      if (response.status === 200) {
      notification.success({
        message: "User Updated",
        description: "The user has been successfully updated!",
        placement: "topRight",
      });
      
      handleCancel();
    }
    } catch (err) {
      notification.error({
        message: "Error Updating User",
        description: "There was an error updating the user.",
        placement: "topRight",
      });
    } finally {
    setIsLoading(false); 
    }
  };

  const handleDeleteUser = async (id: number | undefined) => {
    if (typeof id !== "number") {
      notification.error({
        message: "Invalid User ID",
        description: "The user ID is missing or invalid.",
        placement: "topRight",
      });
      return;
    }

        Modal.confirm({
        title: 'Are you sure you want to delete this user?',
        content: 'This action cannot be undone.',
        okText: 'Yes, Delete',
        cancelText: 'No, Cancel',
        onOk: async () => {
          setIsLoading(true);
          try {
            const status = await deleteUser(id);
            fetchUsers();
            if (status === 204) {
              notification.success({
                message: "User Deleted",
                description: "The user has been successfully deleted!",
                placement: "topRight",
              });
            }
          } catch (err) {
            notification.error({
              message: "Error Deleting User",
              description: "There was an error deleting the user.",
              placement: "topRight",
            });
          } finally {
            setIsLoading(false);
          }
        },
        onCancel() {
          console.log('Cancel deletion');
        }
      });

  };

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <SideBar collapseds={collapsed} toggleSidebar={toggleSidebar} />
      <Layout>
        <Content style={{ padding: "50px" }}>
          <Space style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <h1>Users List</h1>
            <Button type="primary" onClick={() => addUser()}>
              Add User
            </Button>
          </Space>
          <br />
          
        <Table columns={columns} dataSource={users} rowKey="id" pagination={false} />
        <LoadingOverlay isLoading={isLoading} />
        </Content>

        <Modal
          title="Add New User"
          open={isModalVisible}
          onCancel={handleCancel}
          footer={null}
        >
          <UserForm
            user={newUser}
            setUser={setNewUser}
            onSubmit={handleCreateUser}
            form={form}
          />
        </Modal>

        <Modal
          title="Edit User"
          open={isEditModalVisible}
          onCancel={handleCancel}
          footer={null}
        >
          <UpdateForm
            user={newUser}
            onSubmit={handleUpdateUser}
            form={form}
          />
        </Modal>
      </Layout>
    </Layout>
  );
}
