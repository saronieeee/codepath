import React from "react";
import Event from './event'


const Cards = () => {
    return (
        <div className="Cards">
            <div className="cardrow">
                <Event link='https://californiathroughmylens.com/wp-content/uploads/2014/10/Natural-Bridges-State-Beach-9.jpg' name="N. Bridges" details='Beach' click="https://www.parks.ca.gov/?page_id=541"/>
                <Event link='https://upload.wikimedia.org/wikipedia/commons/a/a0/Twin_Lakes_State_Beach_and_lighthouse.jpg' name="Twin Lakes" details='Beach' click="https://www.parks.ca.gov/?page_id=547"/>
                <Event link='https://dynamic-media-cdn.tripadvisor.com/media/photo-o/12/a9/7d/ca/view-from-the-stairs.jpg?w=1200&h=-1&s=1' name="Seabright" details='Beach' click="https://www.santacruz.org/listings/seabright-state-beach/"/>
            </div>
            <div className="cardrow">
                <Event link='https://www.santacruzmexicanfood.com/images/546696/0_0.jpg' name="Los Viejones" details='Mexican' click="https://www.santacruzmexicanfood.com/"/>
                <Event link='https://static.wixstatic.com/media/dd294f_4da455702e014ce8885a481bc60fdf1d~mv2.jpg/v1/fill/w_324,h_243,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/find-us-square_orig.jpg' name="Stagnaro" details='Seafood' click="https://www.stagnarobrothers.com/"/>
                <Event link='https://i0.wp.com/lookout.co/wp-content/uploads/2024/07/West-End-7.jpg?resize=780%2C528&ssl=1' name="Izakaya" details='Asian' click="https://www.westendtap.com/"/>
            </div>
            <div className="cardrow">
                <Event link='https://catandcloud.com/cdn/shop/files/Swift-7.jpg' name="Cat and Cloud" details='Cafe' click="https://catandcloud.com/"/>
                <Event link='https://www.goodtimes.sc/wp-content/uploads/sites/10/2021/11/dining-pic-GTW2145-11th-hour-coffee-1068x580.jpg' name="11th hour" details='Cafe' click="https://www.11thhourcoffee.com/"/>
                <Event link='https://media-cdn.tripadvisor.com/media/photo-s/1a/7e/8a/fd/verve-coffee-roasters.jpg' name="Verve" details='Cafe' click="https://www.vervecoffee.com/?srsltid=AfmBOorJ4u0-QI_N032OJrW-53WaPyvlM_t6rsdyEVfCb4CUi-Bn2kk9"/>
            </div>
            <div className="cardrow">
                <Event link='https://petroglyph.com/uploads/_rectCollage/DSCN0278_2.jpg' name="Petroglyph" details='Pottery' click="https://petroglyph.com/locations/santa-cruz"/>
                <Event link='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQeZuUBraQZMZLvgp4-WHDyI3JwdvVnCDFw3w&s' name="Santa Cruz Cinema" details='Movie Theater' click="https://www.santacruzcinema.com/locations/santacruz"/>
                <Event link='https://res.cloudinary.com/luxuryp/images/w_1280,c_limit,f_auto,q_auto/yxrgpqwd6rgqwmrwaepp/istock-1344193416-1' name="Hiking Trails" details='Outdoors' click="https://www.alltrails.com/us/california/santa-cruz"/>
            </div>
        </div>
    )
}

export default Cards;