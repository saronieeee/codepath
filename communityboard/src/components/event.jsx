import React from "react";

const Event = (props) => {
    return (
        <div className="Event">
            <img src={props.link} width="150px"></img>
            <h3>{props.name}</h3>
            <h5>{props.details}</h5>
            <button>View More</button>
        </div>
    )
}

export default Event;