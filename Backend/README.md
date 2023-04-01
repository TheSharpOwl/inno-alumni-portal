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
```
