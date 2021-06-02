FROM node:14
# Create app directory
WORKDIR /app
# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
# Only copy the package.json file to work directory
COPY package.json .
# Install all Packages
RUN npm install
# Copy all other source code to work directory
ADD . /app
# TypeScript
RUN npm run build

EXPOSE 80

WORKDIR /app

ENV MONGO_URI="mongodb+srv://korenAtDEVS:123456Tamutu@cluster0.koozw.mongodb.net/TicketManager?retryWrites=true&w=majority"

CMD ["npm","start"]