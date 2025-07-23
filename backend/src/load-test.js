import http from 'k6/http';
import { sleep, check } from 'k6';

export const options = {
    stages: [
        { duration: '30s', target: 100 }, // tăng lên 100 user trong 30s
        { duration: '1m', target: 100 },  // giữ 100 user trong 1 phút
        { duration: '30s', target: 0 },   // giảm về 0
    ],
};

export default function () {
    const res = http.get('https://mern-fashion-website.vercel.app'); // thay URL theo backend
    check(res, {
        'status là 200': (r) => r.status === 200,
        'thời gian phản hồi < 500ms': (r) => r.timings.duration < 500,
    });
    sleep(1); // chờ 1s giữa mỗi request
}
