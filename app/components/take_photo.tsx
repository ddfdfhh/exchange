import Camera from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';
import ImagePreview from './image_preview';
import { useState } from 'react';
export default function TakePhoto(props:any) { 
    const [dataUri, setDataUri] = useState('');
    const [start, setStart] = useState(false);
      function handleTakePhoto (dataUri:any) {
   
        props.sendDataUri(dataUri)
         setDataUri(dataUri);
  }
  const handleStartButton = () => { 
    setDataUri('');
      if (dataUri.length > 0) {
       
      setDataUri('');
      setStart(true);
    }
    else {
      setDataUri('');
      setStart(!start);
    }
    
  }
  const handleSubmit = () => { 
    /***submti with datauri got */
  }
   const isFullscreen = false;
    return ( <div>
      {
        (dataUri)
          ? <ImagePreview dataUri={dataUri}
            isFullscreen={isFullscreen}
          />
          : (start && <Camera  onTakePhotoAnimationDone = {handleTakePhoto}
            isFullscreen={isFullscreen}
          />)
      }
      <div className="flex flex-row justify-center">
        <button  onClick={handleStartButton} className="d-flex btn btn-primary">
          <i className="icofont-camera" /> {!start ? 'Start' : (dataUri.length > 0 ? 'Restart' : 'Stop')} Camera</button>
      </div>
      {dataUri.length > 0 &&
        <div className="flex flex-row justify-center mt-2">
          <button onClick={handleSubmit} >Submit</button>
        </div>
      }
    </div>
    )

}