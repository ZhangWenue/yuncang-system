import { useEffect } from "react";
import { notification } from "antd";

export default function MyNotification({type = 'info', message = '系统提示', description}) {
  const [api, contextHolder] = notification.useNotification();
  useEffect(() => {
    // 如果type有值，就打开通知框
    if(type){
      api[type]({
        message,
        description
      })
    }
  }, [type]) 
  return (
    {contextHolder}
  )
}