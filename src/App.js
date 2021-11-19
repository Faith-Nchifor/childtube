

import './App.css';
import axios from 'axios'
import React, {useState,useEffect} from 'react'

//import {MDB, MDBModal, MDBModalHeader, MDBModalBody, MDBRow} from "mdbreact";
import {Card,Container,Col,Row,Modal} from 'react-bootstrap'
function App() {
  const [videos,setVideos]= useState([])
  const [currentPlaying,setCP] = useState({})
  const [modalOpen,setIsOpen] = useState(false)
  const [loading,setL]= useState(false)
  
  const closeModal = ()=>{
    setIsOpen(false)
  }
  const openModal = ()=>{
    setIsOpen(true)
  }
  useEffect(() => {
    setL(true)
   axios.get(
    'https://youtube.googleapis.com/youtube/v3/search?part=snippet&q=sleep%20story%20for%20kids&key='+process.env.REACT_APP_YA_KEY,{
     
      headers:{
        Authorization: 'Bearer ' ,
        Accept: 'application/json'
      }
    } 
  ).then(
    resp=>{
     // console.log(resp.data.items)
      let vids= resp.data.items;
      let ids=vids.map((vid)=>{
        return {
          id:vid.id.videoId,
          thumbnails:vid.snippet.thumbnails,
          title:vid.snippet.title
        }
 // setVideos(vid.id.videoId)
      })
      setVideos(ids)
    }
  )
  .catch(
    e=>console.log(e)
  ).finally(
    ()=>{
      setL(false)
    }
  )
  }, [])
  const playVideo = ()=>{
   
    openModal()
  }
  return (
    <Container fluid={true} className="App-header  text-center bg-dark">
      <div className="">
      <Col size='8' className="emptypage mx-auto float-end" >
        {loading === true &&(
      
      <div className="spinner-border text-center " role="status" >
        <span className="sr-only">Loading...</span>
      </div>
   
     )}
         
        </Col>
     <Row>
    
        { videos.length >0 && 
          
        
        videos.map((video,i)=>{
            return (
              <Col key={i} xs={10} md={4} xl={4}  className="mb-3 mx-auto mt-2" onClick={()=>{
                setCP(video);
                playVideo();
                console.log(currentPlaying.title)
                }}>
                <Card >
                <img src={video.thumbnails.medium.url} alt="img"/>
              <p className='text-justify'>{video.title}</p>
              
                </Card>
              
              </Col>
            )
        })
        
      
        }
        </Row>
       
        
      {videos.length<1 &&(
        <>
        <p className=" text-center text-white">Opps there is a connection problem. Try refreshing this page</p>
          <h3 className='text-white text-center'>empty</h3>
         
        </>
      )}
      </div>
      <Modal show={modalOpen} onHide={closeModal}  position='top' size='lg'  centered className='modal'>
        <Modal.Header closeButton>
      
        <p className="brown-text text-center">  {currentPlaying.title}</p>
        </Modal.Header>
        <Modal.Body className='mbody'>
        
        <iframe  title={currentPlaying.title} src={'https://www.youtube.com/embed/'+currentPlaying.id} width='100%' height="100%">
            
            </iframe>
        <p className="brown-text text-center">  {currentPlaying.title}</p>
        
        </Modal.Body>
       
      </Modal>
    </Container>
  );
}

export default App;
