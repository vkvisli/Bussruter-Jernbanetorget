import ITimeTableEntry from "./ITimeTableEntry";

interface ITimeTable {
    stopPlace: {
        id: string;
        name: string;
        estimatedCalls: ITimeTableEntry[];
    }
}

export default ITimeTable;