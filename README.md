CO-OP ATMs Ionic Demo
===================
This is a sample app to find ATMs in the [CO-OP network](http://co-opcreditunions.org/) built using [Ionic Framework](http://ionicframework.com).

Getting started
-------------
Before running the app there are a few things you should install.

**Installing Ionic CLI and Cordova**

    npm install -g ionic cordova gulp

**Node and Bower packages**

	npm install
	bower install
	
**Bing API Key**

Although the app is functional without this, you will see an overlay on the map that will cover part of the pushpins. You can get a free API Key on [Bing Maps Portal](https://www.bingmapsportal.com/). Once you get it, execute the following Gulp task to add it to the app:

	gulp add-bingkey --key <your API key>

Running the app
--------------------

**On a browser window**

The app is already set to run in this environment, just type `ionic serve` and a browser window will open automatically.

**On a device**

*Removing the ATM service proxy*

In order to run on the local browser, we have set up a proxy so we can make calls to the ATM service in that environment. However, this is not needed when running as a Cordova app and should be disabled using the following command.

	gulp remove-proxy
	
> **Note:** You can use `gulp add-proxy` to revert the change.

*Adding a platform*

You need to add the target platforms for the app. For example, for Windows 10 you would need to type:

	ionic platform add "windows@https://aka.ms/cordova-win10"

After that, just type `ionic build windows` to build the AppX package which you can later install on a phone running Windows 10. A way to do this is copying the package to the phone, navigate to the folder containing the package on the File Explorer app and tap on the appx file.

>**Note:** You need to have the phone in Developer Mode in order to install the app, which can be enabled in the Settings app.

For more commands, check out the [Windows Platform Guide](http://cordova.apache.org/docs/en/edge/guide_platforms_win8_index.md.html#Windows%208%20Platform%20Guide).
