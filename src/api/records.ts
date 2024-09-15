import { NamesResponse, RecordsResponse, RecordWrite } from "@/types";
import { recordsApiClient } from "./client";



async function createRecord(data: RecordWrite) {
    const response = await recordsApiClient.post<RecordsResponse>('/', data);
    return response.data;
}

async function getNames() {
    const response = await recordsApiClient.get<NamesResponse>('/names');
    return response.data;
}

async function getRecords() {
    const response = await recordsApiClient.get<RecordsResponse>('/');
    return response.data;
}

async function getDeepestDivesByLocation() {
    const response = await recordsApiClient.get<RecordsResponse>('/deepest/location');
    return response.data;
}

async function getLongestDivesByLocation() {
    const response = await recordsApiClient.get<RecordsResponse>('/longest/location');
    return response.data;
}

async function getRecordsByName(name: string) {
    const response = await recordsApiClient.get<RecordsResponse>(`/${name}`);
    return response.data;
}

async function update(id: string, data: RecordWrite) {
    const response = await recordsApiClient.patch<RecordsResponse>(`/${id}`, data);
    return response.data;
}

async function deleteRecordById(id: string) {
    const response = await recordsApiClient.delete<JSON>(`/${id}`);
    return response.data;
}

export default { 
    getNames, 
    getRecords, 
    getRecordsByName, 
    createRecord, 
    deleteRecordById, 
    update, 
    getDeepestDivesByLocation,
    getLongestDivesByLocation
}