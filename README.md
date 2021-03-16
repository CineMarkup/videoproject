# Video project

## Features

- MongoDB - document database
- Express(.js) - Node.js web routing framework
- Angular(.js) - a client-side JavaScript framework
- Node(.js) - the premier JavaScript web server

**Notes**

- Step 1) npm install -g @angular/cli
- Step 2) ng new my-angular-project
- Step 3) cd my-angular-project
- Step 4) ng serve --open

## RUN

```shell
npm start
```
![console start](screenshots/consolestart.png)

Goto http://localhost:4200/


## Deploying to Azure 

this projectis dpeloyed to Cloud ( Azure App) via the video-bacekend project 
To deploy run `npm build` and copy the generated dist file to angularSrc folder on video-backend project's main branch . 

```shell
rm -rf ../video-backend/angularSrc/*
cp -r dist/videoproject/* ../video-backend/angularSrc
```
Any push to video-backend main branch triggers a cloud deployment to azure 

## User Interface

Editor 
![editor UI](screenshots/editorui.png)

Player 
![player UI](screenshots/playerui.png)

## Archive

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.1.1.


- Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

- Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

- ng Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Test 

###  Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

### Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).


## AI

### Computer vision 

Azure computer Vision models and capabilities
- Image classification
- Object detection
- Semantic segmentation
- Image analysis
- Face detection, analysis, and recognition
- Optical character recognition (OCR)

### Natural language processing (NLP)

- Text Analytics
- Translator Text
- Speech
- Language Understanding Intelligent Service (LUIS)

## References 

- https://angular.io/tutorial 
- To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
