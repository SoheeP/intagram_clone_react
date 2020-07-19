import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import firebase from 'firebase';
import { storage, db } from './firebase';
import './ImageUpload.css'


function ImageUpload({username}) {
  const [image, setImage] = useState(null)
  const [progress, setProgress] = useState(0);
  const [caption, setCaption] = useState('');
  const handleChange = (e) => {
    if(e.target.files[0]){
      setImage(e.target.files[0])
    }
  }
  const handleUpload = () => {
    // storage 주소를 참조하고 거기에 이미지를 넣는다...
    // image.name 은 선택한 파일 이름
    const uploadTask = storage.ref(`images/${image.name}`).put(image);
    uploadTask.on("state_changed", (snapshot) => {
      // 비동기적으로 가져
        // progress function...
        const progress = Math.round( (snapshot.bytesTransferred / snapshot.totalBytes) * 100)
        setProgress(progress);
      },
      (error) => {
        //SDK upload 에서 error날때
        console.log(error);
        alert(error.message);
      },
      () => {
        // comlete function
        storage.ref("images")
        .child(image.name)
        .getDownloadURL()
        .then(url => {
          //do something with url
          //post image inside db
          db.collection("posts").add({
            // 파이어베이스 시간을 쓰기때문에 세계 어디에서 올렸든 상관없음
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            caption: caption,
            imageUrl: url,
            username: username
          })

          setProgress(0);
          setCaption("");
          setImage(null);
        });
      }
    )
  }
  return (
    <div className="imageupload">
      <progress className="imageupload__progress" value ={progress} max="100" />
      <input type="text" placeholder='Enter a caption...' value={caption} onChange={event => setCaption(event.target.value)} />
      <input type="file" onChange={handleChange}/>
      <Button onClick={handleUpload} color="secondary" variant="contained">Upload</Button>
    </div>
  )
}

export default ImageUpload
