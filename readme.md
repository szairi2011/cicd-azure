

***** Azure cicd-vm (Ubunto 20.04 LTS) ****

- Subscription name: Subscription 1

- Azure managed reource: cicd-vm

## SSH Login to this VM:
- ssh -i ./cicd-vm_ssh_key.pem azureuser@20.79.205.225


## Deployments:
1. Docker Deamon:
	Installed using this url -- https://linuxconfig.org/how-to-install-docker-on-ubuntu-20-04-lts-focal-fossa

2. Docker-compose:
	Installed using this url -- https://docs.docker.com/compose/install/

3. Jenkins using docker compose:
	Installed using this url -- https://digitalavenue.dev/Run-Jenkins-On-Docker-Compose/