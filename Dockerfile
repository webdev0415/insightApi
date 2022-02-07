FROM node:12.9.1-buster-slim

WORKDIR /tmp
RUN apt-get update && apt-get -y upgrade && apt-get -y dist-upgrade && apt-get install -y alien libaio1
RUN wget https://yum.oracle.com/repo/OracleLinux/OL7/oracle/instantclient/x86_64/getPackage/oracle-instantclient19.3-basiclite-19.3.0.0.0-1.x86_64.rpm
RUN alien -i --scripts oracle-instantclient*.rpm
RUN rm -f oracle-instantclient19.3*.rpm && apt-get -y autoremove && apt-get -y clean

# IF not in DockerCache Install Dependencies and Cache node_modules
ADD package.json /tmp/package.json
RUN cd /tmp && npm install
# Create app directory and copy node_modules
RUN mkdir -p /usr/src/oraexp && cp -a /tmp/node_modules /usr/src/oraexp/
# Bundle app source
WORKDIR /usr/src/oraexp
COPY . /usr/src/oraexp
RUN cd /usr/src/oraexp
EXPOSE 3000
CMD [ "npm", "start" ]
