FROM oraclelinux:7-slim
# Create app directory
WORKDIR /usr/src/app
# Copy the .js files from your host machine into the new app directory
ADD app/ ./
# Update Oracle Linux
# Install NodeJS
# Install the Oracle Instant Client
# Check that NodeJS and NPM installed correctly
# Install the OracleDB driver
RUN yum update -y && \
  yum install -y oracle-release-el7 && \
  yum install -y oracle-nodejs-release-el7 && \
  yum install -y nodejs && \
  yum install -y oracle-instantclient19.3-basic.x86_64 && \
  yum clean all && \
  node --version && \
  npm --version && \
  npm install oracledb && \
  npm install express && \
  echo Installed
CMD ["node", "server.js"]