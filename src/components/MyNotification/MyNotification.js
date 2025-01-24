import { useEffect } from "react";
import { notification } from "antd";
import { useStore } from "./store";

export default function MyNotification({ type, message = '系统提示', description }) {
  const [api, contextHolder] = notification.useNotification();
  const setType = useStore((state) => state.setType);
  const setMessage = useStore((state) => state.setMessage);
  const setDescription = useStore((state) => state.setDescription);
  
  // 使用 useEffect 来同步状态
  useEffect(() => {
      setType(type);
      setMessage(message);
      setDescription(description);
      
      // 在状态更新后立即打开通知
      openNotificationWithIcon(type, message, description);
    }, [type, message, description, setType, setMessage, setDescription]);

  // 显示通知
  const openNotificationWithIcon = (type, message, description) => {
      api[type]({
        message: message, // 使用传入的 message
        description: description, // 使用传入的 description
      });
  };

  // 返回 contextHolder 以便在组件中使用通知
  return contextHolder;
}