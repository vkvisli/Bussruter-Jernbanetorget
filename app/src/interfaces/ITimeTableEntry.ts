interface ITimeTableEntry {
    date: Date;
    aimedArrivalTime: Date;
    expectedArrivalTime: Date;
    realtime: boolean;
    destinationDisplay: {
        frontText: string;
    }
}

export default ITimeTableEntry;