// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  mbsUrl: 'https://mbs.fedoraproject.org/module-build-service/1/',
  kojiUrl: 'https://koji.fedoraproject.org/koji/',
  pdcApiUrl: 'https://pdc.fedoraproject.org/rest_api/v1/modules/'
};
