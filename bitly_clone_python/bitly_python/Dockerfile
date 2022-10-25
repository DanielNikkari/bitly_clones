FROM python:latest

EXPOSE 1234

WORKDIR /app-python

COPY requirements.txt requirements.txt
RUN pip3 install -r requirements.txt

COPY . .

CMD [ "python3", "-m", "flask", "run", "--host=0.0.0.0", "--port=1234" ]