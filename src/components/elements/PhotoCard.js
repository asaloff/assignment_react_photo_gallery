import React from 'react';
import FontAwesome from 'react-fontawesome';

const PhotoCard = props => {
  const { imgLink, username, created, likes, comments, caption, filter } = props;

  return (
    <div className="PhotoCard col-lg-4">
      <div className="col-lg-12">
        <div className="card">
          <img src={imgLink} alt={username} />
          <div className="card-block">

            <h6 className="card-subtitle mb-2 text-muted">
              <span className="likes">
                <FontAwesome name='heart' /> {likes}
              </span>
              <span className="comments">
                <FontAwesome name='comments' /> {comments}
              </span>
            </h6>

            <p className="card-text">
              Posted by {username} <br />
              {created}
            </p>
            <p>{caption}</p>
            <p className="text-muted">Filter: {filter}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhotoCard;
