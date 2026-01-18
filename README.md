# Quick Start 
Follow these steps to set up the project locally on your machine.

## Prerequisites

### Make sure you have the following installed on your machine:

1. Git
2. Node.js
3. npm (Node Package Manager)

## Cloning the Repository

`git clone https://github.com/adrianhajdin/coinpulse.git`
`cd coinpulse`

## Installation

Install the project dependencies using npm:

`npm install`

## Set Up Environment Variables

`Create a new file named .env in the root of your project and add the following content:`

`COINGECKO_BASE_URL=https://pro-api.coingecko.com/api/v3`
`COINGECKO_API_KEY=`

`NEXT_PUBLIC_COINGECKO_WEBSOCKET_URL=`
`NEXT_PUBLIC_COINGECKO_API_KEY=`

Replace the placeholder values with your real credentials. You can get these by signing up at: CoinGecko API.

## Running the Project

`npm run dev`
Open http://localhost:3000 in your browser to view the project.

I have used demo api key for this project
I have hosted the project on Vercel - [Live](https://crypto-screener-zeta.vercel.app/)