
# inno-alumni-portal
Website providing services for Innopolis University Alumni

## Project Description
This website involves the ability to keep up with events happening in the univeristy, register for elective courses attendance and request a pass to enter university for different purposes.


## Demo

(Screenshots and Video)
https://youtu.be/PwiZH98iqJ8

Follow the link to watch the video


## How to Use
1. **_Customer Complaints_**: Customers can submit complaints directly through the telegram group mentioed on the website. 
2. **_Users Data Management_**: Admins are able to accept or deny requests from users with feedback (on reasons for example)
3. **_Pass Order_**: Alumni users can request a pass to enter the university for different purposes from the main page of the website
4. **_Elective Courses Participation Requests_**: Alumni users can request to attend elective courses held in the university at the time they are applying.

## Frameworks and Technology
- Python FastAPI
- Next.js
- Docker
- PostgreSQL

## How to Run:

- Instructions can be found in readme file in the frontend/backend folders


# Alumni Portal Backend

## How to run

### Using Python
1. Open a shell/command line in this folder (better if it was after activating a python virtual env)
2. Install the needed python packages
```bash
    pip install -r requirements.txt
```
3. Run the python script:
```bash
    python3 main.py
```

### Using docker
1. Here the image tag name is `alumni-backend` you can name it as you like
2. Also the port in docker is 8000 by default and locally you can map it to anything as you like

```bash
docker build -t alumni-backend
docker run -p 8000:8000 -d alumni-backend
```


# Inno-alumni-portal frontend

## How to run on local
1. Open a shell/command line in this folder
2. To `install` all packages (local to the repo) using `npm`
    ```bash
    npm install
    ```
3. To `build` the project for production
    ```bash
    npm run build
    ```
4. To `start` the project on development
    ```bash
    npm start
    ```
    