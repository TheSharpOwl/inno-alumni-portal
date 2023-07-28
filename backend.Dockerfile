FROM python:3.9

WORKDIR /usr/src/app

COPY requirements.txt ./

RUN python -m pip install --upgrade pip
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

WORKDIR /usr/src/app/app
RUN prisma generate

WORKDIR /usr/src/app
EXPOSE 9001

CMD [ "uvicorn", "app.main:app", "--reload", "--host", "127.0.0.1", "--port", "9001"]