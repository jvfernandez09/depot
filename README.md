## GWX Token Depot Web

A digital distribution service as the official app store of GWX. Allowing users to browse and subscribe to GWX Games.
 
 
### Brief tech stack/prerequisites & respective versions
 - This project was bootstrapped with [CRA](https://facebook.github.io/create-react-app/).
 - To customize CRA and webpack, this project uses [react-app-rewired](https://github.com/timarney/react-app-rewired) & [customize-cra](https://github.com/arackaf/customize-cra) to override the configurations.
 - Design Lanuage used is a customized [Ant Design](https://ant.design/)
 - Uses Circle CI version 2 for automated deployment.
 ```
 "react": "^16.8.6",
 "customize-cra": "^0.2.12",
 "react-app-rewired": "^2.1.3",
 "webpack": "4.29.6",
 "antd": "^3.18.1"
 ```
 
### Getting Started/Onboarding procedures
To get started, run:
```
yarn start
```

### How to run tests
This project uses [Jest](https://jestjs.io/docs/en/tutorial-react) that comes with CRA for testing
```
yarn test
```
  
### Developer Guidelines
Use semantic versioning
```
npm version major|minor|patch
```
Use fat arrows, avoid binding functions in the constructor
```
const handleChange = (e) => {
  useState({ [e.target.name]: e.target.value })
}

<input onChange={this.handleChange} />
```
Use **Async / Await** for API calls
```
const getData = async () => {
  try {
    cosnt { fetchData } this.props
    const res = await fetchData()
  } catch (e) {
    console.log('error: ', e)
  }
}
```

