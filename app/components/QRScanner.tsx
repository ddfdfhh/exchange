import React, { useState } from "react";
// import { QrReader } from "react-qr-reader";

export default function QRScanner(props:any) {
  const [pl, setPl] = useState('No result');

  return (
    <>
      <h1>should be qr reader here</h1>
      {/* <QrReader
        constraints={{ facingMode: 'user' }}
        onResult={(result, error) => {
          if (!!result) {
            setPl(result?.getText)
            props.onResult1(result?.getText);
            console.log('scanner',result?.getText)
          }

          if (!!error) {
            console.info(error);
          }
        }}
        containerStyle={{ padding:'0px!important' }}
      /> */}
      
    </>
   
  );
}
