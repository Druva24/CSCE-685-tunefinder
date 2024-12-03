echo "Deploying Backend..."
aws ecr get-login-password --region us-east-2 | docker login --username AWS --password-stdin 638316737030.dkr.ecr.us-east-2.amazonaws.com
docker build -t tunefinder-backend --platform linux/amd64 .  
docker tag tunefinder-backend:latest 638316737030.dkr.ecr.us-east-2.amazonaws.com/tunefinder-backend:latest
docker push 638316737030.dkr.ecr.us-east-2.amazonaws.com/tunefinder-backend:latest
cd aws_deploy
eb deploy
