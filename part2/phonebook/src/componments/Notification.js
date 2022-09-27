const Notification = ({ message, notifyStatus }) => {
  if (message === null) return null;
  return <div className={notifyStatus}>{message}</div>;
};

export default Notification;
