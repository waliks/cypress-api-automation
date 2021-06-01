FROM cypress/base:12.18.0

# Define the working directory
WORKDIR /usr/src/test
# Copy package.json and package-lock.json files to working directory
COPY package*.json ./

# Install dependencies
RUN npm install
# Copy source code
COPY . .

# Define the command to run
CMD ["npm", "run", "test"]

