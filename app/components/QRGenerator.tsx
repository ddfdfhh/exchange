import React from "react";
import ReactDOM from "react-dom";
import QRCode from "react-qr-code";

export default function QRGenerator(props: {value:any,width:any,height:any}) {
  console.log('val',props.value)
  return <>
    {
           props.value &&
        <div style={{ height: props.height + 'px', maxWidth: props.width + 'px', width: "100%" }}>
          <QRCode
   
            style={{ height: "auto", maxWidth: "100%", width: "100%" }}
            value={props.value}
            viewBox={`0 0 ${props.width} ${props.height}`}
          />
        </div>
    }
   </>
}
