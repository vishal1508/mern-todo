import { Sidebar } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { HiArrowSmRight, HiUser } from "react-icons/hi";
import { Link, useLocation } from "react-router-dom";
const Dashsidebar = () => {
  const locationSearch = useLocation();
  const [tab, setTab] = useState("");
  useEffect(() => {
    const urlSearch = new URLSearchParams(locationSearch.search);
    const tabFormUrl = urlSearch.get("tab");
    if (tabFormUrl) {
      setTab(tabFormUrl);
    }
  }, [locationSearch.search]);
  return (
    <Sidebar className="w-full md:w-56">
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          <Link to="/dashboard?tab=Profile">
            <Sidebar.Item
              active={tab === "Profile"}
              icon={HiUser}
              label="user"
              labelColor="dark"
            >
              Profile
            </Sidebar.Item>
          </Link>
          <Sidebar.Item icon={HiArrowSmRight}>Sign Out</Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
};

export default Dashsidebar;
