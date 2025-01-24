import React, { useEffect } from 'react'; // 修改此处，确保只使用 React 和 useEffect
import { Modal } from 'antd';
import useStore from './store';

const MyModal = ({ title = '对话框标题', content = '对话框内容', isModalOpen, sendChildMsg }) => {
  // title,content,isModalOpen是父组件传过来的参数，childMsg是向父组件传递参数的函数
  const setTitle = useStore((state) => state.setTitle);
  const setContent = useStore((state) => state.setContent);
  const setIsModalOpen = useStore((state) => state.setIsModalOpen); // 从 Zustand 获取 setIsModalOpen 方法

  useEffect(() => {
    setTitle(title);
    setContent(content);
  }, [title, content, setTitle, setContent]);

  const handleOk = () => {
    sendChildMsg(true)
    setIsModalOpen(false); // 调用 Zustand 的方法来关闭 Modal
  };

  const handleCancel = () => {
    sendChildMsg(false)
    setIsModalOpen(false); // 调用 Zustand 的方法来关闭 Modal
  };

  return (
    <>
      <Modal
        title={title}
        open={isModalOpen} // 这里使用从 Zustand 获取的状态
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>{content}</p> {/* 直接使用传入的内容 */}
      </Modal>
    </>
  );
};

export default MyModal;