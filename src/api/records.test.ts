// import axios from 'axios';
// import mockAx
import mockAxios from 'axios'
import RecordsApi from './records';



const users = 
    [
        {
            "name": "Test",
            "location": "test",
            "depth": 67,
            "duration": 3,
            "updated_at": "2024-09-15T08:56:36.580000Z",
            "created_at": "2024-09-15T08:55:31.221000Z",
            "id": "66e6a103e041644f38093386"
        },
        {
            "name": "Test",
            "location": "test",
            "depth": 6,
            "duration": 25,
            "updated_at": "2024-09-15T08:42:26.653000Z",
            "created_at": "2024-09-14T15:08:13.285000Z",
            "id": "66e5a6dde041644f3809337a"
        }
    ];
const resp = {
    data: users
};
// (mockAxios.get as jest.Mock).mockImplementation(() => Promise.resolve(resp));
jest.mock('axios', () => ({
    __esModule: true,
    default: {
        get: jest.fn().mockResolvedValue({
            data: [
                {
                    "name": "Test",
                    "location": "test",
                    "depth": 67,
                    "duration": 3,
                    "updated_at": "2024-09-15T08:56:36.580000Z",
                    "created_at": "2024-09-15T08:55:31.221000Z",
                    "id": "66e6a103e041644f38093386"
                },
                {
                    "name": "Test",
                    "location": "test",
                    "depth": 6,
                    "duration": 25,
                    "updated_at": "2024-09-15T08:42:26.653000Z",
                    "created_at": "2024-09-14T15:08:13.285000Z",
                    "id": "66e5a6dde041644f3809337a"
                }
            ]
        })
    }
}));


test('should fetch records', async () => {
    
    // (axios.get as jest.Mock).mockImplementation(() => Promise.resolve(resp));
    // (axios.get as jest.Mock).mockResolvedValue(resp);
    // axios.get.mockResolvedValue(resp);
    // const apiData = await RecordsApi.getRecords().th
    return RecordsApi.getRecords()
    // .then(res => expect(res).toEqual(users));
    // return assert(true)
})