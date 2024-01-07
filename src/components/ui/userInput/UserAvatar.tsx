import React, { useState, useEffect } from "react";
import type { RcFile, UploadProps } from "antd/es/upload";
import { Form, Modal, Upload, UploadFile } from "antd";
import { FaPlus } from "react-icons/fa";
import { User } from "../../../UserModel";

interface Props {
  name: string;
  label: string;
  editUser: User | null;
  fileList: UploadFile<any>[];
  setFileList: React.Dispatch<React.SetStateAction<UploadFile<any>[]>>;
  rules?: { required: boolean; message: string }[];
}

const getBase64 = (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

const UserAvatar: React.FC<Props> = ({ name, label, editUser, rules, fileList, setFileList }) => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as RcFile);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url!.substring(file.url!.lastIndexOf("/") + 1)
    );
  };

  const handleChange: UploadProps["onChange"] = ({ fileList: newFileList }) =>
    setFileList(newFileList);

  const handleCancel = () => setPreviewOpen(false);

  useEffect(() => {
    if (editUser?.avatar) {
      setFileList([...editUser.avatar]);
    }
  }, [editUser, setFileList]);


  return (
    <Form.Item name={name} label={label} rules={rules}>
      <>
        <Upload
          action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
          listType="picture-card"
          fileList={fileList}
          onChange={handleChange}
          onPreview={handlePreview}
        >
          <FaPlus />
        </Upload>
        <Modal
          open={previewOpen}
          title={previewTitle}
          footer={null}
          onCancel={handleCancel}
        >
          <img alt="preview" style={{ width: "100%" }} src={previewImage} />
        </Modal>
      </>
    </Form.Item>
  );
};

export default UserAvatar;
