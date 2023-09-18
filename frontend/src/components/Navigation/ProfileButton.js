import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import * as sessionActions from "../../store/session";

// function ProfileButton({ user }) {
//   const dispatch = useDispatch();
//   const [showMenu, setShowMenu] = useState(false);

//   const openMenu = () => {
//     if (showMenu) {
//       setShowMenu(!showMenu);
//     } else {
//       setShowMenu(true);
//     }
//   };

//   //   useEffect(() => {
//   //     if (!showMenu) return;

//   //     const closeMenu = () => {
//   //       setShowMenu(false);
//   //     };

//   //     document.addEventListener('click', closeMenu);

//   //     return () => document.removeEventListener("click", closeMenu);
//   //   }, [showMenu]);

//   const logout = (e) => {
//     e.preventDefault();
//     dispatch(sessionActions.logout());
//   };

//   return (
//     <>
//       <button onClick={openMenu}>
//         <i className="fa-solid fa-user-circle" />
//       </button>
//       {showMenu && (
//         <ul className="profile-dropdown">
//           <li>{user.email}</li>
//           <li>
//             <button onClick={logout}>Log Out</button>
//           </li>
//         </ul>
//       )}
//     </>
//   );
// }

// export default ProfileButton;
function ProfileButton({ user }) {
    const dispatch = useDispatch();
    const [showMenu, setShowMenu] = useState(false);
  
    useEffect(() => {
      if (!showMenu) return;
  
      const closeMenu = () => {
        setShowMenu(false);
      };
  
      document.addEventListener('click', closeMenu);
  
      return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);
  
  
    const logout = (e) => {
      e.preventDefault();
      dispatch(sessionActions.logout());
    };
  
    const toggleMenu = (e) => {
      // MAIN CHANGE HERE prevent default and stop click from being heard when menu is opened
      e.preventDefault();
      e.stopPropagation(); // this prevents the click from being heard by the closeMenu eventHandler
      setShowMenu(!showMenu) // this one needs to be !showMenu in the event we try to close the menu with the button
    }
  
    return (
      <>
        <button onClick={toggleMenu}>
          {/* <i className="fa-solid fa-user-circle" /> */}
          Menu
        </button>
        {showMenu && (
          <ul className="profile-dropdown">
            <li>{user.email}</li>
            <li>
              <button onClick={logout}>Log Out</button>
            </li>
          </ul>
        )}
      </>
    );
  }
  
  export default ProfileButton;
