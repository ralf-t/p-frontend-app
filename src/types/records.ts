export type NamesResponse = Array<string> | []

export type Record = {
    id: string,
    name: string,
    location: string,
    depth: number,
    duration: number,
    created_at: string
};

export type RecordWrite = {
    name: string,
    location: string,
    depth: number,
    duration: number,
};

export type Records = Array<Record> | [];

export type RecordResponse = Record;

export type RecordsResponse = Array<Record> | [];