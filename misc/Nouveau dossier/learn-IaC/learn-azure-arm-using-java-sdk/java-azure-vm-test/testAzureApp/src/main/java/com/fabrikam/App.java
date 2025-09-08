package com.fabrikam;

import com.azure.core.credential.TokenCredential;
import com.azure.core.http.policy.HttpLogDetailLevel;
import com.azure.core.management.AzureEnvironment;
import com.azure.core.management.profile.AzureProfile;
import com.azure.identity.AzureAuthorityHosts;
import com.azure.identity.EnvironmentCredentialBuilder;
import com.azure.resourcemanager.AzureResourceManager;
import com.azure.resourcemanager.compute.models.VirtualMachine;

/**
 * Hello world!
 *
 */
public class App {
    public static void main(String[] args) {

        TokenCredential credential = new EnvironmentCredentialBuilder()
                .authorityHost(AzureAuthorityHosts.AZURE_PUBLIC_CLOUD).build();

        // Please finish 'Set up authentication' step first to set the four environment
        // variables: AZURE_SUBSCRIPTION_ID, AZURE_CLIENT_ID, AZURE_CLIENT_SECRET,
        // AZURE_TENANT_ID
        // NB: The last time I have tried to register the application for authentication with the service principal it failed due to insufficient priviliges; so this code will not run
        AzureProfile profile = new AzureProfile(AzureEnvironment.AZURE);

        AzureResourceManager azureResourceManager = AzureResourceManager.configure()
                .withLogLevel(HttpLogDetailLevel.BASIC).authenticate(credential, profile).withDefaultSubscription();

        VirtualMachine vm = azureResourceManager.virtualMachines().getByResourceGroup("STRMGATEWAY-NA2",
                "vlmazsgw-lx2");

        System.out.println("VM Hardware details:");
        System.out.println("    vmSize: " + vm.size());
    }
}
