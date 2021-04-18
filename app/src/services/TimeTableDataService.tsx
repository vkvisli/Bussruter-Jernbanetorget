import ITimeTable from "../interfaces/ITimeTable";

class TimeTableDataService {
    private apiUrl: string = "https://api.entur.io/journey-planner/v2/graphql";

    public getTimeTableData(): Promise<ITimeTable> {
        return new Promise<ITimeTable>((resolve, reject) => {
            
            fetch(this.apiUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "ET-Client-Name": "test"
                },
                body: JSON.stringify({
                    query: `{
                        stopPlace(id: "NSR:StopPlace:4000") {
                            id
                            name
                            estimatedCalls(startTime:"${new Date().toISOString()}" timeRange: 72100, numberOfDepartures: 10) {
                                realtime
                                aimedArrivalTime
                                expectedArrivalTime
                                date
                                destinationDisplay {
                                    frontText
                                }
                            }
                        }
                    }`
                })
            })
            .then(res => res.json())
            .then(res => { resolve(res.data) });

        });
    }
}

export default TimeTableDataService;