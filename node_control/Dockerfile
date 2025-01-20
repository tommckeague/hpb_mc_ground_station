FROM python:3.10.4-slim

WORKDIR /app

COPY . .

RUN pip install -r requirements.txt

RUN apt-get update && apt-get install -y iputils-ping && apt-get clean

CMD ["python", "main.py"]