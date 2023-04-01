# inno-alumni-portal backend

## How to run

### Using Python
1. Open a shell/command line in this folder (better if it was after activating a python virtual env)
2. Then run the following commands
```bash
    pip install -r requirements.txt
    python manage.py runserver
```

### Using docker
1. Here the image tag name is `alumni-backend` you can name it as you like
2. Also the port in docker is 8000 by default and locally you can map it to anything as you like
```bash
docker build -t alumni-backend
docker run -p 8000:8000 -d alumni-backend


### api explaination
### Registration
```
POST http://localhost:8000/register
Body:
{
    "username": "",
    "diploma_id": null,
    "password": "",
    "password2": ""
}
```
### Getting Token
```
POST http://localhost:8000/api-token-auth
Body:
{
    "username": "",
    "password": ""
}
```
### Ordering Pass
```
POST http://localhost:8000/pass/
Include in HTTP headers Authorization with value: TOKEN <token> 
```
### Get Elective Courses
```
GET http://localhost:8000/courses
Include in HTTP headers Authorization with value: TOKEN <token> 
```
