# monorepo

This repo has three distinct purposes:

1) demonstrate and exercise the scenario of a monorepo containing several applications for different business projects and grouped by frontend and backend stacks and
2) to exercise a backend project structure (Profile API) using <cite>Uncle Bob</cite>'s [**The Clean Architecture**](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html) and
3) to exercise this same project using NestJS and maintaning some DDD principles and layer decoupling 

As of the monorepo structure (item 1), I don't have much to comment as there is no much content to validate the structure. Nevertheless a PoC using [Nx](https://nx.dev/) is welcome to validate if we can have an efficient process when it comes to building and packaging inner applications in monorepos.

As for the project, the intention is to present a lambda project with decoupled layers using Inversion of Control project ```student-profile-api``` (vanillja JS)  or Dependency Injection in project ```student-profile-api-nest``` (NestJS).


## Questions

- does it make sense to group applications (REST API, lambdas) by project (sanctions, IDM, etc)?
- does it make sense to have multiple lambdas mapped to different operations on a CRUD API or it's better to keep the operations inside a single lambda function?


## Considerations

### Pros
- all the code base is kept together in one place and "easy" to find
- it may be more productive for full stack developers that need to change both Frontend and Backend

### Cons

- large code base that consumes more memory when the whole structure is open (linters, git change detections, installed plugins that traverse the file structure)
- more difficult to search for files (need to apply search in specific folders)
- 


## Folder structure

### Repository structure

The ```student-profile-api``` project was structured following   design principles.

```
.
├── .vscode
│   └── launch.json
├── back-end
│   ├── agent-comission
│   ├── common
│   ├── idm
│   │   ├── student-profile-api
│   │   │   ├── .vscode
│   │   │   ├── coverage
│   │   │   ├── dist
│   │   │   │   ├── express
│   │   │   │   │   ├── express.zip
│   │   │   │   │   └── index.js
│   │   │   │   ├── lambda
│   │   │   │   │   ├── index.js
│   │   │   │   │   └── lambda.zip
│   │   │   │   └── src
│   │   │   ├── src
│   │   │   │   ├── application
│   │   │   │   │   ├── adapter
│   │   │   │   │   │   └── ExpressAdapter.ts
│   │   │   │   │   └── controller
│   │   │   │   │       └── StudentProfileController.ts
│   │   │   │   ├── domain
│   │   │   │   │   ├── adapter
│   │   │   │   │   │   └── StudentProfileAdapter.ts
│   │   │   │   │   ├── entity
│   │   │   │   │   │   └── StudentProfile.ts
│   │   │   │   │   ├── repository
│   │   │   │   │   │   └── StudentProfileRepository.ts
│   │   │   │   │   └── usecase
│   │   │   │   │       ├── CreateStudentProfile.test.ts
│   │   │   │   │       ├── CreateStudentProfile.ts
│   │   │   │   │       ├── GetStudentProfile.test.ts
│   │   │   │   │       └── GetStudentProfile.ts
│   │   │   │   └── infrastructure
│   │   │   │       ├── http
│   │   │   │       │   └── express.ts
│   │   │   │       ├── repository
│   │   │   │       │   └── StudentProfileDynamoDBRepository.ts
│   │   │   │       │   └── StudentProfileMemoryRepository.ts
│   │   │   │       └── serverless
│   │   │   │           └── lambda.ts
│   │   │   ├── .gitignore
│   │   │   ├── package-lock.json
│   │   │   ├── package.json
│   │   │   ├── README.md
│   │   │   ├── tsconfig.json
│   │   │   └── webpack.config.js
│   ├── sanctions
│   ├── student-debt
├── front-end
│   ├── common
│   ├── idm
│   │   └── student-portal
│   └── sanctions
│── .gitignore
└── README.md
```

### Structure explained

```
├── back-end
│   ├── common (common snippets, functions, libraries, etc)
│   ├── project 1
│   ├── project 2
│   │   ├── component 1 (REST APIs, lambdas, jobs, web services, tools, etc)
│   │   │   ├── coverage (code coverage report)
│   │   │   ├── dist
│   │   │   │   ├── express (Express application Webpack bundle)
│   │   │   │   ├── lambda (Lambda function Webpack bundle)
│   │   │   │   └── src (Javascript converted files from Typescript files)
│   │   │   ├── src
│   │   │   │   ├── application
│   │   │   │   │   ├── adapter (application-wide adapters)
│   │   │   │   │   └── controller
│   │   │   │   ├── domain (core business rules - technology agnostic)
│   │   │   │   │   ├── adapter (DTO's)
│   │   │   │   │   ├── entity (models with basic validations)
│   │   │   │   │   ├── repository (data access interface)
│   │   │   │   │   └── usecase (actual application user stories)
│   │   │   │   └── infrastructure (concrete implementations tied to specific technology)
│   │   │   │       ├── http
│   │   │   │       │   └── express.ts (Express application entry point)
│   │   │   │       ├── repository (data access concrete implementations)
│   │   │   │       └── serverless
│   │   │   │           └── lambda.ts (Lambda function entry point)
│   │   │   ├── tsconfig.json
│   │   │   └── webpack.config.js
│   ├── project 3
│   ├── project 4
├── front-end
│   ├── common
│   ├── project 1
│   │   └── component 1
│   └── project 2
```