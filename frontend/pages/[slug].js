import React from "react";
import { Layout, Row, Col } from "antd";
import { withRouter } from "next/router";
import useSWR from "swr";

import { NavBar } from "../components/NavBar";
import { BeerCard } from "../components/BeerCard";

const { Header, Content } = Layout;

const HomePage = ({ router }) => {
  const { data: beers, mutate } = useSWR(
    `${process.env.API_BASEURL}/beers${
      router.query.slug ? `?category.slug=${router.query.slug}` : ""
    }`
  );

  return (
    <Layout className="layout">
      <Header style={{ overflow: "hidden" }}>
        <div className="logo" />
        <NavBar />
      </Header>
      <Content className="content">
        <div className="innercontent">
          <Row gutter={[16, 16]}>
            {(beers || []).map((beer) => (
              <Col key={beer.id} xs={12} sm={8} md={8} xl={4}>
                <BeerCard beer={beer} onUpdate={mutate} />
              </Col>
            ))}
          </Row>
        </div>
      </Content>
    </Layout>
  );
};

export default withRouter(HomePage);
