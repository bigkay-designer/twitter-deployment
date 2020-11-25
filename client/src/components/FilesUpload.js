// import React, {Fragment ,useState} from 'react'
// import axios from '../axios'
// function FilesUpload() {
//     const [file, setFile] = useState()
//     const [fileName, setFileName] = useState('choose file')
//     const [uploadedFile, setUploadedFile] = useState({})


//     const FileOnChangeHandler = (e)=>{
//         setFile(e.target.files[0])
//         setFileName(e.target.files[0].name)
//     }
//     const formSubmitHandler = async (e)=>{
//         e.preventDefault();
//         const formData = new FormData()

//         formData.append('file', file)
//         try {
//                const res = await axios.post('/upload', formData, {
//                 headers: {
//                 'Content-Type': 'multipart/form-data'
//                 },
//             })
//             const { fileName, filePath } = res.data;
//             setUploadedFile({ fileName, filePath });
//             console.log(uploadedFile)
//         }catch(err){
//             if(err.response.status === 500){
//                 console.log(err)
//             }else{
//                 console.log(err.response.data)
//             }
//         }
//     }

//     return (
//         <div>
//             <h2>fileUpload</h2>
//             <Fragment>
//                 <form onSubmit={formSubmitHandler}>
//                     <label htmlFor="file"> {fileName} </label>
//                     <input type="file" onChange={FileOnChangeHandler} />
//                     <input type="submit" value="upload"/>
//                 </form>
//                 {uploadedFile ? <div> 
//                     <h3> {uploadedFile.fileName} </h3>
//                     <img style={{width: '100%'}} src={uploadedFile.filePath} alt=""/>
//                 </div>: null}
//             </Fragment>
//         </div>
//     )
// }

// export default FilesUpload
// {uploadedFile ? <div style={tweetImageBg} className="feed__imageFile">
// <span onClick={closeTweetImgHandler}> <Cancel className="feed__imageFile--close" /> </span> 
// </div> : null 
// }