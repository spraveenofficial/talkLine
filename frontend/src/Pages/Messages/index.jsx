import { MessageIcon } from "../../Components";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ChatScreen } from "./ChatScreen";
import { useSocket } from "../../Context/socket-context";
import { debounce } from "../../Utils/debounce";

export function Message() {
  const dispatch = useDispatch();
  const { onlineFriends, messageNotification } = useSocket();
  const { user } = useSelector((state) => state.auth);
  const { selectedId } = useSelector((state) => state.message);
  const { friends } = user;
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [friendsWithNotification, setFriendsWithNotification] =
    useState(friends);
  useEffect(() => {
    if (messageNotification) {
      const sortedFriends = friends.map((friend) => {
        const friendWithNotification = messageNotification.find(
          (notification) => notification.id === friend.id
        );
        if (friendWithNotification) {
          return { ...friend, ...friendWithNotification };
        } else {
          return friend;
        }
      });
      const sortedFriendsWithNotification = sortedFriends.sort(
        (a, b) => new Date(b.recentMessage) - new Date(a.recentMessage)
      );
      setFriendsWithNotification(sortedFriendsWithNotification);
    }
  }, [messageNotification, friends]);
  useEffect(() => {
    return () => {
      dispatch({ type: "MESSAGE_CLEAR" });
    };
  }, []);
  const handleSelectToChat = (user) => {
    dispatch({
      type: "MESSAGE_SELECT",
      payload: user,
    });
  };
  const handleSearchFriends = (e) => {
    const { value } = e.target;
    if (value === "") {
      return setSearchResult([]);
    }
    const result = user.friends.filter((user) =>
      user.name.toLowerCase().includes(value.toLowerCase())
    );
    setSearchResult(result);
  };
  const handleType = useCallback(debounce(handleSearchFriends), []);
  return (
    <div className="fix-chat-width bg-white p-2 mobile:w-full mobile:py-0">
      <div className="w-full p-4 bg-indigo-100 flex text-center items-center gap-2 rounded-2xl">
        <h2 className="text-2xl font-bold">Messaging</h2>
        <MessageIcon className="h-8 w-8" />
      </div>
      <div className="mt-4 relative">
        <input
          type="text"
          className="bg-dim-700 font-black h-10 p-4 w-full rounded-full text-sm focus:outline-none bg-purple-white shadow rounded border"
          placeholder="Search Friends"
          onChange={handleType}
          defaultValue={search}
        />
        <div className="absolute w-full top-100 left-0 right-0 z-40 pt-2 pb-1 max-h-select overflow-y-auto">
          {searchResult.map((eachUser) => {
            return (
              <div
                key={eachUser.id}
                className="flex flex-col "
                onClick={() => handleSelectToChat(eachUser)}
              >
                <div className="mb-2 bg-indigo-100 cursor-pointer rounded-xl hover:bg-indigo-200">
                  <div className="flex items-center p-2 pl-2 border-l-2 relative ">
                    <div className="w-10 flex flex-col items-center">
                      <div className="flex relative justify-center items-center mt-1 rounded-full ">
                        <img
                          className="rounded-full w-10 h-10"
                          alt="userProfile"
                          src={eachUser.avatar}
                        />
                      </div>
                    </div>
                    <div className="w-11/12 items-center flex">
                      <div className="mx-2 text-black font-semibold hover:font-white whitespace-nowrap overflow-hidden text-ellipsis">
                        {eachUser.name}
                        <div className="text-xs w-full normal-case font-semibold text-gray-500 whitespace-nowrap overflow-hidden text-ellipsis">
                          {eachUser.bio}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="w-full mt-2">
        <h1 className="font-black font-semibold text-md mb-2">Your Friends</h1>
        <div className="activeContainer rounded-xl border-2 border-gray-200 p-2 rounded-xl w-full h-25 flex items-center gap-5 flex-nowrap">
          {friends.length === 0 ? (
            <h1 className="text-center flex w-full font-bold text-black justify-center">
              No friends, connect to users first.
            </h1>
          ) : (
            friendsWithNotification.map((eachFriend) => {
              const isOnline = onlineFriends.some(
                (eachUser) => eachUser.userId === eachFriend.id
              );
              return (
                <div
                  key={eachFriend.id}
                  onClick={() => handleSelectToChat(eachFriend)}
                  className="relative cursor-pointer w-16 flex items-center text-center justify-center flex-col"
                >
                  <img
                    className="w-16 h-16 rounded-full"
                    src={eachFriend.avatar}
                    alt={eachFriend.name}
                  />
                  <p className="whitespace-nowrap overflow-hidden w-full text-ellipsis font-bold text-sm mt-1">
                    {eachFriend.name}
                  </p>
                  {eachFriend?.unseenMessages > 0 && (
                    <span className="bg-indigo-500 absolute top-0 -right-2 text-white px-3 py-1 rounded-full text-xs">
                      {eachFriend.unseenMessages}
                    </span>
                  )}
                  <span
                    className={`top-12 left-12 absolute w-4 h-4 border-2 border-white dark:border-gray-800 rounded-full ${
                      isOnline ? "bg-green-500" : "bg-red-500"
                    }`}
                  ></span>
                </div>
              );
            })
          )}
        </div>
      </div>
      {selectedId ? (
        <ChatScreen />
      ) : (
        <div className="w-full h-72 flex justify-center items-center">
          <h1 className="text-center text-2xl font-bold">
            {friends.length === 0
              ? "You have no friends, explore and make friends"
              : "Select a friend to chat"}
          </h1>
        </div>
      )}
    </div>
  );
}
