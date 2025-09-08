## Quick guide
- Argo CD agent is already deployed to the AKS cluster under argocd namespace.
To get started quickly foloow this link -- `https://argo-cd.readthedocs.io/en/stable/getting_started/`.

- To find the the password for the portal, perform nbelow steps: 
  * Make sure the cluster is up and running
  * Run below command -- 
    > kubectl -n argocd get secret argocd-initial-admin-secret -o jsonpath="{.data.password}" | base64 -d
    The last time I have run, the password was 6NKCTa1kZCY4dARw, and the admin username is admin
  * Open a port forward to the ArgoCD portal:
    > kubectl port-forward svc/argocd-server -n argocd 8082:80 -- Open 8082 port and forward to 80
