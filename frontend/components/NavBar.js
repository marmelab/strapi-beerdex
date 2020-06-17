import React, { useState, useEffect } from "react";
import { Menu, Button } from "antd";
import Link from "next/link";
import useSWR from "swr";
import { useRouter } from "next/router";

import { LoginForm } from "./LoginForm";
import { useAuth } from "../auth/AuthContext";

export const NavBar = () => {
  const router = useRouter();
  const auth = useAuth();

  const { data: categories } = useSWR(`${process.env.API_BASEURL}/categories`);

  const handleLogin = ({ identifier, password }) =>
    auth.login(identifier, password);

  return (
    <Menu
      className="menu"
      theme="dark"
      mode="horizontal"
      defaultSelectedKeys={[router.asPath]}
    >
      <Menu.Item key="/">
        <Link href="/">
          <a>All</a>
        </Link>
      </Menu.Item>
      {(categories || []).map((category) => (
        <Menu.Item key={`/${category.slug}`}>
          <Link href="[slug]" as={`/${category.slug}`}>
            <a>{category.name}</a>
          </Link>
        </Menu.Item>
      ))}
      {auth && (
        <div style={{ float: "right" }}>
          {auth.token && auth.token.user ? (
            <>
              <span className="username">{auth.token.user.username}</span>
              <Button onClick={auth.logout}>Logout</Button>
            </>
          ) : (
            <div style={{ paddingTop: 16 }}>
              <LoginForm onLogin={handleLogin} />
            </div>
          )}
        </div>
      )}
    </Menu>
  );
};
