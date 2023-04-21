import {Accordion, AccordionItem, AccordionItemButton, AccordionItemHeading, AccordionItemPanel} from 'react-accessible-accordion';
import './forecast.css';

const WEEK_DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const Forecast = ({data}) => {
    const dayInAWeek = new Date().getDay();
    const forecastDays = WEEK_DAYS.slice(dayInAWeek, WEEK_DAYS.length).concat(WEEK_DAYS.slice(0, dayInAWeek));

    return (
        <>
            <label className='title'>Daily</label>
            <Accordion allowZeroExpanded>
                {data.list.slice(0, 7).map((item, i) => (
                <AccordionItem key={i}>
                    <AccordionItemHeading>
                        <AccordionItemButton>
                            <div className='daily_item'>
                                <img src={`icons/${item.weather[0].icon}.png`} className='icon_small' alt="weather" />
                                <label className='day'>{forecastDays[i]}</label>
                                <label className='description'>{item.weather[0].description}</label>
                                <label className='min_max'>{Math.round(item.main.temp_min)}°C / {Math.round(item.main.temp_max)}°C</label>
                            </div>
                        </AccordionItemButton>
                    </AccordionItemHeading>
                    <AccordionItemPanel>
                        <div className='details_grid'>
                            <div className='details_grid-item'>
                                <label>Pressure</label>
                                <label>{item.main.pressure}hPa</label>
                            </div>
                            <div className='details_grid-item'>
                                <label>Humidity</label>
                                <label>{item.main.humidity}%</label>
                            </div>
                            <div className='details_grid-item'>
                                <label>Clouds</label>
                                <label>{item.clouds.all}%</label>
                            </div>
                            <div className='details_grid-item'>
                                <label>Wind speed</label>
                                <label>{item.wind.speed}m/s</label>
                            </div>
                            <div className='details_grid-item'>
                                <label>Sea level</label>
                                <label>{item.main.sea_level}m</label>
                            </div>
                            <div className='details_grid-item'>
                                <label>Feels Like</label>
                                <label>{item.main.feels_like}°C</label>
                            </div>
                        </div>
                    </AccordionItemPanel>
                </AccordionItem>
                ))}
                
            </Accordion>
        </>
    )
}

export default Forecast;