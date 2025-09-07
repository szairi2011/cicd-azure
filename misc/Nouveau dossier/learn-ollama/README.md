### Tutorial:
This project started as a docker compose application, by following tuto under -- https://medium.com/@edu.ukulelekim/how-to-locally-deploy-ollama-and-open-webui-with-docker-compose-318f0582e01f
Due to corp. environmental access and blocking issues, Github Copilot helped us migrating he project to a k8s application.

### Installing the app
The application is already deployed to stream-gateway-aks cluster. It consists of two deployments, i.e. Ollama and open-webui.
We can either access ollama through pod exec command, curl command, or open-web-ui through port 3000 after a port forward:
$ kubectl port-forward service/open-webui 3000:3000

### Deploying a new moel to Ollama:
To deploy a new model the command that was succesful is like so:
$ curl -X POST http://localhost:11434/api/pull -d '{"name": "deepseek-r1:1.5b"}'
In this case deepseek-r1:1.5b is a the LLM being deployed locally to Ollama

or

$ kubectl exec ollama-cf7f4ccd4-cj42h -ti -- bin/bash
and then:
root@ollama-cf7f4ccd4-cj42h:/# ollama list or ollama ps ...

Remark: To access available ollama models browse to -- https://registry.ollama.ai and search for models

Remark: You can find the running models by browsing to http://localhost:11434/api/ps assuming that port-forward is done for ollama service, i.e. kubectl port-forward service/ollama 11434:11434

### Readings:
- Found this 2h:57m Youtube video that I find good and simple to follow to learn the: 1. conceptual aspects about Ollama -- https://www.youtube.com/watch?v=GWB9ApTPTv4
2. How to use local LLMs to build LLM applications / ai agents