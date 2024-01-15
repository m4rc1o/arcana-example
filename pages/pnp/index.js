'use client';

import { React, useState } from 'react';
import { useAuth } from '@arcana/auth-react';
import Loader from "../../components/loader";
import { Info } from "../../components/info";
import styles from "../index.module.css";
import { exportPathMap } from "next.config";
import { ethers } from "ethers";

const names = [
  "1. Web2-like user onboarding",
  "2. Sign blockchain transactions",
  "3. Web3 wallet operations",
];

function Header({ title }) {
  const [likes, setLikes] = useState(0);

  function handleClick() {
    setLikes(likes + 1);
  }

  return (
    <div>
      <h1>{title ? title : "Default title"}</h1>
      <ul>
        {names.map((name) => (
          <li key={name}>{name}</li>
        ))}
      </ul>
      <button onClick={handleClick}>👍 ({likes})</button>
    </div>
  );
}

export default function IndexPage() {
  const { user, connect, isLoggedIn, loading, loginWithSocial, provider } =
    useAuth();

  const onConnectClick = async () => {
    try {
      await connect();
    } catch (e) {
      console.log(e);
    }
  };

  const onConnect = () => {
    console.log("connected");

    React.useEffect(() => {
      provider.on("connect", onConnect);
      return () => {
        provider.removeListener("connect", onConnect);
      };
    }, [provider]);
  };

  const onClickSignTx = async () => {
    const from = user.address;
    console.log("from: ", from);

    const amountToSend = ethers.utils.parseEther("0.0001").toString();
    console.log("amountToSend: ", amountToSend);

    const { sig } = await provider.request({
      method: "eth_signTransaction",
      params: [
        {
          from, // sender account address
          gasPrice: 0,
          to: "0xE28F01Cf69f27Ee17e552bFDFB7ff301ca07e780", // receiver account address
          value: amountToSend,
        },
      ],
    });
    console.log({ sig });
  };

  if (loading) {
    return (
      <>
        <Header title="Arcana Auth NextJS Sample App. 🚀" />
        <Loader secondaryColor="#101010" strokeColor="#101010" />
      </>
    );
  }

  if (!isLoggedIn) {
    return (
      <>
        <Header title="Arcana Auth NextJS Sample App. 🚀" />
        <button className={styles.Btn} onClick={onConnectClick}>
          Connect
        </button>
      </>
    );
  } else {
    return (
      <>
        <h1>Connected</h1>
        <div>
          <button className={styles.Btn} onClick={onClickSignTx}>
            Sign Tx
          </button>
        </div>
      </>
    );
  }
}
