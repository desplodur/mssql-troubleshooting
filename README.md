# mssql-troubleshooting

This is an repository in order to troubleshoot the eol-control problem that associated data does not get fetched when using mssql dialect.

This error is not reproducable here so its necessary to compare and troubleshoot the eol-control code in order to find the issue.

## Setup

- Download and install Microsoft SQL Server Management Studio
- Create database
- update config/config.json and sequelize configuration
- run: "npx sequelize-cli db:migrate"
- run: "node sequelize.js"
