interface ITimeTableEntry {
    date: string;
    aimedArrivalTime: string;
    expectedArrivalTime: string;
    realtime: boolean;
    destinationDisplay: {
        frontText: string;
    }
}

export default ITimeTableEntry;