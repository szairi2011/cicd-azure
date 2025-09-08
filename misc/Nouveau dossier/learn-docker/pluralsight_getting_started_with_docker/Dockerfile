# set base image (host OS)
FROM python:3.8
# set the working directory in the container
WORKDIR /code
COPY . .
RUN pip install flask
# command to run on container start
CMD [ "python", "./app.py" ]