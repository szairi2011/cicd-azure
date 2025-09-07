export const environment = {
  production: true,
  // user_task_api_url: 'http://' + window.location.hostname + ':3000/tasks/',
  // user_task_api_url: 'http://' + window.location.hostname + '/tasks/',
  // user_info_api_url: 'http://localhost:3000/users/'
  // user_task_api_url: 'http://' + 'backend-service' + '/tasks/',
  user_task_api_url: 'http://' + window.location.hostname + ':' + window.location.port + window['env']['tasks_backend_url_suffix'], // Proxying calls for containerized environments
  /*
    Using service name instead
     * This will allow for k8s cluster wide service calls, and
     * It should be still compliant with docker-compose network adapter service lookup mechanism -- yet to be tested
     * For dev environments, we can use host mapping entries locally
  */
  // user_info_api_url: 'http://' + 'backend-service' + '/users/'
  // user_info_api_url: 'http://' + window.location.hostname + ':3000/users/',
  // user_info_api_url: 'http://' + window.location.hostname + '/users/',
  user_info_api_url: 'http://' + window.location.hostname + ':' + window.location.port + window['env']['users_backend_url_suffix'], // Proxying calls for containerized environments
  // app_title: '{{FRONTEND_NAME}} v{{APP_FRONTEND_VERSION}}'
  app_title: window['env']['app_title']
};
