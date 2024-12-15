import { useEffect, useState } from 'react';
import { requestNotificationPermission, onMessageListener } from '../../firebase/firebase';
import { fortuneMessages, cheerMessages } from '../../data/messages';

const NotificationManager = () => {
  const [notificationPermission, setNotificationPermission] = useState(false);

  useEffect(() => {
    // 알림 권한 요청 및 토큰 저장
    const initializeNotifications = async () => {
      const token = await requestNotificationPermission();
      if (token) {
        setNotificationPermission(true);
        // 토큰을 서버에 저장하는 로직 추가
      }
    };

    initializeNotifications();

    // Firebase 메시지 리스너
    onMessageListener()
      .then((payload) => {
        const { title, body } = payload.notification;
        new Notification(title, { body });
      })
      .catch((err) => console.error('메시지 수신 실패:', err));
  }, []);

  const getRandomMessage = () => {
    const messages = Math.random() > 0.5 ? fortuneMessages : cheerMessages;
    return messages[Math.floor(Math.random() * messages.length)];
  };

  return (
    <div className="p-4">
      {!notificationPermission ? (
        <button
          onClick={() => requestNotificationPermission()}
          className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark"
        >
          알림 허용하기
        </button>
      ) : (
        <div className="text-green-600">
          알림이 설정되었습니다. 매일 아침 8시에 메시지를 받으실 수 있습니다.
        </div>
      )}
    </div>
  );
};

export default NotificationManager; 