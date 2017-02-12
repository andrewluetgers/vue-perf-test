# vue-perf-test
a simple perf test using Vue.js

<img width="504" alt="screen shot 2015-12-20 at 12 13 18 pm" src="https://cloud.githubusercontent.com/assets/232036/11919264/5ba5634a-a713-11e5-8179-b06030b16dbd.png">


## Run It
 ```js
 npm install
 npm run dev
 open http://localhost:8080
 ```
## What is it
The basic idea here is to exercise the state updating mechanism as much as possible in the context of still updating the view.

It basically sets up lots (10,000 in the largest case) of little squares in a grid and randomly picks one to toggle on or off.
You can start or stop the process and pick different sizes for the grid. Which are good ways to see how changes in array length are handled.

The 100 x 100 grid is the main show here and illustrates weather or not the change observation, subscription and rendering mechanisms all scale well or not.

# Other Implementations
 * [React + MobX](https://github.com/andrewluetgers/mobx-react-perf-test)
 * [Omnistate](https://github.com/andrewluetgers/omnistate)
 * [vanilla-js](http://jsfiddle.net/zme8f7k8/5/)