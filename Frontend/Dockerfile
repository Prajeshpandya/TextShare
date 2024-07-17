# Use the official Node.js image from the Docker Hub
FROM node:20

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the application
RUN npm run build

# Expose the port that Vite uses (default is 5173)
EXPOSE 5173

# Command to run the application
CMD ["npm", "run", "dev"]
