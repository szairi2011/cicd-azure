

***** Azure cicd-vm (Ubunto 20.04 LTS) ****

- Subscription name: Subscription 1

- Azure managed reource: cicd-vm

## Public DNS name:
A domain name is allocated for the cicd-vm: cicd-vm.germanywestcentral.cloudapp.azure.com
NB: this could be useful if we can not access VM resources through IP.

## SSH Login to this VM:
- ssh -i ./cicd-vm_ssh_key.pem azureuser@20.79.218.100

## Managed Git repositories from VS Code
- Followed below link -- https://code.visualstudio.com/docs/editor/github


## Deployments:
1. Docker Deamon:
	Installed using this url -- https://linuxconfig.org/how-to-install-docker-on-ubuntu-20-04-lts-focal-fossa

2. Docker-compose:
	Installed using this url -- https://docs.docker.com/compose/install/

3. Jenkins using docker compose:
	- Installed using this url -- https://digitalavenue.dev/Run-Jenkins-On-Docker-Compose/
	- UI admin creds admin/admin
	
4. SSH Jenkins Authentication to GitHub projects
	To be able to checkout private projects from Github, an ssh credential needs to be set up for Jenkins (i.e. rsa private key) and Github (i.e. rsa public key). The following url is used to highlight the steps -- https://medium.com/appgambit/ssh-authentication-between-github-and-jenkins-d873dd138db0 

4. Install nodejs and npm:
	- To run outside Jenkins -- Installed nodejs and npm using url -- https://linuxize.com/post/how-to-install-node-js-on-ubuntu-20-04/
	- To execute npm / node scripts from Jenkins need to install the nodejs plugin from Jenkins plugin manager