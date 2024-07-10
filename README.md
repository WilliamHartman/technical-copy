# Logixboard Fullstack Engineering Technical Assessment

---

Thanks for applying to Logixboard! The next step in our process is a technical interview where you'll meet with some of our engineers and pair with them on this code. Our goals with this step in the process are the following:

1. To assess your ability to problem solve and develop a well-engineered solution to a user need.
2. To give you an opportunity to show creativity in how you solve a user need.
3. To give us a tool we can use for collaboration in our synchronous interviews.

Note that we will expect you to share your screen during this interview and be the primary driver so please plan accordingly.

## Product Background

---

Logixboard is a customer engagement tool for freight forwarders to provide their customers with visibility into their supply chains. You've probably gotten an intro at this point on what a Freight Forwarder is, but in case you haven't: Freight Forwarders are the project managers of the logistics world. They don't own any planes, trains, or boats. They are just really good at coordinating with all the actors to make sure their customers' freight gets from point A to B.

Logixboard's offering has grown into being the primary communication hub between freight forwarders and their customers. At the core of our product we process large amounts of data. The goal of this assignment draws inspiration from work we've done.

## Assignment

---

Prior to the interview, we ask that you review the code in the TBD PR and leave any feedback, or comments, as if you were reviewing it for a teammate prior to merging.

During our time together, we will provide you with several prompts on which to extend the code in the PR.

## Setup

---

This app was built using the React (v18), Node.js (v16) and Typescript languages, along with a PostgreSQL database wrapped in a Docker container. If you don't already have Docker installed on your computer, you can follow the commands in their documentation based on your operating system: https://docs.docker.com/engine/install/ and, using Homebrew, run `brew install docker-compose`.

If you don't have experience with any of those languages - don't worry! Our team will be there to help you with any nuances, though we do recommend getting a base level of familiarity prior to the interview as this is the stack we use at Logixboard and we expect any incoming teammates to be capable of working in them, or learning how to work in them. We have tried to build the
scaffolding for this project in a way that should be easy for any developer to pick up, though if you have any questions please ask!

### Backend

To install dependencies:

```
npm install
```

To start the postgres instance:

```
docker-compose up -d
```

To start the development server:

```
npm start
```

To setup the database:

```
npm run db:setup
```

This will create a `lxb_technical_assessment` database with tables for Shipments, Orders, Order Line Items, and Products, along with seeding those tables with initial data. The table structure can be found in the `backend/database/seedDatabase.ts` file.

Note that in order to get the PostgreSQL database setup, you'll need to create a `.env` file that matches `.env.example`.

To reset the database:

```
npm run db:reset
```

This will drop and re-seed the `lxb_technical_assessment` database allowing you to start from scratch. Note that the command is written under the assumption that you are working from the `backend` folder.

To populate the shipment table:

```
npm run send-events
```

### Frontend

To install dependencies:

```
npm install
```

To start the development server:

```
npm start
```

Once started, the development server should show any typescript errors and should auto-reload on any code change. The app is by default exposed on http://localhost:3000 which you can visit in the browser of your choice.


