The ChitChat.AI Chat Platform is a web server designed to enable researchers to run experiments within our ChitChat.AI framework. The platform facilitates the creation of multiple chat rooms for each experiment, allowing numerous users to communicate simultaneously while storing all interactions for future analysis. It empowers researchers to conduct experiments, analyze results, and gain valuable insights.

Key features include:

Management of Multiple Chat Rooms
Real-time Data Collection and Analysis

This project is particularly suited for researchers in discourse analysis and opinion change, especially those examining the influence of conversational AI agents on discourse.


# Installation

### Prerequisites
Before you begin, ensure you have met the following requirements:
- npm


### Steps
To install and run, follow these steps:

1. **Clone the Repository**  
   git clone https://github.com/ChitcChat-AI/Chat-Platform.git

2. **Navigate to the Project Directory**
    cd Chat-Platform

3. **Install Dependencies**
     npm install

4. **Set Up Environment Variables**
    create a .env file in the root directory and add the necessary variables

6. **Run the Application**
    npm start

7. **Access the Application**
     Open your web browser and go to http://localhost:3000/<exp-id> to access the application. 
     for entering a chat room:
      - Include the experiment ID in the URL path. You can create an experiment in the research platform and copy the link to get the correct ID.
      - Before attempting to join the chat room, verify that the experiment status is set to "running." You can check the experiment status on the research platform to confirm it's active.
