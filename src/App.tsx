import { FreediverSearch } from "./components/freediver-search"
import { columns } from "@/components/records-data-table/columns";
import { DataTable } from "@/components/records-data-table/data-table";
import { useEffect, useState } from "react";
import RecordAddCard from "./components/record-add-card";
import { Record, Records } from "./types";
import { useToast } from "@/hooks/use-toast"
import RecordsApi from '@/api/records';
import WeatherWidget, { WeatherDataType } from "./components/weather-widget";
import { VITE_API_KEY, VITE_API_URL, VITE_ICON_URL } from "@/constants";
import { SpecialSortButton } from "./components/special-sort-button";
function App() {
  const { toast } = useToast();
  const [ names, setNames ] = useState<string[] | []>([]);
  
  // Get all freediver names
  useEffect(() => {
    RecordsApi.getNames()
    .then(response => {
        setNames(response)
    })
    .catch(() => {
        toast({
            variant: "destructive",
            title: "An error has occurred while fetching names."
        }) 
    });
  }, [])

  const [records, setRecords] = useState<Records>([]);

  const addNewRecord = (data: Record) => {
    const newNames = Array.from(new Set([...names, data.name]));
    newNames.sort()
    setNames(newNames);
    setRecords([data, ...records])
  }

  const removeRecord = (id: string) => {
    setRecords(records.filter(record => record.id !== id));
  }

  const updateRecordsData = (idUpdated: string, newRecord: Record) => {
    setRecords(records.map(currentRecord => currentRecord.id === idUpdated ? newRecord : currentRecord ));
  }


  ////===============weather widget
  
  const [weatherData, setWeatherData] = useState<undefined| WeatherDataType>();
  useEffect(() => {
    const fetchData = async () => {
      navigator.geolocation.getCurrentPosition(function(position) {
        const lat = position.coords.latitude;
        const long = position.coords.longitude;
        
        fetch(`${VITE_API_URL}/weather/?lat=${lat}&lon=${long}&units=metric&APPID=${VITE_API_KEY}`)
          .then(res => res.json())
          .then(result => {
            setWeatherData(result)
            console.log(result);
          });  
      });
    }
    fetchData();
  }, [])

  
  return (
    <div className="flex flex-col justify-center w-full items-center p-24 space-y-3">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-center">FreediveVault</h1>

      
      <div className="flex space-x-3">
        <div className="flex flex-col space-y-3">
          <FreediverSearch names={names} setRecords={setRecords} />
          <SpecialSortButton setRecords={setRecords} />
          <RecordAddCard addNewRecord={addNewRecord} />
        </div>
        <DataTable columns={columns(updateRecordsData, removeRecord)} data={records} />
        <div>
          {(weatherData && 'main' in weatherData && typeof weatherData.main != 'undefined') ? (
            <WeatherWidget weatherData={weatherData}/>
          ): (
            <div></div>
          )}
        </div>
      </div>
      
    </div>
  )
}

export default App
