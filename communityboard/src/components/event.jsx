import React from "react";

const Event = (props) => {
    return (
        <div className="Event">
            <img src={props.link} width="150px" height="100px"></img>
            <h3>{props.name}</h3>
            <h5>{props.details}</h5>
            <a href={props.click}><button>View More</button></a>
        </div>
    )
}

export default Event;