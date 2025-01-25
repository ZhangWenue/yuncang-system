import React, { useState, useEffect } from 'react';
import { Empty, Flex } from 'antd';
import { useNavigate } from 'react-router-dom';

const NorFound = () => {
  const [time, setTime] = useState(3) // 初始设置3秒跳转回原页面
  const navigate = useNavigate()
  useEffect(() => {
    const timeout = setInterval(()=>{
      setTime(prevTime => {
        if(prevTime <= 1) {
          // clearInterval(timeout)
          navigate(-1)
        }
        return prevTime - 1
      })
    }, 1000)
    return () => {
      clearInterval(timeout);
    };
  }, [time]);
  return (
    <>
      <div style={{
        display: Flex,
        justifyItems: 'center',
        margin: '120px',
      }}>
        <Empty description={`页面走丢了，${time}秒后返回上一页`} />
      </div>
    </>
  )
}
export default NorFound;