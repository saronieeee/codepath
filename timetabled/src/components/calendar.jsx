import React from "react";
import Event from './Event'


const Calendar = () => {
    return (
        <div className="Calendar">
            <table>
                <thead>
                    <tr>
                        <th></th>
                        <th>Sunday</th>
                        <th>Monday</th>
                        <th>Tuesday</th>
                        <th>Wednesday</th>
                        <th>Thursday</th>
                        <th>Friday</th>
                        <th>Saturday</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="time">8 am</td>
                        <Event event='Move-In Day' color="blue" location='East Remote'/>
                        <td></td>
                        <Event event='ID Handout Duty' color='blue' location='Housing Office'/>
                        <td></td>
                        <td></td>
                        <Event event='RA Team Meeting' color='green' location='Merrill'/>
                        <td></td>
                    </tr>
                    <tr>
                        <td className="time">9 am</td>
                        <Event event='On-Call' color='blue' location='Porter'/>
                        <td></td>
                        <Event event='1-on-1' color='pink' location='Lounge'/>
                        <Event event='1-on-1' color='pink' location='Lounge'/>
                        <Event event='1-on-1' color='pink' location='Lounge'/>
                        <Event event='1-on-1' color='pink' location='Lounge'/>
                        <td></td>
                    </tr>
                    <tr>
                        <td className="time">10 am</td>
                        <Event event='1-on-1' color='pink' location='Lounge' />
                        <td></td>
                        <td></td>
                        <Event event='Resident Meeting' color='green' location='Crown'/>
                        <td></td>
                        <td></td>
                        <Event event='On-Call' color='blue' location='Porter'/>
                    </tr>
                    <tr>
                        <td className="time">11 am</td>
                        <Event event='1-on-1' color='pink' location='Lounge'/>
                        <td></td>
                        <td></td>
                        <Event event='On-Call' color='blue'location='Porter '/>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td className="time">12 pm</td>
                        <Event event='1-on-1' color='pink' location='Lounge'/>
                        <td></td>
                        <td></td>
                        <Event event='On-Call' color='blue' location='Porter'/>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td className="time">1 pm</td>
                        <Event />
                        <td></td>
                        <td></td>
                        <Event event='On-Call' color='blue' location='Porter'/>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td className="time">2 pm</td>
                        <Event />
                        <td></td>
                        <td></td>
                        <Event event='Orientation' color='blue' location='East Field'/>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td className="time">3 pm</td>
                        <Event />
                        <td></td>
                        <td></td>
                        <Event event='Welcome!' color='blue' location='Stevenson'/>
                        <td></td>
                        <Event event='RA Team Meeting' color='green' location='Cowell' />
                        <td></td>
                    </tr>
                    <tr>
                        <td className="time">4 pm</td>
                        <Event />
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <Event event='RA Team Meeting' color='green' location='Cowell'/>
                        <Event event='RA Team Meeting' color='green' location='Cowell'/>
                    </tr>
                    <tr>
                        <td className="time">5 pm</td>
                        <Event />
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <Event event='RA Team Meeting' color='green' location='Cowell'/>
                        <td></td>
                    </tr>
                </tbody>

                
            </table>
        </div>
    )
}

export default Calendar;