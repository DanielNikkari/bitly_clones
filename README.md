# bit.ly clones

**THE CONTENT OF THIS README IS THE SAME AS IN THE REPORT**

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

- Deno Oak:
    - average = 11.46ms
    - p(95) = 13.69ms
    - p(99) = 21.09ms
- Node Express:
    - average = 3.12ms
    - p(90) = 4.75ms
    - p(99) = 5.47ms
- Flask:
    - average = 17.63ms
    - p(95) = 16.31ms
    - p(99) = 22.81ms

### Posting form to database

- Deno Oak:
    - average = 170ms
    - p(95) = 330ms
    - p(99) = 350ms
- Node Express:
    - average = 60ms
    - p(95) = 240ms
    - p(99) = 250ms
- Flask:
    - average = 80ms
    - p(95) = 140ms
    - p(99) = 150ms

### Requesting redirection

- Deno Oak:
    - average = 1020ms
    - p(95) = 2290ms
    - p(99) = 2490ms
- Node Express:
    - average = 950ms
    - p(95) = 2170ms
    - p(99) = 2540ms
- Flask:
    - average = 760ms
    - p(95) = 1810ms
    - p(99) = 2160ms

### Requesing random url

- Deno Oak:
    - average = 140ms
    - p(95) = 430ms
    - p(99) = 890ms
- Node Express:
    - average = 240ms
    - p(95) = 1050ms
    - p(99) = 1090ms
- Flask:
    - average = 240ms
    - p(95) = 560ms
    - p(99) = 1450ms

### Reflection on results

There were difference between all of the three implementations. The differences between implementations (Deno Oak, Node Express, and Flask) were less noticable in, e.g., getting random url and more noticable, for example, in redirection. In most cases the Python Flask application had similiar performance under stress compared to JavaScript, however, in some cases Flask had better performance, for example, in redirecting. This could be for Flask being more lightweight compared to Express and Oak. From the programming language point of view Python is more likely to be slower than JavaScript. Nevertheless, Flask managed to perform with compareble efficiency. In comparison between Express and Oak, both were in fairly equal one being better than other variably. However, reading [online](https://choubey.medium.com/performance-comparison-deno-vs-node-js-part-2-https-hello-name-be84f0afd053) comperhensive testing between Deno and Node.js implied that Deno was faster, however, with the load tests conducted on Express and Oak, there was not enough indication to this.

In case if the application is deployed, the performance could be possibly imporved through a content delivery network (CDN) by distributing the load. Moreover, file caching could be implemented, as the application has very little information to cache it would not make a significant difference. Next, the amount of HTTP request could be reduced, for example, when creating the short URL instead of making redirection to a new page everything could happen on the same page dynamically reducing the need for the HTTP redirection. Lastly, the applications may have room for some general optimization in the code.
