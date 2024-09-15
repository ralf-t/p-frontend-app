import moment from 'moment';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

export interface WeatherDataType {
    name: string;
    main: {
      temp: number;
    };
    sys: {
      sunrise: number;  // This is a UNIX timestamp
      sunset: number;   // This is a UNIX timestamp
    };
    weather: {
      description: string;
    }[];
  }

export default function WeatherWidget({weatherData}: { weatherData: WeatherDataType }) {
   
    //   todo ask to enable doc
    return (
        <Card>
            <CardHeader>
                <CardTitle className='mt-10 scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight transition-colors first:mt-0'>Weather today</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div>
                    <h1 className='mt-10 scroll-m-20 pb-2 text-lg font-semibold tracking-tight transition-colors first:mt-0'>
                        Location
                    </h1>
                    <p>{weatherData.name}</p>
                </div>
                <div>
                    <h1 className='mt-10 scroll-m-20 pb-2 text-lg font-semibold tracking-tight transition-colors first:mt-0'>
                        Temperature
                    </h1>
                    <p>{weatherData.main.temp}</p>
                </div>
                <div>
                    <h1 className='mt-10 scroll-m-20 pb-2 text-lg font-semibold tracking-tight transition-colors first:mt-0'>
                        Sunrise
                    </h1>
                    <p>{new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString('en-PH')}</p>
                </div>
                <div>
                    <h1 className='mt-10 scroll-m-20 pb-2 text-lg font-semibold tracking-tight transition-colors first:mt-0'>
                        Sunset
                    </h1>
                    <p>{new Date(weatherData.sys.sunset * 1000).toLocaleTimeString('en-PH')}</p>
                </div>
                <div>
                    <h1 className='mt-10 scroll-m-20 pb-2 text-lg font-semibold tracking-tight transition-colors first:mt-0'>
                        Description
                    </h1>
                    <p>{weatherData.weather[0].description}</p>
                </div>
                <div>
                    <h1 className='mt-10 scroll-m-20 pb-2 text-lg font-semibold tracking-tight transition-colors first:mt-0'>
                        Day
                    </h1>
                    <p>{moment().format('dddd')}</p>
                </div>
                <div>
                    <h1 className='mt-10 scroll-m-20 pb-2 text-lg font-semibold tracking-tight transition-colors first:mt-0'>
                        Date
                    </h1>
                    <p>{moment().format('LL')}</p>
                </div>
                
                
                
                
                
                
            </CardContent>
        </Card>
    )
}