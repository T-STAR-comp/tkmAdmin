import React, { useState, useRef, useEffect } from 'react';
import styles from '../SCANNER/main.module.css';
import jsQR from 'jsqr';
import ticketmwURL from '../URL/ticketmw.js';

const CameraApp = () => {
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const [qrData, setQrData] = useState(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [stream, setStream] = useState(null);
  const[ManualTKData, SetManualTKData] = useState('');
  const[ManualScanMsg, SetManualScanMsg] = useState('');
  const[MnulMsgStyle, setMnulMsgStyle] = useState();
  const[ManualOptns, SetManualOptns] = useState({visibility:"hidden"});
  const[AutoScanMsg, SetAutoScanMsg] = useState('');
  const[AutoScanStyle, SetAutoScanStyle] = useState();
  const[AutoScanResDivStyle, SetAutoScanResDivStyle] = useState({visibility:'hidden'});
  const[MainOptns, SetMainOptns] = useState({visibility:"visible"});
  const[StreamStyle, SetStreamStyle] = useState({visibility:'hidden'});
  const[validTicket, SetValidTicket] = useState({display:"none"});
  const[InvalidTicket, SetInValidTicket] = useState({display:"none"});
  const[StatusTxt, SetStatusTxt] = useState({color:"blue",display:"none"});

  useEffect(() => {
    return () => {
      // Stop the stream and cleanup when the component unmounts
      closeCamera();
    };
  }, []);

  const handledatachange = (event) => {
    SetManualTKData(event.target.value);
  };
 
  // Function to open the camera
  const openCamera = async () => {
    try {
      SetStreamStyle({visibility:'visible'});
      const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        videoRef.current.play();
        setStream(mediaStream);
        setIsCameraOn(true);
        requestAnimationFrame(scanQRCode); // Start scanning for QR codes
      }
    } catch (err) {
      console.error("Error accessing camera:", err);
      alert("Could not access the camera. Please check permissions.");
    }
  };

  const ExitMsg = () => {
    SetManualScanMsg('');
  };

  const openManuelScan = () => {
    try{
      SetMainOptns({visibility:'hidden'});
      SetManualOptns({visibility:'visible'});
    }
    catch(err) {
      window.alert(err);
    };
  };

  const cancelmanualscan = () => {
    SetMainOptns({visibility:'visible'});
      SetManualOptns({visibility:'hidden'});
      SetManualTKData('');
  };

  // Function to close the camera
  const closeCamera = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      if (videoRef.current) videoRef.current.srcObject = null;
      setIsCameraOn(false);
      setStream(null);
      SetInValidTicket({display:"none"});
      SetValidTicket({display:"none"});
      SetStatusTxt({display:"none"});
      SetStreamStyle({visibility:'hidden'});
      SetAutoScanResDivStyle({visibility:'hidden'});
    }
  };

  const hideAutoscanRes = () => {
    SetAutoScanResDivStyle({visibility:'hidden'});
  }

  // Function to scan for QR codes
  const scanQRCode = () => {
    const canvas = canvasRef.current;
    const video = videoRef.current;

    if (video && video.readyState === video.HAVE_ENOUGH_DATA) {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      
      const context = canvas.getContext('2d', { willReadFrequently: true });
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      
      const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
      const code = jsQR(imageData.data, canvas.width, canvas.height);
      
      if (code) {
        setQrData(code.data); // Set QR code data
        console.log("QR Code Data:", code.data);
      } else {
        setQrData(null); // Reset QR data if no code is found
      }
    }

    if (isCameraOn) requestAnimationFrame(scanQRCode); // Continue scanning if the camera is still on
  };

  // Function to capture a picture from the video feed
  const takePicture = () => {
    SetAutoScanResDivStyle({visibility:'visible'});
    const canvas = canvasRef.current;
    const video = videoRef.current;

    if (video && canvas) {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const context = canvas.getContext('2d');
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      const imageDataURL = canvas.toDataURL('image/png');
      setCapturedImage(imageDataURL);

      // Analyze the captured image for QR codes
      extractQrFromImage(imageDataURL);
    }
  };

  // Function to extract QR code from the captured image
  const extractQrFromImage = (imageDataURL) => {

    const img = new Image();
    img.src = imageDataURL;
    img.onload = () => {
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');

      if (canvas && context) {
        canvas.width = img.width;
        canvas.height = img.height;

        // Draw the image onto the canvas
        context.drawImage(img, 0, 0, img.width, img.height);

        // Get image data from the canvas
        const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
        const code = jsQR(imageData.data, canvas.width, canvas.height);

        if (code) {
          setQrData(code.data); // Set QR code data
          const uid = code.data;
          AutoVerifyData(uid);
        } else {
          setQrData(null); // Reset QR data if no code is found
        }
      }
    };
  };

  const AutoVerifyData = async (uid) => {
    const uniqueData = uid;
    const controller = new AbortController();
    const timeout = 2000; 
    const timeoutId = setTimeout(() => controller.abort(), timeout);
  
    try {
      const response = await fetch(
        import.meta.env.VITE_AdminVerifyUIDUrl,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ uniqueData }),
          signal: controller.signal, // Attach the signal for aborting
        }
      );
  
      clearTimeout(timeoutId); // Clear the timeout if the request completes
  
      const { message } = await response.json();
  
      if (message === 'VALID') {
        SetAutoScanMsg(message);
        SetAutoScanStyle({color:'green'});
        SetAutoScanResDivStyle({visibility:'visible'});
      }
      if (message === 'INVALID') {
        SetAutoScanMsg(message);
        SetAutoScanStyle({color:'red'});
        SetAutoScanResDivStyle({visibility:'visible'});
      }
      if (message === 'ERROR') {
        SetAutoScanMsg(message);
        SetAutoScanResDivStyle({visibility:'visible'});
      }
    } catch (err) {
      clearTimeout(timeoutId); // Clear the timeout even in case of errors
  
      if (err.name === 'AbortError') {
        null
      } else {
        //console.error(err);
        window.alert(err);
      }
    }
  };

  const VerifyData = async () => {
    const uniqueData = qrData ? qrData : ManualTKData;
    const controller = new AbortController();
    const timeout = 2000; 
    const timeoutId = setTimeout(() => controller.abort(), timeout);
  
    try {
      const response = await fetch(
        import.meta.env.VITE_AdminVerifyUIDUrl,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ uniqueData }),
          signal: controller.signal, // Attach the signal for aborting
        }
      );
  
      clearTimeout(timeoutId); // Clear the timeout if the request completes
  
      const { message } = await response.json();
  
      if (message === 'VALID') {
        SetManualScanMsg(message);
        setMnulMsgStyle({ color: 'green' });
        SetManualTKData('');
        console.log(message);
      }
      if (message === 'INVALID') {
        SetManualScanMsg(message);
        setMnulMsgStyle({ color: 'red' });
        SetManualTKData('');
        console.log(message);
      }
      if (message === 'ERROR') {
        SetManualScanMsg(message);
        SetManualTKData('');
      }
      if (message === 'NULL VAL') {
        SetManualScanMsg(message);
        setMnulMsgStyle({ color: 'black' });
        SetManualTKData('');
      }
    } catch (err) {
      clearTimeout(timeoutId); // Clear the timeout even in case of errors
  
      if (err.name === 'AbortError') {
        SetManualScanMsg('INVALID');
        setMnulMsgStyle({ color: 'red' });
        SetManualTKData('');
      } else {
        //console.error(err);
        window.alert(err);
      }
    }
  };
  
  const LogOutFunc = ()=>{
    sessionStorage.removeItem('valid');
    sessionStorage.removeItem('masterLOGGED');
    sessionStorage.removeItem('Logged');
    sessionStorage.removeItem('CamActive');
    window.location.reload();
  };

  

  return (
    <div>
      <h1 className={styles.head_txt}>Ticket Malawi Main</h1>

      <video
        className={styles.vid_stream_prev}
        style={StreamStyle}
        ref={videoRef}
      />
      <br />

      {!isCameraOn ? (
        <div className={styles.first_btns_style} style={MainOptns}>
          <button className={styles.start_btn} onClick={openCamera}>AUTO Scan</button>
          <button className={styles.start_btn} onClick={openManuelScan}>MNNL Scan</button>
          <button className={styles.logout_btn} onClick={LogOutFunc} >Log Out</button>
        </div>
      ) : (
        <>
          <div>
            <div>
            <button className={styles.close_btn} onClick={closeCamera}>Close Camera</button>
            <button className={styles.scan_btn} onClick={takePicture}>Scan Ticket</button>
            </div>
          </div>
          <hr />
        </>
      )}

      <div className={styles.manualscan_cont} style={ManualOptns}>
        <h3 className={styles.Message_style} style={MnulMsgStyle} onClick={ExitMsg}>{ManualScanMsg}</h3>
        <input className={styles.manual_input} onChange={handledatachange} value={ManualTKData} type="text" placeholder='Enter Ticket UID' />
        <button className={styles.manual_verify_btn} onClick={VerifyData}>Verify</button>
        <button className={styles.manual_cancel_btn} onClick={cancelmanualscan}>Cancel</button>
      </div>

     
      <div>
        <p style={validTicket} className={styles.status_icons}><svg xmlns="http://www.w3.org/2000/svg" height="72px" viewBox="0 -960 960 960" width="72px" fill="#0000F5"><path d="m424-296 282-282-56-56-226 226-114-114-56 56 170 170Zm56 216q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/></svg></p>
        <p style={InvalidTicket} className={styles.status_icons}><svg xmlns="http://www.w3.org/2000/svg" height="72px" viewBox="0 -960 960 960" width="72px" fill="#EA3323"><path d="m336-280 144-144 144 144 56-56-144-144 144-144-56-56-144 144-144-144-56 56 144 144-144 144 56 56ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/></svg></p>
        <p style={StatusTxt} className={styles.status_txt}>Valid Ticket</p>
      </div>

      <canvas ref={canvasRef} style={{ display: 'none' }} />


        <div className={styles.dataDisp} style={AutoScanResDivStyle} onClick={hideAutoscanRes}>
          <h2 className={styles.scannedState} style={AutoScanStyle}>{AutoScanMsg}</h2>
        </div>

      <footer className={styles.footer}>
        Powered by <span className={styles.brand}>Oasis</span>
      </footer>
    </div>
  );
};

export default CameraApp;
