import http from 'k6/http';
import { sleep } from 'k6';

// export default function () {
//   http.get('http://127.0.0.1:1234/');
//   sleep(1);
// }

export default function () {
  http.get('http://localhost:7777/');
  sleep(1);
}