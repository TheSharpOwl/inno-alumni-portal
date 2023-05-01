# inno-alumni-portal backend

## How to run

### Using Python
1. Open a shell/command line in this folder (better if it was after activating a python virtual env)
2. Then run the following commands
```bash
    pip install -r requirements.txt
    python manage.py runserver
```

<<<<<<< HEAD
### Using docker
1. Here the image tag name is `alumni-backend` you can name it as you like
2. Also the port in docker is 8000 by default and locally you can map it to anything as you like
```bash
docker build -t alumni-backend
docker run -p 8000:8000 -d alumni-backend


### api explaination
=======
## Requests
>>>>>>> 2dcfe6efb9c0a5aea1578d02d636d109cd689861
### Registration
```
POST http://localhost:8000/register
Body:
{
    "email": "",
    "password": "",
    "password2": ""
}
```

### Getting Token

* username should have value of email
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
Body:
{
  "date": "DD/MM/YY"
}
```

### Get Elective Courses (non-booked)
```
GET http://localhost:8000/courses
Include in HTTP headers Authorization with value: TOKEN <token> 
```

### Get Booked Elective Courses 
```
GET http://localhost:8000/courses/booked
Include in HTTP headers Authorization with value: TOKEN <token> 
```


### Verify Email
* the code would be received on Innopolis email
```
POST http://localhost:8000/confirm/email
Include in HTTP headers Authorization with value: TOKEN <token>
Body:
{
  "code": <int:code>
}
```

### Update Alumni Profile
* In body you can put any subset of attributes which you want to update
```
POST http://localhost:8000/update
Include in HTTP headers Authorization with value: TOKEN <token>
Body:
{
  "name": <str:value>,
  "name_russian" = <str:value>,
  "graduation_year" = <int:value>,
  "field_of_study" = <str:value>,
  "bio" = <str:value>,
  "city" = <str:value>,
  "company" = <str:value>,
  "position" = <str:value>
}
```

### Get Alumni Profile
```
GET http://localhost:8000/accounts/profile/
Include in HTTP headers Authorization with value: TOKEN <token>
```

### Request Elective Course
```
POST http://localhost:8000/request/course
Include in HTTP headers Authorization with value: TOKEN <token>
Body:
{
  "id": <int:course_id>
}
```