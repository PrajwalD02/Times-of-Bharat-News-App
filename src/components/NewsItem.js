import React, { Component } from 'react'

export class NewsItem extends Component {
    timeAgo(pubDate) {
        const now = new Date(); // current time
        const publishedTime = new Date(pubDate); // pubDate time

        const diffInSeconds = Math.floor((now - publishedTime) / 1000); // difference in seconds

        const minutes = Math.floor(diffInSeconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);
        const weeks = Math.floor(days / 7);

        // Return the formatted string based on the time difference
        if (diffInSeconds < 60) return `${diffInSeconds} seconds ago`;
        else if (minutes < 60) return `${minutes} minutes ago`;
        else if (hours < 24) return `${hours} hours ago`;
        else if (days < 7) return `${days} days ago`;
        else return `${weeks} weeks ago`;
    }
    
    render() {
        let {title,description,imgUrl, newsUrl, sourceIcon, sourceName, pubDate}=this.props;
        
        const titleStyle = {
            display: '-webkit-box',
            WebkitLineClamp: 2, // Limits the title to 2 lines
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
        };

        const descriptionStyle = {
            display: '-webkit-box',
            WebkitLineClamp: 3, // Limits the description to 3 lines
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
        };

        const bodyStyle ={
            minHeight: '200px',
            maxHeight: '250px',
            overflow: 'hidden',
        };

        const cardStyle = {
            flex:' 1 1 30%',
            margin: '10px',
            height: '450px',
        };

        const cardImgTopStyle ={
            width: '100%',
            height: '200px',
            objectFit: 'cover',
        }

        return (
            <div className='my-3'>
                {/* <a href={newsUrl} target='_blank' rel="noreferrer" style={{ textDecoration: 'none' }}> */}
                    <div className="card" style={cardStyle}>
                        <img src={imgUrl} className="card-img-top" style={cardImgTopStyle} alt="..."/>
                        <div className="card-body" style={bodyStyle}>
                            <h5 className="card-title" style={titleStyle}>{title}</h5>
                            <p className="card-text" style={descriptionStyle}>{description}</p>
                            <p className="card-text">
                                <small className="text-body-secondary">
                                    {sourceIcon && (
                                        <img
                                            src={sourceIcon}
                                            alt="Source Icon"
                                            className="d-inline-block align-text-top"
                                            style={{ width: '20px', height: '20px', marginRight: '5px' }}
                                        />
                                    )}
                                    {sourceName} - {this.timeAgo(pubDate)}
                                </small>
                            </p>
                            <a href={newsUrl} target='_blank' rel="noreferrer" className="btn btn-sm btn-primary">Read More</a>
                        </div>
                    </div>
                {/* </a> */}
            </div>
        )
    }
}

export default NewsItem