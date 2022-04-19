const HomeIcon = (props) => (
  <svg
    {...props}
    className="mr-4 h-6 w-6 "
    stroke="currentColor"
    fill="none"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M3 12l9-9 9 9M5 10v10a1 1 0 001 1h3a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1h3a1 1 0 001-1V10M9 21h6"
    />
  </svg>
);
const ExploreIcon = (props) => (
  <svg
    {...props}
    className="mr-4 h-6 w-6"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="2"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14"></path>
  </svg>
);

const NotificationIcon = (props) => (
  <svg
    {...props}
    className={`${props.className ? props.className : "mr-4 h-6 w-6"}`}
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="2"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path>
  </svg>
);
const MessageIcon = (props) => (
  <svg
    {...props}
    className="mr-4 h-6 w-6"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="2"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
  </svg>
);
const BookMarkIcon = (props) => (
  <svg
    {...props}
    className="mr-4 h-6 w-6"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="2"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"></path>
  </svg>
);
const ListIcon = (props) => (
  <svg
    {...props}
    className="mr-4 h-6 w-6"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="2"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path>
  </svg>
);
const ProfileIcon = (props) => (
  <svg
    {...props}
    className="mr-4 h-6 w-6"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="2"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
  </svg>
);
const MoreIcon = (props) => (
  <svg
    {...props}
    className="mr-4 h-6 w-6"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="2"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path d="M8 12h.01M12 12h.01M16 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
  </svg>
);

const EmailIcon = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5 text-gray-400"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
    />
  </svg>
);

const PasswordIcon = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5 text-gray-400"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path
      fillRule="evenodd"
      d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
      clipRule="evenodd"
    />
  </svg>
);

const NameIcon = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5 text-gray-400"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M20.822 18.096c-3.439-.794-6.641-1.49-5.09-4.418 4.719-8.912 1.251-13.678-3.732-13.678-5.081 0-8.464 4.949-3.732 13.678 1.597 2.945-1.725 3.641-5.09 4.418-2.979.688-3.178 2.143-3.178 4.663l.005 1.241h10.483l.704-3h1.615l.704 3h10.483l.005-1.241c.001-2.52-.198-3.975-3.177-4.663zm-8.231 1.904h-1.164l-.91-2h2.994l-.92 2z"
    />
  </svg>
);

const PencilIcon = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5 text-gray-600 ml-2 cursor-pointer hover:text-gray-400"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
    />
  </svg>
);

const JoinedIcon = (props) => (
  <svg
    {...props}
    className="h-5 w-5 text-indigo-400 mr-1 cursor-pointer hover:text-gray-400"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <g>
      <path d="M19.708 2H4.292C3.028 2 2 3.028 2 4.292v15.416C2 20.972 3.028 22 4.292 22h15.416C20.972 22 22 20.972 22 19.708V4.292C22 3.028 20.972 2 19.708 2zm.792 17.708c0 .437-.355.792-.792.792H4.292c-.437 0-.792-.355-.792-.792V6.418c0-.437.354-.79.79-.792h15.42c.436 0 .79.355.79.79V19.71z"></path>
      <circle cx="7.032" cy="8.75" r="1.285"></circle>
      <circle cx="7.032" cy="13.156" r="1.285"></circle>
      <circle cx="16.968" cy="8.75" r="1.285"></circle>
      <circle cx="16.968" cy="13.156" r="1.285"></circle>
      <circle cx="12" cy="8.75" r="1.285"></circle>
      <circle cx="12" cy="13.156" r="1.285"></circle>
      <circle cx="7.032" cy="17.486" r="1.285"></circle>
      <circle cx="12" cy="17.486" r="1.285"></circle>
    </g>
  </svg>
);

const FriendRequestPendingIcon = (props) => (
  <svg
    {...props}
    className={`${props.className ? props.className : "mr-4 h-6 w-6"}`}
    version="1.1"
    viewBox="0 0 600 600"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g>
      <path d="m303.33 256.67c-24.754 0-48.492-9.8359-65.996-27.34-17.504-17.5-27.336-41.242-27.336-65.996 0-24.754 9.832-48.492 27.336-65.996 17.504-17.504 41.242-27.336 65.996-27.336 24.754 0 48.496 9.832 65.996 27.336 17.504 17.504 27.34 41.242 27.34 65.996 0 24.754-9.8359 48.496-27.34 65.996-17.5 17.504-41.242 27.34-65.996 27.34zm0-140c-12.375 0-24.246 4.9141-32.996 13.668-8.7539 8.75-13.668 20.621-13.668 32.996 0 12.379 4.9141 24.246 13.668 33 8.75 8.75 20.621 13.668 32.996 13.668 12.379 0 24.246-4.918 33-13.668 8.75-8.7539 13.668-20.621 13.668-33 0-12.375-4.918-24.246-13.668-32.996-8.7539-8.7539-20.621-13.668-33-13.668z" />
      <path d="m163.33 490c-6.1875 0-12.121-2.457-16.496-6.8359-4.3789-4.375-6.8359-10.309-6.8359-16.496v-70c0.035156-30.934 12.34-60.586 34.211-82.457 21.871-21.871 51.523-34.176 82.457-34.211h93.332c10.02-0.070312 19.996 1.2422 29.656 3.8984 8.0273 2.2578 14.242 8.6289 16.297 16.711 2.0586 8.082-0.35156 16.645-6.3203 22.469-5.9727 5.8242-14.594 8.0195-22.621 5.7578-5.543-1.5156-11.27-2.2461-17.012-2.168h-93.332c-18.566 0-36.371 7.375-49.5 20.5-13.125 13.129-20.5 30.934-20.5 49.5v70c0 6.1875-2.4609 12.121-6.8359 16.496-4.375 4.3789-10.309 6.8359-16.5 6.8359z" />
      <path d="m466.67 490c-6.1875 0-12.125-2.4609-16.496-6.8359l-70-70c-4.375-4.375-6.832-10.309-6.832-16.496s2.457-12.121 6.832-16.496l70-70c5.9258-5.7266 14.43-7.8984 22.379-5.7227 7.9453 2.1797 14.152 8.3867 16.332 16.336 2.1797 7.9453 0.003907 16.453-5.7188 22.379l-53.504 53.504 53.504 53.504c4.375 4.375 6.832 10.309 6.832 16.496s-2.457 12.121-6.832 16.496-10.309 6.8359-16.496 6.8359z" />
      <path d="m536.67 420h-140c-8.3359 0-16.039-4.4492-20.207-11.668-4.168-7.2188-4.168-16.113 0-23.332 4.168-7.2188 11.871-11.668 20.207-11.668h140c8.3359 0 16.039 4.4492 20.207 11.668s4.168 16.113 0 23.332-11.871 11.668-20.207 11.668z" />
    </g>
  </svg>
);

