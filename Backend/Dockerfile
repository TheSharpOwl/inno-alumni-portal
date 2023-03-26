FROM python:3
# ensures that python output is sent straight to the terminal without being buffered. It helps in debugging
ENV PYTHONUNBUFFERED 1
WORKDIR /app/api
COPY requirements.txt ./
RUN pip install -r requirements.txt
COPY . ./
EXPOSE 8000
# TODO maybe remove this when using docker compose
CMD ["python3", "manage.py", "runserver", "8000"]
