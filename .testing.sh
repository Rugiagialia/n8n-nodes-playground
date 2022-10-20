cd /home/ubuntu/n8n-nodes-playground/
npm run build
sudo npm link
cd /usr/lib/node_modules/n8n
sudo npm link n8n-nodes-playground
n8n start
