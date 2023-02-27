import { createContext, useContext } from "react";
import { useReducer } from "react";

const notificationReducer = (state = null, action) => {
  switch (action.type) {
    case "NEW_ANECDOTE":
      return action.payload;

    case "VOTED_ANECDOTE":
      return action.payload;

    case "CLEAR_NOTIFICATION":
      return null;

    case "ERROR":
      return action.payload;

    default:
      return null;
  }
};

const NotificationContext = createContext();

export const useNotificationValue = () => {
  const notificationAndDispatch = useContext(NotificationContext);
  return notificationAndDispatch[0];
};

export const useNotificationDispatch = () => {
  const notificationAndDispatch = useContext(NotificationContext);
  return notificationAndDispatch[1];
};

export const NotificationContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(
    notificationReducer,
    null
  );

  return (
    <NotificationContext.Provider value={[notification, notificationDispatch]}>
      {props.children}
    </NotificationContext.Provider>
  );
};

export default NotificationContext;
