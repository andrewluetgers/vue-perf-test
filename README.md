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
 * vanilla-js (coming soon)

# Results vs React + MobX
It is by no means a perfect test but here are a couple observations.

Vue.js is as fast as React + MobX at 1 update per frame and performs better as you increase to 10, 100, and 1000 operations per frame.

With React the way you break your code out into components has a huge impact on performance. With Vue.js this seems not to be the case. The React implementation uses individual components for the table, row and cell, the Vue.js implementation uses one component with nested for in loops. This is a great improvement in simplicity and expressively without sacrificing performance. But more importantly I don't need to think as hard about performance. That is a huge win.

At 1000 operations per frame the Vue.js implementation runs 2x faster than React+MobX, the call stack flame graphs say it all. Guess which is which, depth of 9 vs 34.

<img width="1440" alt="screen shot 2017-02-12 at 10 10 48 pm" src="https://cloud.githubusercontent.com/assets/232036/22889587/4a0c8a3e-f1cf-11e6-9514-fffc10b8fcf4.png">
