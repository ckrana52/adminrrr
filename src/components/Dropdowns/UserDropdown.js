import React from "react";
import { createPopper } from "@popperjs/core";
import { logOut } from "../../utils/handler.utils";
import { getLocal, getSession } from "../../utils/localStorage.utils";
import { Link } from "react-router-dom";
import axiosInstance from '../../common/axios';
import { toast } from 'react-toastify';
import { toastDefault } from '../../utils/handler.utils';

const UserDropdown = () => {
  // dropdown props
  const [dropdownPopoverShow, setDropdownPopoverShow] = React.useState(false);
  const btnDropdownRef = React.createRef();
  const popoverDropdownRef = React.createRef();
  const openDropdownPopover = () => {
    createPopper(btnDropdownRef.current, popoverDropdownRef.current, {
      placement: "bottom-start",
    });
    setDropdownPopoverShow(true);
  };
  const closeDropdownPopover = () => {
    setDropdownPopoverShow(false);
  };
  const user = getLocal('user') || getSession('user')
  return (
    <>
      <a
        className="text-blueGray-500 block"
        href="#pablo"
        ref={btnDropdownRef}
        onClick={(e) => {
          e.preventDefault();
          dropdownPopoverShow ? closeDropdownPopover() : openDropdownPopover();
        }}
      >
        <div className="items-center flex">
          <span className="w-12 h-12 text-sm text-white bg-blueGray-200 inline-flex items-center justify-center rounded-full">
            <img
              alt="..."
              className="w-full rounded-full align-middle border-none shadow-lg"
              src={require("../../assets/img/team-1-800x800.jpg").default}
            />
          </span>
        </div>
      </a>
      <div
        ref={popoverDropdownRef}
        className={
          (dropdownPopoverShow ? "block " : "hidden ") +
          "bg-white text-base z-50 float-left py-2 list-none text-left rounded shadow-lg min-w-[180px]"
        }
      >
        {user && (
          <h4 className="font-bold text-lg text-center text-gray-900 capitalize px-1.5 mb-2">{user?.first_name} {user?.last_name}</h4>
        )}
        <div className="h-0 my-2 border border-solid border-blueGray-100" />
        <button onClick={() => {
          toast.promise(
            axiosInstance.get('/admin/permission/sync'),
            {
                pending: 'Updating transaction...',
                error: {
                    render({ data }) {
                        return 'Sync Error'
                    }
                },
                success: {
                    render() {
                        return 'Sync Successful'
                    }
                }
            },
            toastDefault
          )
        }} className={
          "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
        }>
          Sync Permission
        </button>
        <Link to="/profile" className={
          "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
        }>
          Profile
        </Link>
        <a
          href="#pablo"
          className={
            "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
          }
          onClick={(e) => { e.preventDefault(); logOut() }}
        >
          Logout
        </a>
      </div>
    </>
  );
};

export default UserDropdown;
