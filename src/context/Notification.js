import { Toast } from 'react-bootstrap';
import { useNotificationContext } from './NotificationContext';
import './Notification.css';



export const Notification = () => {
  const { notification, hideNotification } = useNotificationContext();

  if (!notification.show) {
    return null;
  }

  return (
    <Toast
      className="notification d-inline-block m-1"
      bg={notification.type}
      onClose={hideNotification}

    >
      {/* <Toast.Header>
            <img
              src="holder.js/20x20?text=%20"
              className="rounded me-2"
              alt=""
            />
            dasdas
          </Toast.Header> */}

      <Toast.Body className='notification-msg'>
        <div className='notification-message'>
          {notification.message}
        </div>
      </Toast.Body>
    </Toast>
  )
}

export default Notification;