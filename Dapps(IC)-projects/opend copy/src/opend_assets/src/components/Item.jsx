import React, { useEffect, useState } from "react";
import logo from "../../assets/logo.png";
import {Actor,HttpAgent} from "@dfinity/agent";
import { idlFactory } from "../../../declarations/nft";
import {Principal} from "@dfinity/principal";
import Button from "./Button";
import { opend } from "../../../declarations/opend";

function Item(props) {

  const [name,setName]=useState();
  const [owner,setOwner]=useState();
  const [image,setImage]=useState();
  const [button,setButton]=useState();
  const [priceInput,setPriceInput]=useState();
  const [loaderHidden,setHidden]=useState(true);
  const [blur,setBlur]=useState();

  const id=props.id;
  const localHost="http://localhost:8080/";
  const agent=new HttpAgent({host:localHost});
  //Remove when deploying live
  agent.fetchRootKey();
  let NFTActor;

  async function loadNFT(){
    NFTActor=await Actor.createActor(idlFactory,{
      agent,
      canisterId:id,
    })

    const name=await NFTActor.getName();
    const owner=await NFTActor.getOwner();
    const imageData=await NFTActor.getAsset();
    const imageContent=new Uint8Array(imageData);
    const image=URL.createObjectURL(new Blob([imageContent.buffer],{type:"image/png"}));
    setName(name);
    setOwner(owner.toText());
    setImage(image);
    const nftIsListed=await opend.isListed(props.id);
    if(nftIsListed){
      setOwner(opend);
      setBlur({filter:"blur(4px)"});
    }else{
      setButton(<Button handleClick={handleSell} text={"Sell"}/>)
    }
    

  }

  useEffect(() => {
    loadNFT();
  },[]);
  let price;
  function handleSell(){
    console.log("Sell Clicked");
    setPriceInput(<input
      placeholder="Price in DANG"
      type="number"
      className="price-input"
      value={price}
      onChange={(e) => (price=e.target.value)}
    />)
    setButton(<Button handleClick={sellItem} text={"Confirm"}/>)
  }

  async function sellItem(){
    setBlur({filter:"blur(4px)"});
    setHidden(false);
    const listingResult=await opend.listItem(props.id,Number(price));
    console.log("Listing:"+listingResult);
    if(listingResult == "Success"){
      const openDId=await opend.getOpenDCanisterId();
      const transferResult=await NFTActor.transferOwnership(openDId);
      console.log("Transfer"+transferResult);
      if(transferResult==="Success"){
        setHidden(true);
        setButton();
        setPriceInput();
        setOwner("OpenD")
      }
    }
  }

  return (
    <div className="disGrid-item">
      <div className="disPaper-root disCard-root makeStyles-root-17 disPaper-elevation1 disPaper-rounded">
        <img
          className="disCardMedia-root makeStyles-image-19 disCardMedia-media disCardMedia-img"
          src={image}
          style={blur}
        />
        <div hidden={loaderHidden} className="lds-ellipsis">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
        <div className="disCardContent-root">
          <h2 className="disTypography-root makeStyles-bodyText-24 disTypography-h5 disTypography-gutterBottom">
            {name}<span className="purple-text"></span>
          </h2>
          <p className="disTypography-root makeStyles-bodyText-24 disTypography-body2 disTypography-colorTextSecondary">
            Owner: {owner}
          </p>
          {priceInput}
          {button}
        </div>
      </div>
    </div>
  );
}

export default Item;
