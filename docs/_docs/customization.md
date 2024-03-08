---
title: Developer Guide
permalink: /docs/customization/
---

### Content

1. [Introduction to Development](#intro)
2. [How to Run](#setup)
3. [Frontend](#frontend)
4. [Backend](#backend)
5. [API Documentation](#api-docs)
6. [Deployment](#ci-cd)
7. [Contribution](#contribute)
8. [Troubleshooting and Support](#errors)

### Introduction to Development <a name="intro"></a>

This section provides an overview of the development process for the Alumni Portal project. It covers 
the project's architecture, technologies used, and setup instructions for both frontend and backend 
development.

#### Project Architecture <a name="architecture"></a>

Alumni Portal has client-server architecture. Frontend and Backend part are in responsibility of developer, they
run on server. 

Moreover, the portal has telegram bot too. It works has the same client-server structure.
Client side is on Telegram user, while database interaction and message processing on backend side.

Both agents web and telegram bot run simultaneously (run together).

#### Technologies <a name="technologies"></a>

Key technologies include:
- Python FastAPI for the backend,
- Next.js for the frontend, 
- Docker for containerization,
- Prisma's library as ORM tool,
- PostgreSQL for the database,
- and telebot for Telegram bot.

### How to Run <a name="setup"></a>

This section details the steps required to set up the development environment for the Alumni Portal project.

1. Clone [repository](https://github.com/TheSharpOwl/inno-alumni-portal.git),
2. Create virtual env and prepare interpreter:
   - in root folder run `python -m venv .`,
   - activate environment `./venv/Scripts/Activate.ps1` (for Windows),
   - then install requirements `pip install -r requirements.txt`.
3. Set up environment variables:
   - create `.env` document in the root folder,
   - specify next parameters:
   ```azure
   DATABASE_HOST=<127.0.0.1>
   DATABASE_PORT=<5432>
   DATABASE_PASSWORD=<password>
   DATABASE_NAME=<inno_schedule>
   DATABASE_USERNAME=<postgres>
   SECRET_KEY=<3ebe2c9ec8f9a17da918>
   ALGORITHM=<HS256>
   ACCESS_TOKEN_EXPIRE_MINUTES=<30>
   MAIL_USERNAME=<your mail (e.g. gmail)>
   MAIL_PASSWORD=<password from mail>
   MAIL_FROM=<your mail>
   MAIL_PORT=<mail tls (e.g. 587 for gmail)>
   MAIL_SERVER=<smtp.gmail.com for gmail>
   MAIL_FROM_NAME=<your mail name>
   ```
   - update telegram token, in `\app\telegram\data.py`, also you may
   change `SUPERADMIN_LIST` and related fields to your telegram id,
   - in `\app\prisma\schema.prisma` change url of `datasource db` to yours (e.g.
   `postgres://postgres:postgres@127.0.0.1:5432/inno_schedule`).
4. Prepare database:
   - run `prisma generate`,
   - then `prisma db push` (new tables should be generated after this).
5. Run the backend with activated virtual env (from root folder) `uvicorn app.main:app --reload`.
6. Run the frontend:
   - prepare libraries `npm install`,
   - start project in dev `npm start`,
   - to build project for production `npm run build`.

### Frontend <a name="frontend"></a>

The frontend section focuses on the development aspects related to the user interface and 
client-side logic of the Alumni Portal. It strongly recommended to follow the structure defined in
the source: <img src="../../assets/img/23.png" alt="" width="300" height="400" style="border: 1px solid black;">

### Backend <a name="backend"></a>

The backend section covers the server-side development aspects of the Alumni Portal project. It
has very basic structure for FastAPI projects, where `api` folder contains all necessary routers:
the source: <img src="../../assets/img/24.png" alt="" width="300" height="400" style="border: 1px solid black;">

### API Documentation <a name="api-docs"></a>

The API Documentation with all request parameters, response formats, and authentication requirements is available
via `/docs` path, developer may see the documentation by running fast api app and accessing
it via `http://127.0.0.1:8000/docs` address. There are endpoints defined in API:

for User:

<img src="../../assets/img/a1.png" alt="" width="600" height="800" style="border: 1px solid black;">

for Pass:

<img src="../../assets/img/a2.png" alt="" width="600" height="400" style="border: 1px solid black;">

for Course:

<img src="../../assets/img/a3.png" alt="" width="600" height="800" style="border: 1px solid black;">

for Donation:

<img src="../../assets/img/a4.png" alt="" width="600" height="400" style="border: 1px solid black;">

### Deployment <a name="ci-cd"></a>

The deployment is presented by two workflows: one for fast_api app and another for nextjs app:
fast api app:
```azure
on:
    workflow_call:
    workflow_dispatch:
    push:
       branches: [main]
    pull_request:
        branches: [main]

jobs:
  simple_build:
    runs-on: ubuntu-latest
    steps:
      # Checks-out your repository under $GITHUB_WORKSPACE, so your job can access it
      - name: Checkout code
        uses: actions/checkout@v2
      - name: Setup Python ${{ matrix.python-version }}
        uses: actions/setup-python@v2
        with:
           python-version: 3.8
      - name: Install requirements
        run: |
            pip install -r Backend/requirements.txt
      - name: Run tests
        run: |
            cd Backend
            python manage.py test

```
nextjs app:
```azure
# on: same as for fast api app

jobs:
  build:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        node-version: [16.x]
    steps:
    - uses: actions/checkout@v2
    - name: Use Node.js ${{ matrix.node-version }}
      uses: actions/setup-node@v3
      with:
        node-version: ${{ matrix.node-version }}
    - name: Build Frontend
      run: |
          cd Frontend
          npm install
          npm run build
```

### Contribution <a name="contribute"></a>

Here is the guidelines how to contribute to project:
1. Fork the repository to create your own copy of the project on your GitHub account.
2. Clone the forked repository to your local machine using Git.
3. Make the desired changes or enhancements to the project codebase.
4. Commit your changes to your local repository, providing clear and concise commit messages.
5. Push your changes to your forked repository on GitHub.
6. Submit a pull request from your forked repository to the original repository, detailing the changes made and the 
purpose of the contribution.
7. Collaborate with project maintainers and contributors to review and refine the proposed changes. Iterate on the 
changes as needed until they are accepted and merged into the main project.

### Troubleshooting and Support <a name="errors"></a>

Here is the guidelines for reporting and resolving issues encountered while using the Alumni Portal:

#### Reporting Issues:
1. Open an Issue:
   - Navigate to the repository's issue tracker on GitHub.
   - Click on the "New Issue" button to create a new issue.
   
2. Provide Description:
   - Clearly describe the issue encountered, including steps to reproduce and any relevant error messages or screenshots.

3. Label the Issue:
   - Assign appropriate labels to categorize the issue (e.g., bug, enhancement, question).

4. Submit Issue:
   - Submit the issue to the repository for review by project maintainers and contributors.

#### Troubleshooting Steps:
1. Imitate the Issue:
   - Attempt to reproduce the reported issue on your local development environment.

2. Debugging:
   - Use debugging tools and techniques to identify the root cause of the issue.

3. Research Solutions:
   - Search for existing solutions or similar issues reported by other users.

4. Provide Assistance:
   - Offer assistance and guidance to the user reporting the issue, providing suggestions or workarounds if possible.
