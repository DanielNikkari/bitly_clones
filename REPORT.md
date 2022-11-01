# Project 1 report

## Run bit.ly clones

In order to run the clones you must have **Docker** installed on your computerand running. Then navigate to the directory with the file **docker-compose.yml** and run command `docker-compose up --build`, after the composing you can access the application in the browser:

- bitly_clone_javascript (Deno Oak): localhost:7777
- bitly_clone_javascript2 (Node Express): localhost:8080
- bitly_clone_python (Flask): localhost:1234

### IMPORTANT FOR RUNNING DENO

The **Dockerfile** for Deno Oak application uses `FROM lukechannings/deno` as it is optimised for Apple silicone computers. If you run the application on other machines than ones with Apple silicone comment out the `FROM lukechannings/deno` and uncomment the `FROM denoland/deno:alpine-1.26.2`


## k6 tests

### Run k6 test

In order to run the **k6** tests install k6 locally by following the tutorials online. Then navigate to the directory with the file **k6.js** and run command `k6 run -u 10 -d 15s k6.js` (-u 10 means 10 concurrent users and -d 15s that the duration is 15 seconds).

Test parameters:
- time: 15s
- concurrent users: 10

In the **k6.js** file there are 4 groups testing different parts of the application, you can run all these togheter or comment out the ones you don't want to run (e.g., if you want to run only one group comment out the others).

In addition, there are variables **DOMAIN, SHORTURL, and CLONE**, these are helper variables that change based on which bit.ly clone is being tested. Comment out the ones you are not testing so there won't be errors. To get the **SHORTURL** you have to go add one url manually in the browser as the test won't be able to get the short url automatically.

### k6 Test results

#### The main page

- Deno Oak: average = 11.7ms, p(90) = 12.95ms, p(95) = 14.18ms
- Node Express: average = 3.12ms, p(90) = 4.75ms, p(95) = 5.47ms
- Flask: average = 16.66ms, p(90) = 9.9ms, p(95) = 10.72ms

### Posting form to database

- Deno Oak: average = 240ms, p(90) = 330ms, p(95) = 340ms
- Node Express: average = 100ms, p(90) = 230ms, p(95) = 230ms
- Flask: average = 90ms, p(90) = 130ms, p(95) = 130ms

### Requesting redirection

- Deno Oak: average = 270ms, p(90) = 800ms, p(95) = 1110ms
- Node Express: average = 260ms, p(90) = 830ms, p(95) = 850ms
- Flask: average = 240ms, p(90) = 710ms, p(95) = 770ms

### Requesing random url

- Deno Oak: average = 120ms, p(90) = 230ms, p(95) = 230ms
- Node Express: average = 80ms, p(90) = 220ms, p(95) = 230ms
- Flask: average = 60ms, p(90) = 60ms, p(95) = 90ms

### Reflection on results

There were difference between all of the three implementations. The differences between JavaScript implementations (Deno Oak and Node Express) were less noticable and the differences between JavaScript implementations and Python implementations (Flask) were more noticable. In most cases the Python Flask application had better performance under stress, this might be for being more lightweight and powerful compared to Express and Oak. From the programming language point of view Python is more likely to be slower than JavaScript. Nevertheless, Flask managed to perform with high efficiency. In comparison between Express and Oak, Express managed to have better performance accross the board. However, reading [online](https://choubey.medium.com/performance-comparison-deno-vs-node-js-part-2-https-hello-name-be84f0afd053) comperhensive testing between Deno and Node.js implied that Deno was faster, however, with Express and Oak, Express was faster in this case.