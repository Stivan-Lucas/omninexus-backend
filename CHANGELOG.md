# [1.7.0](https://github.com/Stivan-Lucas/omninexus-backend/compare/v1.6.0...v1.7.0) (2026-04-01)


### Bug Fixes

* **release:** update repository URL to match github ([493e3a2](https://github.com/Stivan-Lucas/omninexus-backend/commit/493e3a2c77866afb25e6dc42030aaf8a968afa2c))
* **release:** update repository URL to match GitHub ([97adf8f](https://github.com/Stivan-Lucas/omninexus-backend/commit/97adf8f7d3763415dbf5ef3b912ca7540b415655))


### Features

* **api:** implement agent keys management and auth refactor ([66c5fa0](https://github.com/Stivan-Lucas/omninexus-backend/commit/66c5fa0ba20d7869b8b1a25e5a8d4ccd4cd59edb))
* **db:** modularização do schema e nova tabela de licenças ([e9b428c](https://github.com/Stivan-Lucas/omninexus-backend/commit/e9b428c36b7bd3fc2bcf454a1f1177254d010bdd))
* **db:** modularização do schema e nova tabela de licenças ([b7388d9](https://github.com/Stivan-Lucas/omninexus-backend/commit/b7388d9455380d1a533d040833ff5cfc6936991d))

# [1.6.0](https://github.com/Stivan-Lucas/backend/compare/v1.5.0...v1.6.0) (2026-03-31)


### Bug Fixes

* **ci:** fix environment variable validation in github actions ([948bb19](https://github.com/Stivan-Lucas/backend/commit/948bb1987eeae553fe508fddeb4fcb8007b17c76))
* **env:** fix CI environment validation and remove translations from schema ([2ba8ae2](https://github.com/Stivan-Lucas/backend/commit/2ba8ae2e12b700f219b91130ea6a39b72ced96bc))


### Features

* **auth:** implement jwt provider and extended fastify types ([89dbb75](https://github.com/Stivan-Lucas/backend/commit/89dbb75cd34920d5da8da243d3e85045c3f73e7e))
* **auth:** integrate localized error handling in routes and auth plugin ([9da8d20](https://github.com/Stivan-Lucas/backend/commit/9da8d2036f8df33aa1c3eb2e082f5c8f743a1500))
* **auth:** setup jwt plugin and fastify type definitions ([0e09ea1](https://github.com/Stivan-Lucas/backend/commit/0e09ea10db00123c6403002eac635fb8a07ab93d))
* **i18n:** setup i18next plugin and localized resources ([e0e4330](https://github.com/Stivan-Lucas/backend/commit/e0e4330664b3832183cde7fb25ccad739d85f734))
* **users:** add user crud and login routes ([fe21d7c](https://github.com/Stivan-Lucas/backend/commit/fe21d7c53f61aea6df8d7ab6fa4beaae6c340850))
* **validation:** implement global zod error map with i18n support ([ad4bf19](https://github.com/Stivan-Lucas/backend/commit/ad4bf1902174c7c693094a8f809ab02ded097771))

# [1.5.0](https://github.com/Stivan-Lucas/backend/compare/v1.4.0...v1.5.0) (2026-03-29)


### Bug Fixes

* **error:** adjusted error params ([85a2ebf](https://github.com/Stivan-Lucas/backend/commit/85a2ebf9f5e1dff7d89993fbe3715ad05f352010))


### Features

* **deploy:** prepare to package to deploy db ([378cfa6](https://github.com/Stivan-Lucas/backend/commit/378cfa60d46d475367c200c4a1fd4b0a9e434817))

# [1.4.0](https://github.com/Stivan-Lucas/backend/compare/v1.3.1...v1.4.0) (2026-03-28)


### Bug Fixes

* **error:** add new env validate ([eb3dec5](https://github.com/Stivan-Lucas/backend/commit/eb3dec5fee150a2014e07103087e113b3214d9be))


### Features

* **database:** setup postgres with drizzle and users module infrastructure ([96c0426](https://github.com/Stivan-Lucas/backend/commit/96c04268821eb5e9059908559c24309e2ecdc733))

## [1.3.1](https://github.com/Stivan-Lucas/backend/compare/v1.3.0...v1.3.1) (2026-03-28)


### Bug Fixes

* **ci:** upgrade node to v22 and inject test environment variables ([74a6aa9](https://github.com/Stivan-Lucas/backend/commit/74a6aa9ab4b61793aaebae31df1e5c5d8f520611))
* **tests:** remove unused env import in app.test.ts ([b26413b](https://github.com/Stivan-Lucas/backend/commit/b26413b4380491a4220c81aaf662eb8f17ff3a9b))

# [1.3.0](https://github.com/Stivan-Lucas/backend/compare/v1.2.0...v1.3.0) (2026-03-27)


### Features

* **test:** implement bun test suite and github actions ci workflow ([f988728](https://github.com/Stivan-Lucas/backend/commit/f9887283eb8cb9cfce5da7a6d1832f74e0c48381))

# [1.2.0](https://github.com/Stivan-Lucas/backend/compare/v1.1.0...v1.2.0) (2026-03-27)


### Features

* **i18n:** implement multi-language support with automatic detection ([3340743](https://github.com/Stivan-Lucas/backend/commit/33407437124303563875214db1717d017d9770b0))
* **rate-limit:** add localized error messages and request throttling ([031e4a1](https://github.com/Stivan-Lucas/backend/commit/031e4a15f239e527555a24d3523cc6355b07e2f6))
* **security:** implement rate limiting plugin with i18n support ([93acfca](https://github.com/Stivan-Lucas/backend/commit/93acfca07292d4231715272798533674af3bf51e))

# [1.1.0](https://github.com/Stivan-Lucas/backend/compare/v1.0.0...v1.1.0) (2026-03-27)


### Features

* **i18n:** add strict typing for translation keys from JSON ([1655cbe](https://github.com/Stivan-Lucas/backend/commit/1655cbeba2a3ec1e092b73acfdbbfeed3dabe419))

# 1.0.0 (2026-03-19)


### Features

* **docs:** add documentation mode ([415c926](https://github.com/Stivan-Lucas/backend/commit/415c926ef4f98428f62e7af31220c61f99148c6c))
* implement environment variable validation with Zod ([e4c2553](https://github.com/Stivan-Lucas/backend/commit/e4c2553eecf3eb09a24ab20c94ba6e46e1908e9b))
* initialize fastify server using validated env and custom logger ([d69747e](https://github.com/Stivan-Lucas/backend/commit/d69747e05dcdd34f16c8659ca72d685d89f172db))
* **init:** inite the project ([083fe3d](https://github.com/Stivan-Lucas/backend/commit/083fe3d22ad6aa601e2f5ae981f81992329ed4d0))
* **new:** add validation base auth in rote docs ([9a20866](https://github.com/Stivan-Lucas/backend/commit/9a208667b6408351b4456b1df3ebb0f944d346d1))
* **new:** new package and update ([3924fbb](https://github.com/Stivan-Lucas/backend/commit/3924fbb72763966e8e8f79a423cdb47f09193485))
* **new:** setup fastify with zod type provider ([b4a1505](https://github.com/Stivan-Lucas/backend/commit/b4a1505648fb8d9d6608a938fdb489715f84d34e))
* setup Pino logger with pino-pretty and pino-roll rotation ([9b9c319](https://github.com/Stivan-Lucas/backend/commit/9b9c319a00f9ea8a3de487bf03955873ed2f0a7c))


### Performance Improvements

* **add:** add new pack base auth ([5746d32](https://github.com/Stivan-Lucas/backend/commit/5746d3211b97f03abfafde6938f9007ef09ea814))
* **union:** access tho info package ([2745321](https://github.com/Stivan-Lucas/backend/commit/2745321346b61d394b126826554f23385262267e))

# 1.0.0 (2026-03-19)


### Features

* **docs:** add documentation mode ([415c926](https://github.com/Stivan-Lucas/backend/commit/415c926ef4f98428f62e7af31220c61f99148c6c))
* implement environment variable validation with Zod ([e4c2553](https://github.com/Stivan-Lucas/backend/commit/e4c2553eecf3eb09a24ab20c94ba6e46e1908e9b))
* initialize fastify server using validated env and custom logger ([d69747e](https://github.com/Stivan-Lucas/backend/commit/d69747e05dcdd34f16c8659ca72d685d89f172db))
* **init:** inite the project ([083fe3d](https://github.com/Stivan-Lucas/backend/commit/083fe3d22ad6aa601e2f5ae981f81992329ed4d0))
* **new:** add validation base auth in rote docs ([9a20866](https://github.com/Stivan-Lucas/backend/commit/9a208667b6408351b4456b1df3ebb0f944d346d1))
* **new:** new package and update ([3924fbb](https://github.com/Stivan-Lucas/backend/commit/3924fbb72763966e8e8f79a423cdb47f09193485))
* **new:** setup fastify with zod type provider ([b4a1505](https://github.com/Stivan-Lucas/backend/commit/b4a1505648fb8d9d6608a938fdb489715f84d34e))
* setup Pino logger with pino-pretty and pino-roll rotation ([9b9c319](https://github.com/Stivan-Lucas/backend/commit/9b9c319a00f9ea8a3de487bf03955873ed2f0a7c))


### Performance Improvements

* **add:** add new pack base auth ([5746d32](https://github.com/Stivan-Lucas/backend/commit/5746d3211b97f03abfafde6938f9007ef09ea814))
* **union:** access tho info package ([2745321](https://github.com/Stivan-Lucas/backend/commit/2745321346b61d394b126826554f23385262267e))
