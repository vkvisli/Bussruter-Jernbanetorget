import ITimeTable from "../interfaces/ITimeTable";
import DeferredRequest from "../models/DeferredRequest";

/**
 * Service for retrieval of timetable data.
 * Implements a queue functionality: only one request can be active at a time
 * and only the last enqueued request is sent when a previous request is returned, the rest is discarded.
 */
class TimeTableDataService {

    private readonly apiUrl: string = "https://api.entur.io/journey-planner/v2/graphql";

    private requestQueue: DeferredRequest<ITimeTable>[] = [];
    private isServingQueue: boolean = false;

    /**
     * Retrieves timetable data for Jernbanetorget bus stop from ENTUR's open API.
     * @returns timetable data
     */
    public getTimeTableData(success: (value: ITimeTable) => void, error: (e: any) => void) {
        let request = new DeferredRequest<ITimeTable>(this.fetchTimeTableData, success, error);
        this.requestQueue.push(request);
        if (!this.isServingQueue)
            this.serveQueue();
    }

    /**
     * Checks whether there are any requests in the queue, and if so,
     * execute the last request in the queue and discard the rest.
     * Once the request is finished, this method is called againg to check if more requests has been queued.
     */
    private serveQueue() {
        if (this.requestQueue.length <= 0)
            return;

        this.isServingQueue = true;
        let lastRequest = this.requestQueue.pop();
        this.requestQueue = [];
        lastRequest.execute(() => {
            this.isServingQueue = false;
            this.serveQueue();
        });
    }

    private fetchTimeTableData = (): Promise<ITimeTable> => {
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
            .then(res => { resolve(res.data) })
            .catch((e) => {
                console.error("Could not retrieve timetable data", e);
                reject(e);
            });
        });
    }
}

export default TimeTableDataService;