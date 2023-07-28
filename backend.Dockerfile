FROM python:3.9-alpine

WORKDIR /usr/src/app

COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 9001

CMD [ "uvicorn", "app.main:app", "--reload", "--host", "0.0.0.0", "--port", "9001"]