const FriendRequestAcceptedIcon = (props) => (
  <svg
    {...props}
    className={`${props.className ? props.className : "mr-4 h-5 w-6"}`}
    version="1.1"
    viewBox="0 0 600 600"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g>
      <path d="m303.33 256.67c-24.754 0-48.492-9.8359-65.996-27.34-17.504-17.5-27.336-41.242-27.336-65.996 0-24.754 9.832-48.492 27.336-65.996 17.504-17.504 41.242-27.336 65.996-27.336 24.754 0 48.496 9.832 65.996 27.336 17.504 17.504 27.34 41.242 27.34 65.996 0 24.754-9.8359 48.496-27.34 65.996-17.5 17.504-41.242 27.34-65.996 27.34zm0-140c-12.375 0-24.246 4.9141-32.996 13.668-8.7539 8.75-13.668 20.621-13.668 32.996 0 12.379 4.9141 24.246 13.668 33 8.75 8.75 20.621 13.668 32.996 13.668 12.379 0 24.246-4.918 33-13.668 8.75-8.7539 13.668-20.621 13.668-33 0-12.375-4.918-24.246-13.668-32.996-8.7539-8.7539-20.621-13.668-33-13.668z" />
      <path d="m163.33 490c-6.1875 0-12.121-2.457-16.496-6.8359-4.3789-4.375-6.8359-10.309-6.8359-16.496v-70c0.035156-30.934 12.34-60.586 34.211-82.457 21.871-21.871 51.523-34.176 82.457-34.211h93.332c10.02-0.070312 19.996 1.2422 29.656 3.8984 8.0273 2.2578 14.242 8.6289 16.297 16.711 2.0586 8.082-0.35156 16.645-6.3203 22.469-5.9727 5.8242-14.594 8.0195-22.621 5.7578-5.543-1.5156-11.27-2.2461-17.012-2.168h-93.332c-18.566 0-36.371 7.375-49.5 20.5-13.125 13.129-20.5 30.934-20.5 49.5v70c0 6.1875-2.4609 12.121-6.8359 16.496-4.375 4.3789-10.309 6.8359-16.5 6.8359z" />
      <path d="M 459.948 372.565 L 389.948 465.167 L 389.948 465.171 C 385.534 471.003 378.643 474.433 371.331 474.433 C 370.604 474.433 369.85 474.397 369.12 474.331 C 361.058 473.562 353.968 468.667 350.39 461.401 L 327.788 415.463 L 327.784 415.463 C 325.054 409.908 324.64 403.498 326.636 397.639 C 328.632 391.78 332.87 386.955 338.425 384.221 C 343.979 381.491 350.39 381.077 356.249 383.073 C 362.108 385.069 366.933 389.307 369.667 394.862 L 375.546 406.827 L 422.71 344.429 L 422.714 344.425 C 427.737 337.772 435.933 334.308 444.206 335.339 C 452.479 336.366 459.577 341.729 462.823 349.409 C 466.073 357.089 464.975 365.917 459.948 372.569 L 459.948 372.565 Z" />
    </g>
  </svg>
);

const SearchIcon = (props) => (
  <svg
    {...props}
    className={`${
      props.className ? props.className : "h-4 w-4 fill-current text-black"
    }`}
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    viewBox="0 0 56.966 56.966"
    xmlSpace="preserve"
  >
    <path d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z" />
  </svg>
);
export {
  HomeIcon,
  ExploreIcon,
  NotificationIcon,
  MessageIcon,
  BookMarkIcon,
  ListIcon,
  ProfileIcon,
  MoreIcon,
  EmailIcon,
  PasswordIcon,
  NameIcon,
  PencilIcon,
  JoinedIcon,
  FriendRequestPendingIcon,
  FriendRequestAcceptedIcon,
  SearchIcon,
};
