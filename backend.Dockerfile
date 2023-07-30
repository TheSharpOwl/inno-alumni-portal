FROM python:3.9

RUN addgroup -S nonroot \
    && adduser -S nonroot -G nonroot

USER nonroot


WORKDIR /usr/src/app

COPY requirements.txt ./

RUN python -m pip install --upgrade pip
RUN pip install --no-cache-dir -r requirements.txt

COPY app .

WORKDIR /usr/src/app/app
RUN prisma generate

WORKDIR /usr/src/app

EXPOSE 8000
CMD [ "uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]