import React, { useEffect} from "react";
import factory from '../ethereum/factory.js';
import CardGroups from '../Components/CardGroups.jsx';
import ButtonWithIcon from '../Components/ButtonWithIcon.jsx';
import Layout from '../Components/Layout.jsx';
import { useState } from 'react';
import { Link } from "../routes.js";

export default function CampaignIndex({campaigns}) {
    return (
      <Layout>
        <div>
            <h3>Open Campaigns</h3>
            <Link route="/campaigns/new">
              <a><ButtonWithIcon text="Create Campaign" icon="circle add"/></a>
            </Link>
            <CardGroups campaigns={campaigns} />
        </div>
      </Layout>
  );

}

CampaignIndex.getInitialProps = async () => {
  const campaigns = await factory.methods.getDeployedCampaigns().call();
  return { campaigns };
};