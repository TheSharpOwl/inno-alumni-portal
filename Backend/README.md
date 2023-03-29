# inno-alumni-portal backend

## How to run
1. Open a shell/command line in this folder (better if it was after activating a python virtual env)
2. Then run the following commands
```bash
    pip install -r requirements.txt
    python manage.py runserver <port>
```
## Requests
### Registration
POST http://localhost:8000/register
Body:
{
    "username": "",
    "diploma_id": null,
    "password": "",
    "password2": ""
}
### Getting Token
POST http://localhost:8000/api-token-auth
Body:
{
    "username": "",
    "password": ""
}
### Ordering Pass
POST http://localhost:8000/pass/
Include in HTTP headers Authorization with value: TOKEN <token>
### Get Elective Courses
GET http://localhost:8000/courses
Include in HTTP headers Authorization with value: TOKEN <token>
