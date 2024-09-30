import React from "react";
import Event from './event'


const Cards = () => {
    return (
        <div className="Cards">
            <div className="cardrow">
                <Event link='https://californiathroughmylens.com/wp-content/uploads/2014/10/Natural-Bridges-State-Beach-9.jpg' name="Natural Bridges" details='Beach'/>
                <Event link='https://californiathroughmylens.com/wp-content/uploads/2014/10/Natural-Bridges-State-Beach-9.jpg' name="Natural Bridges" details='Beach'/>
                <Event link='https://californiathroughmylens.com/wp-content/uploads/2014/10/Natural-Bridges-State-Beach-9.jpg' name="Natural Bridges" details='Beach'/>
            </div>
            <div className="cardrow">
                <Event link='https://californiathroughmylens.com/wp-content/uploads/2014/10/Natural-Bridges-State-Beach-9.jpg' name="Natural Bridges" details='Beach'/>
                <Event link='https://californiathroughmylens.com/wp-content/uploads/2014/10/Natural-Bridges-State-Beach-9.jpg' name="Natural Bridges" details='Beach'/>
                <Event link='https://californiathroughmylens.com/wp-content/uploads/2014/10/Natural-Bridges-State-Beach-9.jpg' name="Natural Bridges" details='Beach'/>
            </div>
        </div>
    )
}

export default Cards;