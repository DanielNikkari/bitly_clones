import http from 'k6/http';
import { sleep, group, check } from 'k6';

// !!!--- NOTE: You have to produce the short urls yourself in the browser
// since the test wont be able to extract them automaitcally ---!!!

// Python:
// const DOMAIN = "http://localhost:1234"
// const SHORTURL = "44vXDK"
// const CLONE = "PYTHON - FLASK"

// Deno Oak:
// const DOMAIN = "http://localhost:7777"
// const SHORTURL = "Gaof2a"
// const CLONE = "JAVASCRIPT - DENO OAK"

// Node Expresjs:
const DOMAIN = "http://localhost:8080"
const SHORTURL = "lJnr8P"
const CLONE = "JAVASCRIPT - NODE EXPRESS"

export default function () {
  group(`get home ${CLONE}`, () => {
    let response = http.get(`${DOMAIN}/`);
    check(response, {
        "status code should be 200": res => res.status === 200,
    });
  });

  group(`post form ${CLONE}`, () => {
    let response = http.get(`${DOMAIN}/`);
    check(response, {
        "status code should be 200": res => res.status === 200,
    });
    response = response.submitForm({
      formSelector: 'form',
      fields: { originalURL: 'https://k6.io/docs/examples/data-uploads/' },
    });
    check(response, {
      "status code should be 200": res => res.status === 200,
    });
    sleep(1)
  })

  group(`get redirect ${CLONE}`, () => {
    let response = http.get(`${DOMAIN}/${SHORTURL}`)
    check(response, {
      "status code should be 200": res => res.status === 200,
    });
    sleep(1)
  })

  group(`get random ${CLONE}`, () => {
    let response = http.get(`${DOMAIN}/random`)
    check(response, {
      "status code should be 200": res => res.status === 200,
    });
    sleep(1)
  })
}