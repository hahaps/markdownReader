### Overview
<p>
MarkdownReader is a tools write with AngularJS and Node.js to mange markdown files on line. 
</p>
<p>
All documents organized or recorded by [Li Xipeng](https://github.com/hahaps "Hahaps"), and they are ** free ** and ** all shared ** for anyone who make sense of it.
<p>
<p>
It's welcome for mails from anyone who find any fault in those documents. For Chinese, please send mail to `1096249660@qq.com`, otherwise, please send mail to `lilvpengshuang@gmail.com`.
</p>

### Snapshoot
<p> Home page </p>
<p><img src="/screen/home_1.png" width="100%"/></p>
<p> Edit page </p>
<p><img src="/screen/home_2.png" width="100%"/></p>
<p> Add File/Folder </p>
<p><img src="/screen/add.png" width="100%"/></p>

### How To Run
Do as follow steps to run markdownReader:
1. Install Node.js env:
  - For Ubuntu/Debian, run command `sudo apt-get install nodejs`.
  - For Centos/Fedora/RedHat/Suse/Opensuse, run command `yum install nodejs`.
  - For Windows, download [Node.js](https://nodejs.org/dist/v4.4.7/node-v4.4.7-x86.msi "Node.js"), and click to install it.
  - For OS X, run command `brew install nodejs`.
2. Download markdownReader source code by running command `git clone https://github.com/hahaps/markdownReader.git` or [directly](https://github.com/hahaps/markdowReader/archive/master.zip "markdownReader").
3. Go to the markdownReader folder and run command `node server.js` to start markdownReader(Default port is 8080, or run `node server.js 8888` to change default port).
4. Optional, install `forever` with command `npm install -g forever` to mange markdownReader service by run command `forever start --minUptime 2000 server.js 8080`.

Then, open your browser to visit `http://localhost:8080` to enjoy markdownReader.

### About ME
<p>
My name is [Li Xipeng](https://github.com/hahaps "Hahaps") from China, male, and now work at [Beijing Huron Technology, Ltd](http://www.hihuron.com/ "Beijing Huron Technology, Ltd") as an Openstack developer.
</p>

### License - MIT
The markdownReader code is licensed under the MIT license.

**markdownReader:**
Copyright (c) 2015 Li Xipeng. lixipeng@hihuron.com

Permission is hereby granted, free of charge, to any person
obtaining a copy of this software and associated documentation 
files (the "Software"), to deal in the Software without 
restriction, including without limitation the rights to use, copy, 
modify, merge, publish, distribute, sublicense, and/or sell copies 
of the Software, and to permit persons to whom the Software is 
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be 
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED,
INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, 
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. 
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT 
HOLDERS BE LIABLE FOR ANY CLAIM, 
DAMAGES OR OTHER LIABILITY, 
WHETHER IN AN ACTION OF CONTRACT, 
TORT OR OTHERWISE, 
ARISING FROM, OUT OF OR IN CONNECTION WITH 
THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
