##Meet Glue

![Glue](http://dongzhixia.com/glue/images/banner.svg)

Glue is a flow-based visual programming environment that makes sketching in hardware easier for designers. 

Glue offers an alternative way to create program by manipulating logics graphically. With visible flows and real-time feedback, beginners can learn, understand and create program intuitively. The smartphone integration allows beginners to set up flexible architectures and mimic connected experience easily. Glue also provides powerful ways to explore invisible behaviours across time and possibilities. 

Visit [dongzhixia.com/glue](http://dongzhixia.com/glue/) for more information.

##Test Builds
> **WARNING:** Glue is still in early lean development. There’s no stable release yet. But you are always welcome to try test builds and report bugs.

- [Test Build v0.161.0](https://github.com/dongzhi/Glue/releases)

## Building
Glue is currently built using HTML&Javascript based on [NW.js](https://github.com/nwjs/nw.js) runtime and [johnny-five](https://github.com/rwaldron/johnny-five) framework. It only supprots OS X 10.8+ now. Windows, Linux versions coming later.

### Requirements
  * OS X 10.8 or later
  * [node.js](http://nodejs.org/download/) (0.10.x or 0.12.x) or [io.js](https://iojs.org) (1.x)
  * Command Line Tools for [Xcode](https://developer.apple.com/xcode/downloads/) (run `xcode-select --install` to install)
  

### Instructions
From the command line:

```
git clone https://github.com/dongzhi/Glue.git
cd Glue
sudo ./script/build
```

#### `script/build` Options
  * `--verbose` or `-v` - Verbose mode. A lot more information output.

##License
Glue's code in this repo uses the MIT license - [MIT License](http://en.wikipedia.org/wiki/MIT_License)