import React from "react";
import {Typography} from "@material-ui/core";

const PoolNoWallet = ()=> {
  return (
    <div style={{display: "flex", paddingTop: 100,justifyContent: "center"}}>
      <Typography variant="h2">You need a WAN and ETH wallet to be able to utilize pooling.</Typography>
    </div>
  )
};

export default PoolNoWallet;
