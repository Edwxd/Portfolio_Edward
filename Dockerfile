FROM ubuntu:latest
LABEL authors="edwar"

ENTRYPOINT ["top", "-b"]