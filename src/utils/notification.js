import { notification } from "antd";

export default class Notification
{
  static show(obj)
  {
    if (obj.placement === undefined) {
      obj.placement = 'topRight'
    }

    switch(obj.type)
    {
      case 'error':
        notification.error(obj)
        break
      case 'info':
        notification.info(obj)
        break
      case 'success':
        notification.success(obj)
        break
      default:
        notification.info(obj)
    }
  }
}
