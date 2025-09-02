#!/bin/bash

cd /home/pawan/trade_dashboard_frontend/trade_dashboard_nse_35_dev || exit 

screen -dmS nse_dashboard_frontend_35_dev bash -c "
npm run dev
"

