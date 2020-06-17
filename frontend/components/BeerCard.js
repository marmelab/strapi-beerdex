import React, { useRef, useState } from "react";
import { Card } from "antd";
import { EditOutlined, LoadingOutlined } from "@ant-design/icons";

import { useAuth } from "../auth/AuthContext";

export const BeerCard = ({ beer, onUpdate }) => {
  const auth = useAuth();
  const [title, setTitle] = useState(null);
  const [updating, setUpdating] = useState(false);

  const titleInput = useRef(null);

  const handleTitleClick = () => {
    if (auth && auth.token) {
      setTitle(beer.name);
      setTimeout(() => titleInput.current && titleInput.current.focus());
    }
  };

  const handleTitleChange = (e) => setTitle(e.target.value);

  const handleTitleBlur = async () => {
    setUpdating(true);

    await fetch(`${process.env.API_BASEURL}/beers/${beer.id}`, {
      method: "PUT",
      body: JSON.stringify({ name: title }),
      headers: {
        Authorization: `Bearer ${auth.token.jwt}`,
      },
    });

    onUpdate();
    setTitle(null);
    setUpdating(false);
  };

  return (
    <Card
      className="beercard"
      cover={
        <img
          alt={beer.name}
          src={`${process.env.API_BASEURL}/${beer.image[0].url}`}
        />
      }
    >
      {title !== null ? (
        <input
          ref={titleInput}
          onBlur={handleTitleBlur}
          onChange={handleTitleChange}
          type="text"
          value={title}
        />
      ) : (
        <>
          <strong onClick={handleTitleClick}>{beer.name}&nbsp;</strong>
          {auth &&
            auth.token &&
            (updating ? <LoadingOutlined /> : <EditOutlined />)}
        </>
      )}
    </Card>
  );
};
