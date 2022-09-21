import React, { useEffect, useState } from 'react';
import { addComments } from '../../../../services/requests';
import './CommentSection.css';

function CommentSection({ comments, imgID }) {
    const [comment, setComment] = useState(null);
    const [updateComments, setUpdatedComments] = useState(false);
    
    const addComment = async () => {
        const request = {
            username: sessionStorage.getItem("emailORusername"),
            comment: comment
        }
        const response = await addComments(imgID, request);
        response.statusCode===200 && comments.push(request);
        response.statusCode===200 && setUpdatedComments(!updateComments);
    }

    // useEffect(() => {
        
    // }, [updateComments])

    return (
        <div className="comment-section-container px-2 py-2">
            <span className="fs-14 fw-bold color-white">Comments</span>
            {
                comments.length>0 && comments.map(obj => {
                    return (
                        <div className="d-flex px-2" key={obj}>
                            <span className="fs-11 fw-bold color-white">{obj.username}&nbsp;&nbsp;</span>
                            <span className="fs-11 color-white">{obj.comment}</span>
                        </div>
                    )
                })
            }
            {
                comments.length===0 && <><br></br><span className="fs-12 color-white d-flex justify-content-center">No Comments :(</span></>
            }
            <div className="col-12 mt-2">
                <div className="row">
                    <div className="col-11 vertically-center pr-0">
                        <textarea type="text" className='w-100 custom-input' placeholder="Add a comment" rows={1} onChange={(event) => setComment(event.target.value)}></textarea>
                    </div>
                    <div className="col-1 d-flex px-0">
                        <span className="fa fa-paper-plane fs-16 color-grey vertically-center" onClick={() => addComment()}></span>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default CommentSection;