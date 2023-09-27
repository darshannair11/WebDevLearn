import React, { useEffect, useState } from "react";
import Item from "./Item";
import {Principal} from "@dfinity/principal";
import { createTypeReferenceDirectiveResolutionCache } from "../../../../node_modules/typescript/lib/typescript";

function Gallery(props) {

const [items,setItems]=useState();

function fetchNFTs(){
  if(props.ids !== undefined){
      const items_temp=props.ids.map((NFTid) => {
        const temp= <Item key={NFTid.toText()} id={NFTid} />
        console.log(temp);
        return temp;
      });
      console.log("items_temp:"+items_temp);
      setItems(items_temp);
    console.log("items:"+items);
  }
}

useEffect(() => {
  fetchNFTs();
},[])

  return (
    <div className="gallery-view">
      <h3 className="makeStyles-title-99 Typography-h3">{props.title}</h3>
      <div className="disGrid-root disGrid-container disGrid-spacing-xs-2">
        <div className="disGrid-root disGrid-item disGrid-grid-xs-12">
          <div className="disGrid-root disGrid-container disGrid-spacing-xs-5 disGrid-justify-content-xs-center">
            {items}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Gallery;
