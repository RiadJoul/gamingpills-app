import { Popover, Transition } from '@headlessui/react';
import { Fragment, useEffect, useState } from 'react';
import { CgPill } from 'react-icons/cg';
import { GiNightSleep } from 'react-icons/gi';
import { Notification as NotificationType, useMarkNotificationsAsReadMutation, useNewNotificationSubscription, useNotificationsQuery } from '../../generated/graphql';
import FeedbackModal from '../Modals/FeedbackModal';
import Notification from './Notification';


const Notifications = () => {
  const [notifications, setNotifications] = useState<NotificationType[]>([]);
  
  //graphql
  const [res] = useNewNotificationSubscription();
  const [, markNotificationsAsRead] = useMarkNotificationsAsReadMutation();

  const [results] = useNotificationsQuery();
  const {data} = results;

  //responses
  const [errorField, setErrorField] = useState<string>(null);
  const [errorMessage, setErrorMessage] = useState<string>(null);


  const MarkNotificationsAsRead = async () => {
    if(!hasUnreadNotifications()) {
      return;
    }

    const response = await markNotificationsAsRead();
    if (response.data?.markNotificationsAsRead.errors) {
      setErrorField(response.data.markNotificationsAsRead.errors[0].field);
      setErrorMessage(response.data.markNotificationsAsRead.errors[0].message);
    } else {
      setNotifications(notifications.map(notification => {
        return { ...notification, isRead: true }
      }));

    }
  }

  useEffect(() => {

    if (res.data) {
      if (res.data.newNotification.id != notifications[0]?.id)
        //@ts-ignore
        setNotifications([res.data.newNotification, ...notifications]);
    }


  }, [res])

  useEffect(() => {
    if(data && data.notifications) {
      //@ts-ignore
      setNotifications(data.notifications)
    }
  },[data])

  //check if there is unread notifications
  const hasUnreadNotifications = () => {
    return notifications.some(notification => !notification.isRead);
  }

  return (
    <>
      <FeedbackModal
        title={errorField}
        feedback={errorMessage}
        type={"error"}
        cancelText={"Close"}
        show={errorField ? true : false}
        close={() => setErrorField(null)}
      />
      
      <div className="top-10 w-full max-w-sm px-4 z-10">
        {
          notifications &&
          <Popover className="relative">
            {({ open }) => (
              <>
                <Popover.Button
                  className={` ${!open && hasUnreadNotifications() && 'animate-bounce bg-primary'}
                group ml-5 lg:ml-0 inline-flex space-x-3 items-center rounded-md bg-dark px-3 py-2 text-base font-medium text-white hover:text-opacity-100`}
                >
                  <span className='flex text-xl lg:text-2xl'><CgPill /> {notifications.length > 0 && hasUnreadNotifications() && <span className='ml-2 text-base font-bold'>{notifications.filter(notification => !notification.isRead).length}</span>} </span>


                </Popover.Button>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-200"
                  enterFrom="opacity-0 translate-y-1"
                  enterTo="opacity-100 translate-y-0"
                  leave="transition ease-in duration-150"
                  leaveFrom="opacity-100 translate-y-0"
                  leaveTo="opacity-0 translate-y-1"
                >
                  <Popover.Panel className="absolute left-1/4 lg:left-1/2 z-10 ml-10 lg:ml-0 mt-3 w-screen max-w-sm -translate-x-1/2 transform px-4 sm:px-0 lg:max-w-xl">
                    <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                      <div className="relative grid gap-8 bg-white p-7 lg:grid-cols-1">
                        {
                          notifications.length > 0 ?
                            <>
                              {
                                notifications.map((notification, index) => (
                                  <Notification key={index} notification={notification} />
                                ))
                              }
                              <a
                                onClick={() => MarkNotificationsAsRead()}
                                className={`cursor-pointer -m-3 flex items-center rounded-lg p-2 transition duration-150 ease-in-out bg-gray-100 hover:bg-gray-300 focus:outline-none focus-visible:ring focus-visible:ring-primary focus-visible:ring-opacity-50`}
                              >

                                <div className="ml-4 capitalize">
                                  <p className='text-center lg:text-base text-sm font-semibold cursor-pointer'>Mark as read</p>
                                </div>
                              </a>

                            </> :
                            <a
                              className="-m-3 flex items-center rounded-lg p-2 transition duration-150 ease-in-out focus:outline-none focus-visible:ring focus-visible:ring-primary focus-visible:ring-opacity-50"
                            >
                              <div className="flex h-10 w-10 shrink-0 items-center bg-primary-focus rounded-lg justify-center text-white text-3xl sm:h-12 sm:w-12">
                                <GiNightSleep />
                              </div>
                              <div className="ml-4">
                                <p className="lg:text-lg text-sm font-semibold text-gray-900">
                                  No New Notifications
                                </p>
                              </div>
                            </a>
                        }
                      </div>
                    </div>
                  </Popover.Panel>
                </Transition>
              </>
            )}
          </Popover>
        }
      </div>
    </>

  )
}
export default Notifications;